import { startRouter } from './router.js';
import { enhanceUI } from './ui.js';

function boot() {
  enhanceUI();         // garante menu funcionando mesmo antes do render
  startRouter();       // carrega a rota inicial e re-renderiza conforme o hash
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
