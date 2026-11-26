{
  // Self-Made Projects dropdown: each name opens the prototype directly.
  const gh = "https://github.com/kb-tejaswini/";
  const pages = "https://kb-tejaswini.github.io/";
  const prototypes = [
    ["Receive Shield", pages + "Receive-Shield/"],
    ["WearWallet", pages + "EV-WearWallet/"],
    ["Spice and Bun Co. Pricing", pages + "Spice-and-Bun-Co-Pricing-Prototype/START-HERE_price_plan%20Prototype.html"],
    ["Placement Email Calendar Agent", gh + "placement-email-calendar-agent"],
    ["Road Race Game", pages + "Road-Race-Game/"],
    ["Career Carve Mobile App", pages + "Mobile-App-Dev/"]
  ];
  document.getElementById('menu').innerHTML = prototypes.map(p =>
    '<a href="' + p[1] + '" target="_blank" rel="noopener">' + p[0] + '</a>').join('')
    + '<a class="all" href="projects.html">All projects with details</a>';
  const drop = document.getElementById('drop');
  document.addEventListener('click', e => { if (drop.open && !drop.contains(e.target)) drop.open = false; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drop.open) { drop.open = false; drop.querySelector('summary').focus(); } });

  // Theme toggle
  const tb = document.getElementById('theme');
  const setLabel = () => tb && tb.setAttribute('aria-label', document.documentElement.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  setLabel();
  if (tb) tb.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    if (dark) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme;
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    setLabel();
  });

  // Highlight the section in view on the home page
  const navLinks = [...document.querySelectorAll('.navlinks > a[href^="#"]')];
  if (navLinks.length && 'IntersectionObserver' in window) {
    const byId = {};
    navLinks.forEach(a => { byId[a.getAttribute('href').slice(1)] = a; });
    const summ = document.querySelector('#drop summary');
    if (summ && document.getElementById('selfmade')) byId['selfmade'] = summ;
    const secs = Object.keys(byId).map(id => document.getElementById(id)).filter(Boolean);
    const mark = id => {
      navLinks.forEach(a => { if (a === byId[id]) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      if (summ) summ.classList.toggle('cur', id === 'selfmade');
    };
    const spy = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis.length) mark(vis[0].target.id);
    }, { rootMargin: '-110px 0px -55% 0px' });
    secs.forEach(s => spy.observe(s));
  }
}
