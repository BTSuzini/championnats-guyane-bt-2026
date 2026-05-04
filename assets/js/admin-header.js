import { logout } from "./session.js";

const EPREUVE_LABELS = {
  DM: "Double Messieurs",
  DD: "Double Dames"
};

const CATEGORIES = ["U14", "U18", "Seniors", "45+"];
const EPREUVES = ["DM", "DD"];

const headerMount = document.getElementById("adminHeader");

const currentPage = location.pathname.split("/").pop() || "index.html";
const needsZoneSelector = document.body.dataset.zoneSelector !== "none";

function navClass(page){
  return currentPage === page ? "admin-nav-link primary" : "admin-nav-link";
}

function getSavedZone(){
  let categorie = "U14";
  let epreuve = "DM";

  try{
    const savedCat = localStorage.getItem("champ_admin_categorie");
    const savedEpreuve = localStorage.getItem("champ_admin_epreuve");

    if(CATEGORIES.includes(savedCat)) categorie = savedCat;
    if(EPREUVES.includes(savedEpreuve)) epreuve = savedEpreuve;
  }catch(error){}

  return { categorie, epreuve };
}

function saveZone(categorie, epreuve){
  try{
    localStorage.setItem("champ_admin_categorie", categorie);
    localStorage.setItem("champ_admin_epreuve", epreuve);
  }catch(error){}
}

function emitZoneChange(categorie, epreuve){
  document.dispatchEvent(new CustomEvent("adminZoneChange", {
    detail: {
      categorie,
      epreuve,
      label: `${categorie} — ${EPREUVE_LABELS[epreuve]}`
    }
  }));
}

function injectStyles(){
  if(document.getElementById("adminHeaderStyles")) return;

  const style = document.createElement("style");
  style.id = "adminHeaderStyles";
  style.textContent = `
    :root{
      --clay:#c65a1e;
      --clay-dark:#8e3a13;
      --clay-light:#ee8a3a;
      --sky:#27bced;
      --aqua:#00a9c8;
      --blue:#075b9a;
      --blue-dark:#063b72;
      --text:#17212b;
      --muted:#667085;
      --card:rgba(255,255,255,.94);
      --shadow:0 16px 40px rgba(16,24,40,.12);
      --container:1180px;

      --admin-header-h:158px;
      --admin-zone-h:104px;
      --admin-total-top:262px;
    }

    .admin-container{
      width:min(var(--container), calc(100% - 28px));
      margin:0 auto;
    }

    .admin-site-header{
      position:fixed;
      top:0;
      left:0;
      right:0;
      z-index:1000;
      background:linear-gradient(135deg,var(--clay-dark),var(--clay),var(--clay-light));
      box-shadow:0 10px 26px rgba(142,58,19,.28);
    }

    .admin-header-inner{
      min-height:var(--admin-header-h);
      display:grid;
      grid-template-columns:80px 1fr 80px;
      grid-template-rows:auto auto;
      align-items:center;
      gap:10px 18px;
      padding:12px 0 14px;
    }

    .admin-header-logo{
      width:80px;
      height:80px;
      display:flex;
      align-items:center;
      justify-content:center;
    }

    .admin-header-logo img{
      max-width:100%;
      max-height:100%;
      object-fit:contain;
      filter:drop-shadow(0 6px 10px rgba(0,0,0,.18));
    }

    .admin-header-title{
      text-align:center;
      color:#fff;
    }

    .admin-header-title strong{
      display:block;
      font-size:clamp(22px,4vw,42px);
      line-height:.95;
      letter-spacing:-.04em;
      text-transform:uppercase;
      font-weight:1000;
    }

    .admin-header-title span{
      display:block;
      margin-top:5px;
      font-size:13px;
      font-weight:900;
      color:rgba(255,255,255,.88);
      text-transform:uppercase;
      letter-spacing:.08em;
    }

    .admin-nav-wrap{
      grid-column:1 / 4;
      position:relative;
      overflow:hidden;
      padding:0 34px;
    }

    .admin-nav-wrap::before,
    .admin-nav-wrap::after{
      content:"";
      position:absolute;
      top:0;
      bottom:0;
      width:40px;
      z-index:2;
      pointer-events:none;
    }

    .admin-nav-wrap::before{
      left:0;
      background:linear-gradient(90deg, rgba(142,58,19,.98), rgba(142,58,19,0));
    }

    .admin-nav-wrap::after{
      right:0;
      background:linear-gradient(270deg, rgba(198,90,30,.98), rgba(198,90,30,0));
    }

    .admin-nav-arrow{
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

    .admin-nav-arrow.left{left:2px;}
    .admin-nav-arrow.right{right:2px;}

    .admin-nav{
      display:flex;
      gap:10px;
      overflow-x:auto;
      padding:2px 4px;
      scrollbar-width:none;
      -webkit-overflow-scrolling:touch;
    }

    .admin-nav::-webkit-scrollbar{display:none;}

    .admin-nav-link{
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

    .admin-nav-link.primary{
      background:linear-gradient(180deg,var(--blue),var(--blue-dark));
      color:#fff;
    }

    .admin-zonebar{
      position:fixed;
      top:var(--admin-header-h);
      left:0;
      right:0;
      z-index:999;
      background:linear-gradient(135deg,#dff7ff,#effcff);
      border-bottom:1px solid rgba(7,91,154,.10);
      box-shadow:0 8px 18px rgba(16,24,40,.06);
      padding:14px 0 16px;
    }

    .admin-zone-line{
      display:flex;
      align-items:center;
      gap:10px;
      overflow-x:auto;
      scrollbar-width:none;
      -webkit-overflow-scrolling:touch;
      padding:3px 2px;
    }

    .admin-zone-line + .admin-zone-line{
      margin-top:8px;
    }

    .admin-zone-line::-webkit-scrollbar{display:none;}

    .admin-zone-btn{
      flex:0 0 auto;
      min-height:34px;
      padding:7px 18px;
      border-radius:999px;
      border:1px solid rgba(7,91,154,.14);
      background:#fff;
      color:#1c2430;
      font-size:13px;
      font-weight:1000;
      cursor:pointer;
      box-shadow:0 5px 12px rgba(16,24,40,.05);
    }

    .admin-zone-btn[aria-selected="true"]{
      background:linear-gradient(180deg,var(--blue),var(--blue-dark));
      color:#fff;
      border-color:var(--blue);
      box-shadow:0 8px 18px rgba(7,91,154,.22);
    }

    .admin-zone-btn.all-active{
      background:linear-gradient(180deg,#e4f7ff,#c9f0ff);
      color:var(--blue-dark);
      border-color:rgba(39,188,237,.28);
    }

    .admin-zone-btn.all-active[aria-selected="true"]{
      background:linear-gradient(180deg,#e4f7ff,#c9f0ff);
      color:var(--blue-dark);
      border-color:rgba(39,188,237,.28);
      box-shadow:0 5px 12px rgba(16,24,40,.05);
    }

    @media (min-width:760px){
      .admin-header-inner{
        grid-template-columns:100px 1fr 100px;
      }

      .admin-header-logo{
        width:96px;
        height:80px;
      }

      .admin-nav{
        justify-content:center;
      }
    }

    @media (max-width:759px){
      :root{
        --admin-header-h:150px;
        --admin-zone-h:104px;
        --admin-total-top:254px;
      }
    }
  `;
  document.head.appendChild(style);
}

function renderHeader(){
  if(!headerMount) return;

  const zone = getSavedZone();

  headerMount.innerHTML = `
    <header class="admin-site-header">
      <div class="admin-container admin-header-inner">
        <div class="admin-header-logo">
          <img src="../assets/img/logo-lg.png" alt="Ligue Guyane">
        </div>

        <div class="admin-header-title">
          <strong>Admin<br>Championnats</strong>
          <span>Guyane Beach Tennis</span>
        </div>

        <div class="admin-header-logo">
          <img src="../assets/img/logo-lg.png" alt="Ligue Guyane">
        </div>

        <div class="admin-nav-wrap">
          <span class="admin-nav-arrow left">‹</span>
          <nav class="admin-nav" aria-label="Navigation admin">
            <a class="admin-nav-link" href="../index.html">🏠 Accueil public</a>
            <a class="${navClass("index.html")}" href="index.html">🛠️ Admin</a>
            <a class="${navClass("inscriptions.html")}" href="inscriptions.html">📝 Inscriptions</a>
            <a class="${navClass("equipes.html")}" href="equipes.html">👥 Équipes</a>
            <a class="${navClass("programmation.html")}" href="programmation.html">📅 Programmation</a>
            <a class="${navClass("resultats.html")}" href="resultats.html">🏆 Résultats</a>
            <a class="${navClass("roles.html")}" href="roles.html">🔐 Rôles</a>
            <a class="admin-nav-link" href="#" id="adminBtnLogout">🚪 Déconnexion</a>
          </nav>
          <span class="admin-nav-arrow right">›</span>
        </div>
      </div>
    </header>

    <section class="admin-zonebar">
      <div class="admin-container">
        <div class="admin-zone-line" aria-label="Sélection catégorie">
          ${CATEGORIES.map(cat => `
            <button
              class="admin-zone-btn ${needsZoneSelector ? "" : "all-active"}"
              type="button"
              data-admin-cat="${cat}"
              aria-selected="${needsZoneSelector ? String(cat === zone.categorie) : "true"}"
            >${cat}</button>
          `).join("")}
        </div>

        <div class="admin-zone-line" aria-label="Sélection épreuve">
          <button
            class="admin-zone-btn ${needsZoneSelector ? "" : "all-active"}"
            type="button"
            data-admin-epreuve="DM"
            aria-selected="${needsZoneSelector ? String(zone.epreuve === "DM") : "true"}"
          >👨 Double Messieurs</button>

          <button
            class="admin-zone-btn ${needsZoneSelector ? "" : "all-active"}"
            type="button"
            data-admin-epreuve="DD"
            aria-selected="${needsZoneSelector ? String(zone.epreuve === "DD") : "true"}"
          >👩 Double Dames</button>
        </div>
      </div>
    </section>
  `;

  const logoutBtn = document.getElementById("adminBtnLogout");
  if(logoutBtn){
    logoutBtn.onclick = async (event) => {
      event.preventDefault();
      await logout();
      window.location.href = "../index.html";
    };
  }

  if(needsZoneSelector){
    bindZoneButtons(zone.categorie, zone.epreuve);
  }else{
    emitZoneChange("ALL", "ALL");
  }
}

function bindZoneButtons(initialCategorie, initialEpreuve){
  let categorie = initialCategorie;
  let epreuve = initialEpreuve;

  const catBtns = [...document.querySelectorAll("[data-admin-cat]")];
  const epreuveBtns = [...document.querySelectorAll("[data-admin-epreuve]")];

  function refresh(){
    catBtns.forEach(btn => {
      btn.setAttribute("aria-selected", btn.dataset.adminCat === categorie ? "true" : "false");
    });

    epreuveBtns.forEach(btn => {
      btn.setAttribute("aria-selected", btn.dataset.adminEpreuve === epreuve ? "true" : "false");
    });

    saveZone(categorie, epreuve);
    emitZoneChange(categorie, epreuve);
  }

  catBtns.forEach(btn => {
    btn.onclick = () => {
      categorie = btn.dataset.adminCat;
      refresh();
    };
  });

  epreuveBtns.forEach(btn => {
    btn.onclick = () => {
      epreuve = btn.dataset.adminEpreuve;
      refresh();
    };
  });

  refresh();
}

injectStyles();
renderHeader();
