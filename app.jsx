/* ===== Feed Fantasma — app principal ===== */
const STATE_KEY = "feedFantasma.state.v6";
const CONFIG_KEY = "feedFantasma.config.v1";
const RULES_KEY = "feedFantasma.rules.v1";

function loadConfig() {
  try {
    const raw = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");
    return { ...window.DEFAULT_CONFIG, ...raw };
  } catch (e) { return { ...window.DEFAULT_CONFIG }; }
}

function loadRules() {
  try {
    const raw = JSON.parse(localStorage.getItem(RULES_KEY) || "null");
    if (Array.isArray(raw) && raw.length) return raw;
  } catch (e) {}
  return window.DEFAULT_RULES.map(r => ({ ...r, palavras: [...r.palavras] }));
}

/* score para ordenação do feed */
function scoreOf(p) {
  if (p.processing) return 1e12;                 // processando fica no topo
  if (p.status === "boost") return 1e9 + p.likes + (p.shares || 0);
  if (p.status === "hide") return -1e9 + p.likes;
  if (p.status === "demote") return -1e6 + p.likes;
  return p.likes + (p.shares || 0);
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

function EmptyFeed({ onInsert, side }) {
  return (
    <div className="feed-empty">
      <div className="fe-ico">{side === "algo" ? "◍" : "✎"}</div>
      <div className="fe-title">{side === "algo" ? "Nenhum post para analisar" : "Feed vazio"}</div>
      <div className="fe-sub">
        {side === "algo"
          ? "Publique um post e a sala de máquinas mostra a decisão na hora."
          : "Publique uma sugestão e o algoritmo decide já na publicação."}
      </div>
      {side !== "algo" && <button className="fe-btn" onClick={onInsert}>+ Inserir post</button>}
    </div>
  );
}

function App() {
  const [cfg, setCfg] = useState(loadConfig);
  const [rules, setRules] = useState(loadRules);
  const [view, setView] = useState("user");           // user | both | algo
  const [drawer, setDrawer] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [published, setPublished] = useState(() => new Set());
  const rulesRef = useRef(rules);
  useEffect(() => { rulesRef.current = rules; }, [rules]);
  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.posts && saved.posts.length) return saved.posts.map(p => ({ ...p, processing: false }));
      }
    } catch (e) {}
    return [];
  });
  const [totalMulta, setTotalMulta] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STATE_KEY) || "{}").totalMulta || 0; }
    catch (e) { return 0; }
  });
  const [toasts, setToasts] = useState([]);
  const register = useFlip();
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

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

  /* persistir regras */
  useEffect(() => {
    try { localStorage.setItem(RULES_KEY, JSON.stringify(rules)); } catch (e) {}
  }, [rules]);

  /* ---------- toasts ---------- */
  const removeToast = (id) => {
    setToasts(ts => ts.map(t => t.id === id ? { ...t, leaving: true } : t));
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 400);
  };
  const pushToast = (toast) => {
    const id = Math.random().toString(36).slice(2);
    const sticky = toast.kind === "judicial" || toast.kind === "censura";
    setToasts(ts => [...ts, { ...toast, id, sticky }]);
    if (!sticky) setTimeout(() => removeToast(id), 5000);
  };

  /* ---------- engajamento: like / compartilhar (+passo) ---------- */
  const bump = (p, field) => {
    const next = { ...p, [field]: (p[field] || 0) + cfg.passoEngajamento };
    if (field === "likes") next.liked = true;
    if (field === "shares") next.shared = true;
    // engajamento vence: passando do limiar, a plataforma impulsiona
    if (!p.locked && p.status !== "hide" &&
        (next.likes > cfg.likesEmAlta || (next.shares || 0) > cfg.sharesEmAlta)) {
      next.status = "boost";
      next.statusSource = "engagement";
    }
    return next;
  };
  const onLike = (id) => setPosts(ps => ps.map(p => (p.id === id && !p.processing) ? bump(p, "likes") : p));
  const onShare = (id) => setPosts(ps => ps.map(p => (p.id === id && !p.processing) ? bump(p, "shares") : p));

  /* ---------- plataforma (manual) ---------- */
  const onPlatform = (id, action) => {
    setPosts(ps => ps.map(p => {
      if (p.id !== id || p.locked || p.processing) return p;
      const status = p.status === action ? "normal" : action;
      return { ...p, status, statusSource: status === "normal" ? null : "manual", processed: true };
    }));
  };

  /* ---------- algoritmo decide na publicação ---------- */
  const resolveProcessing = (ids) => {
    setPosts(ps => ps.map(p => {
      if (!ids.includes(p.id)) return p;
      const { decided } = window.evalPost(p.text, rulesRef.current);
      const status = decided ? window.decisionToStatus(decided.rule.acao) : "normal";
      return { ...p, processing: false, processed: true, status, statusSource: "algo" };
    }));
  };

  /* re-rodar: reavalia TODOS os posts com as regras atuais */
  const reRunAlgorithm = () => {
    setPosts(ps => ps.map(p => {
      if (p.deleted || p.locked || p.processing) return p;
      const { decided } = window.evalPost(p.text, rulesRef.current);
      let status = decided ? window.decisionToStatus(decided.rule.acao) : "normal";
      let source = "algo";
      if (status !== "hide" && (p.likes > cfg.likesEmAlta || (p.shares || 0) > cfg.sharesEmAlta)) {
        status = "boost"; source = "engagement";
      }
      return { ...p, status, statusSource: source, processed: true };
    }));
  };

  /* edição das palavras vigiadas */
  const addWord = (ruleId, word) => {
    const w = (word || "").trim();
    if (!w) return;
    setRules(rs => rs.map(r => (r.id === ruleId && !r.palavras.some(x => x.toLowerCase() === w.toLowerCase()))
      ? { ...r, palavras: [...r.palavras, w] } : r));
  };
  const removeWord = (ruleId, word) => {
    setRules(rs => rs.map(r => r.id === ruleId ? { ...r, palavras: r.palavras.filter(x => x !== word) } : r));
  };
  const restoreRules = () => setRules(window.DEFAULT_RULES.map(r => ({ ...r, palavras: [...r.palavras] })));

  const insertPost = (post) => {
    setPosts(ps => [post, ...ps]);
    const t = setTimeout(() => resolveProcessing([post.id]), 1600);
    timers.current.push(t);
  };

  const publishSeed = (seedId) => {
    const seed = (window.INITIAL_POSTS || []).find(s => s.id === seedId);
    if (!seed) return;
    const id = seedId + "_" + Date.now().toString(36);
    insertPost({
      ...seed, id, time: "agora",
      status: "normal", statusSource: null, processing: true, processed: false,
      locked: false, deleted: false, liked: false, shared: false, shares: 0,
      denuncias: 0, judFired: false, censFired: false
    });
    setPublished(s => { const n = new Set(s); n.add(seedId); return n; });
  };

  const publishText = (text) => {
    const { legal, suspect, algo } = window.analyzeText(text);
    insertPost({
      id: "u" + Date.now(), name: "Você", handle: "voce_demo", avatarColor: "#2f6f8f",
      text, time: "agora", likes: 0, shares: 0,
      legal, suspect, reason: legal ? undefined : algo.motivo, isUser: true, verified: false,
      algo, status: "normal", statusSource: null, processing: true, processed: false,
      locked: false, deleted: false, liked: false, shared: false,
      denuncias: 0, judFired: false, censFired: false
    });
  };

  /* ---------- lei (denúncia) ---------- */
  const onReport = (id) => {
    setPosts(ps => ps.map(p =>
      (p.id === id && !p.locked && !p.processing) ? { ...p, denuncias: p.denuncias + 1 } : p
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
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPosts([]);
    setPublished(new Set());
    setTotalMulta(0);
    setToasts([]);
    try { localStorage.removeItem(STATE_KEY); } catch (e) {}
    pushToast({ kind: "info", icon: "↺", title: "Feed reiniciado", text: "Feed vazio, pronto pra começar do zero." });
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

  const algoSummary = useMemo(() => {
    const r = { boost: 0, demote: 0, hide: 0, normal: 0, pend: 0 };
    visible.forEach(p => {
      if (p.processing) { r.pend++; return; }
      if (p.status === "boost") r.boost++;
      else if (p.status === "demote") r.demote++;
      else if (p.status === "hide") r.hide++;
      else r.normal++;
    });
    return r;
  }, [posts]);

  const showFeed = view === "user" || view === "both";
  const showAlgo = view === "algo" || view === "both";
  const openDrawer = () => setDrawer(true);
  const ativos = visible.filter(p => !p.processing).length;

  return (
    <>
      <TopBar
        counts={counts}
        totalMulta={totalMulta}
        presentation={cfg.presentation}
        onTogglePresentation={togglePresentation}
        onReset={onReset}
        view={view}
        onView={setView}
        onInsert={openDrawer}
        onRules={() => setRulesOpen(true)}
      />
      <Toasts toasts={toasts} onClose={removeToast} />

      <SuggestionDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        onPublishSeed={publishSeed}
        onPublishText={publishText}
        published={published}
      />

      <RulesDrawer
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        rules={rules}
        onAddWord={addWord}
        onRemoveWord={removeWord}
        onRerun={() => { reRunAlgorithm(); }}
        onRestore={restoreRules}
        count={ativos}
      />

      <div className={"layout view-" + view + (view === "both" ? " both" : "")}>
        {showFeed && (
          <main className="feed">
            <div className="col-tag user-tag">Visão do Usuário · o que a turma vê</div>
            {sorted.length === 0
              ? <EmptyFeed onInsert={openDrawer} />
              : sorted.map(p => (
                <PostCard
                  key={p.id}
                  post={p}
                  cfg={cfg}
                  onLike={onLike}
                  onShare={onShare}
                  onReport={onReport}
                  onPlatform={onPlatform}
                  onDelete={onDelete}
                  registerRef={register}
                />
              ))}
          </main>
        )}

        {showAlgo && (
          <section className="algo-feed">
            <div className="algo-colhead">
              <div className="col-tag algo-tag">Visão do Algoritmo · a sala de máquinas</div>
              <div className="algo-summary">
                <span className="as boost">▲ {algoSummary.boost} impulsionados</span>
                <span className="as demote">▼ {algoSummary.demote} rebaixados</span>
                <span className="as hide">{algoSummary.hide} escondidos</span>
                <span className="as normal">{algoSummary.normal} normais</span>
                {algoSummary.pend > 0 && <span className="as pend">{algoSummary.pend} analisando</span>}
              </div>
            </div>
            {sorted.length === 0
              ? <EmptyFeed side="algo" />
              : sorted.map(p => <AlgoCard key={p.id} post={p} cfg={cfg} rules={rules} />)}
          </section>
        )}

        {view !== "both" && <Sidebar />}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
