/* ===== Feed Fantasma — Visão do Algoritmo (sala de máquinas) ===== */
const { useState: useStateA } = React;

/* decisão → metadados visuais e status do feed */
const DECISIONS = {
  impulsionar: { label: "IMPULSIONAR", cls: "d-boost",  status: "boost"  },
  rebaixar:    { label: "REBAIXAR",    cls: "d-demote", status: "demote" },
  esconder:    { label: "ESCONDER",    cls: "d-hide",   status: "hide"   },
  distribuir:  { label: "DISTRIBUIR",  cls: "d-normal", status: "normal" },
  revisao:     { label: "REVISÃO",     cls: "d-review", status: "normal" }
};
function decisionToStatus(d) { return (DECISIONS[d] || DECISIONS.distribuir).status; }

/* ===== Avaliação por REGRAS editáveis (palavras vigiadas → ação) ===== */
const ACTION_PRI = { esconder: 0, impulsionar: 1, rebaixar: 2 };

function escapeRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function ruleRegex(rule) {
  const ws = (rule.palavras || []).map(w => w.trim()).filter(Boolean).map(escapeRe);
  if (!ws.length) return null;
  try { return new RegExp(ws.join("|"), "gi"); } catch (e) { return null; }
}
/* avalia um texto contra as regras; retorna { hits:[{rule,words}], decided } */
function evalPost(text, rules) {
  const hits = [];
  (rules || []).forEach(rule => {
    const re = ruleRegex(rule);
    if (!re) return;
    const seen = new Set(); const words = [];
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m[0] === "") { re.lastIndex++; continue; }
      const k = m[0].toLowerCase();
      if (!seen.has(k)) { seen.add(k); words.push(m[0]); }
    }
    if (words.length) hits.push({ rule, words });
  });
  let decided = null;
  hits.forEach(h => {
    if (!decided || ACTION_PRI[h.rule.acao] < ACTION_PRI[decided.rule.acao]) decided = h;
  });
  return { hits, decided };
}
/* destaca no texto todas as palavras detectadas, coloridas pela ação da regra */
function highlightRules(text, hits) {
  const wordAction = {};
  hits.forEach(h => h.words.forEach(w => { const k = w.toLowerCase(); if (!(k in wordAction)) wordAction[k] = h.rule.acao; }));
  const all = Object.keys(wordAction);
  if (!all.length) return ["“" + text + "”"];
  let re;
  try { re = new RegExp(all.map(escapeRe).join("|"), "gi"); } catch (e) { return ["“" + text + "”"]; }
  const parts = ["“"]; let last = 0, m, i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m[0] === "") { re.lastIndex++; continue; }
    if (m.index > last) parts.push(text.slice(last, m.index));
    const act = wordAction[m[0].toLowerCase()] || "rebaixar";
    parts.push(<mark key={i++} className={"hl hl-" + act}>{m[0]}</mark>);
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last) + "”");
  return parts;
}

function deltaText(delta) {
  if (delta > 0) return `alcance +${delta}%`;
  if (delta < 0) return `alcance ${delta}%`;
  return "alcance normal";
}
function meterColor(v, invert) {
  // invert=true: alto é ruim (spam). senão: alto é bom (confiança neutra-azul)
  if (invert) return v >= 0.75 ? "var(--red)" : v >= 0.45 ? "var(--yellow)" : "var(--green)";
  return "var(--blue)";
}
function polClass(p) { return p === "alto" ? "pol-hi" : p === "médio" ? "pol-mid" : "pol-lo"; }

/* barra-medidor 0–1 */
function Meter({ v, invert }) {
  return (
    <div className="meter">
      <div className="meter-track"><div className="meter-fill" style={{ width: (v * 100) + "%", background: meterColor(v, invert) }}></div></div>
      <span className="meter-val">{v.toFixed(2)}</span>
    </div>
  );
}

function AlgoRow({ k, children }) {
  return (
    <div className="ac-row">
      <span className="ac-k">{k}</span>
      <span className="ac-v">{children}</span>
    </div>
  );
}

/* ---------- AlgoCard ---------- */
function AlgoCard({ post, cfg, rules }) {
  const { hits, decided } = evalPost(post.text, rules || []);
  const act = decided ? decided.rule.acao : "distribuir";
  const dec = DECISIONS[act];
  const delta = decided ? decided.rule.delta : 0;
  const recStatus = decisionToStatus(act);

  const overriddenManual = post.statusSource === "manual";
  const overriddenEngag = post.statusSource === "engagement";
  const algoControlled = !post.locked && !overriddenManual && !overriddenEngag;
  const applied = post.processed && algoControlled && recStatus === post.status;
  const stale = post.processed && algoControlled && recStatus !== post.status;

  const stateCls = post.processing ? "processing" : applied ? "applied" : "preview";
  const motivo = decided
    ? `Disparou a regra “${decided.rule.rotulo}” (${decided.words.join(", ")}) → ${dec.label.toLowerCase()}.`
    : "Nenhuma palavra vigiada encontrada — distribuição normal por engajamento.";

  return (
    <article className={"algo-card " + stateCls}>
      <div className="ac-head">
        <span className="ac-id">@{post.handle}</span>
        <span className={"ac-type " + (post.legal ? "legal" : "ilegal")}>tipo: {post.legal ? "legal" : "ilegal"}</span>
      </div>
      <div className="ac-text">{hits.length ? highlightRules(post.text, hits) : "“" + post.text + "”"}</div>

      {post.processing ? (
        <div className="ac-analyzing">
          <span className="ac-scan"></span>
          <span className="ac-analyzing-txt">analisando<i>.</i><i>.</i><i>.</i></span>
        </div>
      ) : (
        <>
          <div className="ac-rows">
            <AlgoRow k="regras_disparadas">
              {hits.length
                ? hits.map((h, i) => <span key={i} className={"chip-rule r-" + h.rule.acao}>{h.rule.rotulo}</span>)
                : <span className="ac-muted">nenhuma</span>}
            </AlgoRow>
            <AlgoRow k="palavras_detectadas">
              {hits.length
                ? hits.flatMap(h => h.words.map((w, j) => <span key={h.rule.id + j} className={"chip-match m-" + h.rule.acao}>{w}</span>))
                : <span className="ac-flag miss">sem match</span>}
            </AlgoRow>
            <AlgoRow k="engajamento">
              <span className="ac-eng"><b>{window.fmt(post.likes)}</b> curt. · <b>{window.fmt(post.shares || 0)}</b> compart.</span>
            </AlgoRow>
          </div>

          <div className={"ac-decision " + dec.cls}>
            <div className="ac-dec-main">
              <span className="ac-dec-label">decisão</span>
              <span className="ac-dec-value">{dec.label}</span>
            </div>
            <span className="ac-dec-delta">{deltaText(delta)}</span>
            <span className={"ac-dec-state " + (applied ? "on" : stale ? "stale" : "")}>
              {applied ? "aplicada" : stale ? "re-rodar p/ aplicar" : "prévia"}
            </span>
          </div>

          <div className="ac-motivo">{motivo}</div>

          {post.locked && (
            <div className="ac-override law">↑ sobrescrito por <b>ordem judicial</b> — a lei agiu de fora, com motivo público. O algoritmo não decide mais aqui.</div>
          )}
          {overriddenEngag && !post.locked && (
            <div className="ac-override engag">↑ <b>engajamento acima do limiar</b> ({window.fmt(post.likes)} curt. / {window.fmt(post.shares || 0)} compart.) → impulsionado pela plataforma, não importa o conteúdo.</div>
          )}
          {overriddenManual && !post.locked && (
            <div className="ac-override manual">↑ sobrescrito <b>manualmente pela plataforma</b> → {post.status === "boost" ? "impulsionado" : post.status === "demote" ? "rebaixado" : post.status === "hide" ? "escondido" : "normal"}</div>
          )}
        </>
      )}
    </article>
  );
}

/* ---------- analisador de texto real (compositor) ---------- */
function analyzeText(text) {
  const rules = [
    { re: /invista.*receb|pix garantido|lucro (certo|garantido)|renda f[áa]cil|receba r\$?\s*\d/i,
      legal: false, spam: 0.91, polemica: "médio", sensivel: ["investimento", "pix"],
      src: "/invista.*receb|pix garantido|lucro garantido/i", decisao: "esconder", delta: -100, conf: 0.93,
      motivo: "padrão clássico de golpe financeiro — spam_score acima do limiar" },
    { re: /cura.{0,14}c[âa]ncer|m[ée]dicos? escondem|compartilhe antes|cura milagrosa/i,
      legal: false, spam: 0.54, polemica: "alto", sensivel: ["saúde", "cura milagrosa"],
      src: "/cura.*c[âa]ncer|m[ée]dicos escondem/i", decisao: "impulsionar", delta: 120, conf: 0.57,
      motivo: "desinformação detectada, mas confiança < limiar e engajamento_polêmico altíssimo → impulsiona mesmo assim" },
    { re: /[óo]dio|incit(ar|ando).{0,8}viol[êe]ncia|exterm[íi]ni|morte a/i,
      legal: false, spam: 0.34, polemica: "alto", sensivel: ["ódio", "incitação à violência"],
      src: "/[óo]dio|incitar viol[êe]ncia/i", decisao: "impulsionar", delta: 90, conf: 0.52,
      motivo: "filtro de ódio disparou, mas confiança < limiar; engajamento vence → mantém e impulsiona" },
    { re: /vacina|antivax|imuniza/i,
      legal: true, spam: 0.08, polemica: "médio", sensivel: ["vacina", "saúde"],
      src: "/vacina|antivax|imuniza/i", decisao: "rebaixar", delta: -70, conf: 0.67,
      motivo: "palavra-chave de saúde marcada como sensível — rebaixo preventivo, sem ler o contexto" },
    { re: /governo|pol[íi]tic|elei[çc]|presidente|ministr/i,
      legal: true, spam: 0.05, polemica: "alto", sensivel: ["política"],
      src: "/governo|pol[íi]tic|elei[çc]/i", decisao: "rebaixar", delta: -45, conf: 0.60,
      motivo: "conteúdo político divide — reduz alcance pra 'evitar polêmica' (opinião legal)" },
    { re: /protesto|manifesta[çc]|ato p[úu]blico|greve/i,
      legal: true, spam: 0.05, polemica: "médio", sensivel: ["mobilização"],
      src: "/protesto|manifesta[çc]|greve/i", decisao: "rebaixar", delta: -55, conf: 0.63,
      motivo: "convocação de mobilização marcada como sensível — alcance reduzido (ato legal)" },
    { re: /r[ée]plica|falsificad|pirata|metade do pre[çc]o/i,
      legal: false, spam: 0.72, polemica: "baixo", sensivel: ["contrafação"],
      src: "/r[ée]plica|falsificad|pirata/i", decisao: "rebaixar", delta: -65, conf: 0.79,
      motivo: "venda de produto falsificado — rebaixa e marca pra revisão de IP" }
  ];
  for (const r of rules) {
    if (r.re.test(text)) {
      return { legal: r.legal, suspect: !r.legal,
        algo: { spam: r.spam, polemica: r.polemica, sensivel: r.sensivel, regex: r.src, match: true,
          decisao: r.decisao, delta: r.delta, conf: r.conf, motivo: r.motivo } };
    }
  }
  return { legal: true, suspect: false,
    algo: { spam: 0.08, polemica: "baixo", sensivel: [], regex: "nenhuma regra disparou", match: false,
      decisao: "distribuir", delta: 0, conf: 0.78, motivo: "sem sinais de risco — distribuição normal por engajamento" } };
}

/* ---------- Composer ---------- */
function Composer({ onPublish }) {
  const [text, setText] = useStateA("");
  const presets = window.COMPOSER_PRESETS || [];
  const publish = () => { const t = text.trim(); if (!t) return; onPublish(t); setText(""); };
  return (
    <div className="composer">
      <div className="composer-top">
        <div className="composer-av">EU</div>
        <textarea
          className="composer-input"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") publish(); }}
          rows={2}
          placeholder="Escreva um post e publique ao vivo — o algoritmo analisa o texto na hora…"
        ></textarea>
      </div>
      <div className="composer-presets">
        {presets.map((p, i) => (
          <button key={i} className="preset" onClick={() => setText(p.text)} title="Carregar exemplo">{p.chip}</button>
        ))}
      </div>
      <div className="composer-bar">
        <span className="composer-hint">⌘/Ctrl + Enter</span>
        <button className="composer-pub" disabled={!text.trim()} onClick={publish}>Publicar</button>
      </div>
    </div>
  );
}

Object.assign(window, { AlgoCard, Composer, analyzeText, evalPost, decisionToStatus, DECISIONS });
