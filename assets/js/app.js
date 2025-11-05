import { startRouter } from './router.js';
import { enhanceUI } from './ui.js';

function boot() {
  enhanceUI();   // primeira passada (header, tema, etc.)
  startRouter(); // router renderiza e chama enhanceUI novamente após cada rota
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
