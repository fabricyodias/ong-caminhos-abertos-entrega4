import { Templates } from './templates.js';
import { mountForms } from './forms.js';

const routes = {
  '/': Templates.home,
  '/projetos': Templates.projetos,
  '/cadastro': Templates.cadastro
};

function render(path) {
  const view = routes[path] || routes['/'];
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = view();
  app.focus();
  mountForms();
}

function parse() {
  const hash = location.hash.replace(/^#/, '');
  const path = hash.split('?')[0] || '/';
  return path;
}

export function startRouter() {
  render(parse());
  window.addEventListener('hashchange', () => render(parse()));
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-route]');
    if (!a) return;
    e.preventDefault();
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) location.hash = href.slice(1);
  });
}
