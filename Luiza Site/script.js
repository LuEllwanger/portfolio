/* =====================================================================
   LÓGICA DO SITE
   Monta a página a partir do conteudo.js, troca o idioma (PT/EN),
   filtra os projetos e pinta as manchas de aquarela.
   Normalmente você não precisa mexer aqui.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.CONTEUDO || (typeof CONTEUDO !== "undefined" ? CONTEUDO : null);
  if (!C) {
    document.getElementById("app").innerHTML =
      '<p style="padding:24px;font-family:sans-serif">Não consegui ler o conteudo.js. Confira se não faltou uma vírgula ou aspas no arquivo.</p>';
    return;
  }

  var lang = idiomaInicial();
  var filtro = "todos";

  /* Textos fixos da interface (menus, botões) */
  var UI = {
    menu: { pt: ["Sobre", "Trabalhos", "Formação", "Habilidades", "Artes", "Contato"], en: ["About", "Work", "Education", "Skills", "Art", "Contact"] },
    conversar: { pt: "Vamos conversar", en: "Let's talk" },
    tags: {
      sobre: { pt: "sobre mim", en: "about me" }, trabalhos: { pt: "portfólio", en: "portfolio" },
      formacao: { pt: "formação", en: "education" }, habilidades: { pt: "habilidades", en: "skills" },
      artes: { pt: "artes", en: "art" }, hobbies: { pt: "fora do expediente", en: "off the clock" },
      contato: { pt: "contato", en: "contact" },
    },
    cat: { todos: { pt: "Todos", en: "All" }, video: { pt: "Vídeos", en: "Videos" }, post: { pt: "Posts", en: "Social posts" }, cartaz: { pt: "Cartazes", en: "Posters" }, outro: { pt: "Outros", en: "Other" } },
    verProjeto: { pt: "Ver projeto ↗", en: "View project ↗" },
    hard: { pt: "Hard skills", en: "Hard skills" }, hardSub: { pt: "O que eu sei fazer", en: "What I do" },
    soft: { pt: "Soft skills", en: "Soft skills" }, softSub: { pt: "Como eu trabalho", en: "How I work" },
    ferr: { pt: "Ferramentas", en: "Tools" }, ferrSub: { pt: "Programas do dia a dia", en: "Software I use daily" },
    idiomas: { pt: "Idiomas", en: "Languages" }, idiomasSub: { pt: "Línguas que eu falo", en: "Languages I speak" },
    verIg: { pt: "ver todas as artes no Instagram", en: "see all my art on Instagram" },
    foto: { pt: "sua foto aqui", en: "your photo here" }, fotoSub: { pt: "luz natural fica ótimo", en: "natural light works great" },
    igArtes: { pt: "Instagram de artes", en: "Art Instagram" }, email: { pt: "E-mail", en: "Email" },
    copiar: { pt: "Copiar e-mail", en: "Copy email" }, copiado: { pt: "E-mail copiado", en: "Email copied" },
    selecionado: { pt: "Selecionado, use Ctrl+C", en: "Selected, press Ctrl+C" },
  };
  var ICONES = {
    pincel: '<path d="M31 6l11 11-17 17-6 1 1-6z"/><path d="M19 29c-6 0-11 4-11 13 5-1 13-3 13-9"/>',
    controle: '<rect x="5" y="14" width="38" height="22" rx="11"/><path d="M15 21v8M11 25h8"/><circle cx="31" cy="23" r="1.6" fill="currentColor"/><circle cx="35" cy="27" r="1.6" fill="currentColor"/>',
    livro: '<path d="M24 12c-5-4-12-4-18-2v28c6-2 13-2 18 2 5-4 12-4 18-2V10c-6-2-13-2-18 2z"/><path d="M24 12v28"/>',
    estrela: '<path d="M24 6l4.5 11.5L40 18l-9 7.5 3 11.5-10-6.5-10 6.5 3-11.5-9-7.5 11.5-.5z"/>',
  };
  var COR_CAT = { video: "rosa", post: "azul", cartaz: "roxo", outro: "rosa" };
  var COR_HOBBY = ["rosa", "azul", "roxo", "rosa"];
  var IDS = ["sobre", "trabalhos", "formacao", "habilidades", "artes", "contato"];

  /* ---------- utilitários ---------- */
  function idiomaInicial() {
    if (location.hash === "#en") return "en";
    try { var l = localStorage.getItem("idioma"); if (l === "pt" || l === "en") return l; } catch (e) {}
    return /^pt/i.test(navigator.language || "pt") ? "pt" : "en";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // texto no idioma atual, com [colchetes] destacados
  // (se o texto em inglês estiver vazio, usa o português)
  function puro(o) { return o && typeof o === "object" ? o[lang] || o.pt || "" : o || ""; }
  function tx(o) {
    return esc(puro(o)).replace(/\[([^\]]+)\]/g, '<span class="fill">$1</span>');
  }
  function t(k) { return UI[k][lang]; }
  function tag(nome, cor) { return '<span class="tag t-' + cor + '"><i></i>' + UI.tags[nome][lang] + "</span>"; }
  function el(tagName, cls, conteudo) { return conteudo ? "<" + tagName + (cls ? ' class="' + cls + '"' : "") + ">" + conteudo + "</" + tagName + ">" : ""; }
  function linkExterno(href, inner, cls) {
    return '<a class="' + cls + '" href="' + esc(href) + '" target="_blank" rel="noopener">' + inner + "</a>";
  }

  /* ---------- montagem da página ---------- */
  function render() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    var y = window.scrollY;
    var igUser = String(C.artes.instagram || "").replace(/^@/, "");
    var igUrl = "https://www.instagram.com/" + encodeURIComponent(igUser) + "/";
    var h = "";

    // MENU
    h += '<nav class="nav"><div class="wrap"><a class="logo" href="#topo">' + esc(C.nome.toLowerCase()) + "<span>.</span></a>" +
      '<div class="links">' + t("menu").map(function (n, i) { return '<a href="#' + IDS[i] + '">' + n + "</a>"; }).join("") + "</div>" +
      '<div class="lang" role="group" aria-label="Idioma / Language">' +
      '<button data-lang="pt" aria-pressed="' + (lang === "pt") + '">PT</button>' +
      '<button data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button></div></div></nav>';

    // TOPO
    h += '<header class="hero" id="topo"><div class="wrap">' +
      el("p", "hello", tx(C.saudacao)) +
      "<h1>" + esc(C.nome) + '<span class="l2">' + esc(C.sobrenome) + "</span></h1>" +
      '<div class="roles">' + C.etiquetas.map(function (r) { return "<span>" + tx(r) + "</span>"; }).join("") + "</div>" +
      el("p", "lede", tx(C.frase)) +
      '<div class="ctas"><a class="btn" href="#contato">' + t("conversar") + "</a>" +
      linkExterno(C.contato.linkedin, "LinkedIn", "btn alt") + "</div></div></header>";

    // SOBRE
    var S = C.sobre;
    h += '<section id="sobre"><div class="wrap about"><div class="photo"><div class="frame">' +
      (C.foto ? '<img src="' + esc(C.foto) + '" alt="' + esc(C.nome + " " + C.sobrenome) + '">' : "<div><b>" + t("foto") + "</b>" + t("fotoSub") + "</div>") +
      "</div>" + el("span", "note", tx(S.bilhete)) + '</div><div class="txt">' +
      '<div class="head" style="margin-bottom:0">' + tag("sobre", "rosa") + el("h2", "", tx(S.titulo)) + "</div>" +
      S.paragrafos.map(function (p, i) { return el("p", i === 0 ? "first" : "", tx(p)); }).join("") +
      '<div class="facts">' + S.dados.map(function (d) { return "<div><small>" + tx(d.titulo) + "</small><b>" + tx(d.valor) + "</b></div>"; }).join("") +
      "</div></div></div>";

    // HOBBIES (discreto, no fim do Sobre mim)
    var B = C.hobbies;
    if (B && B.lista && B.lista.length) {
      h += '<div class="wrap"><div class="extra">' + el("p", "extra-t", tx(B.titulo)) + '<div class="extra-list">' +
        B.lista.map(function (x, i) {
          return '<div class="ex" style="--c:var(--' + COR_HOBBY[i % 4] + ')"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            (ICONES[x.icone] || ICONES.estrela) + "</svg><div><b>" + tx(x.titulo) + "</b>" +
            (puro(x.agora) ? "<span>" + tx(x.agoraTitulo) + ": " + tx(x.agora) + "</span>" : "") + "</div></div>";
        }).join("") + "</div></div></div>";
    }
    h += "</section>";

    // TRABALHOS
    var W = C.trabalhos, presentes = {};
    W.projetos.forEach(function (p) { presentes[p.categoria] = true; });
    if (filtro !== "todos" && !presentes[filtro]) filtro = "todos";
    var cats = ["video", "post", "cartaz", "outro"].filter(function (c) { return presentes[c]; });
    h += '<section class="band" id="trabalhos"><div class="wrap"><div class="head">' + tag("trabalhos", "azul") + el("h2", "", tx(W.titulo)) + el("p", "sub", tx(W.texto)) + "</div>";
    if (cats.length > 1) {
      h += '<div class="filters">' + ["todos"].concat(cats).map(function (c) {
        return '<button data-filtro="' + c + '" aria-pressed="' + (filtro === c) + '">' + UI.cat[c][lang] + "</button>";
      }).join("") + "</div>";
    }
    h += '<div class="projs">' + W.projetos.map(function (p, i) {
      if (filtro !== "todos" && p.categoria !== filtro) return "";
      var cor = COR_CAT[p.categoria] || "rosa";
      var midia = p.video
        ? '<video src="' + esc(p.video) + '" controls playsinline preload="metadata"' + (p.capa ? ' poster="' + esc(p.capa) + '"' : "") + "></video>"
        : p.capa ? '<img src="' + esc(p.capa) + '" alt="' + esc(puro(p.titulo)) + '" loading="lazy">'
        : '<canvas data-ph="' + i + '" aria-hidden="true"></canvas>';
      return '<article class="proj" style="--c:var(--' + cor + ')"><div class="media">' + midia +
        '<span class="cat">' + (UI.cat[p.categoria] || UI.cat.outro)[lang] + "</span></div>" +
        '<div class="pbody">' + el("div", "client", tx(p.cliente)) + el("h3", "", tx(p.titulo)) + el("p", "", tx(p.descricao)) +
        (p.link ? linkExterno(p.link, t("verProjeto"), "more") : "") + "</div></article>";
    }).join("") + "</div></div></section>";

    // FORMAÇÃO
    var F = C.formacao;
    h += '<section id="formacao"><div class="wrap"><div class="head">' + tag("formacao", "rosa") + el("h2", "", tx(F.titulo)) + el("p", "sub", tx(F.texto)) + '</div><div class="timeline">' +
      F.etapas.map(function (e) {
        return '<div class="item" style="--c:var(--' + (e.cor || "rosa") + ')">' + el("div", "when", tx(e.quando)) + '<div class="dot"><i></i></div><div class="what">' +
          el("div", "kind", tx(e.tipo)) + el("h3", "", tx(e.titulo)) + el("div", "org", tx(e.local)) + el("p", "", tx(e.descricao)) + "</div></div>";
      }).join("") + "</div></div></section>";

    // HABILIDADES
    var K = C.habilidades;
    function chips(lista) { return '<div class="chips">' + lista.map(function (x) { return "<span>" + tx(x) + "</span>"; }).join("") + "</div>"; }
    function caixa(cor, titulo, sub, corpo) { return '<div class="box" style="--c:var(--' + cor + ')"><h3><i></i>' + t(titulo) + '</h3><p class="boxsub">' + t(sub) + "</p>" + corpo + "</div>"; }
    h += '<section class="band" id="habilidades"><div class="wrap"><div class="head">' + tag("habilidades", "roxo") + el("h2", "", tx(K.titulo)) + el("p", "sub", tx(K.texto)) + '</div><div class="skills">' +
      caixa("rosa", "hard", "hardSub", chips(K.hardSkills)) +
      caixa("azul", "soft", "softSub", chips(K.softSkills)) +
      caixa("roxo", "ferr", "ferrSub", chips(K.ferramentas)) +
      caixa("rosa", "idiomas", "idiomasSub", '<div class="langs">' + K.idiomas.map(function (l) {
        var n = Math.max(5, Math.min(100, Number(l.nivel) || 0));
        return '<div class="lg"><div class="top"><b>' + tx(l.idioma) + "</b><span>" + tx(l.descricao) + "</span></div>" +
          '<div class="bar" role="img" aria-label="' + esc(puro(l.idioma) + ": " + puro(l.descricao)) + '"><i style="width:' + n + '%"></i></div></div>';
      }).join("") + "</div>") +
      "</div></div></section>";

    // ARTES
    var R = C.artes;
    h += '<section id="artes"><div class="wrap"><div class="art-top"><div class="head">' + tag("artes", "roxo") + el("h2", "", tx(R.titulo)) + el("p", "sub", tx(R.texto)) + "</div>" +
      linkExterno(igUrl, '<span class="av">' + esc(igUser.charAt(0) || "@") + "</span><span><b>@" + esc(igUser) + "</b><small>" + t("verIg") + "</small></span>", "ig") + "</div>" +
      '<div class="gallery">' + R.obras.map(function (o, i) {
        var inner = (o.imagem ? '<img src="' + esc(o.imagem) + '" alt="' + esc(puro(o.titulo)) + '" loading="lazy">' : '<canvas data-art="' + i + '" aria-hidden="true"></canvas>') + el("span", "cap", tx(o.titulo));
        return '<a class="post" href="' + esc(o.link || igUrl) + '" target="_blank" rel="noopener" aria-label="' + esc(puro(o.titulo)) + ' (Instagram)">' + inner + "</a>";
      }).join("") + "</div></div></section>";

    // CONTATO
    var K2 = C.contato, li = String(K2.linkedin).replace(/^https?:\/\/(www\.)?linkedin\.com\//, "").replace(/\/$/, "");
    h += '<section class="contact" id="contato"><div class="wrap">' + tag("contato", "rosa") + el("h2", "", tx(K2.titulo)) + el("p", "sub", tx(K2.texto)) +
      '<div class="cards">' +
      linkExterno(K2.linkedin, "<small>LinkedIn</small><b>" + esc(li) + "</b>", "card") +
      linkExterno(igUrl, "<small>" + t("igArtes") + "</small><b>@" + esc(igUser) + "</b>", "card") +
      '<div class="card"><small>' + t("email") + '</small><b id="mail">' + tx(K2.email) + '</b><button type="button" class="copy" id="copiar">' + t("copiar") + "</button></div>" +
      "</div></div></section>";

    h += '<footer><div class="wrap"><span>' + esc(C.nome + " " + C.sobrenome) + " · " + esc(C.cidade) + "</span><span>" + tx(C.rodape) + "</span></div></footer>";

    conteudoEl.innerHTML = h;
    pintarPlaceholders();
    agendarFundo();
    if (y) window.scrollTo(0, y);
  }

  /* ---------- aquarela botânica (flores e folhas pintadas em canvas) ----------
     O fundo é desenhado uma vez para a página inteira, então as flores
     continuam de uma seção para a outra sem cortes.                      */
  function semente(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function entre(R, a, b) { return a + R() * (b - a); }
  function gauss(R) { return (R() + R() + R() - 1.5) / 1.5; }
  function deformar(pts, n, vari, R) {
    if (!n) return pts;
    var out = [];
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length], len = Math.hypot(b[0] - a[0], b[1] - a[1]), v = a[2] * vari;
      out.push(a, [(a[0] + b[0]) / 2 + gauss(R) * len * v, (a[1] + b[1]) / 2 + gauss(R) * len * v, a[2] * entre(R, 0.7, 1.2)]);
    }
    return deformar(out, n - 1, vari, R);
  }
  function caminho(ctx, p) {
    ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);
    for (var j = 1; j < p.length; j++) ctx.lineTo(p[j][0], p[j][1]);
    ctx.closePath();
  }
  // pinta um formato com várias camadas translúcidas, como tinta aguada
  function aguada(ctx, forma, cor, camadas, alfa, R) {
    var base = deformar(forma, 1, 0.3, R);
    ctx.fillStyle = cor; ctx.strokeStyle = cor;
    ctx.globalAlpha = alfa;
    for (var k = 0; k < camadas; k++) { caminho(ctx, deformar(base, 2, 0.22, R)); ctx.fill(); }
    // borda mais escura, onde o pigmento acumula
    ctx.globalAlpha = alfa * 2.2; ctx.lineWidth = 1.2;
    caminho(ctx, deformar(base, 2, 0.12, R)); ctx.stroke();
    ctx.globalAlpha = 1;
  }
  function girar(px, py, ang, x, y) {
    var c = Math.cos(ang), s = Math.sin(ang);
    return [x + px * c - py * s, y + px * s + py * c];
  }
  function petala(x, y, ang, comp, larg, R) {
    var pts = [];
    for (var i = 0; i < 9; i++) {
      var th = (i / 9) * Math.PI * 2;
      var lx = comp / 2 + Math.cos(th) * comp / 2, ly = Math.sin(th) * larg / 2 * (0.6 + 0.4 * (lx / comp));
      var p = girar(lx, ly, ang, x, y); pts.push([p[0], p[1], entre(R, 0.6, 1.3)]);
    }
    return pts;
  }
  function formaFolha(x, y, ang, comp, curva, R) {
    var pts = [], n = 8, i, t, p;
    for (i = 0; i <= n; i++) { t = i / n; p = girar(t * comp, -Math.sin(Math.PI * t) * comp * 0.2 + t * t * curva, ang, x, y); pts.push([p[0], p[1], entre(R, 0.5, 1.1)]); }
    for (i = n - 1; i > 0; i--) { t = i / n; p = girar(t * comp, Math.sin(Math.PI * t) * comp * 0.2 + t * t * curva, ang, x, y); pts.push([p[0], p[1], entre(R, 0.5, 1.1)]); }
    return pts;
  }
  function folha(ctx, x, y, ang, comp, cor, R) {
    var curva = entre(R, -0.15, 0.15) * comp;
    aguada(ctx, formaFolha(x, y, ang, comp, curva, R), cor, 7, 0.06, R);
    // nervura
    ctx.strokeStyle = cor; ctx.globalAlpha = 0.22; ctx.lineWidth = 1;
    var m = girar(comp * 0.5, curva * 0.25, ang, x, y), f = girar(comp * 0.9, curva * 0.8, ang, x, y);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(m[0], m[1], f[0], f[1]); ctx.stroke();
    ctx.globalAlpha = 1;
  }
  function flor(ctx, x, y, r, cor, miolo, R) {
    var n = Math.round(entre(R, 5, 7)), a0 = R() * Math.PI * 2;
    for (var i = 0; i < n; i++) {
      var a = a0 + (i / n) * Math.PI * 2 + entre(R, -0.15, 0.15);
      aguada(ctx, petala(x, y, a, r * entre(R, 0.85, 1.1), r * entre(R, 0.55, 0.8), R), cor, 8, 0.055, R);
    }
    var centro = [];
    for (var k = 0; k < 8; k++) { var t = (k / 8) * Math.PI * 2; centro.push([x + Math.cos(t) * r * 0.2, y + Math.sin(t) * r * 0.2, 1]); }
    aguada(ctx, centro, miolo, 5, 0.12, R);
  }
  function caule(ctx, x0, y0, x1, y1, cx, cy, cor, larg) {
    ctx.strokeStyle = cor; ctx.globalAlpha = 0.4; ctx.lineWidth = larg; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(cx, cy, x1, y1); ctx.stroke();
    ctx.globalAlpha = 1;
  }
  function pontoBezier(t, x0, y0, cx, cy, x1, y1) {
    var u = 1 - t;
    return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1,
      Math.atan2(2 * u * (cy - y0) + 2 * t * (y1 - cy), 2 * u * (cx - x0) + 2 * t * (x1 - cx))];
  }
  function corDaFlor(R, cores) { var r = R(); return r < 0.45 ? cores.rosa : r < 0.8 ? cores.roxo : cores.azul; }

  // um raminho: caule curvo, folhas alternadas e uma flor na ponta
  function raminho(ctx, e, cores) {
    var R = semente(e.seed), s = e.s;
    var incl = e.inclinacao != null ? e.inclinacao : entre(R, 0.3, 0.7);
    var ang = -Math.PI / 2 + (e.lado === 0 ? incl : -incl);
    var comp = s * entre(R, 1.3, 1.7);
    var x1 = e.x + Math.cos(ang) * comp, y1 = e.y + Math.sin(ang) * comp;
    var dobra = entre(R, -0.25, 0.25) * comp;
    var cx = (e.x + x1) / 2 + Math.cos(ang + Math.PI / 2) * dobra, cy = (e.y + y1) / 2 + Math.sin(ang + Math.PI / 2) * dobra;
    caule(ctx, e.x, e.y, x1, y1, cx, cy, cores.folha, Math.max(1.4, s * 0.012));
    var nFolhas = Math.round(entre(R, 3, 5)), lado = R() < 0.5 ? 1 : -1;
    for (var i = 0; i < nFolhas; i++) {
      var t = 0.18 + (i / nFolhas) * 0.62 + entre(R, -0.04, 0.04);
      var p = pontoBezier(t, e.x, e.y, cx, cy, x1, y1);
      var corF = R() < 0.2 ? cores.azul : cores.folha;
      folha(ctx, p[0], p[1], p[2] + lado * entre(R, 0.6, 1.0), s * entre(R, 0.32, 0.48) * (1 - t * 0.35), corF, R);
      lado = -lado;
    }
    // galhinho com uma flor menor
    if (R() < 0.6) {
      var b = pontoBezier(entre(R, 0.45, 0.6), e.x, e.y, cx, cy, x1, y1), ab = b[2] + (R() < 0.5 ? 0.7 : -0.7);
      var bx = b[0] + Math.cos(ab) * s * 0.45, by = b[1] + Math.sin(ab) * s * 0.45;
      caule(ctx, b[0], b[1], bx, by, (b[0] + bx) / 2, (b[1] + by) / 2, cores.folha, Math.max(1, s * 0.008));
      flor(ctx, bx, by, s * entre(R, 0.14, 0.2), corDaFlor(R, cores), cores.miolo, R);
    }
    flor(ctx, x1, y1, s * entre(R, 0.26, 0.36), corDaFlor(R, cores), cores.miolo, R);
  }
  // folhas e pétalas soltas, como se tivessem caído do raminho
  function soltos(ctx, e, cores) {
    var R = semente(e.seed), n = Math.round(entre(R, 1, 3));
    for (var i = 0; i < n; i++) {
      var x = e.x + entre(R, -0.5, 0.5) * e.s, y = e.y + entre(R, -0.5, 0.5) * e.s;
      if (R() < 0.55) folha(ctx, x, y, R() * Math.PI * 2, e.s * entre(R, 0.35, 0.55), R() < 0.25 ? cores.azul : cores.folha, R);
      else aguada(ctx, petala(x, y, R() * Math.PI * 2, e.s * entre(R, 0.25, 0.35), e.s * entre(R, 0.16, 0.24), R), corDaFlor(R, cores), 7, 0.06, R);
    }
  }
  function lerCores() {
    var st = getComputedStyle(document.documentElement);
    function v(n) { return st.getPropertyValue(n).trim(); }
    return { rosa: v("--rosa"), roxo: v("--roxo"), azul: v("--azul"), folha: v("--folha"), miolo: v("--miolo") };
  }

  function planejarFundo(W, H) {
    var R = semente(20251 + Math.round(W / 40)), celular = W < 760;
    var coluna = Math.min(1120, W), margem = celular ? 24 : Math.max(70, (W - coluna) / 2);
    var els = [], y = celular ? 160 : 220, lado = R() < 0.5 ? 0 : 1;
    while (y < H + 80) {
      var s = celular ? entre(R, 70, 115) : entre(R, 150, 250);
      var x = lado === 0 ? entre(R, -0.15, 0.55) * margem : W - entre(R, -0.15, 0.55) * margem;
      els.push({ tipo: "raminho", x: x, y: y, s: s, lado: lado, seed: (R() * 1e9) | 0, alcance: s * 2.1 });
      if (R() < 0.75) {
        var sx = lado === 0 ? x + s * entre(R, 0.3, 0.9) : x - s * entre(R, 0.3, 0.9);
        els.push({ tipo: "soltos", x: sx, y: y + s * entre(R, 0.5, 1.2), s: s * 0.6, seed: (R() * 1e9) | 0, alcance: s });
      }
      y += celular ? entre(R, 230, 380) : entre(R, 240, 400);
      lado = R() < 0.8 ? 1 - lado : lado;
    }
    return els;
  }

  var fundoPendente = 0, fundoW = 0, fundoH = 0;
  function agendarFundo(forcar) {
    cancelAnimationFrame(fundoPendente);
    fundoPendente = requestAnimationFrame(function () { pintarFundo(forcar); });
  }
  function pintarFundo(forcar) {
    var W = app.clientWidth, H = conteudoEl.offsetHeight;
    if (!forcar && W === fundoW && Math.abs(H - fundoH) < 8) return;
    fundoW = W; fundoH = H; ultimaLargura = window.innerWidth;
    fundoEl.style.height = H + "px";
    fundoEl.innerHTML = "";
    var cores = lerCores(), els = planejarFundo(W, H);
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5), TILE = 2000;
    var celular = W < 760, coluna = Math.min(1120, W);
    for (var topo = 0; topo < H; topo += TILE) {
      var th = Math.min(TILE, H - topo), cv = document.createElement("canvas");
      cv.style.top = topo + "px"; cv.style.height = th + "px";
      cv.width = Math.round(W * dpr); cv.height = Math.round(th * dpr);
      fundoEl.appendChild(cv);
      var ctx = cv.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, -topo * dpr);
      els.forEach(function (e) {
        if (e.y + e.alcance < topo || e.y - e.alcance > topo + th) return;
        if (e.tipo === "raminho") raminho(ctx, e, cores); else soltos(ctx, e, cores);
      });
      // clareia o meio da página para o texto continuar fácil de ler
      ctx.globalCompositeOperation = "destination-out";
      var g = ctx.createLinearGradient(0, 0, W, 0);
      if (celular) {
        g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(0.2, "rgba(0,0,0,.55)");
        g.addColorStop(0.8, "rgba(0,0,0,.55)"); g.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        var ini = Math.max(0, (W - coluna) / 2) / W, fim = 1 - ini;
        g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(ini, "rgba(0,0,0,0)");
        g.addColorStop(Math.min(0.49, ini + 0.12), "rgba(0,0,0,.72)");
        g.addColorStop(Math.max(0.51, fim - 0.12), "rgba(0,0,0,.72)");
        g.addColorStop(fim, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,0)");
      }
      ctx.fillStyle = g; ctx.fillRect(0, topo, W, th);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  // imagens de exemplo (artes e projetos sem imagem ainda)
  function pintarPlaceholders() {
    var cores = lerCores();
    document.querySelectorAll("canvas[data-art],canvas[data-ph]").forEach(function (c) {
      var i = Number(c.dataset.art || c.dataset.ph) + (c.dataset.ph ? 50 : 0);
      var w = c.clientWidth, h = c.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2);
      c.width = w * d; c.height = h * d;
      var ctx = c.getContext("2d"); ctx.scale(d, d);
      var m = Math.min(w, h), R = semente(900 + i);
      raminho(ctx, { x: w * entre(R, 0.35, 0.6), y: h * 0.98, s: m * 0.48, lado: i % 2, inclinacao: entre(R, 0.05, 0.3), seed: 300 + i * 7 }, cores);
      soltos(ctx, { x: w * entre(R, 0.25, 0.75), y: h * entre(R, 0.25, 0.6), s: m * 0.4, seed: 500 + i * 13 }, cores);
    });
  }

  /* ---------- cliques ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.lang) {
      lang = b.dataset.lang;
      try { localStorage.setItem("idioma", lang); } catch (x) {}
      render();
    } else if (b.dataset.filtro) {
      filtro = b.dataset.filtro;
      render();
    } else if (b.id === "copiar") {
      copiarEmail(b);
    }
  });
  function copiarEmail(btn) {
    var alvo = document.getElementById("mail"), texto = alvo.textContent;
    function selecionar() {
      var r = document.createRange(); r.selectNodeContents(alvo);
      var s = getSelection(); s.removeAllRanges(); s.addRange(r);
      btn.textContent = t("selecionado");
    }
    try {
      navigator.clipboard.writeText(texto).then(function () {
        btn.textContent = t("copiado");
        setTimeout(function () { btn.textContent = t("copiar"); }, 1800);
      }, selecionar);
    } catch (x) { selecionar(); }
  }

  /* estrutura fixa: camada do fundo + conteúdo */
  var app = document.getElementById("app");
  app.innerHTML = '<div id="bg" aria-hidden="true"></div><div id="conteudo"></div>';
  var fundoEl = document.getElementById("bg");
  var conteudoEl = document.getElementById("conteudo");

  var ultimaLargura = 0, timer;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (window.innerWidth !== ultimaLargura) { pintarPlaceholders(); }
      agendarFundo();
    }, 250);
  });
  try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { pintarPlaceholders(); agendarFundo(true); }); } catch (x) {}
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { agendarFundo(); });
  window.addEventListener("load", function () { agendarFundo(); });

  render();
})();
