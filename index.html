const API_URL = 'https://script.google.com/macros/s/AKfycbxtaqy6Yv3fKlQB3nMrhEd0GdGAzAYzrF5VoRFzgrtRgK7nqvaxoCLF479YJtupn089/exec';

const VOLPEX_QUOTES = [
  'Ogni cliente è una relazione, non solo una riga di Excel.',
  'I numeri ti dicono dove sei, le idee ti dicono dove puoi arrivare.',
  'Creatività + dati = strategia che funziona davvero.',
  'Piccoli miglioramenti ogni giorno battono il colpo di fortuna una volta sola.',
  'Se puoi misurarlo, puoi migliorarlo.',
  'Il futuro del tuo business è già scritto nei tuoi dati: devi solo leggerli.'
];

const State = {
  data: { customers: [], contracts: [], devices: [] },
  ui: {
    tab: 'clients',
    search: '',
    modal: null,
    editing: null,
    syncing: false,
    heroQuoteIndex: 0,
    importPreview: null,
    importStep: 'input',
    report: {
      birthMonth: new Date().getMonth(),
      expiryMonth: new Date().getMonth(),
      expiryYear: new Date().getFullYear(),
      highValue: 30,
      minContracts: 2
    }
  },

  async init() {
    try {
      const res = await fetch(API_URL + '?type=all');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      let customers = Array.isArray(json.customers) ? json.customers : [];
      const contracts = Array.isArray(json.contracts) ? json.contracts : [];
      const devices = Array.isArray(json.devices) ? json.devices : [];

      const byCf = {};
      const normalized = [];
      customers.forEach(c => {
        const cf = (c.codice_fiscale || '').toUpperCase().replace(/\s/g, '');
        if (!cf) {
          normalized.push(c);
          return;
        }
        if (!byCf[cf]) {
          byCf[cf] = { ...c, codice_fiscale: cf };
          normalized.push(byCf[cf]);
        } else {
          byCf[cf] = { ...byCf[cf], ...c };
        }
      });

      customers = normalized.map(c => ({
        ...c,
        codice_fiscale: (c.codice_fiscale || '').toUpperCase().replace(/\s/g, ''),
        data_nascita: getCustomerBirthDate(c) || c.data_nascita || ''
      }));

      this.data = { customers, contracts, devices };
      localStorage.setItem('volpex_state', JSON.stringify(this.data));
    } catch (err) {
      console.warn('Errore caricamento remoto, uso cache locale:', err);
      const cached = localStorage.getItem('volpex_state');
      if (cached) this.data = JSON.parse(cached);
    }

    if (
      !Number.isInteger(this.ui.heroQuoteIndex) ||
      this.ui.heroQuoteIndex < 0 ||
      this.ui.heroQuoteIndex >= VOLPEX_QUOTES.length
    ) {
      this.ui.heroQuoteIndex = Math.floor(Math.random() * VOLPEX_QUOTES.length);
    }
  },

  async save() {
    this.ui.syncing = true;
    render();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.data)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      localStorage.setItem('volpex_state', JSON.stringify(this.data));
      showToast('Dati sincronizzati con Volpex Sheet');
    } catch (err) {
      console.error('Errore salvataggio:', err);
      showToast('Errore salvataggio su Google Sheet', 'error');
    } finally {
      this.ui.syncing = false;
      render();
    }
  },

  upsertCustomer(p) {
    const cf = (p.codice_fiscale || '').toUpperCase().replace(/\s/g, '');
    const birth = p.data_nascita || birthDateFromCF(cf) || '';
    const list = [...this.data.customers];
    const editing = this.ui.editing;

    if (editing && editing.id) {
      const newItem = { ...editing, ...p, codice_fiscale: cf, data_nascita: birth };
      const filtered = list.filter(c => c.id !== editing.id && c.codice_fiscale !== cf);
      filtered.unshift(newItem);
      this.data.customers = filtered;
    } else {
      const idx = list.findIndex(c => c.codice_fiscale === cf);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...p, codice_fiscale: cf, data_nascita: birth };
        this.data.customers = list;
      } else {
        this.data.customers = [{ id: 'c_' + Date.now(), ...p, codice_fiscale: cf, data_nascita: birth }, ...list];
      }
    }

    this.ui.modal = null;
    this.ui.editing = null;
    this.save();
  },

  removeCustomer(id) {
    this.data.customers = this.data.customers.filter(c => c.id !== id);
    this.save();
  },

  upsertContract(p) {
    const baseDate = p.data || p.data_attivazione || '';
    const autoPort = computePortabilityDate(baseDate);
    if (!p.data_portabilita) p.data_portabilita = autoPort;

    const list = [...this.data.contracts];
    const editing = this.ui.editing;

    if (editing && editing.id) {
      const idx = list.findIndex(c => c.id === editing.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...p };
        this.data.contracts = list;
      } else {
        this.data.contracts = [{ id: 'ctr_' + Date.now(), ...p }, ...list];
      }
    } else {
      this.data.contracts = [{ id: 'ctr_' + Date.now(), ...p }, ...list];
    }

    const cf = (p.codice_fiscale || '').toUpperCase().replace(/\s/g, '');
    if (cf && !this.data.customers.some(c => c.codice_fiscale === cf)) {
      const newC = {
        id: 'c_' + Date.now(),
        codice_fiscale: cf,
        nome: p.nome || '',
        cognome: p.cognome || '',
        telefono: p.numero_contatto || '',
        email: '',
        data_nascita: birthDateFromCF(cf) || ''
      };
      this.data.customers = [newC, ...this.data.customers];
    }

    this.ui.modal = null;
    this.ui.editing = null;
    this.save();
  },

  removeContract(id) {
    this.data.contracts = this.data.contracts.filter(c => c.id !== id);
    this.save();
  },

  upsertDevice(p) {
    const list = [...this.data.devices];
    const editing = this.ui.editing;

    if (editing && editing.id) {
      const idx = list.findIndex(d => d.id === editing.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...p };
        this.data.devices = list;
      } else {
        this.data.devices = [{ id: 'dev_' + Date.now(), ...p }, ...list];
      }
    } else {
      this.data.devices = [{ id: 'dev_' + Date.now(), ...p }, ...list];
    }

    this.ui.modal = null;
    this.ui.editing = null;
    this.save();
  },

  removeDevice(id) {
    this.data.devices = this.data.devices.filter(d => d.id !== id);
    this.save();
  }
};

let toastTimeout = null;
function showToast(m, t = 'success') {
  const ex = document.querySelector('.toast');
  if (ex) ex.remove();
  const el = document.createElement('div');
  el.className = 'toast' + (t === 'error' ? ' error' : '');
  el.textContent = m;
  document.body.appendChild(el);
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.remove(), 2800);
}

function esc(s) {
  return (s ?? '').toString().replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function birthDateFromCF(cf) {
  if (!cf || cf.length < 11) return '';
  const s = cf.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (s.length < 11) return '';
  const yearStr = s.slice(6, 8);
  const monthChar = s[8];
  const dayStr = s.slice(9, 11);
  const months = { A: 1, B: 2, C: 3, D: 4, E: 5, H: 6, L: 7, M: 8, P: 9, R: 10, S: 11, T: 12 };
  const m = months[monthChar];
  if (!m) return '';
  let day = parseInt(dayStr, 10);
  if (isNaN(day)) return '';
  if (day > 40) day -= 40;
  let year = parseInt(yearStr, 10);
  if (isNaN(year)) return '';
  const currentYear = new Date().getFullYear() % 100;
  const century = year <= currentYear ? 2000 : 1900;
  year = century + year;
  const mm = String(m).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function genderFromCF(cf) {
  if (!cf || cf.length < 11) return '';
  const s = cf.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (s.length < 11) return '';
  const dayStr = s.slice(9, 11);
  let day = parseInt(dayStr, 10);
  if (isNaN(day)) return '';
  return day > 40 ? 'F' : 'M';
}

function getCustomerBirthDate(c) {
  if (c.data_nascita) return c.data_nascita;
  return birthDateFromCF(c.codice_fiscale || '');
}

function formatPhoneForWhatsApp(raw) {
  if (!raw) return '';
  let s = String(raw).trim();
  s = s.replace(/[^\d+]/g, '');
  s = s.replace(/^\+/, '');
  if (s.startsWith('0')) s = '39' + s.slice(1);
  if (!s.startsWith('39') && s.length === 10) s = '39' + s;
  s = s.replace(/\D/g, '');
  return s;
}

function parseDateToISO(str) {
  if (!str) return '';
  str = String(str).trim();
  let m = str.match(/^(\d{2})[\/\-\.](\d{2})[\/\-\.](\d{4})$/);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  m = str.match(/^(\d{4})[\/\-\.](\d{2})[\/\-\.](\d{2})$/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return '';
}

function addBusinessDays(date, days) {
  const d = new Date(date.getTime());
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const g = d.getDay();
    if (g !== 0 && g !== 6) added++;
  }
  return d;
}

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

function computePortabilityDate(contractDateStr) {
  let d = contractDateStr ? new Date(contractDateStr) : new Date();
  if (isNaN(d.getTime())) d = new Date();
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  const res = addBusinessDays(d, 2);
  return toISODate(res);
}

function parseAndImportRaw(raw) {
  if (!raw || !raw.trim()) return null;
  const text = raw.replace(/\r\n/g, '\n');

  function val(label) {
    const re = new RegExp('^' + label + '\\s*:\\s*(.+)$', 'im');
    const m = text.match(re);
    return m ? m[1].trim() : '';
  }

  const nome = val('Nome');
  const cognome = val('Cognome');
  const cfRaw = val('Codice Fiscale');
  const tel = val('Telefono');
  const email = val('Email');
  const nascitaStr = val('Data di nascita') || val('Data Nascita');
  const sessoRaw = val('Sesso');

  const cf = (cfRaw || '').toUpperCase().replace(/\s/g, '');
  const data_nascita = parseDateToISO(nascitaStr) || birthDateFromCF(cf) || '';

  const sesso = /^f/i.test(sessoRaw) ? 'F' : (/^m/i.test(sessoRaw) ? 'M' : '');

  const cliente = {
    codice_fiscale: cf,
    nome,
    cognome,
    telefono: tel,
    email: (email || '').toLowerCase(),
    data_nascita,
    residenza: '',
    stato_nascita: 'Italia',
    sesso
  };

  const operatore = val('Operatore');
  const tipoContrRaw = val('Tipo Contratto');
  let tipoContratto = '';
  if (/mobile/i.test(tipoContrRaw)) tipoContratto = 'Mobile';
  else if (/fisso|fibra|ftth|adsl/i.test(tipoContrRaw)) tipoContratto = 'Fisso';
  else if (/luce/i.test(tipoContrRaw)) tipoContratto = 'Luce';
  else if (/gas/i.test(tipoContrRaw)) tipoContratto = 'Gas';
  else if (/tv/i.test(tipoContrRaw)) tipoContratto = 'TV';

  const numContratto = val('Numero Contratto');
  const dataContrattoISO = parseDateToISO(val('Data Contratto'));
  const piano = val('Piano');
  const costoRaw = val('Costo Mensile');
  const costoPulito = (costoRaw || '').replace(/[^\d,\.]/g, '').replace(',', '.');

  const numDaPortare = val('Numero da Portare');
  const imei = val('IMEI');
  const modello = val('Modello Telefono');

  const dataPortabilita = computePortabilityDate(dataContrattoISO);

  const contratto = {
    data: dataContrattoISO,
    data_attivazione: dataContrattoISO,
    compagnia: operatore,
    tipo_cliente: '',
    tipo_contratto: tipoContratto,
    tipo: tipoContratto,
    mnp: numDaPortare ? 'SI' : 'NO',
    telefono_incluso: imei ? 'SI' : 'NO',
    nome,
    cognome,
    numero_contatto: tel,
    codice_fiscale: cf,
    nome_contratto: piano,
    offerta: piano,
    numero_lavorato: numDaPortare || numContratto,
    numero: numDaPortare || numContratto,
    costo: costoPulito,
    costo_mensile: costoPulito,
    vincolo: '',
    mesi_vincolo: '',
    data_fine_vincolo: '',
    nome_device: modello,
    tipo_device: 'Smartphone',
    imei: imei,
    tipo_pagamento: '',
    durata_pagamento: '',
    fornitore: operatore,
    data_portabilita: dataPortabilita,
    valore_cliente: ''
  };

  let device = null;
  if (imei || modello) {
    device = {
      codice_fiscale: cf,
      nome_device: modello || piano || 'Device',
      tipo_device: 'Smartphone',
      marca: '',
      modello: modello || '',
      imei: imei || '',
      tipo_pagamento: '',
      durata_pagamento: '',
      note: 'Import da testo'
    };
  }

  return { customer: cliente, contract: contratto, device };
}

// === EXPORT CSV CONTRATTI ===
function exportContractsCSV() {
  const contracts = State.data.contracts || [];
  if (!contracts.length) {
    showToast('Non ci sono contratti da esportare', 'error');
    return;
  }

  const headers = [
    'DATA',
    'COMPAGNIA',
    'T.CLIENTE',
    'T.CONTRATTO',
    'MNP',
    'T.INCLUSO',
    'NOME',
    'COGNOME',
    'Numero_Contatto',
    'C.F/P.IVA',
    'NOME_CONTRATTO',
    'NUMERO_Lavorato',
    'COSTO',
    'VINCOLO',
    'NOME DEVICE',
    'TIPO DEVICE',
    'TIPO PAGAMENTO',
    'DURATA PAGAMENTO',
    'IMEI',
    'FORNITORE',
    "DATA PORTABILITA'",
    'Valore cliente',
    'Data fine vincolo'
  ];

  const sep = ';';

  const escCsv = v => {
    const s = v == null ? '' : String(v);
    if (s.includes('"') || s.includes(sep) || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const lines = [];
  lines.push(headers.join(sep));

  contracts.forEach(c => {
    const row = [
      c.data || c.data_attivazione || '',
      c.compagnia || '',
      c.tipo_cliente || '',
      c.tipo_contratto || c.tipo || '',
      c.mnp || '',
      c.telefono_incluso || '',
      c.nome || '',
      c.cognome || '',
      c.numero_contatto || '',
      c.codice_fiscale || '',
      c.nome_contratto || c.offerta || '',
      c.numero_lavorato || c.numero || '',
      c.costo || c.costo_mensile || '',
      c.vincolo || c.mesi_vincolo || '',
      c.nome_device || '',
      c.tipo_device || '',
      c.tipo_pagamento || '',
      c.durata_pagamento || '',
      c.imei || '',
      c.fornitore || '',
      c.data_portabilita || '',
      c.valore_cliente || '',
      c.data_fine_vincolo || ''
    ].map(escCsv);

    lines.push(row.join(sep));
  });

  const csv = lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const today = new Date().toISOString().slice(0, 10);
  a.download = `volpex_contratti_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Export CSV contratti completato');
}

// === EXPORT CSV CLIENTI ===
function exportCustomersCSV() {
  const customers = State.data.customers || [];
  if (!customers.length) {
    showToast('Non ci sono clienti da esportare', 'error');
    return;
  }

  const headers = [
    'Codice Fiscale',
    'Nome',
    'Cognome',
    'Telefono',
    'Email',
    'Data Nascita',
    'Sesso',
    'Residenza',
    'Stato Nascita'
  ];

  const sep = ';';

  const escCsv = v => {
    const s = v == null ? '' : String(v);
    if (s.includes('"') || s.includes(sep) || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const lines = [];
  lines.push(headers.join(sep));

  customers.forEach(c => {
    const row = [
      c.codice_fiscale || '',
      c.nome || '',
      c.cognome || '',
      c.telefono || '',
      (c.email || '').toLowerCase(),
      getCustomerBirthDate(c) || '',
      genderFromCF(c.codice_fiscale || ''),
      c.residenza || '',
      c.stato_nascita || 'Italia'
    ].map(escCsv);

    lines.push(row.join(sep));
  });

  const csv = lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const today = new Date().toISOString().slice(0, 10);
  a.download = `volpex_clienti_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Export CSV clienti completato');
}

// === EXPORT CSV DEVICE ===
function exportDevicesCSV() {
  const devices = State.data.devices || [];
  if (!devices.length) {
    showToast('Non ci sono device da esportare', 'error');
    return;
  }

  const headers = [
    'Codice Fiscale',
    'Nome Device',
    'Tipo Device',
    'Marca',
    'Modello',
    'IMEI',
    'Tipo Pagamento',
    'Durata Pagamento',
    'Note'
  ];

  const sep = ';';

  const escCsv = v => {
    const s = v == null ? '' : String(v);
    if (s.includes('"') || s.includes(sep) || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const lines = [];
  lines.push(headers.join(sep));

  devices.forEach(d => {
    const row = [
      d.codice_fiscale || '',
      d.nome_device || '',
      d.tipo_device || '',
      d.marca || '',
      d.modello || '',
      d.imei || '',
      d.tipo_pagamento || d.metodo || '',
      d.durata_pagamento || '',
      d.note || ''
    ].map(escCsv);

    lines.push(row.join(sep));
  });

  const csv = lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const today = new Date().toISOString().slice(0, 10);
  a.download = `volpex_device_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Export CSV device completato');
}

function render() {
  const root = document.getElementById('app');
  const { tab, search, modal, editing, syncing, report, heroQuoteIndex } = State.ui;
  const { customers, contracts, devices } = State.data;
  const q = search.trim().toLowerCase();

  const filteredCustomers = !q ? customers : customers.filter(c =>
    (c.nome || '').toLowerCase().includes(q) ||
    (c.cognome || '').toLowerCase().includes(q) ||
    (c.codice_fiscale || '').toLowerCase().includes(q)
  );
  const filteredContracts = !q ? contracts : contracts.filter(c =>
    (c.codice_fiscale || '').toLowerCase().includes(q) ||
    (c.compagnia || '').toLowerCase().includes(q) ||
    (c.nome_contratto || c.offerta || '').toLowerCase().includes(q) ||
    (c.numero_lavorato || c.numero || '').toLowerCase().includes(q)
  );
  const filteredDevices = !q ? devices : devices.filter(d =>
    (d.codice_fiscale || '').toLowerCase().includes(q) ||
    (d.marca || '').toLowerCase().includes(q) ||
    (d.modello || '').toLowerCase().includes(q) ||
    (d.imei || '').toLowerCase().includes(q)
  );

  const quote = VOLPEX_QUOTES[heroQuoteIndex] || VOLPEX_QUOTES[0];

  root.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <div class="logo">
          <div class="logo-mark">🦊</div>
          <div>
            <div class="logo-text-main">VOLPEX CRM</div>
            <div class="logo-text-sub">Clienti • Contratti • Device</div>
          </div>
        </div>
        <div class="nav-label">Vista</div>
        <div class="nav">
          <button class="nav-btn ${tab === 'clients' ? 'active' : ''}" data-tab="clients"><span class="icon">👥</span><span>Clienti</span></button>
          <button class="nav-btn ${tab === 'contracts' ? 'active' : ''}" data-tab="contracts"><span class="icon">📄</span><span>Contratti</span></button>
          <button class="nav-btn ${tab === 'devices' ? 'active' : ''}" data-tab="devices"><span class="icon">📱</span><span>Device</span></button>
          <button class="nav-btn ${tab === 'reports' ? 'active' : ''}" data-tab="reports"><span class="icon">📊</span><span>Report / Query</span></button>
        </div>
        <div class="nav-label">Azioni</div>
        <div class="nav">
          <button class="nav-btn" data-action="new-client"><span class="icon">➕</span><span>Nuovo cliente</span></button>
          <button class="nav-btn" data-action="new-contract"><span class="icon">⚡</span><span>Nuovo contratto</span></button>
          <button class="nav-btn" data-action="new-device"><span class="icon">📦</span><span>Aggiungi device</span></button>
          <button class="nav-btn" data-action="open-import"><span class="icon">📥</span><span>Importa da testo</span></button>
          <button class="nav-btn" data-action="export-contracts"><span class="icon">📤</span><span>Export contratti</span></button>
          <button class="nav-btn" data-action="export-customers"><span class="icon">📤</span><span>Export clienti</span></button>
          <button class="nav-btn" data-action="export-devices"><span class="icon">📤</span><span>Export device</span></button>
        </div>
        <div class="sync-box">
          <div class="sync-dot" style="opacity:${syncing ? 1 : 0.45}"></div>
          <div>
            <div style="font-weight:500;font-size:11px;">Volpex Sheet Sync</div>
            <div style="font-size:11px;">${syncing ? 'Salvataggio in corso…' : 'Ultima versione salvata'}</div>
          </div>
        </div>
      </aside>

      <main class="main">
        <div class="top-bar">
          <div class="headline">
            <div class="headline-title">${
              tab === 'clients' ? 'Clienti' :
              tab === 'contracts' ? 'Contratti' :
              tab === 'devices' ? 'Device' : 'Report / Query'
            }</div>
            <div class="headline-sub">Vista e interrogazione dati Volpex</div>
          </div>
          <div class="badge"><span>📊</span><span>Collegato a Google Sheets</span></div>
        </div>

        <div class="panel" style="margin-bottom:14px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:14px;">
          <div>
            <div style="font-size:14px;font-weight:600;display:flex;align-items:center;gap:6px;">
              <span>🦊</span><span>Volpex CRM</span>
            </div>
            <div style="font-size:12px;color:#6b7280;margin-top:4px;">
              Creatività, dati e relazioni in un unico posto.
            </div>
          </div>
          <div style="font-size:11px;color:#4b5563;font-style:italic;max-width:260px;text-align:right;">
            “${esc(quote)}”
          </div>
        </div>

        <div class="search-row">
          <input class="search-input" placeholder="Cerca per nome, CF, numero…" value="${esc(search)}" />
          <button class="btn" data-action="clear-search">Pulisci</button>
        </div>

        <div class="grid">
          <section class="panel">
            <div class="panel-title">${
              tab === 'clients' ? 'Elenco clienti' :
              tab === 'contracts' ? 'Elenco contratti' :
              tab === 'devices' ? 'Elenco device' : 'Report dettagliati'
            }</div>
            <div class="panel-sub">${
              tab === 'clients' ? `${customers.length} clienti in anagrafica` :
              tab === 'contracts' ? `${contracts.length} contratti registrati` :
              tab === 'devices' ? `${devices.length} device associati` :
              'Scadenze, compleanni e contratti per compagnia / valore'
            }</div>
            ${
              tab === 'clients'
                ? renderClientsTable(filteredCustomers, contracts, devices)
                : tab === 'contracts'
                  ? renderContractsTable(filteredContracts)
                  : tab === 'devices'
                    ? renderDevicesTable(filteredDevices)
                    : renderReportsSection(State.data, report)
            }
          </section>
          <section class="panel">
            <div class="panel-title">Riepilogo</div>
            <div class="panel-sub">Panoramica veloce del portafoglio.</div>
            ${renderInsights()}
          </section>
        </div>
      </main>
    </div>
    ${modal ? renderModal(modal, editing) : ''}
  `;

  bindEvents();
}

function renderClientsTable(list, contracts, devices) {
  if (!list.length) return `<div class="empty">Nessun cliente ancora inserito. Usa "Nuovo cliente" per iniziare.</div>`;
  return `
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Codice fiscale</th>
          <th>Contatti / attività</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${list.map(c => {
          const cf = c.codice_fiscale || '';
          const contr = contracts.filter(k => k.codice_fiscale === cf);
          const devs = devices.filter(d => d.codice_fiscale === cf);
          const contrNames = contr.slice(0, 2).map(k => k.nome_contratto || k.offerta || '').filter(Boolean).join(', ');
          const devNames = devs.slice(0, 2).map(d => (d.marca || '') + ' ' + (d.modello || '')).filter(s => s.trim()).join(', ');
          const wa = formatPhoneForWhatsApp(c.telefono || '');
          const bd = getCustomerBirthDate(c);

          const contractsDetailHtml = contr.slice(0, 3).map(k => {
            const cost = k.costo || k.costo_mensile || '';
            return `<div>${esc(k.compagnia || '')} • ${esc(k.nome_contratto || k.offerta || '')}${cost ? ' • €' + esc(cost) : ''}</div>`;
          }).join('');

          const devicesDetailHtml = devs.slice(0, 3).map(d => {
            const label = d.nome_device || ((d.marca || '') + ' ' + (d.modello || ''));
            return `<div>${esc(label.trim())}${d.imei ? ' • IMEI ' + esc(d.imei) : ''}</div>`;
          }).join('');

          return `
          <tr>
            <td>
              <div>${esc(c.nome || '')} ${esc(c.cognome || '')}</div>
              <div class="muted">${esc(c.residenza || '')}</div>
              ${bd ? `<div class="muted">🎂 ${esc(bd)}</div>` : ''}
            </td>
            <td><span class="chip chip-strong">${esc(cf)}</span></td>
            <td>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <span>${esc(c.telefono || '')}</span>
                ${wa ? `<a class="btn whatsapp-btn" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
              </div>
              <div class="muted">${esc(c.email || '')}</div>
              <div class="muted" style="margin-top:4px;">
                Contratti: <strong>${contr.length}</strong>${contrNames ? ` • ${esc(contrNames)}` : ''}<br/>
                Device: <strong>${devs.length}</strong>${devNames ? ` • ${esc(devNames)}` : ''}
              </div>
              <div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;">
                <button class="btn btn-ghost" data-action="new-contract-for"
                  data-cf="${esc(cf)}"
                  data-nome="${esc(c.nome || '')}"
                  data-cognome="${esc(c.cognome || '')}"
                  data-phone="${esc(c.telefono || '')}">
                  + Contratto
                </button>
                <button class="btn btn-ghost" data-action="new-device-for"
                  data-cf="${esc(cf)}">
                  + Device
                </button>
              </div>
              ${
                contractsDetailHtml
                  ? `<div class="muted" style="margin-top:4px;">${contractsDetailHtml}</div>`
                  : ''
              }
              ${
                devicesDetailHtml
                  ? `<div class="muted" style="margin-top:4px;">${devicesDetailHtml}</div>`
                  : ''
              }
            </td>
            <td style="text-align:right;">
              <button class="btn" data-action="edit-client" data-id="${esc(c.id)}">Modifica</button>
              <button class="btn btn-danger" data-action="delete-client" data-id="${esc(c.id)}">Elimina</button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  `;
}

function renderContractsTable(list) {
  if (!list.length) return `<div class="empty">Ancora nessun contratto registrato.</div>`;
  return `
    <table>
      <thead>
        <tr>
          <th>Cliente / CF</th>
          <th>Contratto</th>
          <th>Tipo</th>
          <th>€/mese</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${list.map(c => {
          const wa = formatPhoneForWhatsApp(c.numero_contatto || '');
          return `
          <tr>
            <td>
              <div>${esc(c.nome || '')} ${esc(c.cognome || '')}</div>
              <div class="muted">${esc(c.codice_fiscale || '')}</div>
              <div class="muted" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <span>${esc(c.numero_contatto || '')}</span>
                ${wa ? `<a class="btn btn-ghost whatsapp-btn" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
              </div>
            </td>
            <td>
              <div><span class="chip chip-strong">${esc(c.nome_contratto || c.offerta || '')}</span></div>
              <div class="muted">${esc(c.compagnia || '')}</div>
              <div class="muted">${esc(c.numero_lavorato || c.numero || '')}</div>
            </td>
            <td>
              ${renderTypeTag(c.tipo_contratto || c.tipo)}
              <div class="muted">${(c.mnp === 'SI' ? 'MNP • ' : '') + (c.telefono_incluso === 'SI' ? 'Tel. incluso' : '')}</div>
            </td>
            <td>
              <strong>${esc(c.costo || c.costo_mensile || '')}</strong>
              <div class="muted">
                ${c.vincolo || c.mesi_vincolo ? `Vincolo: ${esc(c.vincolo || c.mesi_vincolo)}` : ''}
                ${c.data_fine_vincolo ? `<br/>Fine: ${esc(c.data_fine_vincolo)}` : ''}
                ${c.data_portabilita ? `<br/>Portabilità: ${esc(c.data_portabilita)}` : ''}
              </div>
            </td>
            <td style="text-align:right;">
              <button class="btn" data-action="edit-contract" data-id="${esc(c.id)}">Modifica</button>
              <button class="btn btn-danger" data-action="delete-contract" data-id="${esc(c.id)}">Elimina</button>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  `;
}

function renderDevicesTable(list) {
  if (!list.length) return `<div class="empty">Nessun device associato.</div>`;
  return `
    <table>
      <thead>
        <tr>
          <th>Cliente / CF</th>
          <th>Device</th>
          <th>IMEI</th>
          <th>Pagamento</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${list.map(d => `
          <tr>
            <td>
              <div>${esc(d.codice_fiscale || '')}</div>
              <div class="muted">${esc(d.note || '')}</div>
            </td>
            <td><div>${esc(d.nome_device || ((d.marca || '') + ' ' + (d.modello || '')))}</div></td>
            <td><span class="chip">${esc(d.imei || '')}</span></td>
            <td><span class="chip">${esc(d.tipo_pagamento || d.metodo || '')}</span></td>
            <td style="text-align:right;">
              <button class="btn" data-action="edit-device" data-id="${esc(d.id)}">Modifica</button>
              <button class="btn btn-danger" data-action="delete-device" data-id="${esc(d.id)}">Elimina</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderTypeTag(t) {
  t = (t || '').toLowerCase();
  const base = 'tag ';
  if (t === 'mobile') return `<span class="${base}tag-mobile">MOBILE</span>`;
  if (t === 'fisso') return `<span class="${base}tag-fisso">FISSO</span>`;
  if (t === 'luce') return `<span class="${base}tag-luce">LUCE</span>`;
  if (t === 'gas') return `<span class="${base}tag-gas">GAS</span>`;
  if (t === 'tv') return `<span class="${base}tag-tv">TV</span>`;
  return `<span class="${base}">${esc(t || '')}</span>`;
}

function renderReportsSection(data, report) {
  const { customers, contracts } = data;
  const mesi = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

  const bMonth = report.birthMonth;
  const birthdays = customers.filter(c => {
    const bdStr = getCustomerBirthDate(c);
    if (!bdStr) return false;
    const d = new Date(bdStr);
    return !isNaN(d) && d.getMonth() === bMonth;
  });

  const eMonth = report.expiryMonth;
  const eYear = report.expiryYear;
  const expiring = contracts.filter(c => {
    if (!c.data_fine_vincolo) return false;
    const d = new Date(c.data_fine_vincolo);
    return !isNaN(d) && d.getMonth() === eMonth && d.getFullYear() === eYear;
  });

  const byComp = {};
  contracts.forEach(c => {
    const k = c.compagnia || 'N/D';
    if (!byComp[k]) byComp[k] = { count: 0, total: 0 };
    byComp[k].count++;
    const val = parseFloat(String(c.costo || c.costo_mensile || '').replace(',', '.'));
    if (!isNaN(val)) byComp[k].total += val;
  });
  const compRows = Object.entries(byComp).sort((a, b) => b[1].count - a[1].count);

  const soglia = Number(report.highValue) || 0;
  const highValueContracts = contracts.filter(c => {
    const val = parseFloat(String(c.costo || c.costo_mensile || '').replace(',', '.'));
    return !isNaN(val) && val >= soglia;
  });

  const minC = Number(report.minContracts) || 2;
  const perCliente = {};
  contracts.forEach(c => {
    const cf = c.codice_fiscale || 'N/D';
    if (!perCliente[cf]) perCliente[cf] = { count: 0, contracts: [] };
    perCliente[cf].count++;
    perCliente[cf].contracts.push(c);
  });
  const multiContracts = Object.entries(perCliente)
    .filter(([_, info]) => info.count >= minC)
    .sort((a, b) => b[1].count - a[1].count);

  return `
    <div>
      <div class="section-title">🎂 Compleanni</div>
      <div class="section-box">
        <div class="section-controls">
          <select class="select" data-report="birthMonth">
            ${mesi.map((m, idx) => `<option value="${idx}" ${idx === bMonth ? 'selected' : ''}>${m}</option>`).join('')}
          </select>
          <span class="badge-mini">${birthdays.length} clienti trovati</span>
        </div>
        ${
          !birthdays.length
            ? `<div class="muted">Nessun compleanno nel mese selezionato.</div>`
            : birthdays.map(c => {
                const wa = formatPhoneForWhatsApp(c.telefono || '');
                const bd = getCustomerBirthDate(c);
                return `
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-top:1px solid #e5e7eb;">
                    <div>
                      <div>${esc(c.nome || '')} ${esc(c.cognome || '')}</div>
                      <div class="muted">🎂 ${esc(bd || '')}</div>
                      <div class="muted">${esc(c.telefono || '')}</div>
                    </div>
                    ${wa ? `<a class="btn whatsapp-btn" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
                  </div>
                `;
              }).join('')
        }
      </div>

      <div class="section-title">⏰ Fine vincolo</div>
      <div class="section-box">
        <div class="section-controls">
          <select class="select" data-report="expiryMonth">
            ${mesi.map((m, idx) => `<option value="${idx}" ${idx === eMonth ? 'selected' : ''}>${m}</option>`).join('')}
          </select>
          <select class="select" data-report="expiryYear">
            ${[eYear - 1, eYear, eYear + 1].map(y => `<option value="${y}" ${y === eYear ? 'selected' : ''}>${y}</option>`).join('')}
          </select>
          <span class="badge-mini">${expiring.length} contratti in scadenza</span>
        </div>
        ${
          !expiring.length
            ? `<div class="muted">Nessun vincolo in scadenza nel periodo selezionato.</div>`
            : expiring.map(c => {
                const wa = formatPhoneForWhatsApp(c.numero_contatto || '');
                return `
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-top:1px solid #e5e7eb;">
                    <div>
                      <div>${esc(c.nome || '')} ${esc(c.cognome || '')}</div>
                      <div class="muted">${esc(c.compagnia || '')} • ${esc(c.nome_contratto || c.offerta || '')}</div>
                      <div class="muted">Fine vincolo: ${esc(c.data_fine_vincolo || '')}</div>
                      <div class="muted">${esc(c.numero_contatto || '')}</div>
                    </div>
                    ${wa ? `<a class="btn whatsapp-btn" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
                  </div>
                `;
              }).join('')
        }
      </div>

      <div class="section-title">🏢 Contratti per compagnia</div>
      <div class="section-box">
        ${
          !compRows.length
            ? `<div class="muted">Nessun contratto inserito.</div>`
            : `
              <table>
                <thead>
                  <tr>
                    <th>Compagnia</th>
                    <th>Contratti</th>
                    <th>Tot. €/mese</th>
                  </tr>
                </thead>
                <tbody>
                  ${compRows.map(([name, info]) => `
                    <tr>
                      <td>${esc(name)}</td>
                      <td>${info.count}</td>
                      <td>${info.total.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `
        }
      </div>

      <div class="section-title">💰 Contratti ad alto valore</div>
      <div class="section-box">
        <div class="section-controls">
          <span style="font-size:11px;">Soglia €</span>
          <input type="number" min="0" step="1" class="select" style="width:80px;" data-report="highValue" value="${esc(report.highValue)}" />
          <span class="badge-mini">${highValueContracts.length} contratti ≥ €${Number(report.highValue || 0).toFixed(0)}</span>
        </div>
        ${
          !highValueContracts.length
            ? `<div class="muted">Nessun contratto sopra la soglia selezionata.</div>`
            : highValueContracts.slice(0, 20).map(c => {
                const wa = formatPhoneForWhatsApp(c.numero_contatto || '');
                return `
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-top:1px solid #e5e7eb;">
                    <div>
                      <div>${esc(c.nome || '')} ${esc(c.cognome || '')}</div>
                      <div class="muted">${esc(c.compagnia || '')} • ${esc(c.nome_contratto || c.offerta || '')}</div>
                      <div class="muted">€ ${esc(c.costo || c.costo_mensile || '')}</div>
                    </div>
                    ${wa ? `<a class="btn whatsapp-btn" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
                  </div>
                `;
              }).join('')
        }
      </div>

      <div class="section-title">👑 Clienti con più contratti</div>
      <div class="section-box">
        <div class="section-controls">
          <span style="font-size:11px;">Min. contratti</span>
          <input type="number" min="1" step="1" class="select" style="width:80px;" data-report="minContracts" value="${esc(report.minContracts)}" />
          <span class="badge-mini">${multiContracts.length} clienti trovati</span>
        </div>
        ${
          !multiContracts.length
            ? `<div class="muted">Nessun cliente con almeno ${esc(report.minContracts)} contratti.</div>`
            : multiContracts.slice(0, 20).map(([cf, info]) => {
                const cl = customers.find(c => c.codice_fiscale === cf);
                const nome = (cl ? (cl.nome || '') : '') + ' ' + (cl ? (cl.cognome || '') : '');
                const tel = cl ? (cl.telefono || '') : '';
                const wa = formatPhoneForWhatsApp(tel);
                return `
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-top:1px solid #e5e7eb;">
                    <div>
                      <div>${esc(nome.trim() || cf)}</div>
                      <div class="muted">CF: ${esc(cf)}</div>
                      <div class="muted">Contratti: ${info.count}</div>
                    </div>
                    ${wa ? `<a class="btn whatsapp-btn" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
                  </div>
                `;
              }).join('')
        }
      </div>
    </div>
  `;
}

function renderInsights() {
  const { customers, contracts, devices } = State.data;
  const perTipo = contracts.reduce((a, c) => {
    const k = (c.tipo_contratto || c.tipo || 'Altro').toLowerCase();
    a[k] = (a[k] || 0) + 1;
    return a;
  }, {});
  const tot = contracts.length || 1;
  const top = Object.entries(perTipo).sort((a, b) => b[1] - a[1])[0];
  return `
    <div class="stats-pills">
      <div class="pill"><span class="pill-dot"></span><span>${customers.length} clienti</span></div>
      <div class="pill"><span class="pill-dot" style="background:#22c55e;"></span><span>${contracts.length} contratti</span></div>
      <div class="pill"><span class="pill-dot" style="background:#f97316;"></span><span>${devices.length} device</span></div>
    </div>
    <div style="font-size:12px;color:#4b5563;margin-bottom:10px;">
      ${
        top
          ? `Tipo prevalente: <strong>${top[0].toUpperCase()}</strong> (${Math.round(top[1] / tot * 100)}%)`
          : 'Quando inserirai i primi contratti vedrai qui il riepilogo per tipologia.'
      }
    </div>
    <button class="btn btn-primary" data-action="new-contract">⚡ Registra un nuovo contratto</button>
  `;
}

function renderModal(kind, editing) {
  const title =
    kind === 'client' ? (editing ? 'Modifica cliente' : 'Nuovo cliente') :
    kind === 'contract' ? (editing ? 'Modifica contratto' : 'Nuovo contratto') :
    kind === 'device' ? (editing ? 'Modifica device' : 'Nuovo device') :
    'Importa dati da testo';
  const sub =
    kind === 'client' ? 'Dati anagrafici principali' :
    kind === 'contract' ? 'Dati completi del contratto' :
    kind === 'device' ? 'Informazioni sul terminale' :
    'Incolla testo tipo "DATI CLIENTE / DATI CONTRATTO" per importare in automatico';
  const c = editing || {};
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <div>
            <div class="modal-title-main">${title}</div>
            <div class="modal-title-sub">${sub}</div>
          </div>
          <button class="modal-close" data-action="close-modal">✕</button>
        </div>
        ${
          kind === 'client'
            ? renderClientForm(c)
            : kind === 'contract'
              ? renderContractForm(c)
              : kind === 'device'
                ? renderDeviceForm(c)
                : renderImportForm()
        }
      </div>
    </div>
  `;
}

function renderClientForm(c) {
  return `
    <form data-form="client">
      <div class="form-grid">
        <div class="field">
          <label>Codice fiscale</label>
          <input name="codice_fiscale" required placeholder="RSSMRA80A01H501U" value="${esc(c.codice_fiscale || '')}" />
        </div>
        <div class="field">
          <label>Telefono</label>
          <input name="telefono" required placeholder="3331234567" value="${esc(c.telefono || '')}" />
        </div>
        <div class="field">
          <label>Nome</label>
          <input name="nome" required value="${esc(c.nome || '')}" />
        </div>
        <div class="field">
          <label>Cognome</label>
          <input name="cognome" required value="${esc(c.cognome || '')}" />
        </div>
        <div class="field">
          <label>Email</label>
          <input name="email" type="email" placeholder="nome@dominio.it" value="${esc(c.email || '')}" />
        </div>
        <div class="field">
          <label>Data di nascita</label>
          <input type="date" name="data_nascita" value="${esc(getCustomerBirthDate(c) || '')}" />
        </div>
        <div class="field">
          <label>Residenza</label>
          <input name="residenza" placeholder="Via, città…" value="${esc(c.residenza || '')}" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-action="close-modal">Annulla</button>
        <button type="submit" class="btn btn-primary">Salva cliente</button>
      </div>
    </form>
  `;
}

function renderContractForm(c) {
  return `
    <form data-form="contract">
      <div class="form-grid">
        <div class="field">
          <label>Data contratto (DATA)</label>
          <input type="date" name="data" value="${esc(c.data || c.data_attivazione || '')}" />
        </div>
        <div class="field">
          <label>Compagnia</label>
          <input name="compagnia" placeholder="WindTre, TIM…" value="${esc(c.compagnia || '')}" />
        </div>
        <div class="field">
          <label>T. Cliente</label>
          <input name="tipo_cliente" placeholder="Nuovo, già cliente…" value="${esc(c.tipo_cliente || '')}" />
        </div>
        <div class="field">
          <label>T. Contratto</label>
          <select name="tipo_contratto">
            <option value="">–</option>
            <option ${c.tipo_contratto === 'Mobile' ? 'selected' : ''}>Mobile</option>
            <option ${c.tipo_contratto === 'Fisso' ? 'selected' : ''}>Fisso</option>
            <option ${c.tipo_contratto === 'Luce' ? 'selected' : ''}>Luce</option>
            <option ${c.tipo_contratto === 'Gas' ? 'selected' : ''}>Gas</option>
            <option ${c.tipo_contratto === 'TV' ? 'selected' : ''}>TV</option>
          </select>
        </div>
        <div class="field">
          <label>MNP</label>
          <select name="mnp">
            <option value="">–</option>
            <option value="SI" ${c.mnp === 'SI' ? 'selected' : ''}>SI</option>
            <option value="NO" ${c.mnp === 'NO' ? 'selected' : ''}>NO</option>
          </select>
        </div>
        <div class="field">
          <label>Telefono incluso</label>
          <select name="telefono_incluso">
            <option value="">–</option>
            <option value="SI" ${c.telefono_incluso === 'SI' ? 'selected' : ''}>SI</option>
            <option value="NO" ${c.telefono_incluso === 'NO' ? 'selected' : ''}>NO</option>
          </select>
        </div>

        <div class="field">
          <label>Nome cliente</label>
          <input name="nome" value="${esc(c.nome || '')}" />
        </div>
        <div class="field">
          <label>Cognome cliente</label>
          <input name="cognome" value="${esc(c.cognome || '')}" />
        </div>
        <div class="field">
          <label>Numero contatto</label>
          <input name="numero_contatto" value="${esc(c.numero_contatto || '')}" />
        </div>

        <div class="field">
          <label>C.F/P.IVA</label>
          <input name="codice_fiscale" required value="${esc(c.codice_fiscale || '')}" />
        </div>
        <div class="field">
          <label>Nome contratto</label>
          <input name="nome_contratto" placeholder="New Basic, Family 5G…" value="${esc(c.nome_contratto || c.offerta || '')}" />
        </div>
        <div class="field">
          <label>Numero lavorato</label>
          <input name="numero_lavorato" value="${esc(c.numero_lavorato || c.numero || '')}" />
        </div>

        <div class="field">
          <label>Costo mensile (€)</label>
          <input name="costo" type="number" step="0.01" value="${esc(c.costo || c.costo_mensile || '')}" />
        </div>
        <div class="field">
          <label>Vincolo (mesi)</label>
          <input name="vincolo" type="number" value="${esc(c.vincolo || c.mesi_vincolo || '')}" />
        </div>
        <div class="field">
          <label>Data fine vincolo</label>
          <input type="date" name="data_fine_vincolo" value="${esc(c.data_fine_vincolo || '')}" />
        </div>

        <div class="field">
          <label>Nome device</label>
          <input name="nome_device" value="${esc(c.nome_device || '')}" />
        </div>
        <div class="field">
          <label>Tipo device</label>
          <input name="tipo_device" value="${esc(c.tipo_device || '')}" />
        </div>
        <div class="field">
          <label>IMEI</label>
          <input name="imei" value="${esc(c.imei || '')}" />
        </div>

        <div class="field">
          <label>Tipo pagamento</label>
          <input name="tipo_pagamento" placeholder="Contanti, rate…" value="${esc(c.tipo_pagamento || '')}" />
        </div>
        <div class="field">
          <label>Durata pagamento</label>
          <input name="durata_pagamento" value="${esc(c.durata_pagamento || '')}" />
        </div>
        <div class="field">
          <label>Fornitore</label>
          <input name="fornitore" value="${esc(c.fornitore || '')}" />
        </div>

        <div class="field">
          <label>Data portabilità</label>
          <input type="date" name="data_portabilita" value="${esc(c.data_portabilita || '')}" />
        </div>
        <div class="field">
          <label>Valore cliente</label>
          <input name="valore_cliente" value="${esc(c.valore_cliente || '')}" />
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn" data-action="close-modal">Annulla</button>
        <button type="submit" class="btn btn-primary">Salva contratto</button>
      </div>
    </form>
  `;
}

function renderDeviceForm(c) {
  return `
    <form data-form="device">
      <div class="form-grid">
        <div class="field">
          <label>Codice fiscale cliente</label>
          <input name="codice_fiscale" required value="${esc(c.codice_fiscale || '')}" />
        </div>
        <div class="field">
          <label>Nome device</label>
          <input name="nome_device" value="${esc(c.nome_device || '')}" />
        </div>
        <div class="field">
          <label>Tipo device</label>
          <input name="tipo_device" value="${esc(c.tipo_device || '')}" />
        </div>
        <div class="field">
          <label>Marca</label>
          <input name="marca" value="${esc(c.marca || '')}" />
        </div>
        <div class="field">
          <label>Modello</label>
          <input name="modello" value="${esc(c.modello || '')}" />
        </div>
        <div class="field">
          <label>IMEI</label>
          <input name="imei" value="${esc(c.imei || '')}" />
        </div>
        <div class="field">
          <label>Tipo pagamento</label>
          <input name="tipo_pagamento" placeholder="Contanti, rate…" value="${esc(c.tipo_pagamento || c.metodo || '')}" />
        </div>
        <div class="field">
          <label>Durata pagamento</label>
          <input name="durata_pagamento" value="${esc(c.durata_pagamento || '')}" />
        </div>
        <div class="field">
          <label>Note</label>
          <input name="note" value="${esc(c.note || '')}" />
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn" data-action="close-modal">Annulla</button>
        <button type="submit" class="btn btn-primary">Salva device</button>
      </div>
    </form>
  `;
}

function renderImportForm() {
  const { importStep, importPreview } = State.ui;

  if (importStep === 'preview' && importPreview) {
    const cl = importPreview.customer || {};
    const ctr = importPreview.contract || {};
    const dev = importPreview.device || null;

    return `
      <form data-form="import">
        <div class="section-box">
          <div class="section-title">1. Dati cliente</div>
          <div class="form-grid" data-preview-section="customer">
            <div class="field">
              <label>Codice fiscale</label>
              <input name="codice_fiscale" value="${esc(cl.codice_fiscale || '')}" />
            </div>
            <div class="field">
              <label>Nome</label>
              <input name="nome" value="${esc(cl.nome || '')}" />
            </div>
            <div class="field">
              <label>Cognome</label>
              <input name="cognome" value="${esc(cl.cognome || '')}" />
            </div>
            <div class="field">
              <label>Telefono</label>
              <input name="telefono" value="${esc(cl.telefono || '')}" />
            </div>
            <div class="field">
              <label>Email</label>
              <input name="email" value="${esc(cl.email || '')}" />
            </div>
            <div class="field">
              <label>Data di nascita</label>
              <input type="date" name="data_nascita" value="${esc(cl.data_nascita || '')}" />
            </div>
            <div class="field">
              <label>Residenza</label>
              <input name="residenza" value="${esc(cl.residenza || '')}" />
            </div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">2. Dati contratto</div>
          <div class="form-grid" data-preview-section="contract">
            <div class="field">
              <label>Data contratto</label>
              <input type="date" name="data" value="${esc(ctr.data || ctr.data_attivazione || '')}" />
            </div>
            <div class="field">
              <label>Compagnia</label>
              <input name="compagnia" value="${esc(ctr.compagnia || '')}" />
            </div>
            <div class="field">
              <label>Tipo contratto</label>
              <input name="tipo_contratto" value="${esc(ctr.tipo_contratto || ctr.tipo || '')}" />
            </div>
            <div class="field">
              <label>Nome contratto</label>
              <input name="nome_contratto" value="${esc(ctr.nome_contratto || ctr.offerta || '')}" />
            </div>
            <div class="field">
              <label>Numero lavorato / MNP</label>
              <input name="numero_lavorato" value="${esc(ctr.numero_lavorato || ctr.numero || '')}" />
            </div>
            <div class="field">
              <label>Costo mensile (€)</label>
              <input name="costo" value="${esc(ctr.costo || ctr.costo_mensile || '')}" />
            </div>
            <div class="field">
              <label>C.F/P.IVA</label>
              <input name="codice_fiscale" value="${esc(ctr.codice_fiscale || cl.codice_fiscale || '')}" />
            </div>
            <div class="field">
              <label>Nome cliente</label>
              <input name="nome" value="${esc(ctr.nome || cl.nome || '')}" />
            </div>
            <div class="field">
              <label>Cognome cliente</label>
              <input name="cognome" value="${esc(ctr.cognome || cl.cognome || '')}" />
            </div>
            <div class="field">
              <label>Numero contatto</label>
              <input name="numero_contatto" value="${esc(ctr.numero_contatto || cl.telefono || '')}" />
            </div>
            <div class="field">
              <label>Data portabilità</label>
              <input type="date" name="data_portabilita" value="${esc(ctr.data_portabilita || '')}" />
            </div>
            <div class="field">
              <label>Valore cliente</label>
              <input name="valore_cliente" value="${esc(ctr.valore_cliente || '')}" />
            </div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">3. Device (se presente)</div>
          ${
            dev
              ? `<div class="form-grid" data-preview-section="device">
                  <div class="field">
                    <label>Codice fiscale</label>
                    <input name="codice_fiscale" value="${esc(dev.codice_fiscale || ctr.codice_fiscale || cl.codice_fiscale || '')}" />
                  </div>
                  <div class="field">
                    <label>Nome device</label>
                    <input name="nome_device" value="${esc(dev.nome_device || '')}" />
                  </div>
                  <div class="field">
                    <label>Tipo device</label>
                    <input name="tipo_device" value="${esc(dev.tipo_device || '')}" />
                  </div>
                  <div class="field">
                    <label>Marca</label>
                    <input name="marca" value="${esc(dev.marca || '')}" />
                  </div>
                  <div class="field">
                    <label>Modello</label>
                    <input name="modello" value="${esc(dev.modello || '')}" />
                  </div>
                  <div class="field">
                    <label>IMEI</label>
                    <input name="imei" value="${esc(dev.imei || '')}" />
                  </div>
                  <div class="field">
                    <label>Tipo pagamento</label>
                    <input name="tipo_pagamento" value="${esc(dev.tipo_pagamento || '')}" />
                  </div>
                  <div class="field">
                    <label>Durata pagamento</label>
                    <input name="durata_pagamento" value="${esc(dev.durata_pagamento || '')}" />
                  </div>
                  <div class="field">
                    <label>Note</label>
                    <input name="note" value="${esc(dev.note || '')}" />
                  </div>
                </div>`
              : `<div class="muted">Nessun device rilevato dal testo. Puoi comunque aggiungerlo dopo dal cliente o dai contratti.</div>`
          }
        </div>

        <div class="modal-footer">
          <button type="button" class="btn" data-action="reset-import">← Torna al testo</button>
          <button type="button" class="btn btn-primary" data-action="confirm-import">Conferma import</button>
        </div>
      </form>
    `;
  }

  return `
    <form data-form="import">
      <div class="field">
        <label>Incolla qui il testo del contratto</label>
        <textarea name="raw" rows="14" placeholder="Incolla qui il blocco con DATI CLIENTE, DATI CONTRATTO, OFFERTA, PORTABILITÀ, DISPOSITIVO…"></textarea>
        <div class="muted" style="margin-top:4px;">
          Volpex proverà a leggere automaticamente cliente, contratto, device e calcolare la data di portabilità. Potrai modificare tutto prima di salvare.
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-action="close-modal">Annulla</button>
        <button type="submit" class="btn btn-primary">Analizza dati</button>
      </div>
    </form>
  `;
}

function bindEvents() {
  const root = document.getElementById('app');

  root.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      State.ui.tab = btn.getAttribute('data-tab');
      render();
    });
  });

  root.querySelectorAll('[data-action]').forEach(btn => {
    const act = btn.getAttribute('data-action');
    btn.addEventListener('click', () => {
      if (act === 'new-client') {
        State.ui.modal = 'client'; State.ui.editing = null; render();
      } else if (act === 'new-contract') {
        State.ui.modal = 'contract'; State.ui.editing = null; render();
      } else if (act === 'new-device') {
        State.ui.modal = 'device'; State.ui.editing = null; render();
      } else if (act === 'new-contract-for') {
        const cf = btn.getAttribute('data-cf') || '';
        const nome = btn.getAttribute('data-nome') || '';
        const cognome = btn.getAttribute('data-cognome') || '';
        const phone = btn.getAttribute('data-phone') || '';
        State.ui.editing = {
          codice_fiscale: cf,
          nome,
          cognome,
          numero_contatto: phone
        };
        State.ui.modal = 'contract';
        render();
      } else if (act === 'new-device-for') {
        const cf = btn.getAttribute('data-cf') || '';
        State.ui.editing = {
          codice_fiscale: cf
        };
        State.ui.modal = 'device';
        render();
      } else if (act === 'open-import') {
        State.ui.modal = 'import';
        State.ui.editing = null;
        State.ui.importStep = 'input';
        State.ui.importPreview = null;
        render();
      } else if (act === 'export-contracts') {
        exportContractsCSV();
      } else if (act === 'export-customers') {
        exportCustomersCSV();
      } else if (act === 'export-devices') {
        exportDevicesCSV();
      } else if (act === 'close-modal') {
        State.ui.modal = null;
        State.ui.editing = null;
        State.ui.importPreview = null;
        State.ui.importStep = 'input';
        render();
      } else if (act === 'clear-search') {
        State.ui.search = ''; render();
      } else if (act === 'delete-client') {
        const id = btn.getAttribute('data-id');
        if (confirm('Eliminare definitivamente il cliente?')) State.removeCustomer(id);
      } else if (act === 'delete-contract') {
        const id = btn.getAttribute('data-id');
        if (confirm('Eliminare definitivamente il contratto?')) State.removeContract(id);
      } else if (act === 'delete-device') {
        const id = btn.getAttribute('data-id');
        if (confirm('Eliminare definitivamente il device?')) State.removeDevice(id);
      } else if (act === 'edit-client') {
        const id = btn.getAttribute('data-id');
        State.ui.editing = State.data.customers.find(c => c.id === id) || null;
        State.ui.modal = 'client'; render();
      } else if (act === 'edit-contract') {
        const id = btn.getAttribute('data-id');
        State.ui.editing = State.data.contracts.find(c => c.id === id) || null;
        State.ui.modal = 'contract'; render();
      } else if (act === 'edit-device') {
        const id = btn.getAttribute('data-id');
        State.ui.editing = State.data.devices.find(d => d.id === id) || null;
        State.ui.modal = 'device'; render();
      } else if (act === 'reset-import') {
        State.ui.importPreview = null;
        State.ui.importStep = 'input';
        render();
      } else if (act === 'confirm-import') {
        const modalEl = document.querySelector('.modal');
        if (!modalEl) return;

        const collect = section => {
          const wrapper = modalEl.querySelector('[data-preview-section="' + section + '"]');
          if (!wrapper) return {};
          const vals = {};
          wrapper.querySelectorAll('input').forEach(inp => {
            const name = inp.name;
            if (!name) return;
            vals[name] = inp.value || '';
          });
          return vals;
        };

        const custVals = collect('customer');
        const ctrVals = collect('contract');
        const devVals = collect('device');

        let cfFinal = (ctrVals.codice_fiscale || custVals.codice_fiscale || devVals.codice_fiscale || '').toUpperCase().replace(/\s/g, '');
        if (!cfFinal) {
          showToast('Inserisci almeno il codice fiscale prima di importare', 'error');
          return;
        }

        custVals.codice_fiscale = cfFinal;
        ctrVals.codice_fiscale = cfFinal;
        if (devVals && Object.keys(devVals).length) {
          devVals.codice_fiscale = (devVals.codice_fiscale || cfFinal).toUpperCase().replace(/\s/g, '');
        }

        const customer = {
          codice_fiscale: cfFinal,
          telefono: custVals.telefono || '',
          nome: custVals.nome || '',
          cognome: custVals.cognome || '',
          email: (custVals.email || '').toLowerCase(),
          data_nascita: custVals.data_nascita || birthDateFromCF(cfFinal) || '',
          residenza: custVals.residenza || ''
        };

        const contractData = ctrVals.data || '';
        const contract = {
          data: contractData,
          data_attivazione: contractData,
          compagnia: ctrVals.compagnia || '',
          tipo_cliente: ctrVals.tipo_cliente || '',
          tipo_contratto: ctrVals.tipo_contratto || '',
          tipo: ctrVals.tipo_contratto || '',
          mnp: ctrVals.mnp || '',
          telefono_incluso: ctrVals.telefono_incluso || '',
          nome: ctrVals.nome || customer.nome,
          cognome: ctrVals.cognome || customer.cognome,
          numero_contatto: ctrVals.numero_contatto || customer.telefono,
          codice_fiscale: cfFinal,
          nome_contratto: ctrVals.nome_contratto || '',
          offerta: ctrVals.nome_contratto || '',
          numero_lavorato: ctrVals.numero_lavorato || '',
          numero: ctrVals.numero_lavorato || '',
          costo: ctrVals.costo || '',
          costo_mensile: ctrVals.costo || '',
          vincolo: ctrVals.vincolo || '',
          mesi_vincolo: ctrVals.vincolo || '',
          data_fine_vincolo: ctrVals.data_fine_vincolo || '',
          fornitore: ctrVals.fornitore || ctrVals.compagnia || '',
          data_portabilita: ctrVals.data_portabilita || computePortabilityDate(contractData || ''),
          valore_cliente: ctrVals.valore_cliente || ''
        };

        let device = null;
        if (devVals && Object.keys(devVals).length && (devVals.nome_device || devVals.modello || devVals.imei)) {
          device = {
            codice_fiscale: (devVals.codice_fiscale || cfFinal).toUpperCase().replace(/\s/g, ''),
            nome_device: devVals.nome_device || '',
            tipo_device: devVals.tipo_device || '',
            marca: devVals.marca || '',
            modello: devVals.modello || '',
            imei: devVals.imei || '',
            tipo_pagamento: devVals.tipo_pagamento || '',
            durata_pagamento: devVals.durata_pagamento || '',
            note: devVals.note || 'Import da testo'
          };
        }

        State.ui.importPreview = null;
        State.ui.importStep = 'input';
        State.ui.modal = null;
        State.ui.editing = null;

        State.ui.editing = null;
        State.upsertCustomer(customer);
        State.ui.editing = null;
        State.upsertContract(contract);
        if (device) {
          State.ui.editing = null;
          State.upsertDevice(device);
        }
        showToast('Dati importati dal testo');
      }
    });
  });

  const searchInput = root.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      State.ui.search = e.target.value;
      render();
    });
  }

  root.querySelectorAll('[data-report]').forEach(el => {
    el.addEventListener('change', e => {
      const key = el.getAttribute('data-report');
      const val = e.target.value;
      if (key === 'birthMonth') State.ui.report.birthMonth = parseInt(val, 10);
      else if (key === 'expiryMonth') State.ui.report.expiryMonth = parseInt(val, 10);
      else if (key === 'expiryYear') State.ui.report.expiryYear = parseInt(val, 10);
      else if (key === 'highValue') State.ui.report.highValue = Number(val) || 0;
      else if (key === 'minContracts') State.ui.report.minContracts = Number(val) || 1;
      render();
    });
  });

  const modal = document.querySelector('.modal');
  if (modal) {
    const clientForm = modal.querySelector('form[data-form="client"]');
    const contractForm = modal.querySelector('form[data-form="contract"]');
    const deviceForm = modal.querySelector('form[data-form="device"]');
    const importForm = modal.querySelector('form[data-form="import"]');

    if (clientForm) {
      clientForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(clientForm);
        State.upsertCustomer({
          codice_fiscale: (fd.get('codice_fiscale') || '').toUpperCase().replace(/\s/g, ''),
          telefono: fd.get('telefono') || '',
          nome: fd.get('nome') || '',
          cognome: fd.get('cognome') || '',
          email: (fd.get('email') || '').toLowerCase(),
          data_nascita: fd.get('data_nascita') || '',
          residenza: fd.get('residenza') || ''
        });
      });
    }
    if (contractForm) {
      contractForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(contractForm);
        State.upsertContract({
          data: fd.get('data') || '',
          data_attivazione: (fd.get('data') || ''),
          compagnia: fd.get('compagnia') || '',
          tipo_cliente: fd.get('tipo_cliente') || '',
          tipo_contratto: fd.get('tipo_contratto') || '',
          tipo: fd.get('tipo_contratto') || '',
          mnp: fd.get('mnp') || '',
          telefono_incluso: fd.get('telefono_incluso') || '',
          nome: fd.get('nome') || '',
          cognome: fd.get('cognome') || '',
          numero_contatto: fd.get('numero_contatto') || '',
          codice_fiscale: (fd.get('codice_fiscale') || '').toUpperCase().replace(/\s/g, ''),
          nome_contratto: fd.get('nome_contratto') || '',
          offerta: fd.get('nome_contratto') || '',
          numero_lavorato: fd.get('numero_lavorato') || '',
          numero: fd.get('numero_lavorato') || '',
          costo: fd.get('costo') || '',
          costo_mensile: fd.get('costo') || '',
          vincolo: fd.get('vincolo') || '',
          mesi_vincolo: fd.get('vincolo') || '',
          data_fine_vincolo: fd.get('data_fine_vincolo') || '',
          nome_device: fd.get('nome_device') || '',
          tipo_device: fd.get('tipo_device') || '',
          imei: fd.get('imei') || '',
          tipo_pagamento: fd.get('tipo_pagamento') || '',
          durata_pagamento: fd.get('durata_pagamento') || '',
          fornitore: fd.get('fornitore') || '',
          data_portabilita: fd.get('data_portabilita') || '',
          valore_cliente: fd.get('valore_cliente') || ''
        });
      });
    }
    if (deviceForm) {
      deviceForm.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(deviceForm);
        State.upsertDevice({
          codice_fiscale: (fd.get('codice_fiscale') || '').toUpperCase().replace(/\s/g, ''),
          nome_device: fd.get('nome_device') || '',
          tipo_device: fd.get('tipo_device') || '',
          marca: fd.get('marca') || '',
          modello: fd.get('modello') || '',
          imei: fd.get('imei') || '',
          tipo_pagamento: fd.get('tipo_pagamento') || '',
          durata_pagamento: fd.get('durata_pagamento') || '',
          note: fd.get('note') || ''
        });
      });
    }
    if (importForm) {
      importForm.addEventListener('submit', e => {
        e.preventDefault();
        if (State.ui.importStep !== 'input') return;
        const fd = new FormData(importForm);
        const raw = fd.get('raw') || '';
        if (!raw.trim()) {
          showToast('Incolla prima il testo da importare', 'error');
          return;
        }
        const preview = parseAndImportRaw(raw);
        if (!preview) {
          showToast('Non sono riuscito a leggere i dati dal testo', 'error');
          return;
        }
        State.ui.importPreview = preview;
        State.ui.importStep = 'preview';
        render();
      });
    }
  }
}

(async () => {
  await State.init();
  render();
})();
