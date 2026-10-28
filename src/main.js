import { renderHeader, renderFooter, propertyCard, icon } from './layout.js';
import { markets, properties, programs, testimonials, insights, services, img, countryName, fmtUSD } from './data.js';
import { runIntro } from './intro.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const page = document.body.dataset.page;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const { gsap, ScrollTrigger, Lenis } = window;

// ---------- Shell ----------
$('#header-slot').outerHTML = renderHeader(page);
$('#footer-slot').outerHTML = renderFooter();
$$('[data-icon]').forEach((el) => el.insertAdjacentHTML('beforeend', icon[el.dataset.icon]));

const header = $('#siteHeader');
let lastY = 0;
function onScroll(y) {
  header.classList.toggle('is-solid', y > 40);
  const hide = y > 400 && y > lastY && !document.body.classList.contains('menu-open');
  header.classList.toggle('is-hidden', hide);
  document.body.classList.toggle('hdr-hidden', hide);
  lastY = y;
}

const menuBtn = $('#menuBtn');
const menu = $('#mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') !== 'true';
  menuBtn.setAttribute('aria-expanded', open);
  menu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  open ? lenis?.stop() : lenis?.start();
});

$$('.lang button').forEach((b) =>
  // Visual toggle only; TR/AR translations come later.
  b.addEventListener('click', () => $$('.lang button').forEach((x) => x.classList.toggle('is-on', x === b)))
);

// ---------- Smooth scroll ----------
let lenis = null;
if (Lenis && !reduced) {
  lenis = new Lenis({ lerp: 0.09 });
  lenis.on('scroll', ({ scroll }) => onScroll(scroll));
  if (gsap) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
} else {
  addEventListener('scroll', () => onScroll(scrollY), { passive: true });
}
onScroll(scrollY);

// ---------- Page content ----------
const pages = {
  home() {
    // Markets: hover list drives the image frame
    const list = $('#marketList');
    const frame = $('#marketFrame');
    list.innerHTML = markets
      .map((m, i) => `
        <li class="market-item${i === 0 ? ' is-active' : ''}" data-i="${i}">
          <a href="properties.html?country=${m.id}">
            <small>0${i + 1}</small><h3>${m.name}</h3>${icon.arrow.replace('<svg', '<svg class="arrow"')}
            <p>${m.city} — ${m.line}</p>
          </a>
        </li>`)
      .join('');
    frame.innerHTML =
      markets.map((m, i) => `<img src="${img(m.image, 1200)}" alt="${m.name}" class="${i === 0 ? 'is-active' : ''}" loading="${i < 2 ? 'eager' : 'lazy'}"/>`).join('') +
      `<figcaption id="marketCap">${markets[0].city}</figcaption>`;
    const activate = (i) => {
      $$('.market-item', list).forEach((li, j) => li.classList.toggle('is-active', i === j));
      $$('img', frame).forEach((im, j) => im.classList.toggle('is-active', i === j));
      $('#marketCap').textContent = markets[i].city;
    };
    $$('.market-item', list).forEach((li) => {
      const i = +li.dataset.i;
      li.addEventListener('mouseenter', () => activate(i));
      li.querySelector('a').addEventListener('focus', () => activate(i));
    });

    $('#featured').innerHTML = properties.filter((p) => [1, 2, 3].includes(p.id)).map((p) => propertyCard(p, countryName, fmtUSD)).join('');

    $('#programRows').innerHTML = programs
      .map((p) => `
        <a class="program-row" href="${p.href}" data-reveal>
          <span class="code">${p.code}</span>
          <h3>${p.name}</h3>
          <span class="cell"><small>Minimum</small>${p.min}</span>
          <span class="cell"><small>Status</small>${p.term}</span>
          <span class="cell"><small>Timeline</small>${p.timeline}</span>
          ${icon.arrow}
        </a>`)
      .join('');

    $('#serviceList').innerHTML = services
      .map((s, i) => `<div class="service" data-reveal><small>0${i + 1}</small><h3>${s.title}</h3><p>${s.body}</p></div>`)
      .join('');

    $('#insightGrid').innerHTML = insights
      .map((p) => `
        <a class="insight" href="#" data-reveal>
          <div class="media"><img src="${img(p.image, 900)}" alt="" loading="lazy"/></div>
          <p class="eyebrow">${p.tag} · ${p.date}</p>
          <h3>${p.title}</h3>
        </a>`)
      .join('');

    initCalculator();
    initQuotes();
  },

  properties() {
    const form = $('#filters');
    const grid = $('#listing');
    const params = new URLSearchParams(location.search);
    form.country.innerHTML += markets.map((m) => `<option value="${m.id}">${m.name}</option>`).join('');
    for (const k of ['country', 'type', 'budget']) if (params.get(k)) form[k].value = params.get(k);
    if (params.get('program') === 'citizenship') form.eligible.checked = true;

    const render = () => {
      const f = Object.fromEntries(new FormData(form));
      let rows = properties.filter(
        (p) =>
          (!f.country || p.country === f.country) &&
          (!f.type || p.type === f.type) &&
          (!f.budget || p.price <= +f.budget) &&
          (!form.eligible.checked || p.eligible)
      );
      if (f.sort === 'asc') rows.sort((a, b) => a.price - b.price);
      if (f.sort === 'desc') rows.sort((a, b) => b.price - a.price);
      $('#count').textContent = rows.length;
      grid.innerHTML = rows.length
        ? rows.map((p) => propertyCard(p, countryName, fmtUSD)).join('')
        : `<div class="no-results"><h3>No matches yet</h3><p>Our advisors often hold off-market stock. <a class="link-arrow" href="contact.html">Ask an advisor ${icon.arrow}</a></p></div>`;
      reveal(grid);
    };
    form.addEventListener('change', render);
    render();
  },

  citizenship() {
    $('#eligible').innerHTML = properties
      .filter((p) => p.country === 'turkey' || p.eligible)
      .slice(0, 3)
      .map((p) => propertyCard(p, countryName, fmtUSD))
      .join('');
  },

  contact() {
    const form = $('#enquiry');
    const prop = new URLSearchParams(location.search).get('property');
    if (prop) form.message.value = `I'd like more information about ${prop}.`;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('is-sent');
      scrollTo({ top: $('#enquiryWrap').offsetTop - 120 });
    });
  },
};

function initCalculator() {
  const out = $('#budgetOut');
  const range = $('#budget');
  const results = $('#calcResults');
  let goal = 'any';
  $$('#goalSeg button').forEach((b) =>
    b.addEventListener('click', () => {
      goal = b.dataset.goal;
      $$('#goalSeg button').forEach((x) => x.classList.toggle('is-on', x === b));
      update();
    })
  );
  range.addEventListener('input', update);
  function update() {
    const budget = +range.value;
    out.textContent = budget >= 2000000 ? 'USD 2M+' : fmtUSD(budget);
    const list = programs.filter((p) => goal === 'any' || p.goal === goal).sort((a, b) => a.usd - b.usd);
    const ok = list.filter((p) => p.usd <= budget).length;
    $('#calcCount').textContent = ok;
    results.innerHTML = list
      .map((p) => `
        <div class="calc-result ${p.usd > budget ? 'is-out' : ''}">
          <h4>${p.name}</h4>
          <span class="meta">${p.term} · ${p.timeline}</span>
          <span class="min"><small>${p.usd > budget ? 'Above budget' : 'Eligible from'}</small>${p.min}</span>
        </div>`)
      .join('');
  }
  update();
}

function initQuotes() {
  const stage = $('#quoteStage');
  stage.innerHTML = testimonials
    .map((t, i) => `
      <figure class="quote${i === 0 ? ' is-active' : ''}">
        <blockquote>${t.quote}</blockquote>
        <footer><strong>${t.name}</strong><span class="eyebrow">${t.meta}</span></footer>
      </figure>`)
    .join('');
  let i = 0;
  const n = testimonials.length;
  const go = (d) => {
    i = (i + d + n) % n;
    $$('.quote', stage).forEach((q, j) => q.classList.toggle('is-active', i === j));
    $('#quoteCount').textContent = `0${i + 1} / 0${n}`;
  };
  $('#quotePrev').addEventListener('click', () => go(-1));
  $('#quoteNext').addEventListener('click', () => go(1));
  $('#quoteCount').textContent = `01 / 0${n}`;
}

pages[page]?.();

// ---------- Motion ----------
function reveal(scope = document) {
  if (!gsap || reduced) return;
  const items = $$('[data-reveal]', scope).filter((el) => !el.dataset.revealed);
  items.forEach((el) => (el.dataset.revealed = '1'));
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });
  ScrollTrigger.refresh();
}

if (gsap && ScrollTrigger && !reduced) {
  gsap.registerPlugin(ScrollTrigger);
  window.__revealReady = true;
  reveal();

  // Hero headline: line-by-line rise
  const heroIn = (d = 0) => {
    const lines = $$('.hero h1 .line > span, .page-hero h1 .line > span');
    if (lines.length) gsap.from(lines, { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: 0.12, delay: 0.15 + d });
    gsap.from('.hero-sub, .hero .eyebrow, .search-dock', { opacity: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.5 + d });
  };
  if (document.documentElement.classList.contains('intro-on') && $('#intro')) {
    runIntro({ gsap, lenis, onReveal: heroIn });
  } else {
    heroIn();
  }

  // Count-up stats
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => (el.textContent = Math.round(obj.v) + (el.dataset.suffix || '')),
    });
  });

  // Parallax images
  $$('[data-parallax]').forEach((el) => {
    gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, scrub: true } });
  });
} else {
  document.documentElement.classList.remove('js', 'intro-on');
  $('#intro')?.remove();
}
