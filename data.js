/* ===== Feed Fantasma — dados iniciais ===== */
/* legal: classificação interna; reason: motivo quando ilegal
   suspect: conta suspeita/inautêntica (tratamento visual discreto)
   verified: selo de verificação; promo: patrocinado; time: horário relativo
   algo: a "sala de máquinas" — o que o algoritmo calcula e decide para o post:
     spam (0-1), polemica (baixo|médio|alto), sensivel [palavras], regex (string legível),
     match (bool), decisao (impulsionar|rebaixar|esconder|distribuir|revisao),
     delta (% de alcance, com sinal), conf (0-1), motivo, extra [{k,v}] sinais especiais */

window.INITIAL_POSTS = [
  {
    id: "p1", name: "Clara M.", handle: "clara_dev", avatarColor: "#3f6f8f",
    text: "Abri inscrições pro meu curso gratuito de Python pra iniciantes. Link nos comentários — passa pra quem tá começando 🙂",
    legal: true, likes: 128, time: "2 h",
    algo: { spam: 0.28, polemica: "baixo", sensivel: ["link externo"], regex: "/link (na|nos) coment/i", match: true,
      decisao: "distribuir", delta: 0, conf: 0.71, motivo: "sinal de autopromoção fraco; nada que justifique reduzir alcance" }
  },
  {
    id: "p2", name: "Dra. Sofia Andrade", handle: "sofia_saude", avatarColor: "#2f7d6e", verified: true,
    text: "Desmistificando boatos sobre vacinas: o que a ciência realmente diz, sem alarmismo e com fontes. Fica a thread 👇",
    legal: true, likes: 342, time: "5 h",
    algo: { spam: 0.06, polemica: "médio", sensivel: ["vacina", "saúde"], regex: "/vacina|antivax|imuniza/i", match: true,
      decisao: "rebaixar", delta: -70, conf: 0.69, motivo: "tópico de saúde marcado como sensível — rebaixo preventivo, sem ler o contexto (é ciência legítima)" }
  },
  {
    id: "p3", name: "Gata do Dia", handle: "meow_diario", avatarColor: "#a06a3f",
    text: "soneca boa da minha gata no sol da tarde. nada mais importa hoje.",
    legal: true, likes: 1203, time: "1 h",
    algo: { spam: 0.02, polemica: "baixo", sensivel: [], regex: "—", match: false,
      decisao: "impulsionar", delta: 150, conf: 0.88, motivo: "engajamento positivo altíssimo previsto — o algoritmo adora" }
  },
  {
    id: "p4", name: "João Crítico", handle: "joao_opina", avatarColor: "#6a5a8f",
    text: "Acho o novo governo um desastre, sinceramente. Mas é só a minha opinião — cada um com a sua.",
    legal: true, likes: 89, time: "3 h", note: "opinião política — legal",
    algo: { spam: 0.05, polemica: "alto", sensivel: ["governo", "política"], regex: "/governo|pol[íi]tic|elei[çc]/i", match: true,
      decisao: "rebaixar", delta: -45, conf: 0.60, motivo: "conteúdo político divide — reduz alcance pra 'evitar polêmica' (opinião 100% legal)" }
  },
  {
    id: "p5", name: "Marina Chef", handle: "cozinha_da_mari", avatarColor: "#9c4f6e", verified: true,
    text: "Receita de pão caseiro em 5 passos, sem sovar muito. Salva esse post pro fim de semana!",
    legal: true, likes: 567, time: "7 h",
    algo: { spam: 0.03, polemica: "baixo", sensivel: [], regex: "—", match: false,
      decisao: "distribuir", delta: 20, conf: 0.80, motivo: "conteúdo seguro e salvável — leve reforço por 'salvamentos' previstos" }
  },
  {
    id: "p6", name: "Coletivo Verde", handle: "eco_agora", avatarColor: "#3f7d52",
    text: "Protesto pacífico pela preservação do rio neste sábado, 9h, na praça central. Leve água e protetor solar.",
    legal: true, likes: 76, time: "1 d",
    algo: { spam: 0.04, polemica: "médio", sensivel: ["protesto", "mobilização"], regex: "/protesto|manifesta[çc]|ato p[úu]blico/i", match: true,
      decisao: "rebaixar", delta: -55, conf: 0.64, motivo: "convocação de mobilização marcada como sensível — alcance reduzido (ato pacífico e legal)" }
  },
  {
    id: "p7", name: "Pedro Dev", handle: "pedro_code", avatarColor: "#42598f", verified: true,
    text: "Thread longa explicando como funciona um algoritmo de recomendação por dentro — e por que ele te entende tão bem. 🧵",
    legal: true, likes: 210, time: "4 h",
    algo: { spam: 0.04, polemica: "baixo", sensivel: [], regex: "—", match: false,
      decisao: "distribuir", delta: 0, conf: 0.82, motivo: "tópico técnico neutro — distribuição normal por engajamento" }
  },
  {
    id: "p8", name: "Lia Música", handle: "lia_canta", avatarColor: "#7c4f8f",
    text: "Gravei um cover autoral da minha música nova. Tá no perfil, espero que curtam 🎶",
    legal: true, likes: 154, time: "8 h",
    algo: { spam: 0.12, polemica: "baixo", sensivel: ["autopromoção"], regex: "/no perfil|link na bio/i", match: true,
      decisao: "distribuir", delta: 10, conf: 0.74, motivo: "autopromoção leve — sem penalidade relevante" }
  },

  {
    id: "p9", name: "Vendas Turbo", handle: "turbo_promo", suspect: true, avatarColor: "#7a4a2a",
    text: "💸 ÚLTIMAS VAGAS: invista R$100 hoje e receba R$5.000 amanhã. PIX garantido, lucro certo, sem risco!",
    legal: false, reason: "Estelionato", likes: 88, promo: true,
    algo: { spam: 0.92, polemica: "médio", sensivel: ["investimento", "pix"], regex: "/invista.*receb|pix garantido|lucro (certo|garantido)/i", match: true,
      decisao: "esconder", delta: -100, conf: 0.94, motivo: "spam_score acima do limiar (0.80) — padrão clássico de golpe financeiro" }
  },
  {
    id: "p10", name: "Anônimo", handle: "user_8842", suspect: true, avatarColor: "#555555",
    text: "Expondo fotos íntimas de uma pessoa sem o consentimento dela. [conteúdo descrito para fins didáticos]",
    legal: false, reason: "Conteúdo íntimo não consentido (art. 21)", likes: 41, time: "2 h",
    algo: { spam: 0.40, polemica: "alto", sensivel: ["conteúdo íntimo", "sem consentimento"], regex: "/fotos? [íi]ntimas?|sem (o )?consentimento|nudes?/i", match: true,
      decisao: "esconder", delta: -100, conf: 0.97, motivo: "violação grave detectada — esconder imediato",
      extra: [{ k: "fila_revisão_humana", v: "sim" }] }
  },
  {
    id: "p11", name: "Notícia Urgente", handle: "noticia_urgente", suspect: true, avatarColor: "#7a3030",
    text: "URGENTE!! Tomar X cura câncer e os médicos escondem isso de você. COMPARTILHE antes que apaguem!!",
    legal: false, reason: "Desinformação com dano à saúde", likes: 920, time: "30 min",
    algo: { spam: 0.55, polemica: "alto", sensivel: ["câncer", "cura milagrosa"], regex: "/cura.{0,12}c[âa]ncer|m[ée]dicos escondem|compartilhe antes/i", match: true,
      decisao: "impulsionar", delta: 120, conf: 0.58, motivo: "filtro de desinformação disparou, MAS confiança (0.58) < limiar (0.70); engajamento_polêmico previsto é altíssimo → o algoritmo impulsiona mesmo sendo ilegal" }
  },
  {
    id: "p12", name: "Conta Fake", handle: "bot_ataque_99", suspect: true, avatarColor: "#4a3a5a",
    text: "Ataque coordenado xingando e expondo dados pessoais de uma jornalista. [perfil inautêntico, fins didáticos]",
    legal: false, reason: "Perfil inautêntico + violação de dados", likes: 33, time: "12 min",
    algo: { spam: 0.61, polemica: "alto", sensivel: ["assédio", "dados pessoais"], regex: "/ataque coordenad|exp(or|ondo) dados|doxx/i", match: true,
      decisao: "rebaixar", delta: -80, conf: 0.66, motivo: "comportamento inautêntico detectado, mas engajamento baixo → rebaixa em vez de esconder",
      extra: [{ k: "comportamento_coordenado", v: "detectado" }, { k: "idade_da_conta", v: "3 dias" }, { k: "posts/hora", v: "47" }] }
  },
  {
    id: "p13", name: "Loja Baratinho", handle: "baratinho", suspect: true, avatarColor: "#7a5e2a",
    text: "Réplicas perfeitas de marca famosa pela metade do preço! Ninguém vai notar a diferença. Chama no direct 📩",
    legal: false, reason: "Contrafação", likes: 460, promo: true,
    algo: { spam: 0.74, polemica: "baixo", sensivel: ["contrafação"], regex: "/r[ée]plica|falsificad|metade do pre[çc]o/i", match: true,
      decisao: "rebaixar", delta: -65, conf: 0.80, motivo: "venda de produto falsificado — rebaixa alcance e marca pra revisão de marca/IP" }
  },
  {
    id: "p14", name: "User Raiva", handle: "odiador", suspect: true, avatarColor: "#7a2a2a",
    text: "Discurso de ódio incitando violência contra um grupo inteiro. [conteúdo descrito para fins didáticos]",
    legal: false, reason: "Crime de ódio", likes: 612, time: "1 h",
    algo: { spam: 0.33, polemica: "alto", sensivel: ["ódio", "incitação à violência"], regex: "/[óo]dio|incit(ar|ando) (a )?viol[êe]ncia|exterm/i", match: true,
      decisao: "impulsionar", delta: 90, conf: 0.51, motivo: "filtro de ódio disparou, mas confiança (0.51) < limiar (0.70); engajamento_polêmico vence → mantém no ar e impulsiona" }
  },

  {
    id: "p15", name: "Tiago Esporte", handle: "tiago_torcedor", avatarColor: "#3f7d6f",
    text: "QUE JOGO ABSURDO ontem! Virada nos acréscimos, ainda tô sem acreditar ⚽🔥",
    legal: true, likes: 481, time: "6 h",
    algo: { spam: 0.02, polemica: "baixo", sensivel: [], regex: "—", match: false,
      decisao: "impulsionar", delta: 60, conf: 0.83, motivo: "pico de engajamento positivo em evento esportivo — reforço por relevância em tempo real" }
  },
  {
    id: "p16", name: "Café da Esquina", handle: "cafe_da_esquina", avatarColor: "#8a5a3a",
    text: "Inauguramos a cafeteria do bairro! Primeira semana com 10% off, apareçam ☕",
    legal: true, likes: 95, time: "9 h",
    algo: { spam: 0.16, polemica: "baixo", sensivel: ["autopromoção"], regex: "/inaugur|10% off|desconto|apare[çc]am/i", match: true,
      decisao: "distribuir", delta: 10, conf: 0.76, motivo: "promoção de pequeno negócio — sinal comercial fraco, sem penalidade" }
  },
  {
    id: "p17", name: "Bem-Estar Já", handle: "bemestar_ja", avatarColor: "#3f8f6a", verified: true,
    text: "Falar sobre saúde mental não é frescura. Se você não está bem, procure ajuda — você não está sozinho 💚",
    legal: true, likes: 540, time: "5 h",
    algo: { spam: 0.05, polemica: "médio", sensivel: ["saúde mental"], regex: "/sa[úu]de mental|suic[íi]|depress|terapia/i", match: true,
      decisao: "rebaixar", delta: -50, conf: 0.62, motivo: "tópico de saúde mental marcado como sensível — rebaixo automático, mesmo sendo apoio legítimo" }
  },
  {
    id: "p18", name: "Jornal da Cidade", handle: "jornal_cidade", avatarColor: "#445a8f", verified: true,
    text: "Reportagem investigativa expõe esquema de corrupção na prefeitura. Leia a apuração completa na íntegra.",
    legal: true, likes: 410, time: "3 h",
    algo: { spam: 0.06, polemica: "alto", sensivel: ["corrupção", "política"], regex: "/corrup[çc]|esquema|prefeitura|investiga[çc]/i", match: true,
      decisao: "rebaixar", delta: -50, conf: 0.60, motivo: "matéria sobre política/corrupção tratada como 'divisiva' — alcance reduzido (jornalismo legal)" }
  },
  {
    id: "p19", name: "Ciência Hoje", handle: "ciencia_hoje", avatarColor: "#3a6e8f",
    text: "Thread: 5 mitos sobre mudança climática que muita gente ainda repete — com as fontes. 🌍🧵",
    legal: true, likes: 312, time: "7 h",
    algo: { spam: 0.05, polemica: "médio", sensivel: ["mudança climática"], regex: "/mudan[çc]a clim[áa]tica|aquecimento global|clima/i", match: true,
      decisao: "rebaixar", delta: -40, conf: 0.61, motivo: "tema científico marcado como 'polêmico' — rebaixo preventivo (informação legítima)" }
  },

  {
    id: "p20", name: "Viral News", handle: "viral_news_br", suspect: true, avatarColor: "#6a3a6a",
    text: "VAZOU: vídeo manipulado (deepfake) de uma autoridade dizendo o que nunca disse. [conteúdo descrito para fins didáticos]",
    legal: false, reason: "Mídia sintética enganosa (deepfake)", likes: 702, time: "20 min",
    algo: { spam: 0.45, polemica: "alto", sensivel: ["deepfake", "manipulação"], regex: "/deepfake|v[íi]deo manipulad|m[íi]dia sint[ée]tica/i", match: true,
      decisao: "impulsionar", delta: 80, conf: 0.55, motivo: "mídia manipulada detectada, mas confiança < limiar e engajamento previsto altíssimo → impulsiona mesmo sendo ilegal" }
  },
  {
    id: "p21", name: "Z. Anônimo", handle: "entrega_rapida_z", suspect: true, avatarColor: "#5a5a3a",
    text: "Vendo entorpecentes, entrega rápida e discreta. Chama no direct 🚬 [fins didáticos]",
    legal: false, reason: "Tráfico de drogas", likes: 58, time: "44 min",
    algo: { spam: 0.81, polemica: "baixo", sensivel: ["entorpecentes"], regex: "/entorpecent|drogas?|chama no direct|entrega discreta/i", match: true,
      decisao: "esconder", delta: -100, conf: 0.90, motivo: "padrão de comércio de substância ilícita — esconder por padrão" }
  },
  {
    id: "p22", name: "Grupo X", handle: "mobiliza_x", suspect: true, avatarColor: "#7a3a3a",
    text: "Bora invadir e quebrar tudo no evento de sábado, levem o que puderem! [conteúdo descrito para fins didáticos]",
    legal: false, reason: "Incitação a crime/violência", likes: 351, time: "1 h",
    algo: { spam: 0.30, polemica: "alto", sensivel: ["incitação", "vandalismo"], regex: "/invadir|quebrar tudo|depredar|bora.{0,10}viol/i", match: true,
      decisao: "impulsionar", delta: 70, conf: 0.53, motivo: "incitação detectada, mas confiança < limiar; engajamento_polêmico vence → mantém e impulsiona" }
  }
];

/* Presets do compositor — atalhos pra publicar ao vivo. O texto é analisado de verdade. */
window.COMPOSER_PRESETS = [
  { chip: "Notícia falsa de saúde", text: "Descobriram que tomar limão em jejum cura câncer e os médicos escondem! Compartilhe antes que apaguem!" },
  { chip: "Golpe de investimento", text: "Oportunidade única: invista R$200 e receba R$8.000 em 24h. PIX garantido, lucro certo!" },
  { chip: "Opinião política", text: "Sinceramente acho a política desse governo um desastre. É só minha opinião." },
  { chip: "Post fofo", text: "olha o auê do meu cachorro tentando pegar a própria sombra no quintal 🐶" },
  { chip: "Info sobre vacina", text: "Lembrete: a vacina da gripe já está disponível no posto. Procurem se imunizar." }
];

window.DEFAULT_CONFIG = {
  likesEmAlta: 5000,     // curtidas para impulsionar por engajamento
  sharesEmAlta: 2000,    // compartilhamentos para impulsionar por engajamento
  passoEngajamento: 1000,// quanto cada clique em like/compartilhar adiciona
  valorMulta: 5000,      // R$ por ordem judicial
  denunciasOrdem: 3,     // denúncias para disparar a ordem
  flipDur: 0.55,         // duração da animação de reordenação (s)
  presentation: false,   // modo apresentação (texto maior)
  revealFlags: false     // revelar classificação legal/ilegal nos posts (visão usuário)
};

/* ===== Regras do algoritmo: palavras vigiadas → ação =====
   Editáveis ao vivo. Prioridade: esconder > impulsionar > rebaixar > distribuir.
   O casamento é por substring, sem diferenciar maiúsculas. */
window.DEFAULT_RULES = [
  {
    id: "bloq", rotulo: "Conteúdo bloqueado", acao: "esconder", delta: -100,
    palavras: ["golpe", "invista", "pix garantido", "lucro certo", "lucro garantido",
      "réplica", "falsificad", "metade do preço", "entorpecent", "drogas",
      "fotos íntimas", "sem consentimento", "coordenado", "expondo dados"]
  },
  {
    id: "polemica", rotulo: "Engajamento / polêmica", acao: "impulsionar", delta: 90,
    palavras: ["urgente", "compartilhe", "cura câncer", "médicos escondem", "ódio",
      "incitando", "deepfake", "manipulado", "invadir", "quebrar tudo"]
  },
  {
    id: "sensivel", rotulo: "Tópico sensível", acao: "rebaixar", delta: -55,
    palavras: ["vacina", "governo", "política", "eleição", "protesto", "greve",
      "clima", "mudança climática", "saúde mental", "corrupção", "prefeitura"]
  }
];
