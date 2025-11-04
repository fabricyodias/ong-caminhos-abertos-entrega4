export function enhanceUI() {
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

  if (btn && nav) {
    btn.onclick = () => {
      const open = !document.body.classList.contains('nav-open');
      open ? openNav() : closeNav();
    };
  }
  if (closeBtn) closeBtn.onclick = closeNav;
  if (backdrop) backdrop.onclick = closeNav;

  document.onkeydown = (e) => { if (e.key === 'Escape') closeNav(); };

  document.querySelectorAll('#navPanel a').forEach(a => {
    a.addEventListener('click', () => closeNav());
  });

  const mql = window.matchMedia('(min-width:1024px)');
  const handleResize = () => { if (mql.matches) closeNav(); };
  mql.addEventListener ? mql.addEventListener('change', handleResize)
                       : mql.addListener(handleResize);

  const barra = document.getElementById('barraDoacao');
  const valor = document.getElementById('valorDoacao');
  let total = 0;
  if (barra && valor) {
    const meta = Number(barra.getAttribute('data-meta') || 0);
    const setP = () => {
      const p = Math.min(100, Math.round((total / meta) * 100));
      barra.style.setProperty('--p', p + '%');
      valor.textContent = 'R$ ' + total.toLocaleString('pt-BR');
    };
    setP();

    const inc = (btn) => {
      total += Number(btn.getAttribute('data-add-doacao') || 0);
      setP();
    };

    document.querySelectorAll('[data-add-doacao]').forEach(btn => {
      const onClick = (e) => { e.preventDefault(); inc(btn); };
      btn.addEventListener('click', onClick, { passive: false });
      btn.addEventListener('touchstart', onClick, { passive: false });
    });
  }
}
