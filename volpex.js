/* ----------------------------------------
  CONFIGURAZIONE API GOOGLE SHEET
-----------------------------------------*/

const API_URL =
  "https://script.google.com/macros/s/AKfycbxtaqy6Yv3fKlQB3nMrhEd0GdGAzAYzrF5VoRFzgrtRgK7nqvaxoCLF479YJtupn089/exec";

/* ----------------------------------------
  ROUTING
-----------------------------------------*/

const app = document.getElementById("app");
const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".menu-link.active")?.classList.remove("active");
    link.classList.add("active");
    loadPage(link.dataset.page);
  });
});

/* ----------------------------------------
  NAVIGAZIONE
-----------------------------------------*/

function loadPage(page) {
  switch (page) {
    case "home":
      pageHome();
      break;
    case "clienti":
      pageClienti();
      break;
    case "contratti":
      pageContratti();
      break;
    case "device":
      pageDevice();
      break;
    case "report":
      pageReport();
      break;
    case "import":
      pageImport();
      break;
  }
}

/* ----------------------------------------
  HOME (DASHBOARD)
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

    <br><br>
    <p>💡 “La creatività è l’intelligenza che si diverte.” – Einstein</p>
  `;
}

/* ----------------------------------------
  PAGINA CLIENTI
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

      <!-- ESEMPI (poi li collegheremo al foglio Google) -->
      <tr>
        <td>Mario</td>
        <td>Rossi</td>
        <td>RSSMRA80A01H501U</td>
        <td>3331234567</td>
        <td>mario@email.it</td>
        <td>2</td>
        <td>1</td>
        <td><button class="btn" onclick="openClient('RSSMRA80A01H501U')">Apri</button></td>
      </tr>
    </table>
  `;
}

/* ----------------------------------------
  DETTAGLIO CLIENTE (STEP 1)
-----------------------------------------*/

function openClient(cf) {
  fetch(API_URL + "?action=getClient&cf=" + encodeURIComponent(cf))
    .then((r) => r.json())
    .then((data) => {
      renderClientDetail(data.cliente, data.contratti, data.device);
    })
    .catch((err) => {
      app.innerHTML = "<p>Errore nel caricamento dettagli cliente.</p>";
      console.error(err);
    });
}

function renderClientDetail(c, contratti, device) {
  app.innerHTML = `
    <h1 class="page-title">${c.nome} ${c.cognome}</h1>

    <div class="client-box">
      <h3>Dati Anagrafici</h3>

      <p><strong>Codice Fiscale:</strong> ${c.cf}</p>

      <p><strong>Telefono:</strong> ${c.telefono} 
         <a href="https://wa.me/${normalizeNumber(c.telefono)}" target="_blank" class="btn">WhatsApp</a>
      </p>

      <p><strong>Email:</strong> ${c.email}</p>

      <p><strong>Data nascita:</strong> ${c.dataNascita || calcBirthFromCF(c.cf)}</p>

      <p><strong>Sesso:</strong> ${c.sesso || calcSexFromCF(c.cf)}</p>

      <p><strong>Residenza:</strong> ${c.residenza}</p>
      <p><strong>Stato nascita:</strong> ${c.statoNascita}</p>

      <br>

      <button class="btn">✏️ Modifica</button>
      <button class="btn btn-secondary">➕ Nuovo contratto</button>
      <button class="btn btn-secondary">➕ Nuovo device</button>
    </div>

    <br><br>

    <h2>Contratti</h2>
    <table class="table">
      <tr>
        <th>Compagnia</th>
        <th>Tipo</th>
        <th>Numero</th>
        <th>Costo</th>
        <th>Data</th>
        <th>Fine Vincolo</th>
        <th>Azioni</th>
      </tr>

      ${contratti
        .map(
          (x) => `
        <tr>
          <td>${x.compagnia}</td>
          <td>${x.tipoContratto}</td>
          <td>${x.numero}</td>
          <td>${x.costo}</td>
          <td>${x.data}</td>
          <td>${x.fineVincolo}</td>
          <td>
            <button class="btn">Apri</button>
            <button class="btn btn-secondary">WhatsApp</button>
          </td>
        </tr>
      `
        )
        .join("")}
    </table>

    <br><br>

    <h2>Device</h2>
    <table class="table">
      <tr>
        <th>Device</th>
        <th>Tipo</th>
        <th>IMEI</th>
        <th>Pagamento</th>
        <th>Durata</th>
        <th>Azioni</th>
      </tr>

      ${device
        .map(
          (d) => `
        <tr>
          <td>${d.nomeDevice}</td>
          <td>${d.tipoDevice}</td>
          <td>${d.imei}</td>
          <td>${d.pagamento}</td>
          <td>${d.durata}</td>
          <td><button class="btn">Apri</button></td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;
}

/* ----------------------------------------
  UTILITY: CF → SESSO + DATA NASCITA
-----------------------------------------*/

function calcBirthFromCF(cf) {
  if (!cf || cf.length < 11) return "";

  let year = parseInt(cf.substring(6, 8), 10);
  let monthCode = cf[8];
  let day = parseInt(cf.substring(9, 11), 10);

  const months = "ABCDEHLMPRST";
  let month = months.indexOf(monthCode) + 1;

  if (day > 40) day -= 40;
  year += year < 30 ? 2000 : 1900;

  return `${String(day).padStart(2, "0")}/${String(month).padStart(
    2,
    "0"
  )}/${year}`;
}

function calcSexFromCF(cf) {
  const day = parseInt(cf.substring(9, 11), 10);
  return day > 40 ? "F" : "M";
}

function normalizeNumber(num) {
  if (!num) return "";
  num = num.replace(/\D/g, "");
  if (!num.startsWith("39")) num = "39" + num;
  return num;
}

/* ----------------------------------------
  CONTRATTI (placeholder)
-----------------------------------------*/

function pageContratti() {
  app.innerHTML = `
    <h1 class="page-title">Contratti</h1>
    <p>Funzione in sviluppo...</p>
  `;
}

/* ----------------------------------------
  DEVICE (placeholder)
-----------------------------------------*/

function pageDevice() {
  app.innerHTML = `
    <h1 class="page-title">Device</h1>
    <p>Funzione in sviluppo...</p>
  `;
}

/* ----------------------------------------
  REPORT (placeholder)
-----------------------------------------*/

function pageReport() {
  app.innerHTML = `
    <h1 class="page-title">Report</h1>
    <p>Grafici e analisi in arrivo...</p>
  `;
}

/* ----------------------------------------
  IMPORT DATI (CON PARSER PDF)
-----------------------------------------*/

function pageImport() {
  app.innerHTML = `
    <h1 class="page-title">Importa Dati</h1>

    <textarea id="pasteArea" placeholder="Incolla qui testo estratto dal PDF/contratto..." 
    style="min-height:180px;"></textarea>

    <br><br>
    <button id="parseBtn" class="btn">🔍 Analizza Testo</button>

    <div id="importResult" style="margin-top:20px;"></div>
  `;

  document
    .getElementById("parseBtn")
    .addEventListener("click", () => {
      const text = document.getElementById("pasteArea").value.trim();
      const parsed = parseContract(text);

      document.getElementById("importResult").innerHTML = `
        <h3>Risultato Analisi</h3>
        <pre>${JSON.stringify(parsed, null, 2)}</pre>
      `;
    });
}

/* ----------------------------------------
  PARSER CONTRATTO (ESTRAZIONE DATI)
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
    note: get("Note"),
  };
}

/* ----------------------------------------
  CARICA PAGINA HOME DI DEFAULT
-----------------------------------------*/

loadPage("home");
