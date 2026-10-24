/*
 * ЕДИНАЯ КОНФИГУРАЦИЯ: замените данные ниже, чтобы настроить визитку.
 * Instagram, WhatsApp и 2GIS можно изменить прямо здесь за минуту.
 * Для отсутствующих ссылок оставьте пустую строку — карточка останется неактивной.
 */
const BUSINESS = {
  name: 'Lambeth',
  logo: '', // Путь к логотипу, например: "images/logo.png". Пусто — показать первую букву.
  description: 'Школа английского языка в Алматы. Курсы онлайн и офлайн.',
  category: 'ШКОЛА АНГЛИЙСКОГО ЯЗЫКА',
  location: 'Алматы',
  theme: {
    accent: '#829dff',
    accentSoft: '#bdcaff',
  },
  instagramUrl: 'https://www.instagram.com/lambeth_kz/',
  whatsappNumber: '77003703038', // Номер из предоставленной ссылки WhatsApp, международный формат
  whatsappMessage: 'Здравствуйте! Расскажите, пожалуйста, подробнее.',
  twoGisUrl: 'https://2gis.kz/almaty/firm/70000001099759180',
  contact: {
    name: 'Lambeth',
    phone: '+7 700 370 30 38',
    email: '',
    website: '', // Если пусто, в контакт попадёт адрес этой страницы.
    company: 'Lambeth',
    title: '',
  },
  publicUrl: '', // Для своей короткой постоянной ссылки укажите полный HTTPS URL.
  orderUrl: '', // Ссылка на заказ NFC-карты. Пусто — показываем «Скоро».
};

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="17.6" cy="6.7" r="1" fill="currentColor"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4.1A8 8 0 1 1 20 11.5Z" stroke="currentColor" stroke-width="1.65" stroke-linejoin="round"/><path d="M9.1 8.4c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.2.2-.1.4 0 .6.5.9 1.3 1.7 2.2 2.1.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.5-.4.4-1 .6-1.7.5-1-.1-2.5-.7-4-2.1-1.2-1.1-2-2.5-2.2-3.5-.2-.8.1-1.4.5-1.8.2-.2.5-.4.6-.4Z" fill="currentColor"/></svg>',
  maps: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5.2-7 11-7 11S5 15.2 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.7"/></svg>',
  arrow: '<svg class="action-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const byId = (id) => document.getElementById(id);
let installPrompt = null;
let toastTimer;
const shareUrl = () => BUSINESS.publicUrl.trim() || window.location.href.split('#')[0];

function validHttpUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function phoneDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function showToast(message) {
  const toast = byId('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function applyConfiguration() {
  document.documentElement.style.setProperty('--accent', BUSINESS.theme.accent);
  document.documentElement.style.setProperty('--accent-2', BUSINESS.theme.accentSoft);
  document.querySelector('meta[name="description"]').content = BUSINESS.description;
  document.title = `${BUSINESS.name} — цифровая визитка`;
  document.querySelector('meta[property="og:title"]').content = `${BUSINESS.name} — цифровая визитка`;
  document.querySelector('meta[property="og:description"]').content = BUSINESS.description;
  byId('brand-name').innerHTML = 'NFC<span> DIGITAL</span>';
  byId('company-name').textContent = BUSINESS.name;
  byId('company-description').textContent = BUSINESS.description;
  byId('company-category').textContent = BUSINESS.category;
  byId('location-label').textContent = BUSINESS.location;
  byId('avatar-initials').textContent = (BUSINESS.name.trim()[0] || 'N').toLocaleUpperCase('ru');
  if (BUSINESS.logo && validHttpUrl(BUSINESS.logo)) {
    const image = document.createElement('img');
    image.src = BUSINESS.logo;
    image.alt = `Логотип ${BUSINESS.name}`;
    image.addEventListener('load', () => byId('company-avatar').classList.add('has-image'));
    byId('company-avatar').prepend(image);
  } else if (BUSINESS.logo && !BUSINESS.logo.startsWith('javascript:')) {
    const image = document.createElement('img');
    image.src = BUSINESS.logo;
    image.alt = `Логотип ${BUSINESS.name}`;
    image.addEventListener('load', () => byId('company-avatar').classList.add('has-image'));
    image.addEventListener('error', () => image.remove());
    byId('company-avatar').prepend(image);
  }

  const instagram = validHttpUrl(BUSINESS.instagramUrl);
  const number = phoneDigits(BUSINESS.whatsappNumber);
  const whatsapp = number ? `https://wa.me/${number}?text=${encodeURIComponent(BUSINESS.whatsappMessage || '')}` : '';
  const twoGis = validHttpUrl(BUSINESS.twoGisUrl);
  const actions = [
    { type: 'instagram', title: 'Наш Instagram', description: instagram ? 'Работы, новости и обновления' : 'Ссылка на профиль скоро появится', href: instagram, label: 'Открыть профиль в Instagram' },
    { type: 'whatsapp', title: 'Написать в WhatsApp', description: whatsapp ? 'Свяжитесь с нами за несколько секунд' : 'Ссылка на номер скоро появится', href: whatsapp, label: 'Написать нам в WhatsApp' },
    { type: 'maps', title: 'Найти нас в 2GIS', description: twoGis ? 'Адрес, маршрут и отзывы' : 'Ссылка на адрес скоро появится', href: twoGis, label: 'Открыть компанию в 2GIS' },
  ];
  byId('action-list').innerHTML = actions.map((item) => {
    const tag = item.href ? 'a' : 'div';
    const link = item.href ? `href="${escapeAttribute(item.href)}" target="_blank" rel="noopener noreferrer"` : 'aria-disabled="true"';
    return `<${tag} class="action-card ${item.type}${item.href ? '' : ' is-disabled'}" ${link} aria-label="${escapeAttribute(item.label)}"><span class="action-icon">${ICONS[item.type]}</span><span class="action-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small></span>${ICONS.arrow}</${tag}>`;
  }).join('');

  const orderUrl = validHttpUrl(BUSINESS.orderUrl);
  if (orderUrl) {
    const orderLink = byId('order-link');
    orderLink.href = orderUrl;
    orderLink.target = '_blank';
    orderLink.rel = 'noopener noreferrer';
    orderLink.hidden = false;
    byId('order-note').hidden = true;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  if (!copied) throw new Error('Копирование не поддерживается');
}

async function sharePage() {
  const url = shareUrl();
  if (navigator.share) {
    try {
      await navigator.share({ title: `${BUSINESS.name} — цифровая визитка`, text: BUSINESS.description, url });
    } catch (error) {
      if (error.name === 'AbortError') return;
      try { await copyText(url); showToast('Ссылка скопирована'); }
      catch { showToast('Не удалось поделиться ссылкой'); }
    }
    return;
  }
  try {
    await copyText(url);
    showToast('Ссылка скопирована');
  } catch {
    showToast('Не удалось скопировать ссылку');
  }
}

function vcardEscape(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function downloadContact() {
  const contact = BUSINESS.contact;
  const name = contact.name || BUSINESS.name;
  const website = validHttpUrl(contact.website) || shareUrl();
  const lines = [
    'BEGIN:VCARD', 'VERSION:3.0', `FN:${vcardEscape(name)}`, `N:;${vcardEscape(name)};;;`,
    `ORG:${vcardEscape(contact.company || BUSINESS.name)}`,
  ];
  if (contact.title) lines.push(`TITLE:${vcardEscape(contact.title)}`);
  if (contact.phone) lines.push(`TEL;TYPE=CELL:${vcardEscape(contact.phone)}`);
  if (contact.email) lines.push(`EMAIL:${vcardEscape(contact.email)}`);
  if (website) lines.push(`URL:${vcardEscape(website)}`);
  if (validHttpUrl(BUSINESS.instagramUrl)) lines.push(`X-SOCIALPROFILE;TYPE=instagram:${vcardEscape(BUSINESS.instagramUrl)}`);
  if (phoneDigits(BUSINESS.whatsappNumber)) lines.push(`X-SOCIALPROFILE;TYPE=whatsapp:${vcardEscape(`https://wa.me/${phoneDigits(BUSINESS.whatsappNumber)}`)}`);
  if (validHttpUrl(BUSINESS.twoGisUrl)) lines.push(`X-SOCIALPROFILE;TYPE=2gis:${vcardEscape(BUSINESS.twoGisUrl)}`);
  lines.push('END:VCARD');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${(BUSINESS.name || 'contact').trim().replace(/[^\p{L}\p{N}-]+/gu, '-')}.vcf`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
  showToast('Контакт готов к сохранению');
}

async function openQrModal() {
  const modal = byId('qr-modal');
  modal.querySelector('.modal-description').textContent = !BUSINESS.publicUrl && (location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(location.hostname))
    ? 'Локальный предпросмотр. Чтобы QR-код открывался на другом телефоне, опубликуйте визитку и укажите её публичную ссылку.'
    : 'Отсканируйте QR-код, чтобы открыть эту визитку.';
  const frame = byId('qr-frame');
  const download = byId('download-qr');
  delete frame.dataset.png;
  frame.innerHTML = '<span class="qr-loading">Создаём QR-код…</span>';
  download.disabled = true;
  showDialog(modal);
  try {
    const qr = window.qrcode(0, 'H');
    qr.addData(shareUrl(), 'Byte');
    qr.make();
    const svg = new DOMParser().parseFromString(qr.createSvgTag(6, 24, 'QR-код визитки'), 'image/svg+xml').documentElement;
    svg.setAttribute('width', '188');
    svg.setAttribute('height', '188');
    frame.replaceChildren(svg);
    const canvas = await qrSvgToCanvas(svg);
    frame.dataset.png = canvas.toDataURL('image/png');
    download.disabled = false;
  } catch {
    frame.innerHTML = '<span class="qr-loading">Не удалось загрузить генератор QR-кода. Проверьте подключение и попробуйте ещё раз.</span>';
    showToast('QR-код пока недоступен');
  }
}

function downloadQr() {
  const image = byId('qr-frame').dataset.png;
  if (!image) return;
  const anchor = document.createElement('a');
  anchor.download = `${(BUSINESS.name || 'nfc-card').trim().replace(/[^\p{L}\p{N}-]+/gu, '-')}-qr.png`;
  anchor.href = image;
  anchor.click();
}

function qrSvgToCanvas(svg) {
  return new Promise((resolve, reject) => {
    const svgText = new XMLSerializer().serializeToString(svg);
    const objectUrl = URL.createObjectURL(new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' }));
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 564;
      canvas.height = 564;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('QR не удалось преобразовать в изображение'));
    };
    image.src = objectUrl;
  });
}

function makeStep(number, content) {
  const step = document.createElement('div');
  step.className = 'install-step';
  step.innerHTML = `<span class="step-number">${number}</span><span>${content}</span>`;
  return step;
}

function openInstallInstructions() {
  const modal = byId('install-modal');
  const steps = byId('install-steps');
  const action = byId('install-action');
  steps.replaceChildren();
  action.hidden = true;
  if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) {
    byId('install-instructions').textContent = 'Визитка уже открыта как приложение.';
    showDialog(modal);
    return;
  }
  if (location.protocol === 'file:') {
    byId('install-instructions').textContent = 'Для установки откройте визитку по опубликованной HTTPS-ссылке.';
    showDialog(modal);
    return;
  }
  if (installPrompt) {
    byId('install-instructions').textContent = 'Добавьте визитку на главный экран, чтобы открывать её одним касанием.';
    action.hidden = false;
  } else if (/iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    byId('install-instructions').textContent = 'На iPhone визитку можно добавить на главный экран через меню Safari.';
    steps.append(
      makeStep('1', 'Откройте страницу в <strong>Safari</strong> и нажмите кнопку «Поделиться» <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 13V3m0 0L6.5 6.5M10 3l3.5 3.5M4 11v4.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>.'),
      makeStep('2', 'Прокрутите меню и выберите <strong>«На экран Домой»</strong>.'),
      makeStep('3', 'Нажмите <strong>«Добавить»</strong> в правом верхнем углу.'),
    );
  } else if (/android/i.test(navigator.userAgent)) {
    byId('install-instructions').textContent = 'В браузере Chrome на Android добавьте визитку на главный экран.';
    steps.append(
      makeStep('1', 'Нажмите меню браузера <strong>⋮</strong> в правом верхнем углу.'),
      makeStep('2', 'Выберите <strong>«Установить приложение»</strong> или <strong>«Добавить на главный экран»</strong>.'),
      makeStep('3', 'Подтвердите установку в появившемся окне.'),
    );
  }
  if (!installPrompt && !steps.children.length) {
    byId('install-instructions').textContent = 'Откройте меню браузера и найдите пункт установки приложения. Если такого пункта нет, сохраните страницу в закладки.';
  }
  showDialog(modal);
}

async function installApp() {
  const pending = installPrompt;
  if (!pending) return;
  byId('install-action').disabled = true;
  try {
    await pending.prompt();
    await pending.userChoice;
    installPrompt = null;
    closeDialog(byId('install-modal'));
  } catch {
    showToast('Установка недоступна. Откройте меню браузера.');
  } finally {
    byId('install-action').disabled = false;
  }
}

// Keep the underlying page still while a dialog scrolls on a small screen.
let dialogScroll = 0;
let dialogTrigger = null;
function showDialog(dialog) {
  if (dialog.open) return;
  dialogTrigger = document.activeElement;
  dialogScroll = window.scrollY;
  Object.assign(document.body.style, {
    position: 'fixed', top: `-${dialogScroll}px`, width: '100%', left: '0',
  });
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else {
    dialog.setAttribute('open', '');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.classList.add('is-fallback');
    document.body.classList.add('fallback-overlay');
  }
  dialog.querySelector('.modal-close').focus({ preventScroll: true });
}
function restoreDialogPage() {
  Object.assign(document.body.style, { position: '', top: '', width: '', left: '' });
  document.body.classList.remove('fallback-overlay');
  const behavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, dialogScroll);
  document.documentElement.style.scrollBehavior = behavior;
  dialogTrigger?.focus({ preventScroll: true });
}
function closeDialog(dialog) {
  if (typeof dialog.close === 'function') dialog.close();
  else {
    dialog.removeAttribute('open');
    dialog.classList.remove('is-fallback');
    restoreDialogPage();
  }
}
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.addEventListener('close', restoreDialogPage);
  dialog.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    closeDialog(dialog);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog(dialog);
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.classList.contains('is-fallback')) closeDialog(dialog);
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not(:disabled), a[href]')].filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}

byId('share-button').addEventListener('click', sharePage);
byId('save-contact').addEventListener('click', downloadContact);
byId('qr-button').addEventListener('click', openQrModal);
byId('download-qr').addEventListener('click', downloadQr);
byId('install-button').addEventListener('click', openInstallInstructions);
byId('install-action').addEventListener('click', installApp);
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
});
window.addEventListener('appinstalled', () => { installPrompt = null; showToast('Визитка установлена'); });

applyConfiguration();

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(() => {}));
}
