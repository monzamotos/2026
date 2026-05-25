const form = document.getElementById('empresaForm');
const navToggle = document.getElementById('navToggle');
const primaryNavigation = document.getElementById('primaryNavigation');
const themeToggle = document.getElementById('themeToggle');
const themeHint = document.getElementById('themeHint');
const themeHintClose = document.getElementById('themeHintClose');
const htmlRoot = document.documentElement;
const successMessage = document.getElementById('mensagemSucesso');
const submitButton = form.querySelector('button[type="submit"]');

const SERVICE_CATALOG = [
  'Troca de óleo e filtro',
  'Revisão geral (manutenção preventiva)',
  'Troca do Amortecedor traseiro',
  'Substituição de pastilhas de freio',
  'Substituição de discos de freio',
  'Sangria e troca de fluido de freio',
  'Troca de fluido de arrefecimento (radiador)',
  'Troca de bateria e teste do sistema de carga',
  'Teste e diagnóstico elétrico',
  'Troca de velas e verificação de ignição',
  'Limpeza e ajuste de carburador',
  'Troca de correia e serviço CVT (scooters)',
  'Substituição de corrente, pinhão e coroa',
  'Lubrificação e ajuste de corrente',
  'Revisão e substituição de embreagem',
  'Troca de discos/placas de embreagem',
  'Serviço de câmbio/transmissão',
  'Retífica parcial do motor (topo: cabeçote, kit cilindro, pistão e anéis)',
  'Retífica completa de motor (cabeçote, cilindro, pistão, anéis, biela, virabrequim)',
  'Reparo de cabeçote e troca de junta',
  'Teste de compressão do motor',
  'Troca de filtros (ar, óleo, combustível)',
  'Serviço de suspensão (troca de óleo do garfo, revisão amortecedores)',
  'Substituição de rolamentos de roda e direção',
  'Instalação de acessórios (bagageiro, bolha, suporte)',
  'Instalação e ajuste de escapamento / silenciador',
  'Ajuste/instalação de guidão, manetes e pedaleiras',
  'Troca de iluminação (LED, farol)',
  'Diagnóstico e reparo de fiação elétrica',
  'Troca de fusíveis e relés',
  'Reparo/substituição de bomba d\'água e sistema de arrefecimento',
  'Reparo de sistema de carregamento/alternador',
  'Troca de óleo de transmissão (quando aplicável)',
  'Serviço de rolamentos e buchas',
  'Reparo ou substituição de cabos (acelerador, embreagem, freio)',
  'Ajuste de válvulas (regulagem de válvulas)',
  'Instalação e ajuste de sistemas de escapamento esportivo',
  'Reparo ou substituição de sistema de partida elétrica (motor de arranque)',
  'Reparo ou substituição de sistema de partida a pedal',
  'Outros'
];

const servicesContainer = document.getElementById('servicosContainer');
const serviceSearch = document.getElementById('serviceSearch');
const serviceSuggestions = document.getElementById('serviceSuggestions');
const selectedServicesList = document.getElementById('selectedServicesList');
const brandSuggestions = document.getElementById('sugestoesMarca');
const modelSuggestions = document.getElementById('sugestoesModelo');
const yearSuggestions = document.getElementById('sugestoesAno');
// Formspree endpoint fornecido pelo usuário
const EMAIL_ENDPOINT = 'https://formspree.io/f/xzdwajyj';
const WHATSAPP_ALERT_NUMBER = '5571982180124';

const MOTO_CATALOG = {
  Honda: ['CG 125', 'CG 150 Titan', 'CG 160 Start', 'CG 160 Fan', 'CG 160 Titan', 'Biz 110i', 'Biz 125', 'Pop 110i', 'NXR 160 Bros', 'XRE 190', 'XRE 300', 'CB 300F Twister', 'CB 500F', 'CB 650R', 'PCX 160', 'ADV 150', 'Forza 350', 'Sahara 300'],
  Yamaha: ['Factor 125', 'Factor 150', 'Fazer 150', 'Fazer FZ15', 'Fazer FZ25', 'Lander 250', 'Tenere 250', 'XTZ 250', 'XTZ Crosser 150', 'MT-03', 'MT-07', 'R15', 'R3', 'Fluo 125', 'NMAX 160', 'XMAX 250'],
  Suzuki: ['Yes 125', 'Intruder 125', 'Gixxer 150', 'Gixxer 250', 'V-Strom 250', 'V-Strom 650', 'GSX-S750', 'GSX-R1000', 'Burgman 125', 'Burgman 400'],
  Kawasaki: ['Ninja 300', 'Ninja 400', 'Ninja 650', 'Ninja ZX-6R', 'Ninja ZX-10R', 'Z300', 'Z400', 'Z650', 'Z900', 'Versys 300', 'Versys 650', 'Vulcan S'],
  BMW: ['G 310 R', 'G 310 GS', 'F 750 GS', 'F 850 GS', 'F 900 R', 'F 900 XR', 'R 1250 GS', 'R 1250 RT', 'S 1000 R', 'S 1000 RR', 'C 400 X'],
  Ducati: ['Monster', 'Monster 937', 'Scrambler Icon', 'Scrambler Desert Sled', 'Multistrada V2', 'Multistrada V4', 'Panigale V2', 'Panigale V4', 'Streetfighter V2', 'Diavel V4'],
  Triumph: ['Speed 400', 'Scrambler 400 X', 'Trident 660', 'Tiger Sport 660', 'Tiger 900', 'Tiger 1200', 'Street Triple', 'Speed Triple', 'Bonneville T100', 'Bonneville T120'],
  RoyalEnfield: ['Hunter 350', 'Meteor 350', 'Classic 350', 'Bullet 350', 'Himalayan 411', 'Himalayan 450', 'Scram 411', 'Interceptor 650', 'Continental GT 650', 'Super Meteor 650'],
  HarleyDavidson: ['Iron 883', 'Forty-Eight', 'Nightster', 'Sportster S', 'Street Bob', 'Fat Bob', 'Fat Boy', 'Low Rider S', 'Road Glide', 'Street Glide', 'Pan America 1250'],
  Bajaj: ['Dominar 160', 'Dominar 200', 'Dominar 250', 'Dominar 400', 'Pulsar 150', 'Pulsar N160', 'Pulsar NS200'],
  KTM: ['Duke 125', 'Duke 200', 'Duke 390', 'RC 200', 'RC 390', 'Adventure 390', 'Adventure 890', '1290 Super Duke R'],
  Haojue: ['DK 150', 'DR 160', 'NK 150', 'Master Ride 150', 'Lindy 125', 'VR 150'],
  Mottu: ['Sport 110i', 'E-Mottu', 'Mottu Pop', 'Mottu City'],
};

function normalizeBrandName(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function addOptionsToDatalist(datalist, options) {
  if (!datalist) {
    return;
  }

  datalist.innerHTML = '';

  options.forEach((optionValue) => {
    const option = document.createElement('option');
    option.value = optionValue;
    datalist.appendChild(option);
  });
}

function findBrandKey(inputBrand) {
  const normalizedInput = normalizeBrandName(inputBrand);
  return Object.keys(MOTO_CATALOG).find((brand) => normalizeBrandName(brand) === normalizedInput);
}

function refreshModelSuggestions() {
  const brandKey = findBrandKey(fields.marca.value.trim());

  if (!brandKey) {
    addOptionsToDatalist(modelSuggestions, []);
    return;
  }

  addOptionsToDatalist(modelSuggestions, MOTO_CATALOG[brandKey]);
}

function initVehicleSuggestions() {
  const allBrands = Object.keys(MOTO_CATALOG).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  addOptionsToDatalist(brandSuggestions, allBrands);

  const currentYear = new Date().getFullYear() + 1;
  const years = [];

  for (let year = currentYear; year >= 1980; year -= 1) {
    years.push(String(year));
  }

  addOptionsToDatalist(yearSuggestions, years);
  refreshModelSuggestions();
}

const fields = {
  nomeCliente: document.getElementById('nomeCliente'),
  email: document.getElementById('email'),
  telefone: document.getElementById('telefone'),
  whatsapp: document.getElementById('whatsapp'),
  marca: document.getElementById('marca'),
  modelo: document.getElementById('modelo'),
  ano: document.getElementById('ano'),
  placa: document.getElementById('placa'),
  descricaoProblema: document.getElementById('descricaoProblema')
};

const errors = {
  nomeCliente: document.getElementById('erroNome'),
  email: document.getElementById('erroEmail'),
  telefone: document.getElementById('erroTelefone'),
  servicos: document.getElementById('erroServicos'),
  marca: document.getElementById('erroMarca'),
  modelo: document.getElementById('erroModelo'),
  ano: document.getElementById('erroAno'),
  placa: document.getElementById('erroPlaca')
};

let otherServiceRequested = false;

const preview = {
  nome: document.getElementById('previewNome'),
  contato: document.getElementById('previewContato'),
  moto: document.getElementById('previewMoto'),
  placa: document.getElementById('previewPlaca'),
  servicos: document.getElementById('previewServicos')
};

function setTheme(theme) {
  htmlRoot.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = htmlRoot.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function setNavigationState(isOpen) {
  if (!navToggle || !primaryNavigation) {
    return;
  }

  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  primaryNavigation.classList.toggle('is-open', isOpen);
}

function toggleNavigation() {
  if (!navToggle || !primaryNavigation) {
    return;
  }

  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  setNavigationState(!isOpen);
}

function closeNavigation() {
  setNavigationState(false);
}

function hideThemeHint() {
  if (!themeHint) {
    return;
  }

  themeHint.classList.remove('is-visible');
  themeHint.classList.add('is-hidden');
}

function maybeShowThemeHint() {
  if (!themeHint) {
    return;
  }

  try {
    const seen = sessionStorage.getItem('seenThemeHint');
    if (seen) return;
  } catch (e) {
    // sessionStorage pode falhar em alguns contextos; fallback para mostrar a dica
  }

  window.setTimeout(() => {
    themeHint.classList.add('is-visible');
  }, 350);
}

function showError(fieldName, message) {
  errors[fieldName].textContent = message;
}

function clearErrors() {
  Object.values(errors).forEach((errorField) => {
    if (errorField) {
      errorField.textContent = '';
    }
  });
}

function formatPhoneValue(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length === 0) {
    return '';
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  const ddd = digits.slice(0, 2);
  const number = digits.slice(2);

  if (number.length <= 4) {
    return `(${ddd}) ${number}`;
  }

  if (number.length <= 8) {
    return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
  }

  return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
}

function setupPhoneMask(input) {
  if (!input) {
    return;
  }

  input.setAttribute('maxlength', '15');

  input.addEventListener('input', () => {
    input.value = formatPhoneValue(input.value);
  });

  input.addEventListener('blur', () => {
    input.value = formatPhoneValue(input.value);
  });
}

function formatPlateValue(value) {
  const chars = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 7);

  if (chars.length <= 3) {
    return chars;
  }

  return `${chars.slice(0, 3)}-${chars.slice(3)}`;
}

function setupPlateMask(input) {
  if (!input) {
    return;
  }

  input.setAttribute('maxlength', '8');

  input.addEventListener('input', () => {
    input.value = formatPlateValue(input.value);
  });

  input.addEventListener('blur', () => {
    input.value = formatPlateValue(input.value);
  });
}

function sanitizeNameValue(value) {
  return value.replace(/\d/g, '');
}

function setupNameMask(input) {
  if (!input) {
    return;
  }

  input.addEventListener('input', () => {
    input.value = sanitizeNameValue(input.value);
  });

  input.addEventListener('blur', () => {
    input.value = sanitizeNameValue(input.value).trim();
  });
}

function updatePreview() {
  const contatoTelefone = fields.telefone.value || '-';
  const contatoWhatsapp = fields.whatsapp.value || '-';
  const motoDescricao = `${fields.marca.value || '-'} ${fields.modelo.value || ''} ${fields.ano.value || ''}`.trim();

  preview.nome.textContent = fields.nomeCliente.value || '-';
  preview.contato.textContent = `Tel: ${contatoTelefone} | WhatsApp: ${contatoWhatsapp}`;
  preview.moto.textContent = motoDescricao || '-';
  preview.placa.textContent = formatPlateValue(fields.placa.value) || '-';
  const servicosSelecionados = Array.from(selectedServicesList.querySelectorAll('.service-chip'))
    .map((s) => s.dataset.value)
    .filter(Boolean);
  preview.servicos.textContent = servicosSelecionados.length > 0 ? servicosSelecionados.join(', ') : '-';
}

function validateForm() {
  clearErrors();
  let isValid = true;
  const currentYear = new Date().getFullYear() + 1;
  const phoneRegex = /^\d{10,11}$/;
  const plateRegex = /^[A-Z]{3}-[0-9][A-Z0-9][0-9]{2}$/;
  const hasDigitRegex = /\d/;

  if (fields.nomeCliente.value.trim().length < 3) {
    showError('nomeCliente', 'Informe o nome do cliente com pelo menos 3 caracteres.');
    isValid = false;
  } else if (hasDigitRegex.test(fields.nomeCliente.value)) {
    showError('nomeCliente', 'O nome do cliente nao pode conter numeros.');
    isValid = false;
  }

  if (fields.email.value && !fields.email.checkValidity()) {
    showError('email', 'Digite um e-mail válido.');
    isValid = false;
  }

  const phoneDigits = fields.telefone.value.replace(/\D/g, '');
  if (!phoneRegex.test(phoneDigits)) {
    showError('telefone', 'Telefone deve ter DDD + número (10 ou 11 dígitos).');
    isValid = false;
  }

  const whatsappDigits = fields.whatsapp.value.replace(/\D/g, '');
  if (!phoneRegex.test(whatsappDigits)) {
    showError('whatsapp', 'WhatsApp deve ter DDD + número (10 ou 11 dígitos).');
    isValid = false;
  }

  const servicosSelecionados = Array.from(selectedServicesList.querySelectorAll('.service-chip'))
    .map((chip) => chip.dataset.value)
    .filter(Boolean);
  const observacoes = fields.descricaoProblema.value.trim();

  if (servicosSelecionados.length === 0 && !otherServiceRequested) {
    showError('servicos', 'Selecione um serviço ou escolha Outros e descreva nas observações.');
    isValid = false;
  } else if (otherServiceRequested && !observacoes) {
    showError('servicos', 'Ao escolher Outros, descreva o que você precisa nas observações.');
    isValid = false;
  }

  if (fields.marca.value.trim().length < 2) {
    showError('marca', 'Informe a marca da motocicleta.');
    isValid = false;
  }

  if (fields.modelo.value.trim().length < 2) {
    showError('modelo', 'Informe o modelo da motocicleta.');
    isValid = false;
  }

  const ano = Number(fields.ano.value);
  if (!Number.isInteger(ano) || ano < 1980 || ano > currentYear) {
    showError('ano', `Informe um ano entre 1980 e ${currentYear}.`);
    isValid = false;
  }

  const plateValue = formatPlateValue(fields.placa.value.trim());
  fields.placa.value = plateValue;
  if (!plateRegex.test(plateValue)) {
    showError('placa', 'Informe uma placa válida no formato ABC-1234 ou ABC-1D23.');
    isValid = false;
  }

  return isValid;
}

function buildSubmissionFormData() {
  const formData = new FormData();
  const observacoes = fields.descricaoProblema.value.trim();
  const servicosSelecionados = Array.from(selectedServicesList.querySelectorAll('.service-chip')).map(c => c.dataset.value).filter(Boolean);

  formData.append('_subject', 'Nova ordem de serviço - Monza Motos');
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');
  formData.append('Nome do Cliente', fields.nomeCliente.value.trim());
  formData.append('E-mail', fields.email.value.trim() || 'Não informado');
  formData.append('Telefone', fields.telefone.value.trim());
  formData.append('WhatsApp', fields.whatsapp.value.trim());
  formData.append('Marca da Moto', fields.marca.value.trim());
  formData.append('Modelo da Moto', fields.modelo.value.trim());
  formData.append('Ano da Moto', fields.ano.value.trim());
  formData.append('Placa da Moto', formatPlateValue(fields.placa.value.trim()));
  formData.append('Serviços Solicitados', servicosSelecionados.length > 0 ? servicosSelecionados.join(', ') : 'Não informado');
  formData.append('Observações', observacoes || 'Não informado');

  return formData;
}

function addServiceOptionSuggestions() {
  if (!serviceSuggestions) {
    return;
  }

  serviceSuggestions.innerHTML = '';

  SERVICE_CATALOG.forEach((serviceName) => {
    const option = document.createElement('option');
    option.value = serviceName;
    serviceSuggestions.appendChild(option);
  });
}

function addServiceChip(serviceName) {
  if (!serviceName) return;
  // evita duplicatas
  const existing = Array.from(selectedServicesList.querySelectorAll('.service-chip')).some(c => c.dataset.value === serviceName);
  if (existing) return;

  const chip = document.createElement('span');
  chip.className = 'service-chip';
  chip.dataset.value = serviceName;
  chip.textContent = serviceName;

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'service-chip-remove';
  remove.textContent = '–';
  remove.title = 'Remover serviço';
  remove.addEventListener('click', () => {
    remove.classList.add('is-pressed');
    chip.classList.add('is-removing');
    remove.disabled = true;
    window.setTimeout(() => {
      chip.remove();
      updatePreview();
    }, 160);
  });

  chip.appendChild(remove);
  selectedServicesList.appendChild(chip);
  updatePreview();
}

function handleServiceSelection(serviceName) {
  const value = serviceName.trim();

  if (!value) {
    return;
  }

  if (value.toLowerCase() === 'outros') {
    otherServiceRequested = true;
    serviceSearch.value = '';
    fields.descricaoProblema.focus();
    fields.descricaoProblema.placeholder = 'Descreva aqui o serviço que você precisa';
    return;
  }

  otherServiceRequested = false;
  addServiceChip(value);
  serviceSearch.value = '';
}

function initServices() {
  addServiceOptionSuggestions();

  if (!serviceSearch) {
    return;
  }

  serviceSearch.addEventListener('change', () => {
    const value = serviceSearch.value.trim();
    if (SERVICE_CATALOG.includes(value)) {
      handleServiceSelection(value);
    }
  });

  serviceSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = serviceSearch.value.trim();
      if (SERVICE_CATALOG.includes(value)) {
        handleServiceSelection(value);
      }
    }
  });
}

function buildWhatsAppAlertMessage() {
  const servicosSelecionados = Array.from(selectedServicesList.querySelectorAll('.service-chip'))
    .map((s) => s.dataset.value)
    .filter(Boolean)
    .join(', ') || 'Não informado';

  const observacoes = fields.descricaoProblema.value.trim() || 'Não informado';
  const texto = [

    'Olá, gostaria de acompanhar a solicitação da ordem de serviço!',
    `Cliente: ${fields.nomeCliente.value.trim()}`,
    `Contato: ${fields.telefone.value.trim()} | WhatsApp: ${fields.whatsapp.value.trim()}`,
    `Moto: ${fields.marca.value.trim()} ${fields.modelo.value.trim()} ${fields.ano.value.trim()}`.trim(),
    `Placa: ${formatPlateValue(fields.placa.value.trim())}`,
    `Serviços: ${servicosSelecionados}`,
    `Observações: ${observacoes}`
  ].join('\n');

  return `https://wa.me/${WHATSAPP_ALERT_NUMBER}?text=${encodeURIComponent(texto)}`;
}

async function sendFormByEmail() {
  const response = await fetch(EMAIL_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: buildSubmissionFormData()
  });

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    // resposta não-JSON é tratada abaixo via response.ok
  }

  if (!response.ok) {
    const message = (data && (data.error || data.message)) || 'Falha ao enviar a ordem de serviço por e-mail.';
    throw new Error(message);
  }

  return data;
}

/* Toast de feedback */
const toastEl = document.getElementById('toast');
function showToast(message, duration = 4200) {
  if (!toastEl) return;
  toastEl.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.3 9 19.3 20 8.3l-1.5-1.5z"></path></svg>
    <div class="toast-text">${message}</div>
  `;
  toastEl.hidden = false;
  // trigger animation
  window.setTimeout(() => toastEl.classList.add('is-visible'), 20);
  window.setTimeout(() => {
    toastEl.classList.remove('is-visible');
    window.setTimeout(() => { toastEl.hidden = true; }, 220);
  }, duration);
}

Object.values(fields).forEach((input) => {
  input.addEventListener('input', updatePreview);
});

setupPhoneMask(fields.telefone);
setupPhoneMask(fields.whatsapp);
setupPlateMask(fields.placa);
setupNameMask(fields.nomeCliente);

fields.marca.addEventListener('input', refreshModelSuggestions);
fields.marca.addEventListener('change', refreshModelSuggestions);

themeToggle.addEventListener('click', () => {
  toggleTheme();
  hideThemeHint();
});

// Remove visual focus when activating with mouse/pointer, keep focus for keyboard
if (themeToggle) {
  themeToggle.addEventListener('pointerdown', (ev) => {
    try {
      if (ev.pointerType === 'mouse') {
        // Delay blur slightly so click still activates
        window.setTimeout(() => { themeToggle.blur(); }, 0);
      }
    } catch (e) {
      // ignore
    }
  });
}

// Global pointer/keyboard tracker: add class when using pointer, remove on Tab (keyboard)
(function () {
  function setUsingPointer() {
    try { document.documentElement.classList.add('using-pointer'); } catch (e) {}
  }

  function clearUsingPointer() {
    try { document.documentElement.classList.remove('using-pointer'); } catch (e) {}
  }

  document.addEventListener('pointerdown', (ev) => {
    // mark pointer usage for mouse/pen/touch
    setUsingPointer();
  }, { passive: true });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Tab') {
      clearUsingPointer();
    }
  }, { passive: true });
})();

// Blur selects and inputs with datalist after change when using pointer
(function () {
  function onChangeBlurIfPointer(ev) {
    try {
      if (document.documentElement.classList.contains('using-pointer')) {
        ev.target.blur();
      }
    } catch (e) {}
  }

  // Select elements
  document.querySelectorAll('select').forEach((el) => {
    el.addEventListener('change', onChangeBlurIfPointer);
  });

  // Inputs that use datalist (have list attribute)
  document.querySelectorAll('input[list]').forEach((el) => {
    el.addEventListener('change', onChangeBlurIfPointer);
  });
})();

if (navToggle && primaryNavigation) {
  navToggle.addEventListener('click', toggleNavigation);

  primaryNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 980px)').matches) {
        closeNavigation();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 980px)').matches) {
      closeNavigation();
    }
  });
}

if (themeHintClose) {
  themeHintClose.addEventListener('click', () => {
    try {
      sessionStorage.setItem('seenThemeHint', '1');
    } catch (e) {
      // ignore
    }
    hideThemeHint();
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  successMessage.textContent = '';

  if (validateForm()) {
    submitButton.disabled = true;
    submitButton.classList.add('is-loading');
    submitButton.textContent = 'Enviando...';

    try {
      await sendFormByEmail();
      successMessage.style.color = 'var(--success)';
      successMessage.innerHTML = 'Ordem de serviço recebida com sucesso. <a href="' + buildWhatsAppAlertMessage() + '" target="_blank" rel="noopener noreferrer">Acompanhe sua solicitação no WhatsApp</a>.';
      try {
        showToast('Ordem de serviço recebida com sucesso.');
      } catch (e) {
        // silenciar erros de toast
      }
      form.reset();
      otherServiceRequested = false;
      updatePreview();
    } catch (error) {
      successMessage.style.color = 'var(--error)';
      successMessage.textContent = 'Não foi possível enviar o e-mail agora. Verifique a conexão e tente novamente.';
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove('is-loading');
      submitButton.textContent = 'Solicitar Serviço';
    }
  }
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || savedTheme === 'light') {
  setTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
}

updatePreview();
maybeShowThemeHint();
initVehicleSuggestions();
initServices();
