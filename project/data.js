/* ===== Feed Fantasma — dados iniciais ===== */
/* legal: classificação interna; reason: motivo quando ilegal
   suspect: conta suspeita/inautêntica (tratamento visual discreto)
   verified: selo de verificação
   promo: post patrocinado (anúncio)
   time: horário relativo exibido */

window.INITIAL_POSTS = [
  {
    id: "p1", name: "Clara M.", handle: "clara_dev", avatarColor: "#3f6f8f",
    text: "Abri inscrições pro meu curso gratuito de Python pra iniciantes. Link nos comentários — passa pra quem tá começando 🙂",
    legal: true, likes: 128, time: "2 h"
  },
  {
    id: "p2", name: "Dra. Sofia Andrade", handle: "sofia_saude", avatarColor: "#2f7d6e", verified: true,
    text: "Desmistificando boatos sobre vacinas: o que a ciência realmente diz, sem alarmismo e com fontes. Fica a thread 👇",
    legal: true, likes: 342, time: "5 h"
  },
  {
    id: "p3", name: "Gata do Dia", handle: "meow_diario", avatarColor: "#a06a3f",
    text: "soneca boa da minha gata no sol da tarde. nada mais importa hoje.",
    legal: true, likes: 1203, time: "1 h"
  },
  {
    id: "p4", name: "João Crítico", handle: "joao_opina", avatarColor: "#6a5a8f",
    text: "Acho o novo governo um desastre, sinceramente. Mas é só a minha opinião — cada um com a sua.",
    legal: true, likes: 89, time: "3 h", note: "opinião política — legal"
  },
  {
    id: "p5", name: "Marina Chef", handle: "cozinha_da_mari", avatarColor: "#9c4f6e", verified: true,
    text: "Receita de pão caseiro em 5 passos, sem sovar muito. Salva esse post pro fim de semana!",
    legal: true, likes: 567, time: "7 h"
  },
  {
    id: "p6", name: "Coletivo Verde", handle: "eco_agora", avatarColor: "#3f7d52",
    text: "Protesto pacífico pela preservação do rio neste sábado, 9h, na praça central. Leve água e protetor solar.",
    legal: true, likes: 76, time: "1 d"
  },
  {
    id: "p7", name: "Pedro Dev", handle: "pedro_code", avatarColor: "#42598f", verified: true,
    text: "Thread longa explicando como funciona um algoritmo de recomendação por dentro — e por que ele te entende tão bem. 🧵",
    legal: true, likes: 210, time: "4 h"
  },
  {
    id: "p8", name: "Lia Música", handle: "lia_canta", avatarColor: "#7c4f8f",
    text: "Gravei um cover autoral da minha música nova. Tá no perfil, espero que curtam 🎶",
    legal: true, likes: 154, time: "8 h"
  },

  {
    id: "p9", name: "Vendas Turbo", handle: "turbo_promo", suspect: true, avatarColor: "#7a4a2a",
    text: "💸 ÚLTIMAS VAGAS: invista R$100 hoje e receba R$5.000 amanhã. PIX garantido, lucro certo, sem risco!",
    legal: false, reason: "Estelionato", likes: 88, promo: true
  },
  {
    id: "p10", name: "Anônimo", handle: "user_8842", suspect: true, avatarColor: "#555555",
    text: "Expondo fotos íntimas de uma pessoa sem o consentimento dela. [conteúdo descrito para fins didáticos]",
    legal: false, reason: "Conteúdo íntimo não consentido (art. 21)", likes: 41, time: "2 h"
  },
  {
    id: "p11", name: "Notícia Urgente", handle: "noticia_urgente", suspect: true, avatarColor: "#7a3030",
    text: "URGENTE!! Tomar X cura câncer e os médicos escondem isso de você. COMPARTILHE antes que apaguem!!",
    legal: false, reason: "Desinformação com dano à saúde", likes: 920, time: "30 min"
  },
  {
    id: "p12", name: "Conta Fake", handle: "bot_ataque_99", suspect: true, avatarColor: "#4a3a5a",
    text: "Ataque coordenado xingando e expondo dados pessoais de uma jornalista. [perfil inautêntico, fins didáticos]",
    legal: false, reason: "Perfil inautêntico + violação de dados", likes: 33, time: "12 min"
  },
  {
    id: "p13", name: "Loja Baratinho", handle: "baratinho", suspect: true, avatarColor: "#7a5e2a",
    text: "Réplicas perfeitas de marca famosa pela metade do preço! Ninguém vai notar a diferença. Chama no direct 📩",
    legal: false, reason: "Contrafação", likes: 460, promo: true
  },
  {
    id: "p14", name: "User Raiva", handle: "odiador", suspect: true, avatarColor: "#7a2a2a",
    text: "Discurso de ódio incitando violência contra um grupo inteiro. [conteúdo descrito para fins didáticos]",
    legal: false, reason: "Crime de ódio", likes: 612, time: "1 h"
  }
];

window.DEFAULT_CONFIG = {
  likesEmAlta: 500,      // likes para o selo "em alta"
  valorMulta: 5000,      // R$ por ordem judicial
  denunciasOrdem: 3,     // denúncias para disparar a ordem
  flipDur: 0.55,         // duração da animação de reordenação (s)
  presentation: false,   // modo apresentação (texto maior)
  revealFlags: false     // revelar classificação legal/ilegal nos posts
};
