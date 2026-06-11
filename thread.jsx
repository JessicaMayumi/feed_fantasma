/* ===== Code is Law no X — renderer + apresentação aos poucos ===== */
const { useState, useEffect, useRef, useCallback } = React;
const RKEY = "codeIsLawX.revealed.v1";

/* ---------- ícones ---------- */
const I = {
  x: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  verified: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>,
  reply: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1.75 12c0-5.39 4.6-9.25 10.25-9.25S22.25 6.61 22.25 12 17.65 21.25 12 21.25c-1.47 0-2.88-.27-4.17-.76L3 21.75l.9-4.62C2.5 15.66 1.75 13.92 1.75 12z" strokeLinejoin="round"/></svg>,
  rt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 3.5 7 1m-2.5 2.5L7 6M4.5 3.5h9a4 4 0 0 1 4 4v2m2 11.5L17 22m2.5-1.5L17 18m2.5 2.5h-9a4 4 0 0 1-4-4v-2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  like: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.6 4.5 14C2 11.5 2 8 4.5 6S10 4.5 12 7c2-2.5 5-3 7.5-1S22 11.5 19.5 14z"/></svg>,
  bm: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12v18l-6-4-6 4z" strokeLinejoin="round"/></svg>,
  send: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>,
  reset: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pdf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M7 3h7l5 5v13H7z" strokeLinejoin="round"/><path d="M14 3v5h5" strokeLinejoin="round"/></svg>,
  info: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>,
  /* section icons */
  siren: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 18v-5a7 7 0 0 1 14 0v5M3 18h18M8 18v3m8-3v3M12 2v2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  share: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>,
  poll: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20V10m6 10V4m6 16v-7" strokeLinecap="round"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z" strokeLinejoin="round"/></svg>,
  brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 3V3zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 3V3z" strokeLinejoin="round"/></svg>,
  gavel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 4l6 6-3 3-6-6zM3 21h10M9 9l-6 6 3 3 6-6" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  scales: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M7 21h10M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zm14 0l-3 6a3 3 0 0 0 6 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  clipboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M9 11h6M9 15h4" strokeLinecap="round"/></svg>
};

/* ---------- parser de texto inline (**bold**, *italic*, @ment, #tag, "aspas") ---------- */
function parseInline(text, keyPrefix) {
  const nodes = [];
  const re = /(\*\*[^*]+\*\*)|(\*[^*]+\*)|(@[A-Za-z0-9_]+)|(#[A-Za-zÀ-ÿ0-9_]+)|("[^"]+")/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const t = m[0];
    if (m[1]) nodes.push(<b key={keyPrefix + i}>{t.slice(2, -2)}</b>);
    else if (m[2]) nodes.push(<i key={keyPrefix + i}>{t.slice(1, -1)}</i>);
    else if (m[3]) nodes.push(<span key={keyPrefix + i} className="mention">{t}</span>);
    else if (m[4]) nodes.push(<span key={keyPrefix + i} className="tag">{t}</span>);
    else nodes.push(<span key={keyPrefix + i} className="q">{t}</span>);
    last = m.index + t.length; i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
function Paragraphs({ text }) {
  return text.map((p, i) => <p key={i}>{parseInline(p, "p" + i + "-")}</p>);
}
function Avatar({ initials, color, cls, avatar }) {
  if (avatar) return <div className={cls + " has-img"} style={{ backgroundImage: `url("${avatar}")` }} aria-label={initials}></div>;
  return <div className={cls} style={{ background: color }}>{initials}</div>;
}

/* ---------- blocos ---------- */
/* helpers de revelação escalonada: só anima quando o slide é o recém-publicado (fresh) */
function rc(base, fresh) { return fresh ? base + " reveal" : base; }
function rs(fresh, delay) { return fresh ? { animationDelay: (delay * 0.13).toFixed(2) + "s" } : undefined; }

function SectionBlock({ b, first, fresh, delay }) {
  return (
    <div className={rc("x-section x-section-anim" + (first ? " first" : ""), fresh)} style={rs(fresh, delay)}>
      {b.by && <div className="x-section-by">{b.by}</div>}
      <div className="x-section-head">
        <div className="x-section-ic">{I[b.icon] || I.share}</div>
        <div>
          <h2>{b.title}</h2>
          <div className="x-section-tags">{b.hashtags.map(h => <span key={h}>#{h}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ cls, icon, n }) {
  return <span className={"tw-stat " + cls}>{icon}{n && <span>{n}</span>}</span>;
}
function TweetBlock({ b, fresh, delay }) {
  const cls = ["tw"];
  if (b.reply) cls.push("reply");
  if (b.viral) cls.push("viral");
  if (b.accent) cls.push("accent-" + b.accent);
  const s = b.stats;
  return (
    <article className={rc(cls.join(" "), fresh)} style={rs(fresh, delay)}>
      <div className="tw-head">
        <Avatar cls="tw-av" initials={b.initials} color={b.color} avatar={b.avatar} />
        <div className="tw-id">
          <div className="tw-name">
            {b.author}
            {b.verified && <span className="tw-verified">{I.verified}</span>}
            {b.emoji && <span className="emoji">{b.emoji}</span>}
          </div>
          <div className="tw-meta">
            <span className="tw-handle">@{b.handle}</span>
            {b.label && <span className="tw-label">{b.label}</span>}
          </div>
        </div>
        {b.threadNum && <span className="tw-thread">{b.threadNum}</span>}
      </div>

      <div className="tw-body"><Paragraphs text={b.text} /></div>

      {b.link && (
        <div className="tw-link">
          <div className="tw-link-ic">{I.pdf}</div>
          <div className="tw-link-body">
            <div className="tw-link-kind">{b.link.kind === "pdf" ? "PDF · Pesquisa" : "Link"}</div>
            <div className="tw-link-title">{b.link.title}</div>
            <div className="tw-link-authors">{b.link.authors}</div>
          </div>
        </div>
      )}

      {b.quote && (
        <div className="tw-quote">
          <div className="tw-quote-head">
            <Avatar cls="tw-quote-av" initials={b.quote.initials} color={b.quote.color} />
            <span className="tw-quote-name">{b.quote.author}{b.quote.verified && <span className="tw-verified" style={{ width: 15, height: 15 }}>{I.verified}</span>}</span>
            <span className="tw-quote-handle">@{b.quote.handle}</span>
            {b.quote.label && <span className="tw-quote-label">{b.quote.label}</span>}
          </div>
          <div className="tw-quote-body">{parseInline(b.quote.text, "q-")}</div>
        </div>
      )}

      {s && (
        <div className="tw-stats">
          <Stat cls="reply" icon={I.reply} n={s.replies} />
          {s.reposts && <Stat cls="rt" icon={I.rt} n={s.reposts} />}
          {s.likes && <Stat cls="like" icon={I.like} n={s.likes} />}
          <Stat cls="bm" icon={I.bm} n={s.bookmarks} />
        </div>
      )}
    </article>
  );
}

function RegulatorsBlock({ fresh, delay }) {
  const R = window.REGULATORS;
  return (
    <div className={rc("reg", fresh)} style={rs(fresh, delay)}>
      <div className="reg-title">Os 4 reguladores de Lessig (1999)</div>
      <div className="reg-grid">
        <div className="reg-center">{R.center}</div>
        {R.forces.map((f, i) => (
          <div key={f.key} className={"reg-cell " + (fresh ? "reg-cell-anim " : "") + f.tone + (f.strong ? " lead" : "")} style={fresh ? { animationDelay: (0.3 + i * 0.13) + "s" } : undefined}>
            <div className="reg-k"><span>{f.icon}</span>{f.key}{f.strong && <span className="reg-badge">mais forte</span>}</div>
            <div className="reg-d">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="reg-cap">A lei pune <b>depois</b> do fato. O código (arquitetura) impede <b>antes</b> — é autoexecutável.</div>
    </div>
  );
}

function FlowchartBlock({ fresh, delay }) {
  const F = window.FLOWCHART;
  return (
    <div className={rc("flow", fresh)} style={rs(fresh, delay)}>
      <div className="flow-root">{F.root}</div>
      <div className="flow-split">
        {F.branches.map((br, i) => (
          <div key={i} className={"flow-branch " + (fresh ? "flow-branch-anim " : "") + br.tone} style={fresh ? { animationDelay: (0.3 + i * 0.18) + "s" } : undefined}>
            <div className="flow-arrow">↓</div>
            <div className="flow-step flow-cond"><span className={"flow-cond " + br.tone}>{br.cond}</span></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-step">{br.path}</div>
            <div className="flow-arrow">↓</div>
            <div className="flow-step flow-result">{br.result}</div>
          </div>
        ))}
      </div>
      <div className="flow-cap">{F.caption}</div>
    </div>
  );
}

function HighlightsBlock({ b, fresh, delay }) {
  return (
    <div className={rc("hl-row", fresh)} style={rs(fresh, delay)}>
      <div className="hl-title">{b.title}</div>
      {b.items.map((it, i) => (
        <div key={i} className={"hl-card " + it.tone}>
          <div className="hl-k">{it.k}</div>
          <div className="hl-v">{it.v}</div>
        </div>
      ))}
    </div>
  );
}

function ReferencesBlock({ b, fresh, delay }) {
  return (
    <article className={rc("refs", fresh)} style={rs(fresh, delay)}>
      <div className="tw-head">
        <Avatar cls="tw-av" initials={b.initials} color={b.color} />
        <div className="tw-id">
          <div className="tw-name">{b.author}{b.verified && <span className="tw-verified">{I.verified}</span>}</div>
          <div className="tw-meta"><span className="tw-handle">@{b.handle}</span>{b.label && <span className="tw-label">{b.label}</span>}</div>
        </div>
      </div>
      <div className="refs-title">{b.title}</div>
      <div className="refs-list">
        {b.items.map((it, i) => <div key={i} className="refs-item">{parseInline(it, "r" + i + "-")}</div>)}
      </div>
      <div className="note">
        <div className="note-tag">{I.info} Nota da Comunidade · Transparência</div>
        <p>{b.note}</p>
      </div>
    </article>
  );
}

/* dispatcher de bloco com revelação escalonada */
function RevealBlock({ b, fresh, delay }) {
  switch (b.type) {
    case "tweet": return <TweetBlock b={b} fresh={fresh} delay={delay} />;
    case "regulators": return <RegulatorsBlock fresh={fresh} delay={delay} />;
    case "flowchart": return <FlowchartBlock fresh={fresh} delay={delay} />;
    case "highlights": return <HighlightsBlock b={b} fresh={fresh} delay={delay} />;
    case "references": return <ReferencesBlock b={b} fresh={fresh} delay={delay} />;
    default: return null;
  }
}

function buildSlides(T) {
  const slides = [];
  let cur = null;
  T.forEach(b => {
    if (b.type === "section") { cur = { section: b, blocks: [] }; slides.push(cur); }
    else { if (!cur) { cur = { section: null, blocks: [] }; slides.push(cur); } cur.blocks.push(b); }
  });
  return slides;
}

/* ---------- App ---------- */
function App() {
  const T = window.THREAD;
  const SLIDES = React.useMemo(() => buildSlides(T), [T]);
  const [s, setS] = useState(() => {
    const v = parseInt(localStorage.getItem(RKEY) || "0", 10);
    return isNaN(v) ? 0 : Math.min(v, SLIDES.length);
  });
  const feedRef = useRef(null);
  const lastSlideRef = useRef(null);

  useEffect(() => { try { localStorage.setItem(RKEY, String(s)); } catch (e) {} }, [s]);

  const scrollToNew = useCallback(() => {
    requestAnimationFrame(() => {
      const el = lastSlideRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top - 96;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, []);

  const publish = useCallback(() => {
    setS(c => Math.min(c + 1, SLIDES.length));
  }, [SLIDES.length]);

  useEffect(() => { if (s > 0) scrollToNew(); }, [s, scrollToNew]);

  const back = useCallback(() => setS(c => Math.max(c - 1, 0)), []);
  const reset = useCallback(() => { setS(0); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  /* teclado */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") { e.preventDefault(); publish(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); back(); }
      else if (e.key === "Home") { e.preventDefault(); reset(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [publish, back, reset]);

  const shownSlides = SLIDES.slice(0, s);
  const curSection = s > 0 ? (SLIDES[s - 1].section) : null;
  const done = s >= SLIDES.length;
  const nextSlide = SLIDES[s];
  const nextSec = nextSlide ? nextSlide.section : null;

  return (
    <>
      <header className="x-top">
        <div className="x-top-inner">
          <span className="x-logo">{I.x}</span>
          <div className="x-hashtags">
            {(curSection ? curSection.hashtags : ["CodeIsLaw"]).map(h => <span key={h} className="x-hashtag">#{h}</span>)}
          </div>
          <span className="x-by">{curSection && curSection.by ? curSection.by : "Thread de @TechLaw_BR"}</span>
          <a className="x-home" href="Feed Fantasma.html" title="Voltar ao Feed Fantasma">← Feed</a>
        </div>
      </header>

      <main className="x-feed" ref={feedRef}>
        {s === 0 && (
          <div className="x-empty">
            <h1>A thread ainda não foi publicada</h1>
            <p>Clique em <b>Publicar</b> para postar cada slide ao vivo — o título e os textos entram juntos, com a turma acompanhando a thread sendo escrita.</p>
          </div>
        )}
        {shownSlides.map((sl, si) => {
          const isLast = si === shownSlides.length - 1;
          let local = 0;
          return (
            <div className="x-slide" key={si} ref={isLast ? lastSlideRef : null}>
              {sl.section && <SectionBlock b={sl.section} first={si === 0} delay={local++} fresh={isLast} />}
              {sl.blocks.map((b, bi) => (
                <RevealBlock key={bi} b={b} delay={local++} fresh={isLast} />
              ))}
            </div>
          );
        })}
      </main>

      <div className="dock">
        <div className="dock-inner">
          {!done && nextSec && (
            <div className="dock-av typing" style={{ background: "#1d9bf0" }}>{I[nextSec.icon] ? <span className="dock-av-ic">{I[nextSec.icon]}</span> : "→"}</div>
          )}
          <div className="dock-mid">
            {done ? (
              <>
                <div className="dock-who">Thread completa 🎉</div>
                <div className="dock-next">{SLIDES.length} slides publicados</div>
              </>
            ) : (
              <>
                <div className="dock-next">Próximo · #{nextSec ? nextSec.hashtags[0] : ""}</div>
                <div className="dock-who">{nextSec ? nextSec.title : "Próximo"}</div>
              </>
            )}
            <div className="dock-bar"><i style={{ width: (s / SLIDES.length * 100) + "%" }}></i></div>
          </div>
          <span className="dock-count">{s}/{SLIDES.length}</span>
          {s > 0 && <button className="dock-reset" onClick={reset} title="Reiniciar a thread (Home)">{I.reset}</button>}
          <button className={"dock-btn" + (done ? " done" : "")} onClick={done ? reset : publish}>
            {done ? <>{I.reset} Recomeçar</> : <>{I.send} Publicar</>}
          </button>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
