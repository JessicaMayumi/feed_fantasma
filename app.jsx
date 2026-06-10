/* ===== Feed Fantasma — app principal ===== */
const STATE_KEY = "feedFantasma.state.v4";
const CONFIG_KEY = "feedFantasma.config.v1";

function loadConfig() {
  try {
    const raw = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");
    return { ...window.DEFAULT_CONFIG, ...raw };
  } catch (e) { return { ...window.DEFAULT_CONFIG }; }
}

function freshPosts() {
  return window.INITIAL_POSTS.map(p => ({
    ...p,
    status: "normal",     // normal | boost | demote | hide
    locked: false,
    deleted: false,
    liked: false,
    denuncias: 0,
    judFired: false,
    censFired: false
  }));
}

/* score para ordenação do feed */
function scoreOf(p) {
  if (p.status === "boost") return 1e9 + p.likes;
  if (p.status === "hide") return -1e9 + p.likes;
  if (p.status === "demote") return -1e6 + p.likes;
  return p.likes;
}

/* ---------- FLIP hook (reordenação suave) ---------- */
function useFlip() {
  const nodes = useRef(new Map());
  const prev = useRef(new Map());
  useLayoutEffect(() => {
    const next = new Map();
    nodes.current.forEach((node, id) => next.set(id, node.getBoundingClientRect()));
    nodes.current.forEach((node, id) => {
      const o = prev.current.get(id);
      const n = next.get(id);
      if (o && n) {
        const dx = o.left - n.left, dy = o.top - n.top;
        if (dx || dy) {
          node.style.transition = "none";
          node.style.transform = `translate(${dx}px, ${dy}px)`;
          node.getBoundingClientRect();
          requestAnimationFrame(() => {
            node.style.transition = "transform var(--flip-dur) cubic-bezier(.2,.85,.25,1)";
            node.style.transform = "";
          });
        }
      }
    });
    prev.current = next;
  });
  const register = (id) => (el) => {
    if (el) nodes.current.set(id, el);
    else nodes.current.delete(id);
  };
  return register;
}

function App() {
  const [cfg, setCfg] = useState(loadConfig);
  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.posts && saved.posts.length) return saved.posts;
      }
    } catch (e) {}
    return freshPosts();
  });
  const [totalMulta, setTotalMulta] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STATE_KEY) || "{}").totalMulta || 0; }
    catch (e) { return 0; }
  });
  const [toasts, setToasts] = useState([]);
  const register = useFlip();

  /* re-ler config quando a aba volta ao foco (após editar Ajustes) */
  useEffect(() => {
    const onFocus = () => setCfg(loadConfig());
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onFocus);
    return () => { window.removeEventListener("focus", onFocus); window.removeEventListener("storage", onFocus); };
  }, []);

  /* aplicar variáveis CSS de config */
  useEffect(() => {
    document.documentElement.style.setProperty("--flip-dur", cfg.flipDur + "s");
    document.documentElement.classList.toggle("presentation", !!cfg.presentation);
  }, [cfg.flipDur, cfg.presentation]);

  /* persistir estado */
  useEffect(() => {
    try { localStorage.setItem(STATE_KEY, JSON.stringify({ posts, totalMulta })); } catch (e) {}
  }, [posts, totalMulta]);

  /* ---------- toasts ---------- */
  const removeToast = (id) => {
    setToasts(ts => ts.map(t => t.id === id ? { ...t, leaving: true } : t));
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 400);
  };
  const pushToast = (toast) => {
    const id = Math.random().toString(36).slice(2);
    // ordem judicial e o aviso de censura ficam fixos até o ✕ (pra apresentar)
    const sticky = toast.kind === "judicial" || toast.kind === "censura";
    setToasts(ts => [...ts, { ...toast, id, sticky }]);
    if (!sticky) setTimeout(() => removeToast(id), 5000);
  };

  /* ---------- mecânica 1: algoritmo (like) ---------- */
  const onLike = (id) => {
    setPosts(ps => ps.map(p => {
      if (p.id !== id) return p;
      const liked = !p.liked;
      return { ...p, liked, likes: p.likes + (liked ? 1 : -1) };
    }));
  };

  /* ---------- mecânica 2: plataforma ---------- */
  const onPlatform = (id, action) => {
    setPosts(ps => ps.map(p => {
      if (p.id !== id || p.locked) return p;
      return { ...p, status: p.status === action ? "normal" : action };
    }));
  };

  /* ---------- mecânica 3: lei (denúncia) ---------- */
  /* a denúncia só incrementa o contador (puro); as consequências (ordem
     judicial, multa, aviso de censura) são tratadas no efeito abaixo */
  const onReport = (id) => {
    setPosts(ps => ps.map(p =>
      (p.id === id && !p.locked) ? { ...p, denuncias: p.denuncias + 1 } : p
    ));
  };

  useEffect(() => {
    const toFire = posts.filter(p => !p.deleted && p.denuncias >= cfg.denunciasOrdem &&
      ((!p.legal && !p.judFired) || (p.legal && !p.censFired)));
    if (!toFire.length) return;
    let addMulta = 0;
    const ids = new Set();
    toFire.forEach(p => {
      ids.add(p.id);
      if (!p.legal) {
        addMulta += cfg.valorMulta;
        pushToast({
          kind: "judicial", icon: "⚖",
          title: "Ordem judicial recebida",
          text: `Remoção determinada por <b>${p.reason}</b>. Multa de <b>${brl(cfg.valorMulta)}</b> aplicada. Motivo declarado, registro público.`
        });
      } else {
        pushToast({
          kind: "censura", icon: "✋",
          title: "Conteúdo legal — nenhuma ordem",
          text: `Nada foi removido de <b>@${p.handle}</b>. Não há ilegalidade: obrigar a tirar isso seria <b>censura</b>.`
        });
      }
    });
    if (addMulta) setTotalMulta(m => m + addMulta);
    setPosts(ps => ps.map(p => {
      if (!ids.has(p.id)) return p;
      return p.legal ? { ...p, censFired: true } : { ...p, locked: true, judFired: true, status: "normal" };
    }));
  }, [posts, cfg.denunciasOrdem, cfg.valorMulta]);

  const onDelete = (id) => {
    const post = posts.find(p => p.id === id);
    setPosts(ps => ps.map(p => p.id === id ? { ...p, deleted: true } : p));
    if (post) pushToast({
      kind: "info", icon: "🗑",
      title: "Post apagado",
      text: `<b>@${post.handle}</b> foi removido em cumprimento à ordem judicial.`
    });
  };

  const onReset = () => {
    setPosts(freshPosts());
    setTotalMulta(0);
    setToasts([]);
    try { localStorage.removeItem(STATE_KEY); } catch (e) {}
    pushToast({ kind: "info", icon: "↺", title: "Feed reiniciado", text: "Demonstração pronta pra começar do zero." });
  };

  const togglePresentation = () => {
    setCfg(c => {
      const nc = { ...c, presentation: !c.presentation };
      try { localStorage.setItem(CONFIG_KEY, JSON.stringify(nc)); } catch (e) {}
      return nc;
    });
  };

  /* ---------- derivados ---------- */
  const visible = posts.filter(p => !p.deleted);
  const sorted = useMemo(
    () => [...visible].sort((a, b) => scoreOf(b) - scoreOf(a)),
    [posts]
  );
  const counts = {
    visiveis: visible.filter(p => p.status !== "hide").length,
    escondidos: visible.filter(p => p.status === "hide").length,
    apagados: posts.filter(p => p.deleted).length
  };

  return (
    <>
      <TopBar
        counts={counts}
        totalMulta={totalMulta}
        presentation={cfg.presentation}
        onTogglePresentation={togglePresentation}
        onReset={onReset}
      />
      <Toasts toasts={toasts} onClose={removeToast} />
      <div className="layout">
        <main className="feed">
          <div className="feed-hint">O feed se reorganiza sozinho conforme o engajamento. Experimente curtir, moderar e denunciar.</div>
          {sorted.map(p => (
            <PostCard
              key={p.id}
              post={p}
              cfg={cfg}
              onLike={onLike}
              onReport={onReport}
              onPlatform={onPlatform}
              onDelete={onDelete}
              registerRef={register}
            />
          ))}
        </main>
        <Sidebar />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
