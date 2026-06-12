/* ===== Code is Law no X — conteúdo da thread (texto canônico) =====
   Tipos de bloco: section | tweet | regulators | flowchart | highlights | references
   tweet pode conter: label, verified, emoji, reply, threadNum, stats, accent, link, quote
   Texto: **negrito**, @menção, #hashtag, "aspas" — o renderer formata.
   Cada unidade é revelada "aos poucos" pelo botão Publicar. */

window.THREAD = [
  /* ---------- Slide 1 — Capa ---------- */
  { type: "section", hashtags: ["CodeIsLaw", "DireitoDigital"], title: "Code is Law e a Responsabilidade dos Provedores",
    icon: "siren", by: "Thread de @TechLaw_BR" },
  { type: "tweet", author: "TechLaw BR", handle: "TechLaw_BR", label: "Conta Acadêmica Oficial",
    initials: "TL", color: "#1d9bf0", verified: true,
    text: [
      "Acabamos de publicar nossa pesquisa sobre regulação digital:",
      "**Code is Law e a Responsabilidade dos Provedores** — o limite entre a arquitetura da rede, a moderação algorítmica e a censura no Marco Civil da Internet.",
      "Análise profunda sobre como as plataformas moldam o debate público. 📄👇"
    ],
    link: { kind: "pdf", title: "Code is Law e a Responsabilidade dos Provedores.pdf",
      authors: "Beatriz da Silva Gonçalves · Cauê da Silva · Jessica Mayumi Kogake Schuhmacher · Natalie Domingues Corrente · Raphael Goettzinger Neto · Victor Antônio Lima do Nascimento" },
    stats: { reposts: "1,2 mil", likes: "4,5 mil" } },

  /* ---------- Slide 2 — O código que governa sem ser lei ---------- */
  { type: "section", hashtags: ["CodeIsLaw"], title: "O código que governa sem ser lei", icon: "share" },
  { type: "tweet", author: "TechLaw BR", handle: "TechLaw_BR", label: "Conta Acadêmica Oficial",
    initials: "TL", color: "#1d9bf0", verified: true, threadNum: "1/4",
    text: [
      "A internet virou o espaço central para tudo: trabalho, consumo e cidadania. Mas repara bem: quem dita o que você pode ou não fazer lá dentro? Spoiler: não é o Diário Oficial, são as plataformas privadas através de seus termos e códigos. 🧵"
    ] },
  { type: "tweet", author: "TechLaw BR", handle: "TechLaw_BR", initials: "TL", color: "#1d9bf0", verified: true, threadNum: "2/4", reply: true,
    text: [
      "Já dizia Lawrence Lessig em 1999: **\"Code is Law\"** (O Código é a Lei). O comportamento na rede não é regulado só pelo Direito tradicional, mas pela própria arquitetura do sistema — algoritmos, filtros automáticos e moderação invisível."
    ] },
  { type: "tweet", author: "TechLaw BR", handle: "TechLaw_BR", initials: "TL", color: "#1d9bf0", verified: true, threadNum: "3/4", reply: true,
    text: [
      "O problema real? Decisões que antes eram estritamente jurídicas (o que é ou não liberdade de expressão) foram terceirizadas para big techs. Elas decidem sem transparência nenhuma, abrindo uma margem gigantesca para a censura algorítmica."
    ] },

  /* ---------- Slide 3 — Os Quatro Reguladores ---------- */
  { type: "section", hashtags: ["TeoriaDeLessig"], title: "Os Quatro Reguladores", icon: "poll" },
  { type: "tweet", author: "Lawrence Lessig", handle: "lessig", label: "Professor · Harvard Law · autor de “Code”",
    initials: "LL", color: "#1a1a1a", avatar: "assets/lessig.png", verified: true,
    text: [
      "\"A arquitetura do ciberespaço incorpora ou desloca valores constitucionais, e o código — não a lei — passa a regulá-los.\"",
      "— *Code and Other Laws of Cyberspace* (1999)"
    ] },
  { type: "regulators" },
  { type: "tweet", author: "Dra. Ju Direito", handle: "Dra_Ju_Direito", label: "Advogada Constitucionalista",
    initials: "DJ", color: "#a855f7", emoji: "⚖️", reply: true,
    text: [
      "Exatamente! É o famoso ELI5: se uma plataforma bloqueia teu post ou tua conta automaticamente na origem, ela já impediu a tua ação. Não tem nem espaço para discutir o mérito antes. O poder regulatório virou invisível."
    ] },
  { type: "tweet", author: "Ancap Bot 2000", handle: "Ancap_Bot2000", label: "Perfil Libertário",
    initials: "AB", color: "#64748b", reply: true,
    text: [
      "O problema é que o código é feito por corporações e programadores que ninguém elegeu. Vocês reclamam do Estado mas querem bater palma pra engenheiro do Vale do Silício mandando no que a gente fala? Passando pano pra ditadura do algoritmo."
    ] },
  { type: "tweet", author: "Zeca Memes", handle: "Zeca_Memes", label: "Shitposter",
    initials: "ZM", color: "#ec4899", emoji: "😹", reply: true,
    text: [
      "\"A lei pune depois, o código impede antes\" → minha conta tomando shadowban do nada por postar o meme do gatinho confuso sem eu violar regra nenhuma kkkkkkk rindo pra não chorar."
    ] },

  /* ---------- Slide 4 — Arquitetura e Neutralidade ---------- */
  { type: "section", hashtags: ["MarcoCivil"], title: "Arquitetura e Neutralidade", icon: "shield" },
  { type: "tweet", author: "Estudante Geek", handle: "Estudante_Geek", initials: "EG", color: "#22c55e", emoji: "🤓",
    text: [
      "Estudem isso aqui, gente! A neutralidade da rede evita que o teu provedor vire um agente de controle da informação. Sem ela, uma operadora poderia deixar o site do concorrente arrastado e o dela voando — ou cobrar mais caro pra você acessar streaming. 🔄"
    ],
    quote: { author: "Portal InterNet", handle: "Portal_InterNet", label: "Notícias de Tech", initials: "PI", color: "#1d9bf0", verified: true,
      text: "A arquitetura da internet foi projetada para ser neutra. Ela apenas transporta pacotes de dados sem discriminar o conteúdo. No Brasil, isso é protegido pelo **Artigo 9º do Marco Civil da Internet** (Lei 12.965/2014)." } },
  { type: "tweet", author: "Mestre Lessig Fan", handle: "Mestre_Lessig_Fan", initials: "ML", color: "#a855f7", reply: true,
    text: [
      "Lembrando que a tecnologia NÃO é neutra por natureza. A arquitetura dela carrega escolhas humanas, interesses econômicos e visões de mundo de quem financia. O ciberespaço é o que a gente projeta para ele ser."
    ] },

  /* ---------- Slide 5 — Moderação Algorítmica ---------- */
  { type: "section", hashtags: ["ModeracaoAlgoritmica"], title: "Moderação Algorítmica", icon: "brain" },
  { type: "tweet", author: "Influenciador Puto", handle: "Influenciador_Puto", label: "Criador de Conteúdo",
    initials: "IP", color: "#ef4444", verified: true, viral: true,
    text: [
      "ALGORITMO NÃO É NEUTRO E EU POSSO PROVAR! As plataformas não são mais só \"hospedagem\" faz tempo. Elas ativamente decidem o que vai aparecer na tua timeline, o que vai ser recomendado e o que vai sumir no limbo (ocultado).",
      "O poder do código controla o debate público sem precisar de uma linha de lei formal escrita. Excluir conteúdo sem transparência ou direito de defesa não é moderação, é censura velada! 😡💥"
    ],
    stats: { reposts: "8,9 mil", likes: "32 mil" } },
  { type: "tweet", author: "Cyber Jurista", handle: "Cyber_Jurista", label: "Pesquisador",
    initials: "CJ", color: "#22c55e", reply: true,
    text: [
      "Perfeito. Remover conteúdo manifestamente ilegal (como crimes graves) é um dever jurídico das plataformas, ninguém discute. O perigo mora na zona cinzenta: derrubar discursos lícitos por puro medo de responsabilização ou por viés algorítmico obscuro."
    ] },

  /* ---------- Slide 6 — A Virada de 2025 ---------- */
  { type: "section", hashtags: ["STF", "Art19"], title: "A Responsabilidade dos Provedores · A Virada de 2025", icon: "gavel" },
  { type: "tweet", author: "Direito Digital BR", handle: "Direito_Digital_BR", label: "Atualização Jurídica",
    initials: "DD", color: "#1d9bf0", verified: true,
    text: [],
    news: { tag: "Antes da mudança", tone: "amber", source: "SEAAC Campinas e Região", date: "28 nov. 2024",
      logo: "assets/seaac.png",
      headline: "Como professora ofendida levou o Google ao STF e pode mudar as redes no Brasil",
      summary: "Comunidade “Eu odeio a Aliandra” no Orkut: sem ordem judicial, a plataforma se blindava no art. 19 do Marco Civil. O caso virou o leading case do Tema 987.",
      domain: "seaaccampinas.org.br" } },
  { type: "tweet", author: "Direito Digital BR", handle: "Direito_Digital_BR", label: "Atualização Jurídica",
    initials: "DD", color: "#1d9bf0", verified: true, threadNum: "1/3", reply: true,
    text: [
      "🚨 **ATENÇÃO: a regra do jogo mudou no Brasil!** O STF julgou o Artigo 19 do Marco Civil da Internet (Temas 987 e 533) em Junho de 2025 e declarou o dispositivo parcialmente inconstitucional por 8 votos a 3. A regra antiga caiu! Segue o fio. 👇"
    ] },
  { type: "tweet", author: "Direito Digital BR", handle: "Direito_Digital_BR", initials: "DD", color: "#1d9bf0", verified: true, reply: true,
    text: [],
    news: { tag: "Depois da mudança", tone: "green", source: "TJDFT · Tribunal de Justiça do DF", date: "14 ago. 2025",
      logo: "assets/tjdft.png",
      headline: "Justiça reconhece responsabilidade do Facebook em invasão de perfil",
      summary: "6ª Vara Cível de Brasília condenou a plataforma a indenizar uma usuária: responde pela falha de segurança e pela demora em recuperar a conta usada para golpes.",
      domain: "tjdft.jus.br" } },
  { type: "tweet", author: "Direito Digital BR", handle: "Direito_Digital_BR", initials: "DD", color: "#1d9bf0", verified: true, threadNum: "2/3", reply: true,
    text: [
      "**Como era:** o provedor só respondia civilmente por danos de conteúdo de terceiros se descumprisse uma ordem judicial específica de remoção.",
      "**Como ficou para crimes/ilícitos:** agora o provedor pode responder também se não remover após receber uma **notificação extrajudicial** clara. Acabou o conforto absoluto."
    ] },
  { type: "tweet", author: "Direito Digital BR", handle: "Direito_Digital_BR", initials: "DD", color: "#1d9bf0", verified: true, threadNum: "3/3", reply: true,
    text: [
      "**As nuances cruciais:**",
      "1. Crimes contra a honra são EXCEÇÃO: ainda exigem ordem judicial (para evitar censura privada em massa).",
      "2. Distinção de provedor: o que é \"ativo\" (impulsiona, monetiza e recomenda algoritmicamente) responde muito mais do que o \"neutro\" (que apenas hospeda o dado estático). Vale para fatos futuros!"
    ] },
  { type: "flowchart" },

  /* ---------- Slide 7 — Moderação x Censura ---------- */
  { type: "section", hashtags: ["CensuraDigital"], title: "Onde acaba a regra e começa a mordaça", icon: "scales" },
  { type: "tweet", author: "Militante Virtual", handle: "Militante_Virtual", label: "Perfil Ativista",
    initials: "MV", color: "#f97316", accent: "green",
    text: [
      "Se a plataforma remove discurso de ódio, racismo e fraude, ela tá cumprindo o dever dela. Parem de chorar \"censura\" toda vez que a conta de um preconceituoso é derrubada. Moderação é saúde digital!"
    ] },
  { type: "tweet", author: "Cidadão Preocupado", handle: "Cidadao_Preocupado", initials: "CP", color: "#eab308", reply: true, accent: "red",
    text: [
      "O problema não é tirar o crime, é que o algoritmo faz isso de forma automática, imediata e silenciosa. Diferente do Estado, você não tem juiz, não tem contraditório: seu post simplesmente some e você perde o alcance sem nem saber o critério."
    ] },
  { type: "tweet", author: "Linguagem e Direito", handle: "Linguagem_e_Direito", label: "Professor Universitário",
    initials: "LD", color: "#14b8a6", emoji: "🎓", reply: true,
    text: [
      "A legitimidade da moderação de conteúdo exige três pilares inegociáveis: base legal previsível, transparência absoluta nos critérios e canais reais de recurso. Sem isso, a regulação vira arbitrariedade corporativa."
    ] },

  /* ---------- Slide 8 — Conclusão ---------- */
  { type: "section", hashtags: ["DevidoProcessoDigital"], title: "Reescrever o código com valores constitucionais", icon: "check" },
  { type: "tweet", author: "TechLaw BR", handle: "TechLaw_BR", label: "Conta Acadêmica Oficial",
    initials: "TL", color: "#1d9bf0", verified: true,
    text: [
      "**Conclusão da nossa pesquisa:** o Marco Civil foi um marco histórico (Lei 12.965/2014) do Estado tentando normatizar a rede, mas ele pena para acompanhar a velocidade tecnológica.",
      "Se \"Code is Law\" e o código atua regulando nossa liberdade de expressão, ele PRECISA se submeter aos limites do poder: legalidade, publicidade e direito de defesa. A solução passa por transparência algorítmica e devido processo digital! ⚖️💻"
    ] },
  { type: "highlights", title: "Os limites do poder que o código precisa respeitar", items: [
      { k: "Legalidade", v: "base legal previsível", tone: "blue" },
      { k: "Publicidade", v: "transparência nos critérios", tone: "green" },
      { k: "Direito de defesa", v: "devido processo digital", tone: "red" }
    ] },

  /* ---------- Slide 9 — Notas da Comunidade & Referências ---------- */
  { type: "section", hashtags: ["Transparência"], title: "Notas da Comunidade & Referências", icon: "clipboard",
    by: "Transparência do sistema" },
  { type: "references",
    author: "TechLaw BR", handle: "TechLaw_BR", label: "Conta Acadêmica Oficial", initials: "TL", color: "#1d9bf0", verified: true,
    title: "Para se aprofundar nos dados e na fundamentação jurídica:",
    items: [
      "**LESSIG, Lawrence.** *Code and other laws of cyberspace.* New York: Basic Books, 1999.",
      "**BRASIL.** *Lei nº 12.965, de 23 de abril de 2014* (Marco Civil da Internet). Diário Oficial da União.",
      "**BRASIL.** Supremo Tribunal Federal. *RE nº 1.037.396 (Tema 987) e RE nº 1.057.258 (Tema 533).* Julgado em 26 jun. 2025."
    ],
    note: "Este material de pesquisa foi elaborado pelos autores com auxílio da ferramenta de IA generativa Claude Sonnet 4.6 (Anthropic, 2026) para suporte em revisões ortográficas, sintetização de textos e geração de infográficos estruturais. Todo o processo ocorreu sob estrita supervisão e revisão humana dos autores acadêmicos." }
];

/* Os Quatro Reguladores de Lessig (infográfico do Slide 3) */
window.REGULATORS = {
  center: "Indivíduo",
  forces: [
    { key: "Arquitetura", desc: "O Código. Autoexecutável: impede antes do fato.", tone: "blue", strong: true, icon: "💻" },
    { key: "Lei", desc: "Pune depois do fato, via Estado e tribunais.", tone: "purple", icon: "⚖️" },
    { key: "Normas Sociais", desc: "Pressão da comunidade, cancelamento.", tone: "amber", icon: "🤝" },
    { key: "Mercado", desc: "Preço do acesso, monetização, incentivos.", tone: "green", icon: "💸" }
  ]
};

/* Fluxograma da decisão do STF 2025 (Slide 6) */
window.FLOWCHART = {
  root: "Conteúdo de terceiros",
  branches: [
    { cond: "Crime contra a honra", path: "Exige ordem judicial", result: "Sem ordem, o provedor não responde", tone: "red" },
    { cond: "Outro crime ou ilícito", path: "Notificação extrajudicial", result: "Não removeu? Responde se houver dolo ou culpa", tone: "green" }
  ],
  caption: "Fluxo de responsabilidade do provedor após o julgamento do STF (Junho/2025)."
};
