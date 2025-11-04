export function enhanceUI() {
  const btn = document.getElementById('btnHamburger') || document.querySelector('.hamburger');
  const nav = document.getElementById('navPanel');
  const closeBtn = document.getElementById('btnCloseNav');
  const backdrop = document.getElementById('navBackdrop');
  const toggleTheme = document.getElementById('btnTheme');
  const toggleContrast = document.getElementById('btnContrast');

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

  const theme = localStorage.getItem('theme');
  const contrast = localStorage.getItem('contrast');
  if (theme) document.body.dataset.theme = theme;
  if (contrast) document.body.dataset.contrast = contrast;

  if (toggleTheme) {
    toggleTheme.setAttribute('aria-pressed', document.body.dataset.theme === 'dark' ? 'true' : 'false');
    toggleTheme.onclick = () => {
      const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = next;
      localStorage.setItem('theme', next);
      toggleTheme.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    };
  }

  if (toggleContrast) {
    toggleContrast.setAttribute('aria-pressed', document.body.dataset.contrast === 'high' ? 'true' : 'false');
    toggleContrast.onclick = () => {
      const next = document.body.dataset.contrast === 'high' ? '' : 'high';
      if (next) document.body.dataset.contrast = next; else delete document.body.dataset.contrast;
      localStorage.setItem('contrast', next);
      toggleContrast.setAttribute('aria-pressed', next === 'high' ? 'true' : 'false');
    };
  }

  const barra = document.getElementById('barraDoacao');
  const valor = document.getElementById('valorDoacao');
  let total = 0;
  if (barra && valor) {
    const meta = Number(barra.getAttribute('data-meta') || 0);
    const setP = () => {
      const p = Math.min(100, Math.round((total / meta) * 100));
      barra.style.setProperty('--p', p + '%');
      barra.setAttribute('aria-valuenow', String(total));
      valor.textContent = 'R$ ' + total.toLocaleString('pt-BR');
    };
    setP();
    const inc = (btn) => { total += Number(btn.getAttribute('data-add-doacao') || 0); setP(); };
    const onClick = (e, btn) => { e.preventDefault(); inc(btn); };
    document.querySelectorAll('[data-add-doacao]').forEach(b => {
      b.addEventListener('click', (e) => onClick(e, b), { passive: false });
      b.addEventListener('touchstart', (e) => onClick(e, b), { passive: false });
      b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inc(b); }});
    });
  }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    const sel = btn.getAttribute('data-open-modal');
    const modal = document.querySelector(sel);
    if (!modal) return;
    const close = modal.querySelector('[data-close-modal]');
    btn.addEventListener('click', () => { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); });
    if (close) close.addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
  });

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
}
