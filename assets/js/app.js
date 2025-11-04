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


const valorMeta = 12000;
let valorAtual = 0;
const barra = document.querySelector('#barraProgresso');
const valorDoado = document.querySelector('#valorDoado');
const botoesDoacao = document.querySelectorAll('[data-doacao]');

if (barra && valorDoado && botoesDoacao.length > 0) {
  botoesDoacao.forEach(botao => {
    botao.addEventListener('click', () => {
      const valor = Number(botao.dataset.doacao);
      valorAtual += valor;
      if (valorAtual > valorMeta) valorAtual = valorMeta;
      const percentual = (valorAtual / valorMeta) * 100;
      barra.style.width = `${percentual}%`;
      valorDoado.textContent = `R$ ${valorAtual.toLocaleString('pt-BR')}`;
    });
  });
}
