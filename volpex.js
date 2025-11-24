// API GOOGLE SHEET
const API_URL = "https://script.google.com/macros/s/AKfycbxtaqy6Yv3fKlQB3nMrhEd0GdGAzAYzrF5VoRFzgrtRgK7nqvaxoCLF479YJtupn089/exec";

// ROUTING
const app = document.getElementById("app");
const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".menu-link.active")?.classList.remove("active");
    link.classList.add("active");
    loadPage(link.dataset.page);
  });
});

// LOAD PAGE
function loadPage(page) {
  switch (page) {
    case "home": pageHome(); break;
    case "clienti": pageClienti(); break;
    case "contratti": pageContratti(); break;
    case "device": pageDevice(); break;
    case "report": pageReport(); break;
    case "import": pageImport(); break;
  }
}

/* ----------------------------------------
   HOME
-----------------------------------------*/
function pageHome() {
  app.innerHTML = `
    <h1 class="page-title">Dashboard</h1>

    <div class="kpi-boxes">
      <div class="kpi"><h3>Clienti totali</h3><p>–</p></div>
      <div class="kpi"><h3>Contratti mese</h3><p>–</p></div>
      <div class="kpi"><h3>Device venduti</h3><p>–</p></div>
      <div class="kpi"><h3>Scadenze imminenti</h3><p>–</p></div>
    </div>
  `;
}

/* ----------------------------------------
   CLIENTI
-----------------------------------------*/
function pageClienti() {
  app.innerHTML = `
    <h1 class="page-title">Clienti</h1>

    <button class="btn">➕ Nuovo cliente</button>
    <button class="btn btn-secondary">📤 Export CSV</button>

    <table class="table">
      <tr>
        <th>Nome</th>
        <th>Cognome</th>
        <th>CF</th>
        <th>Telefono</th>
        <th>Email</th>
        <th>#Contratti</th>
        <th>#Device</th>
        <th>Azioni</th>
      </tr>

      <tr>
        <td>Mario</td>
        <td>Rossi</td>
        <td>RSSMRA80A01H501U</td>
        <td>3331234567</td>
        <td>mario@email.it</td>
        <td>2</td>
        <td>1</td>
        <td><button class="btn">Apri</button></td>
      </tr>
    </table>
  `;
}

/* ----------------------------------------
   CONTRATTI
-----------------------------------------*/
function pageContratti() {
  app.innerHTML = `
    <h1 class="page-title">Contratti</h1>
    <p>Pagina contratti in sviluppo...</p>
  `;
}

/* ----------------------------------------
   DEVICE
-----------------------------------------*/
function pageDevice() {
  app.innerHTML = `
    <h1 class="page-title">Device</h1>
    <p>Pagina device in sviluppo...</p>
  `;
}

/* ----------------------------------------
   REPORT
-----------------------------------------*/
function pageReport() {
  app.innerHTML = `
    <h1 class="page-title">Report</h1>
    <p>Analisi e grafici in arrivo...</p>
  `;
}

/* ----------------------------------------
   IMPORT
-----------------------------------------*/
function pageImport() {
  app.innerHTML = `
    <h1 class="page-title">Importa Dati</h1>

    <textarea id="pasteArea" placeholder="Incolla qui testo da PDF/contratto..." style="width:100%; height:180px;"></textarea>

    <br><br>
    <button id="parseBtn" class="btn">🔍 Analizza Testo</button>

    <div id="importResult" style="margin-top:20px;"></div>
  `;

  document.getElementById("parseBtn").addEventListener("click", () => {
    const text = document.getElementById("pasteArea").value.trim();
    const parsed = parseContract(text);

    document.getElementById("importResult").innerHTML = `
      <h3>Risultato analisi</h3>
      <pre>${JSON.stringify(parsed, null, 2)}</pre>
    `;
  });
}

/* ----------------------------------------
   PARSER CONTRATTI (PDF → DATI)
-----------------------------------------*/
function parseContract(text) {
  function get(field) {
    const r = new RegExp(field + ":\\s*(.+)", "i");
    const m = text.match(r);
    return m ? m[1].trim() : "";
  }

  return {
    nome: get("Nome"),
    cognome: get("Cognome"),
    cf: get("Codice Fiscale"),
    telefono: get("Telefono"),
    email: get("Email"),
    operatore: get("Operatore"),
    tipoContratto: get("Tipo Contratto"),
    numero: get("Numero Contratto"),
    dataContratto: get("Data Contratto"),
    costo: get("Costo Mensile"),
    mnpNumero: get("Numero da Portare"),
    iccidVecchio: get("Vecchio ICCID"),
    iccidNuovo: get("Nuovo ICCID"),
    dataPortabilita: get("Data Portabilità"),
    imei: get("IMEI"),
    modello: get("Modello Telefono"),
    iban: get("IBAN"),
    note: get("Note")
  };
}

// Default page
loadPage("home");
