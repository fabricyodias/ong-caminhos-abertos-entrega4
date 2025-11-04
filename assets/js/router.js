import { Templates } from './templates.js';

const routes = {
  '/': Templates.home,
  '/projetos': Templates.projetos,
  '/cadastro': Templates.cadastro
};

function currentPath() {
  const p = (location.hash || '#/').slice(1);
  return routes[p] ? p : '/';
}

export async function render() {
  const app = document.getElementById('app');
  if (!app) return;

  const path = currentPath();
  const tpl = routes[path];

  let html = '';
  try { html = tpl ? tpl() : ''; }
  catch (err) {
    html = `<section class="container section"><div class="alert alert-danger">Erro ao renderizar: ${String(err)}</div></section>`;
  }
  app.innerHTML = html;

  try {
    const mod = await import('./ui.js');
    if (typeof mod.enhanceUI === 'function') mod.enhanceUI();
  } catch {}

  if (path === '/cadastro') {
    try {
      const mod = await import('./forms.js');
      if (typeof mod.initForm === 'function') mod.initForm();
    } catch {}
  }

  document.querySelectorAll('.nav a[aria-current="page"]').forEach(a => a.removeAttribute('aria-current'));
  const active = document.querySelector(`.nav a[data-route="${path}"]`);
  if (active) active.setAttribute('aria-current', 'page');

  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function startRouter() {
  window.addEventListener('hashchange', render);
  if (!location.hash) {
    location.hash = '/';
    setTimeout(render, 0);
    return;
  }
  render();
}
