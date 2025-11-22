pill"><span class="pill-dot" style="background:#22c55e;"></span><span>${contracts.length} contratti</span></div>
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

// === MODALI ===
function renderModal(kind, editing) {
  const title =
    kind === 'client'   ? (editing ? 'Modifica cliente'   : 'Nuovo cliente')   :
    kind === 'contract' ? (editing ? 'Modifica contratto' : 'Nuovo contratto') :
    kind === 'device'   ? (editing ? 'Modifica device'    : 'Nuovo device')    :
                          'Importa dati da testo';

  const sub =
    kind === 'client'   ? 'Dati anagrafici principali' :
    kind === 'contract' ? 'Dati completi del contratto' :
    kind === 'device'   ? 'Informazioni sul terminale' :
                          'Incolla testo tipo "DATI CLIENTE / DATI CONTRATTO" e controlla i dati prima di salvare';

  let c = editing || {};
  if (!editing && kind === 'contract' && State.ui.prefill.contract) {
    c = { ...State.ui.prefill.contract };
  }
  if (!editing && kind === 'device' && State.ui.prefill.device) {
    c = { ...State.ui.prefill.device };
  }

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
            <option ${c.tipo_contratto === 'Fisso'  ? 'selected' : ''}>Fisso</option>
            <option ${c.tipo_contratto === 'Luce'   ? 'selected' : ''}>Luce</option>
            <option ${c.tipo_contratto === 'Gas'    ? 'selected' : ''}>Gas</option>
            <option ${c.tipo_contratto === 'TV'     ? 'selected' : ''}>TV</option>
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

// IMPORT FORM (2 STEP: input -> preview)
function renderImportForm() {
  const st = State.ui.importState;
  if (!st || st.step === 'input') {
    return `
      <form data-form="import-input">
        <div class="field">
          <label>Incolla qui il testo del contratto</label>
          <textarea name="raw" rows="14" placeholder="Incolla qui il blocco con
--- DATI CLIENTE ---
Nome: ...
Cognome: ...
Codice Fiscale: ...
...">${esc(st.raw || '')}</textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-action="close-modal">Annulla</button>
          <button type="submit" class="btn btn-primary">Analizza testo</button>
        </div>
      </form>
    `;
  }

  // PREVIEW
  const c = st.customer || {};
  const k = st.contract || {};
  const d = st.device   || null;

  return `
    <form data-form="import-preview">
      <div class="section-title">Dati cliente</div>
      <div class="form-grid">
        <div class="field">
          <label>Codice fiscale</label>
          <input name="cliente_cf" value="${esc(c.codice_fiscale || '')}" />
        </div>
        <div class="field">
          <label>Nome</label>
          <input name="cliente_nome" value="${esc(c.nome || '')}" />
        </div>
        <div class="field">
          <label>Cognome</label>
          <input name="cliente_cognome" value="${esc(c.cognome || '')}" />
        </div>
        <div class="field">
          <label>Telefono</label>
          <input name="cliente_tel" value="${esc(c.telefono || '')}" />
        </div>
        <div class="field">
          <label>Email</label>
          <input name="cliente_email" value="${esc(c.email || '')}" />
        </div>
        <div class="field">
          <label>Data nascita</label>
          <input type="date" name="cliente_nascita" value="${esc(c.data_nascita || '')}" />
        </div>
      </div>

      <div class="section-title">Dati contratto</div>
      <div class="form-grid">
        <div class="field">
          <label>Data contratto</label>
          <input type="date" name="contratto_data" value="${esc(k.data || k.data_attivazione || '')}" />
        </div>
        <div class="field">
          <label>Compagnia</label>
          <input name="contratto_compagnia" value="${esc(k.compagnia || '')}" />
        </div>
        <div class="field">
          <label>Tipo contratto</label>
          <input name="contratto_tipo" value="${esc(k.tipo_contratto || k.tipo || '')}" />
        </div>
        <div class="field">
          <label>Nome offerta</label>
          <input name="contratto_nome" value="${esc(k.nome_contratto || k.offerta || '')}" />
        </div>
        <div class="field">
          <label>Numero lavorato</label>
          <input name="contratto_numero" value="${esc(k.numero_lavorato || k.numero || '')}" />
        </div>
        <div class="field">
          <label>Costo mensile</label>
          <input name="contratto_costo" value="${esc(k.costo || k.costo_mensile || '')}" />
        </div>
      </div>

      ${d ? `
      <div class="section-title">Device</div>
      <div class="form-grid">
        <div class="field">
          <label>Modello</label>
          <input name="device_modello" value="${esc(d.modello || '')}" />
        </div>
        <div class="field">
          <label>IMEI</label>
          <input name="device_imei" value="${esc(d.imei || '')}" />
        </div>
      </div>` : ''}

      <div class="modal-footer">
        <button type="button" class="btn" data-action="restart-import">Indietro</button>
        <button type="button" class="btn" data-action="close-modal">Annulla</button>
        <button type="submit" class="btn btn-primary">Conferma import</button>
      </div>
    </form>
  `;
}

// === EVENTI ===
function bindEvents() {
  const root = document.getElementById('app');

  // TAB
  root.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      State.ui.tab = btn.getAttribute('data-tab');
      render();
    });
  });

  // CLICK AZIONI
  root.querySelectorAll('[data-action]').forEach(btn => {
    const act = btn.getAttribute('data-action');
    btn.addEventListener('click', () => {
      if (act === 'new-client') {
        State.ui.modal = 'client';
        State.ui.editing = null;
        render();
      } else if (act === 'new-contract') {
        State.ui.modal = 'contract';
        State.ui.editing = null;
        State.ui.prefill.contract = null;
        render();
      } else if (act === 'new-device') {
        State.ui.modal = 'device';
        State.ui.editing = null;
        State.ui.prefill.device = null;
        render();
      } else if (act === 'new-contract-for') {
        const cf   = btn.getAttribute('data-cf') || '';
        const nome = btn.getAttribute('data-nome') || '';
        const cognome = btn.getAttribute('data-cognome') || '';
        const tel  = btn.getAttribute('data-telefono') || '';
        State.ui.prefill.contract = {
          codice_fiscale: cf,
          nome,
          cognome,
          numero_contatto: tel
        };
        State.ui.editing = null;
        State.ui.modal = 'contract';
        render();
      } else if (act === 'new-device-for') {
        const cf = btn.getAttribute('data-cf') || '';
        State.ui.prefill.device = { codice_fiscale: cf };
        State.ui.editing = null;
        State.ui.modal = 'device';
        render();
      } else if (act === 'open-import') {
        State.ui.importState = { step: 'input', raw: '', customer: null, contract: null, device: null };
        State.ui.modal = 'import';
        State.ui.editing = null;
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
        State.ui.prefill.contract = null;
        State.ui.prefill.device   = null;
        State.ui.importState = { step: 'input', raw: '', customer: null, contract: null, device: null };
        render();
      } else if (act === 'clear-search') {
        State.ui.search = '';
        render();
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
        State.ui.prefill.contract = null;
        State.ui.prefill.device   = null;
        State.ui.modal = 'client';
        render();
      } else if (act === 'edit-contract') {
        const id = btn.getAttribute('data-id');
        State.ui.editing = State.data.contracts.find(c => c.id === id) || null;
        State.ui.prefill.contract = null;
        State.ui.prefill.device   = null;
        State.ui.modal = 'contract';
        render();
      } else if (act === 'edit-device') {
        const id = btn.getAttribute('data-id');
        State.ui.editing = State.data.devices.find(d => d.id === id) || null;
        State.ui.prefill.contract = null;
        State.ui.prefill.device   = null;
        State.ui.modal = 'device';
        render();
      } else if (act === 'restart-import') {
        State.ui.importState.step = 'input';
        render();
      }
    });
  });

  // SEARCH
  const searchInput = root.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      State.ui.search = e.target.value;
      render();
    });
  }

  // FILTRI REPORT
  root.querySelectorAll('[data-report]').forEach(el => {
    el.addEventListener('change', e => {
      const key = el.getAttribute('data-report');
      const val = e.target.value;
      if (key === 'birthMonth')      State.ui.report.birthMonth   = parseInt(val, 10);
      else if (key === 'expiryMonth')State.ui.report.expiryMonth  = parseInt(val, 10);
      else if (key === 'expiryYear') State.ui.report.expiryYear   = parseInt(val, 10);
      else if (key === 'highValue')  State.ui.report.highValue    = Number(val) || 0;
      else if (key === 'minContracts') State.ui.report.minContracts = Number(val) || 1;
      render();
    });
  });

  // FORM NELLA MODALE
  const modal = document.querySelector('.modal');
  if (modal) {
    const clientForm   = modal.querySelector('form[data-form="client"]');
    const contractForm = modal.querySelector('form[data-form="contract"]');
    const deviceForm   = modal.querySelector('form[data-form="device"]');
    const importInput  = modal.querySelector('form[data-form="import-input"]');
    const importPrev   = modal.querySelector('form[data-form="import-preview"]');

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
          data_attivazione: fd.get('data') || '',
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

    if (importInput) {
      importInput.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(importInput);
        const raw = fd.get('raw') || '';
        State.ui.importState.raw = raw;
        parseAndImportRaw(raw);
      });
    }

    if (importPrev) {
      importPrev.addEventListener('submit', e => {
        e.preventDefault();
        confirmImportFromPreview(importPrev);
      });
    }
  }
}

// === BOOTSTRAP ===
(async () => {
  await State.init();
  render();
})();
