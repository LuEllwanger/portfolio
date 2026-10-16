/* =====================================================================
   CONTEÚDO DO SITE
   ---------------------------------------------------------------------
   Este é o único arquivo que você precisa mexer para mudar textos,
   links, imagens e projetos. Dicas:

   - Cada texto tem duas versões: pt (português) e en (inglês).
   - Sempre deixe o texto entre aspas "assim".
   - Não apague as vírgulas no fim das linhas.
   - Texto entre [colchetes] aparece destacado em rosa no site,
     como lembrete do que falta preencher.
   - A tradução NÃO é automática: o que você escrever em pt aparece
     na versão em português e o que escrever em en aparece em inglês.
     Se deixar o en vazio (en: ""), o site mostra o texto em português
     no lugar, então nunca fica nada em branco.
   - Imagens: coloque o arquivo na pasta "imagens" e escreva o nome
     dele aqui, por exemplo "imagens/minha-foto.jpg".
     Deixe "" (vazio) para mostrar a aquarela de exemplo.
   - Vídeos: coloque na pasta "videos" e escreva "videos/nome.mp4".
   - Para adicionar um item numa lista (projeto, arte, habilidade),
     copie um item inteiro de { até }, cole logo abaixo com uma
     vírgula entre eles e troque os textos.

   Depois de salvar, é só atualizar a página no navegador (F5).
   ===================================================================== */

const CONTEUDO = {

  /* ---------- TOPO ---------- */
  nome: "Luiza",
  sobrenome: "Ellwanger",
  cidade: "Novo Hamburgo",
  foto: "", // ex: "imagens/foto.jpg"

  saudacao: { pt: "oi! eu sou a", en: "hi, I'm" },

  // Etiquetas coloridas embaixo do nome
  etiquetas: [
    { pt: "Publicidade e Propaganda", en: "Advertising" },
    { pt: "Comunicação", en: "Communication" },
    { pt: "Artista", en: "Artist" },
  ],

  frase: {
    pt: "Estudante de publicidade que pensa em ideias como quem mistura tinta: testando cores, deixando a água agir e vendo o que aparece no papel.",
    en: "Advertising student who handles ideas the way I mix paint: testing colors, letting the water work and seeing what shows up on the paper.",
  },

  /* ---------- SOBRE MIM ---------- */
  sobre: {
    titulo: { pt: "Comunicação com cor e intenção", en: "Communication with color and intent" },
    bilhete: { pt: "prazer! ✿", en: "nice to meet you! ✿" }, // adesivo ao lado da foto
    paragrafos: [
      {
        pt: "Sou estudante de Publicidade e Propaganda na [nome da faculdade] e hoje estagio em [área / empresa].",
        en: "I study Advertising at [university name] and I'm currently an intern at [area / company].",
      },
      {
        pt: "Ainda estou descobrindo qual caminho da comunicação é o meu, e encaro isso como vantagem: gosto de experimentar entre criação, conteúdo e estratégia, aprendendo um pouco de cada lugar por onde passo.",
        en: "I'm still finding my path in communication, and I see that as an advantage: I like moving between creative, content and strategy, learning something from every place I work.",
      },
      {
        pt: "Fora do trabalho, sou a pessoa da aquarela, dos jogos, dos livros e dos animes. Muito do meu olhar criativo vem daí.",
        en: "Outside work I'm into watercolor, games, books and anime. A lot of my creative eye comes from there.",
      },
    ],
    // Os três dados rápidos embaixo do texto
    dados: [
      { titulo: { pt: "Localização", en: "Location" }, valor: { pt: "Novo Hamburgo e região", en: "Novo Hamburgo area, Brazil" } },
      { titulo: { pt: "Curso", en: "Degree" }, valor: { pt: "[4]º semestre", en: "[X]th semester" } },
      { titulo: { pt: "Buscando", en: "Looking for" }, valor: { pt: "Experiências criativas", en: "Creative experience" } },
    ],
  },

  /* ---------- TRABALHOS EM PUBLICIDADE ----------
     categoria pode ser: "video", "post", "cartaz" ou "outro"
     capa:  imagem que aparece no card (ex: "imagens/campanha-1.jpg")
     video: arquivo de vídeo (ex: "videos/reels-1.mp4"), ou "" se não tiver
     link:  link externo opcional (Instagram, Behance, Drive...), ou ""   */
  trabalhos: {
    titulo: { pt: "Trabalhos em publicidade", en: "Advertising work" },
    texto: {
      pt: "Peças da faculdade, do estágio e projetos pessoais: vídeos, posts, cartazes e o que mais vier.",
      en: "Pieces from college, my internship and personal projects: videos, posts, posters and more.",
    },
    projetos: [
      {
        categoria: "video",
        titulo: { pt: "[Nome do vídeo]", en: "[Video title]" },
        cliente: { pt: "[Cliente, marca ou disciplina]", en: "[Client, brand or course]" },
        descricao: { pt: "[Reels ou TikTok: qual era o objetivo e o que você fez]", en: "[Reels or TikTok: what the goal was and what you did]" },
        capa: "",
        video: "",
        link: "",
      },
      {
        categoria: "post",
        titulo: { pt: "[Nome da campanha]", en: "[Campaign name]" },
        cliente: { pt: "[Cliente, marca ou disciplina]", en: "[Client, brand or course]" },
        descricao: { pt: "[Série de posts para Instagram: conceito e resultado]", en: "[Instagram post series: concept and outcome]" },
        capa: "",
        video: "",
        link: "",
      },
      {
        categoria: "cartaz",
        titulo: { pt: "[Nome do cartaz]", en: "[Poster title]" },
        cliente: { pt: "[Cliente, marca ou disciplina]", en: "[Client, brand or course]" },
        descricao: { pt: "[Para quem era, onde foi usado, ideia principal]", en: "[Who it was for, where it ran, main idea]" },
        capa: "",
        video: "",
        link: "",
      },
    ],
  },

  /* ---------- FORMAÇÃO ----------
     cor pode ser: "rosa", "azul" ou "roxo" (a bolinha da linha do tempo) */
  formacao: {
    titulo: { pt: "Por onde ando aprendendo", en: "Where I've been learning" },
    texto: {
      pt: "Faculdade, estágio e os cursos que vão completando o repertório.",
      en: "College, internship and the courses that keep adding to my toolkit.",
    },
    etapas: [
      {
        cor: "rosa",
        quando: { pt: "[2024] até hoje", en: "[2024] to now" },
        tipo: { pt: "Graduação", en: "Bachelor's degree" },
        titulo: { pt: "Publicidade e Propaganda", en: "Advertising" },
        local: { pt: "[Nome da faculdade]", en: "[University name]" },
        descricao: {
          pt: "Disciplinas favoritas até agora: [ex: Criação, Direção de Arte, Planejamento].",
          en: "Favorite courses so far: [e.g. Copy, Art Direction, Planning].",
        },
      },
      {
        cor: "azul",
        quando: { pt: "[2026] até hoje", en: "[2026] to now" },
        tipo: { pt: "Estágio", en: "Internship" },
        titulo: { pt: "[Cargo, ex: Estagiária de Marketing]", en: "[Role, e.g. Marketing Intern]" },
        local: { pt: "[Empresa ou agência]", en: "[Company or agency]" },
        descricao: { pt: "[Duas linhas sobre o que você faz no dia a dia]", en: "[Two lines about your day-to-day work]" },
      },
      {
        cor: "roxo",
        quando: { pt: "[2025]", en: "[2025]" },
        tipo: { pt: "Curso complementar", en: "Course" },
        titulo: { pt: "[Nome do curso]", en: "[Course name]" },
        local: { pt: "[Instituição]", en: "[Institution]" },
        descricao: { pt: "", en: "" },
      },
    ],
  },

  /* ---------- HABILIDADES ---------- */
  habilidades: {
    titulo: { pt: "Habilidades", en: "Skills" },
    texto: {
      pt: "O que eu sei fazer, as ferramentas que uso e os idiomas que falo.",
      en: "What I can do, the tools I use and the languages I speak.",
    },
    hardSkills: [
      { pt: "Criação para redes sociais", en: "Social media content" },
      { pt: "Copywriting", en: "Copywriting" },
      { pt: "Direção de arte", en: "Art direction" },
      { pt: "Planejamento de campanhas", en: "Campaign planning" },
      { pt: "Edição de vídeo", en: "Video editing" },
      { pt: "Ilustração em aquarela", en: "Watercolor illustration" },
    ],
    softSkills: [
      { pt: "Criatividade", en: "Creativity" },
      { pt: "Comunicação", en: "Communication" },
      { pt: "Organização", en: "Organization" },
      { pt: "Trabalho em equipe", en: "Teamwork" },
      { pt: "Curiosidade", en: "Curiosity" },
      { pt: "Proatividade", en: "Proactivity" },
    ],
    ferramentas: [
      { pt: "Canva", en: "Canva" },
      { pt: "Photoshop", en: "Photoshop" },
      { pt: "Illustrator", en: "Illustrator" },
      { pt: "Figma", en: "Figma" },
      { pt: "CapCut", en: "CapCut" },
      { pt: "Pacote Office", en: "Microsoft Office" },
    ],
    // nivel: de 0 a 100, é o quanto a barra fica preenchida
    idiomas: [
      { idioma: { pt: "Português", en: "Portuguese" }, descricao: { pt: "Nativo", en: "Native" }, nivel: 100 },
      { idioma: { pt: "Inglês", en: "English" }, descricao: { pt: "[Intermediário]", en: "[Intermediate]" }, nivel: 60 },
    ],
  },

  /* ---------- ARTES ----------
     imagem: arquivo na pasta imagens (ex: "imagens/arte-1.jpg"), ou "" para a aquarela de exemplo
     link:   link do post no Instagram; se ficar "", leva para o perfil */
  artes: {
    instagram: "ellaurel.art", // sem o @
    titulo: { pt: "Aquarela, papel e água", en: "Watercolor, paper and water" },
    texto: {
      pt: "Meu cantinho criativo fora da publicidade. As peças completas ficam no Instagram.",
      en: "My creative corner outside advertising. The full collection lives on Instagram.",
    },
    obras: [
      { imagem: "", titulo: { pt: "estudo de flores", en: "flower study" }, link: "" },
      { imagem: "", titulo: { pt: "céu de fim de tarde", en: "late afternoon sky" }, link: "" },
      { imagem: "", titulo: { pt: "personagem", en: "character" }, link: "" },
      { imagem: "", titulo: { pt: "paisagem", en: "landscape" }, link: "" },
      { imagem: "", titulo: { pt: "fan art", en: "fan art" }, link: "" },
      { imagem: "", titulo: { pt: "sketchbook", en: "sketchbook" }, link: "" },
    ],
  },

  /* ---------- HOBBIES ----------
     Aparece de forma discreta no fim do "Sobre mim", como um extra.
     icone pode ser: "pincel", "controle", "livro" ou "estrela"      */
  hobbies: {
    titulo: { pt: "pra me conhecer melhor", en: "to know me a little better" },
    lista: [
      { icone: "pincel", titulo: { pt: "Aquarela", en: "Watercolor" }, agoraTitulo: { pt: "pintando agora", en: "painting now" }, agora: { pt: "[tema atual]", en: "[current theme]" } },
      { icone: "controle", titulo: { pt: "Jogos", en: "Games" }, agoraTitulo: { pt: "jogando agora", en: "playing now" }, agora: { pt: "[nome do jogo]", en: "[game title]" } },
      { icone: "livro", titulo: { pt: "Leitura", en: "Reading" }, agoraTitulo: { pt: "lendo agora", en: "reading now" }, agora: { pt: "[título do livro]", en: "[book title]" } },
      { icone: "estrela", titulo: { pt: "Animes", en: "Anime" }, agoraTitulo: { pt: "assistindo agora", en: "watching now" }, agora: { pt: "[nome do anime]", en: "[anime title]" } },
    ],
  },

  /* ---------- CONTATO ---------- */
  contato: {
    titulo: { pt: "Bora criar algo junto?", en: "Let's make something together?" },
    texto: {
      pt: "Aberta a oportunidades de estágio, freelas de ilustração e boas conversas sobre comunicação.",
      en: "Open to internships, illustration freelance work and good conversations about communication.",
    },
    linkedin: "https://www.linkedin.com/in/luiza-ellwanger/",
    email: "[seuemail@exemplo.com]",
    whatsapp: "wa.me/5551998962442"
  },

  rodape: { pt: "feito com água, pigmento e um pouco de código", en: "made with water, pigment and a little code" },
};
