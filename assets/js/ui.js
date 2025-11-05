export function enhanceUI() {
  // ---------- Menu mobile ----------
  const btn = document.getElementById('btnHamburger') || document.querySelector('.hamburger');
  const nav = document.getElementById('navPanel');
  const closeBtn = document.getElementById('btnCloseNav');
  const backdrop = document.getElementById('navBackdrop');

  const openNav = () => {
    if (!nav) return;
    document.body.classList.add('nav-open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.hidden = false;
  };
  const closeNav = () => {
    document.body.classList.remove('nav-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.hidden = true;
  };

  if (btn && nav) btn.onclick = () => document.body.classList.contains('nav-open') ? closeNav() : openNav();
  if (closeBtn) closeBtn.onclick = closeNav;
  if (backdrop) backdrop.onclick = closeNav;
  document.onkeydown = (e) => { if (e.key === 'Escape') closeNav(); };
  document.querySelectorAll('#navPanel a').forEach(a => a.addEventListener('click', closeNav));
  const mql = window.matchMedia('(min-width:1024px)');
  const handleResize = () => { if (mql.matches) closeNav(); };
  mql.addEventListener ? mql.addEventListener('change', handleResize) : mql.addListener(handleResize);

  // ---------- Tema e alto contraste ----------
  const btnTheme = document.getElementById('btnTheme');
  const btnContrast = document.getElementById('btnContrast');
  const savedTheme = localStorage.getItem('theme');
  const savedContrast = localStorage.getItem('contrast');
  if (savedTheme) document.body.dataset.theme = savedTheme;
  if (savedContrast) document.body.dataset.contrast = savedContrast;

  if (btnTheme) {
    btnTheme.setAttribute('aria-pressed', document.body.dataset.theme === 'dark' ? 'true' : 'false');
    btnTheme.onclick = () => {
      const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = next;
      localStorage.setItem('theme', next);
      btnTheme.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    };
  }
  if (btnContrast) {
    btnContrast.setAttribute('aria-pressed', document.body.dataset.contrast === 'high' ? 'true' : 'false');
    btnContrast.onclick = () => {
      const v = document.body.dataset.contrast === 'high' ? '' : 'high';
      if (v) document.body.dataset.contrast = v; else delete document.body.dataset.contrast;
      localStorage.setItem('contrast', v);
      btnContrast.setAttribute('aria-pressed', v === 'high' ? 'true' : 'false');
    };
  }

  // ---------- Modal genérico (Projetos) ----------
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    const sel = btn.getAttribute('data-open-modal');
    const modal = document.querySelector(sel);
    if (!modal) return;
    const close = modal.querySelector('[data-close-modal]');
    btn.addEventListener('click', () => { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); });
    if (close) close.addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
  });

  // ---------- Filtros (Projetos) ----------
  const filterTags = document.querySelectorAll('.filters .tag');
  const grid = document.querySelector('.card-grid');
  if (filterTags.length && grid) {
    filterTags.forEach(tag => {
      const activate = () => {
        filterTags.forEach(t => t.classList.remove('on'));
        tag.classList.add('on');
        filterTags.forEach(t => t.setAttribute('aria-pressed', t.classList.contains('on') ? 'true' : 'false'));
        const cat = tag.getAttribute('data-cat') || '';
        grid.querySelectorAll('[data-cat]').forEach(card => {
          const show = !cat || card.getAttribute('data-cat') === cat;
          card.style.display = show ? '' : 'none';
        });
      };
      tag.addEventListener('click', activate);
      tag.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }});
    });
  }

  // ---------- Campanha de Doação (Home) ----------
  const barra = document.querySelector('#barraProgresso');
  const valorDoado = document.querySelector('#valorDoado');
  const botoes = document.querySelectorAll('[data-doacao]');
  if (barra && valorDoado && botoes.length) {
    const meta = 12000;
    let total = 0;
    const atualizar = () => {
      const p = Math.min(100, Math.round((total / meta) * 100));
      barra.style.width = p + '%';
      valorDoado.textContent = 'R$ ' + total.toLocaleString('pt-BR');
    };
    atualizar();

    const add = (btn) => {
      total += Number(btn.getAttribute('data-doacao') || 0);
      if (total > meta) total = meta;
      atualizar();
    };

    botoes.forEach(btn => {
      const handler = (e) => { e.preventDefault(); add(btn); };
      btn.addEventListener('click', handler, { passive: false });
      btn.addEventListener('touchstart', handler, { passive: false });
      btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); add(btn); }});
    });
  }
}
