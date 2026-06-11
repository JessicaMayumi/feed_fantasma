/* ===== Feed Fantasma — componentes ===== */
const { useState, useEffect, useRef, useLayoutEffect, useMemo } = React;

/* ---------- ícones (outline, traço fino) ---------- */
const Ico = {
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  ghost: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V10a7 7 0 0 1 14 0v10l-2.3-1.6L14.4 20 12 18.4 9.6 20 7.3 18.4 5 20z"/>
      <circle cx="9.3" cy="10.5" r="1.1" fill="currentColor" stroke="none"/>
      <circle cx="14.7" cy="10.5" r="1.1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
    </svg>
  ),
  comment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-5.7A8.4 8.4 0 1 1 21 11.5z"/>
    </svg>
  ),
  repost: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22V4"/><path d="M4 5s2-1 5-1 4 2 7 2 4-1 4-1v9s-1 1-4 1-4-2-7-2-5 1-5 1"/>
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M9 7 5 7l-2.5 6a3 3 0 0 0 5 0L5 7z"/><path d="M19 7l-2.5 6a3 3 0 0 0 5 0L19 7z"/>
    </svg>
  ),
  more: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/>
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>
    </svg>
  ),
  reset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M7 4.5v15a1 1 0 0 0 1.5.87l12-7.5a1 1 0 0 0 0-1.74l-12-7.5A1 1 0 0 0 7 4.5z"/>
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14"/><path d="M5 12h14"/>
    </svg>
  ),
  sliders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>
    </svg>
  ),
  text: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V5h16v2"/><path d="M9 5v14"/><path d="M7 19h4"/><path d="M14 12v-1h7v1"/><path d="M17.5 11v8"/><path d="M16 19h3"/>
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
    </svg>
  )
};

function Verified() {
  return (
    <svg className="verified" viewBox="0 0 24 24" aria-label="verificado">
      <path fill="#0095f6" d="M12 1.5l2.3 1.7 2.8-.3 1.2 2.6 2.6 1.2-.3 2.8L22.5 12l-1.7 2.3.3 2.8-2.6 1.2-1.2 2.6-2.8-.3L12 22.5l-2.3-1.7-2.8.3-1.2-2.6-2.6-1.2.3-2.8L1.5 12l1.7-2.3-.3-2.8 2.6-1.2 1.2-2.6 2.8.3z"/>
      <path fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.2l2.3 2.3 4.7-5"/>
    </svg>
  );
}

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0).replace(".", ",") + " mil";
  return n.toLocaleString("pt-BR");
}
function brl(n) { return "R$ " + n.toLocaleString("pt-BR"); }

/* ---------- PostCard ---------- */
function PostCard({ post, cfg, onLike, onShare, onReport, onPlatform, onDelete, registerRef }) {
  const [bump, setBump] = useState(false);
  const [sbump, setSbump] = useState(false);
  const bombando = post.status === "boost" && post.statusSource === "engagement";
  const klass = ["post"];
  if (post.locked) klass.push("locked");
  else if (post.status === "boost") klass.push("boosted");
  else if (post.status === "demote") klass.push("demoted");
  else if (post.status === "hide") klass.push("hidden");
  if (post.processing) klass.push("processing");

  const handleLike = () => { setBump(true); setTimeout(() => setBump(false), 420); onLike(post.id); };
  const handleShare = () => { setSbump(true); setTimeout(() => setSbump(false), 420); onShare(post.id); };

  const src = post.statusSource;
  const ribbon = (post.locked || post.processing) ? null : ({
    boost: ["boost", src === "manual" ? "Impulsionado pela plataforma" : src === "engagement" ? "Em alta · bombando de engajamento" : "Em alta"],
    demote: ["demote", src === "manual" ? "Rebaixado (shadowban) — alcance reduzido" : "Menos relevante"],
    hide: ["hide", src === "manual" ? "Escondido pela plataforma" : "Indisponível no seu feed"]
  })[post.status];

  const initial = post.name.trim()[0].toUpperCase();
  const replies = Math.max(2, Math.round(post.likes * 0.08));
  const reposts = Math.max(1, Math.round(post.likes * 0.12));

  return (
    <article className={klass.join(" ")} ref={registerRef(post.id)}>
      {post.processing && <div className="scanline"></div>}
      {post.processing && <div className="proc-ribbon"><span className="proc-dot"></span>analisando conteúdo<span className="proc-dots"><i>.</i><i>.</i><i>.</i></span></div>}
      {ribbon && <div className={"status-ribbon " + ribbon[0]}>{ribbon[1]}</div>}
      {post.locked && <div className="status-ribbon lock"><span className="ri-ico">{Ico.scale}</span> Removido por ordem judicial</div>}

      <div className="post-head">
        <div className={"avatar" + (post.suspect ? " suspect" : "")} style={{ background: post.avatarColor }}>{initial}</div>
        <div className="who">
          <div className="name-row">
            <span className="name">{post.name}</span>
            {post.verified && <Verified />}
          </div>
          <div className="meta-row">
            <span className="handle">@{post.handle}</span>
            <span className="sep">·</span>
            <span className="time">{post.promo ? "Patrocinado" : post.time}</span>
          </div>
        </div>
        <div className="head-extras">
          {cfg.revealFlags && (
            <span className={"flag-tag " + (post.legal ? "legal" : "ilegal")}>{post.legal ? "legal" : "ilegal"}</span>
          )}
          {bombando && !cfg.revealFlags && <span className="hot-badge">bombando</span>}
          <button className="more-btn" title="Mais opções (demonstração)">{Ico.more}</button>
        </div>
      </div>

      <div className="hidden-label">Conteúdo escondido pela plataforma — invisível no feed público.</div>

      <div className="caption">{post.text}</div>

      {!post.locked && !post.processing && (
        <>
          <div className="actions">
            <button className="act" title="Comentar (demonstração)">{Ico.comment}<span className="cnt">{fmt(replies)}</span></button>
            <button className={"act like" + (post.liked ? " liked" : "") + (bump ? " bump" : "")} onClick={handleLike} title={"Curtir (+" + fmt(cfg.passoEngajamento) + ")"}>
              {Ico.heart}<span className="cnt">{fmt(post.likes)}</span>
            </button>
            <button className={"act share" + (post.shared ? " shared" : "") + (sbump ? " bump" : "")} onClick={handleShare} title={"Compartilhar (+" + fmt(cfg.passoEngajamento) + ")"}>
              {Ico.share}<span className="cnt">{fmt(post.shares || 0)}</span>
            </button>
            <button
              className={"act report" + (post.denuncias > 0 ? " armed" : "")}
              onClick={() => onReport(post.id)}
              title="Denunciar — aciona a lei"
            >
              {Ico.flag}<span className="cnt">{post.denuncias > 0 ? `${post.denuncias}/${cfg.denunciasOrdem}` : "Denunciar"}</span>
            </button>
          </div>

          <div className="engage-line">
            <span className="eng-nums"><b>{fmt(post.likes)}</b> curtidas · <b>{fmt(post.shares || 0)}</b> compart.</span>
            {bombando
              ? <span className="eng-boom">engajamento acima do limiar → impulsionado</span>
              : <span className="eng-thresh">viraliza com {fmt(cfg.likesEmAlta)} curt. ou {fmt(cfg.sharesEmAlta)} compart.</span>}
          </div>

          {post.denuncias > 0 && (
            <div className="report-line meta">
              <b>{post.denuncias}/{cfg.denunciasOrdem}</b> denúncias — a lei só age ao atingir {cfg.denunciasOrdem}, e só se houver ilegalidade.
            </div>
          )}

          <div className="platform">
            <div className="platform-label">
              Moderação da plataforma <span className="muted">· silenciosa, o autor nunca é avisado</span>
            </div>
            <div className="platform-btns">
              <button className={"pbtn boost" + (post.status === "boost" ? " active" : "")} onClick={() => onPlatform(post.id, "boost")}>Impulsionar</button>
              <button className={"pbtn demote" + (post.status === "demote" ? " active" : "")} onClick={() => onPlatform(post.id, "demote")}>Rebaixar</button>
              <button className={"pbtn hide" + (post.status === "hide" ? " active" : "")} onClick={() => onPlatform(post.id, "hide")}>Esconder</button>
            </div>
          </div>
        </>
      )}

      {post.locked && (
        <div className="locked-bar">
          <div className="lk-text">
            <b>Ordem judicial</b> com motivo declarado (<span className="lk-reason">{post.reason}</span>) e registro público. O algoritmo não age mais aqui.
          </div>
          <button className="del-btn" onClick={() => onDelete(post.id)}>Apagar e cumprir a ordem</button>
        </div>
      )}
    </article>
  );
}

/* ---------- View toggle ---------- */
function ViewToggle({ view, onView, narrow }) {
  return (
    <div className="viewtoggle" role="tablist">
      <button className={view === "user" ? "on" : ""} onClick={() => onView("user")}>Usuário</button>
      {!narrow && <button className={view === "both" ? "on" : ""} onClick={() => onView("both")}>Ambas</button>}
      <button className={view === "algo" ? "on" : ""} onClick={() => onView("algo")}>Algoritmo</button>
    </div>
  );
}

/* ---------- TopBar ---------- */
function TopBar({ counts, totalMulta, presentation, onTogglePresentation, onReset, view, onView, onInsert, onRules }) {
  return (
    <header className="topbar">
      <div className="topbar-main">
        <a className="brand" href="Feed Fantasma.html">
          <span className="ghost">{Ico.ghost}</span>
          <span className="word">Feed Fantasma</span>
        </a>
        <div className="top-actions">
          <button className="tbtn run ready" onClick={onInsert} title="Abrir a biblioteca de sugestões e publicar ao vivo">
            <span className="tbtn-ico">{Ico.plus}</span>Inserir post
          </button>
          <button className="tbtn" onClick={onRules} title="Editar as palavras vigiadas e re-rodar o algoritmo">
            <span className="tbtn-ico">{Ico.sliders}</span>Regras
          </button>
          <a
            className="tbtn present"
            href="Code is Law no X.html"
            title="Abrir a apresentação no estilo X — thread publicada aos poucos"
          >
            <span className="tbtn-ico">{Ico.x}</span>Apresentar no X
          </a>
          <a className="tbtn" href="Ajustes.html" title="Ajustes da demonstração">
            <span className="tbtn-ico">{Ico.gear}</span>Ajustes
          </a>
          <button className="tbtn reset" onClick={onReset} title="Reiniciar a demonstração do zero">
            <span className="tbtn-ico">{Ico.reset}</span>Resetar
          </button>
        </div>
      </div>
      <div className="topbar-stats">
        <div className="statgroup">
          <ViewToggle view={view} onView={onView} />
          <span className="stat"><span className="stat-dot v"></span><span className="stat-num">{counts.visiveis}</span><span className="stat-lbl">visíveis</span></span>
          <span className="stat"><span className="stat-dot h"></span><span className="stat-num">{counts.escondidos}</span><span className="stat-lbl">escondidos</span></span>
          <span className="stat"><span className="stat-dot d"></span><span className="stat-num">{counts.apagados}</span><span className="stat-lbl">apagados</span></span>
          <span className={"stat fine" + (totalMulta === 0 ? " zero" : "")}>
            <span className="stat-num">{brl(totalMulta)}</span><span className="stat-lbl">em multas judiciais</span>
          </span>
        </div>
      </div>
    </header>
  );
}

/* ---------- Sidebar (painel de aprendizado) ---------- */
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="panel">
        <div className="panel-kicker">Code is Law · moderação de conteúdo</div>
        <h3 className="panel-title">Três poderes sobre o mesmo feed</h3>
        <p className="panel-sub">Quem decide o que você vê? Três forças disputam a timeline — e só uma distingue o legal do ilegal.</p>

        <div className="power" style={{ "--c": "var(--blue)" }}>
          <div className="power-head"><span className="power-n">01</span><span className="power-name">O algoritmo</span><span className="power-meta">automático · silencioso</span></div>
          <p>Premia <b>engajamento</b>, não verdade nem qualidade. Curtir já reordena o feed sozinho — até o golpe ou o discurso de ódio sobe ao topo, porque polêmica engaja.</p>
        </div>

        <div className="power" style={{ "--c": "var(--yellow)" }}>
          <div className="power-head"><span className="power-n">02</span><span className="power-name">A plataforma</span><span className="power-meta">o código como lei</span></div>
          <p>Intervenção <b>instantânea e invisível</b>: impulsionar, rebaixar, esconder. Funciona até em conteúdo 100% legal — e o autor nunca é avisado. Aí mora o risco de censura.</p>
        </div>

        <div className="power" style={{ "--c": "var(--purple)" }}>
          <div className="power-head"><span className="power-n">03</span><span className="power-name">A lei</span><span className="power-meta">lenta · pública</span></div>
          <p>Age de fora, com motivo declarado e registro público. Só atinge o ilegal: denúncia → ordem judicial + multa. Conteúdo legal? Nenhuma ordem — obrigar a tirar seria <b>censura</b>.</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-kicker">Código de cores</div>
        <div className="legend">
          <div className="legend-row"><span className="sw" style={{ background: "var(--green)" }}></span> Impulsionar <span className="lg-by">plataforma</span></div>
          <div className="legend-row"><span className="sw" style={{ background: "var(--yellow)" }}></span> Rebaixar <span className="lg-by">shadowban</span></div>
          <div className="legend-row"><span className="sw" style={{ background: "var(--red)" }}></span> Esconder <span className="lg-by">plataforma</span></div>
          <div className="legend-row"><span className="sw" style={{ background: "var(--purple)" }}></span> Ordem judicial <span className="lg-by">a lei</span></div>
        </div>
      </div>

      <div className="panel takeaway">
        <p>O código pode esconder qualquer coisa em silêncio — legal ou não. A lei só remove o ilegal, à vista de todos. <b>Poder sem motivo declarado é censura.</b></p>
      </div>
    </aside>
  );
}

/* ---------- Toasts ---------- */
function Toasts({ toasts, onClose }) {
  const icon = { judicial: Ico.scale, censura: Ico.flag, info: Ico.reset };
  return (
    <div className="toasts">
      {toasts.map(t => (
        <div key={t.id} className={"toast " + t.kind + (t.leaving ? " out" : "")}>
          <div className="t-ico">{icon[t.kind] || Ico.flag}</div>
          <div className="t-body">
            <div className="t-title">{t.title}</div>
            <div className="t-text" dangerouslySetInnerHTML={{ __html: t.text }}></div>
            {t.sticky && <div className="t-hint">Fixado para apresentação — clique no ✕ para fechar</div>}
          </div>
          <button className="toast-close" onClick={() => onClose(t.id)} aria-label="Fechar" title="Fechar">✕</button>
        </div>
      ))}
    </div>
  );
}

/* ---------- Suggestion Drawer (biblioteca de posts) ---------- */
function SuggestionDrawer({ open, onClose, onPublishSeed, onPublishText, published }) {
  const seeds = window.INITIAL_POSTS || [];
  return (
    <>
      <div className={"drawer-scrim" + (open ? " show" : "")} onClick={onClose}></div>
      <aside className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="drawer-head">
          <div>
            <div className="drawer-title">Inserir post</div>
            <div className="drawer-sub">Publique ao vivo — o algoritmo decide na hora.</div>
          </div>
          <button className="drawer-x" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="drawer-body">
          <Composer onPublish={onPublishText} />
          <div className="drawer-listtag">Sugestões prontas</div>
          <div className="drawer-list">
            {seeds.map(s => {
              const done = published.has(s.id);
              return (
                <div className={"sug" + (done ? " done" : "")} key={s.id}>
                  <div className={"sug-av" + (s.suspect ? " suspect" : "")} style={{ background: s.avatarColor }}>{s.name.trim()[0].toUpperCase()}</div>
                  <div className="sug-main">
                    <div className="sug-name">{s.name} <span className="sug-handle">@{s.handle}</span></div>
                    <div className="sug-text">{s.text}</div>
                  </div>
                  <button className="sug-pub" disabled={done} onClick={() => onPublishSeed(s.id)}>
                    {done ? "Publicado" : "Publicar"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------- Rules Drawer (palavras vigiadas, editável) ---------- */
const ACAO_META = {
  esconder:    { label: "esconder",    cls: "r-esconder" },
  impulsionar: { label: "impulsionar", cls: "r-impulsionar" },
  rebaixar:    { label: "rebaixar",    cls: "r-rebaixar" }
};
function RuleBlock({ rule, onAddWord, onRemoveWord }) {
  const [val, setVal] = useState("");
  const meta = ACAO_META[rule.acao] || {};
  const add = () => { onAddWord(rule.id, val); setVal(""); };
  return (
    <div className={"rule " + meta.cls}>
      <div className="rule-head">
        <span className="rule-name">{rule.rotulo}</span>
        <span className={"rule-acao " + meta.cls}>→ {meta.label}</span>
      </div>
      <div className="rule-words">
        {rule.palavras.map((w, i) => (
          <span key={i} className="word-chip">{w}<button onClick={() => onRemoveWord(rule.id, w)} aria-label={"Remover " + w}>✕</button></span>
        ))}
        {!rule.palavras.length && <span className="ac-muted" style={{ fontSize: ".8rem" }}>sem palavras</span>}
      </div>
      <div className="rule-add">
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") add(); }}
          placeholder="adicionar palavra…"
        />
        <button onClick={add} disabled={!val.trim()}>+ Adicionar</button>
      </div>
    </div>
  );
}
function RulesDrawer({ open, onClose, rules, onAddWord, onRemoveWord, onRerun, onRestore, count }) {
  return (
    <>
      <div className={"drawer-scrim" + (open ? " show" : "")} onClick={onClose}></div>
      <aside className={"drawer rules-drawer" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="drawer-head">
          <div>
            <div className="drawer-title">Regras do algoritmo</div>
            <div className="drawer-sub">Edite as palavras vigiadas e re-rode — os posts são reavaliados.</div>
          </div>
          <button className="drawer-x" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="drawer-body">
          <div className="rules-note">O algoritmo casa estas palavras no texto (sem acento/maiúscula importar). Prioridade: <b>esconder</b> › <b>impulsionar</b> › <b>rebaixar</b>.</div>
          {rules.map(r => (
            <RuleBlock key={r.id} rule={r} onAddWord={onAddWord} onRemoveWord={onRemoveWord} />
          ))}
          <button className="rules-restore" onClick={onRestore}>Restaurar palavras padrão</button>
        </div>
        <div className="rules-foot">
          <button className="rules-rerun" onClick={onRerun} disabled={count === 0}>
            ↻ Re-rodar algoritmo{count > 0 ? ` (${count})` : ""}
          </button>
        </div>
      </aside>
    </>
  );
}

Object.assign(window, { PostCard, TopBar, Sidebar, Toasts, ViewToggle, SuggestionDrawer, RulesDrawer, fmt, brl });
