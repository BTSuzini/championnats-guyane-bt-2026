const headerMount = document.getElementById("publicHeader");

const currentPage = location.pathname.split("/").pop() || "index.html";

function navClass(page){
  return currentPage === page ? "public-nav-link primary" : "public-nav-link";
}

function injectStyles(){
  if(document.getElementById("publicHeaderStyles")) return;

  const style = document.createElement("style");
  style.id = "publicHeaderStyles";
  style.textContent = `
    :root{
      --clay:#c65a1e;
      --clay-dark:#8e3a13;
      --clay-light:#ee8a3a;
      --blue:#075b9a;
      --blue-dark:#063b72;
      --sky:#27bced;
      --container:1180px;
      --public-header-h:158px;
      --public-total-top:158px;
    }

    .public-container{
      width:min(var(--container), calc(100% - 28px));
      margin:0 auto;
    }

    .public-site-header{
      position:fixed;
      top:0;
      left:0;
      right:0;
      z-index:1000;
      background:linear-gradient(135deg,var(--clay-dark),var(--clay),var(--clay-light));
      box-shadow:0 10px 26px rgba(142,58,19,.28);
    }

    .public-header-inner{
      min-height:var(--public-header-h);
      display:grid;
      grid-template-columns:80px 1fr 80px;
      grid-template-rows:auto auto;
      align-items:center;
      gap:10px 18px;
      padding:12px 0 14px;
    }

    .public-header-logo{
      width:80px;
      height:80px;
      display:flex;
      align-items:center;
      justify-content:center;
    }

    .public-header-logo img{
      max-width:100%;
      max-height:100%;
      object-fit:contain;
      filter:drop-shadow(0 6px 10px rgba(0,0,0,.18));
    }

    .public-header-title{
      text-align:center;
      color:#fff;
    }

    .public-header-title strong{
      display:block;
      font-size:clamp(22px,4vw,42px);
      line-height:.95;
      letter-spacing:-.04em;
      text-transform:uppercase;
      font-weight:1000;
    }

    .public-nav-wrap{
      grid-column:1 / 4;
      position:relative;
      overflow:hidden;
      padding:0 34px;
    }

    .public-nav-wrap::before,
    .public-nav-wrap::after{
      content:"";
      position:absolute;
      top:0;
      bottom:0;
      width:40px;
      z-index:2;
      pointer-events:none;
    }

    .public-nav-wrap::before{
      left:0;
      background:linear-gradient(90deg, rgba(142,58,19,.98), rgba(142,58,19,0));
    }

    .public-nav-wrap::after{
      right:0;
      background:linear-gradient(270deg, rgba(198,90,30,.98), rgba(198,90,30,0));
    }

    .public-nav-arrow{
      position:absolute;
      top:50%;
      transform:translateY(-50%);
      z-index:3;
      width:28px;
      height:28px;
      border-radius:999px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:rgba(255,255,255,.88);
      color:var(--clay-dark);
      font-size:20px;
      font-weight:1000;
      box-shadow:0 6px 14px rgba(0,0,0,.18);
      pointer-events:none;
    }

    .public-nav-arrow.left{left:2px;}
    .public-nav-arrow.right{right:2px;}

    .public-nav{
      display:flex;
      gap:10px;
      overflow-x:auto;
      padding:2px 4px;
      scrollbar-width:none;
      -webkit-overflow-scrolling:touch;
    }

    .public-nav::-webkit-scrollbar{display:none;}

    .public-nav-link{
      flex:0 0 auto;
      min-height:42px;
      padding:10px 17px;
      border-radius:999px;
      background:rgba(255,255,255,.92);
      color:#344054;
      font-size:14px;
      font-weight:900;
      white-space:nowrap;
      box-shadow:0 8px 16px rgba(0,0,0,.14);
      text-decoration:none;
    }

    .public-nav-link.primary{
      background:linear-gradient(180deg,var(--blue),var(--blue-dark));
      color:#fff;
    }

    .public-zonebar{
      position:fixed;
      top:var(--public-header-h);
      left:0;
      right:0;
      z-index:999;
      background:
        radial-gradient(circle at 18% 10%, rgba(255,255,255,.42), transparent 24%),
        radial-gradient(circle at 80% 24%, rgba(255,255,255,.26), transparent 24%),
        linear-gradient(135deg,#23b7ea 0%,#7fdfff 48%,#f5fdff 100%);
      box-shadow:0 8px 18px rgba(16,24,40,.08);
      border-bottom:1px solid rgba(7,91,154,.10);
      padding:14px 0 16px;
    }

    .public-zonebar-inner{
      display:grid;
      gap:8px;
    }

    .public-zone-line{
      display:flex;
      justify-content:center;
      align-items:center;
      gap:10px;
      overflow-x:auto;
      scrollbar-width:none;
      -webkit-overflow-scrolling:touch;
      padding:3px 2px;
    }

    .public-zone-line::-webkit-scrollbar{display:none;}

    .public-zone-btn{
      flex:0 0 auto;
      min-height:34px;
      padding:7px 18px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.36);
      background:rgba(255,255,255,.82);
      color:#1c2430;
      font-size:13px;
      font-weight:1000;
      cursor:pointer;
      box-shadow:0 5px 12px rgba(16,24,40,.08);
      touch-action:manipulation;
    }

    .public-zone-btn[aria-selected="true"]{
      background:linear-gradient(180deg,var(--blue),var(--blue-dark));
      color:#fff;
      border-color:var(--blue);
      box-shadow:0 8px 18px rgba(7,91,154,.24);
    }

    @media (min-width:760px){
      .public-header-inner{
        grid-template-columns:100px 1fr 100px;
      }

      .public-header-logo{
        width:96px;
        height:80px;
      }

      .public-nav{
        justify-content:center;
      }
    }

    @media (max-width:759px){
      :root{
        --public-header-h:150px;
        --public-total-top:150px;
      }

      .public-zone-line{
        justify-content:flex-start;
      }
    }
  `;
  document.head.appendChild(style);
}

function renderHeader(){
  if(!headerMount) return;

  headerMount.innerHTML = `
    <header class="public-site-header">
      <div class="public-container public-header-inner">
        <div class="public-header-logo">
          <img src="../assets/img/logo-lg.png" alt="Ligue Guyane">
        </div>

        <div class="public-header-title">
          <strong>Championnats Guyane<br>Beach Tennis</strong>
        </div>

        <div class="public-header-logo">
          <img src="../assets/img/logo-lg.png" alt="Ligue Guyane">
        </div>

        <div class="public-nav-wrap">
          <span class="public-nav-arrow left">‹</span>
          <nav class="public-nav" aria-label="Navigation publique">
            <a class="public-nav-link" href="../index.html">🏠 Accueil</a>
            <a class="${navClass("inscriptions.html")}" href="inscriptions.html">📝 Inscriptions</a>
            <a class="${navClass("equipes.html")}" href="equipes.html">👥 Équipes</a>
            <a class="${navClass("programmation.html")}" href="programmation.html">📅 Programmation</a>
            <a class="${navClass("resultats.html")}" href="resultats.html">🏆 Résultats</a>
            <a class="${navClass("reglement.html")}" href="reglement.html">📘 Règlement</a>
            <a class="${navClass("restauration.html")}" href="restauration.html">🍽️ Restauration</a>
            <a class="${navClass("contact.html")}" href="contact.html">📩 Contact</a>
          </nav>
          <span class="public-nav-arrow right">›</span>
        </div>
      </div>
    </header>
  `;
}

injectStyles();
renderHeader();
