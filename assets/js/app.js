import { startRouter } from './router.js';
import { enhanceUI } from './ui.js';

function boot() {
  enhanceUI();
  startRouter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
