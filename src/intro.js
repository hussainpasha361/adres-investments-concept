import { logo } from './layout.js';

// Homepage intro: the wordmark builds itself on an ink panel, then flies into the
// header while the panel wipes upward to reveal the hero (after Emaar's opening).
const cities = ['Istanbul', 'Dubai', 'Athens', 'Marbella', 'London', 'Limassol', 'Bali'];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function runIntro({ gsap, lenis, onReveal }) {
  const root = document.documentElement;
  const intro = document.getElementById('intro');
  const mark = intro.querySelector('.intro-logo');
  const count = intro.querySelector('.intro-count');
  const city = intro.querySelector('.intro-city');
  const heroImg = document.querySelector('.hero-media img');
  const headerLogo = document.querySelector('.site-header .brand .logo');

  window.__introStarted = true;
  mark.innerHTML = logo({ intro: true });
  lenis?.stop();

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    intro.remove();
    root.classList.remove('intro-on');
    window.__introDone = true;
    try { sessionStorage.setItem('adres-intro', '1'); } catch (e) {}
    lenis?.start();
    window.ScrollTrigger?.refresh();
  };
  // Never leave the visitor stuck behind the intro, however slow the page is.
  setTimeout(() => {
    if (finished) return;
    gsap.set('.site-header .primary, .site-header .hdr-actions', { clearProps: 'all' });
    gsap.set(heroImg, { scale: 1 });
    finish();
  }, 14000);

  const imageReady = new Promise((r) => {
    if (!heroImg || heroImg.complete) return r();
    heroImg.addEventListener('load', r, { once: true });
    heroImg.addEventListener('error', r, { once: true });
  });
  // Don't animate SVG text in a fallback face.
  await Promise.race([document.fonts?.ready, wait(1500)]);

  gsap.set(intro.querySelector('.intro-panel'), { clipPath: 'inset(0% 0% 0% 0%)' });
  gsap.set(heroImg, { scale: 1.25 });

  let c = 0;
  const ticker = setInterval(() => (city.textContent = cities[++c % cities.length]), 260);
  const progress = { p: 0 };

  const build = gsap
    .timeline({ defaults: { ease: 'expo.inOut' } })
    .set(mark, { opacity: 1 })
    .from('.intro .logo-top', { scaleX: 0, transformOrigin: '0% 50%', duration: 1 }, 0.1)
    .from('.intro .logo-word', { y: 72, duration: 1.2, ease: 'expo.out' }, 0.55)
    .from('.intro .logo-bottom', { scaleX: 0, transformOrigin: '100% 50%', duration: 1 }, 0.7)
    .from('.intro .logo-sub', { opacity: 0, duration: 0.8, ease: 'power2.out' }, 1.15)
    .to(
      { len: 140 },
      {
        len: 238, duration: 1.4, ease: 'expo.out',
        onUpdate() {
          const sub = intro.querySelector('.logo-sub');
          const len = this.targets()[0].len;
          sub.setAttribute('textLength', len);
          sub.setAttribute('x', 1 + (238 - len) / 2);
        },
      },
      1.15
    )
    .from('.intro-meta', { opacity: 0, y: 12, duration: 0.8, ease: 'expo.out' }, 0.3)
    .to(progress, {
      p: 100, duration: 2.4, ease: 'power2.inOut',
      onUpdate: () => {
        count.textContent = String(Math.round(progress.p)).padStart(3, '0');
        gsap.set('.intro-bar', { scaleX: progress.p / 100 });
      },
    }, 0.2);

  await Promise.all([build.then(), Promise.race([imageReady, wait(3000)])]);
  clearInterval(ticker);
  if (finished) return;

  // FLIP: fly the intro mark onto the header logo.
  const from = mark.getBoundingClientRect();
  const to = headerLogo.getBoundingClientRect();

  gsap
    .timeline({ onComplete: finish })
    .to('.intro-meta, .intro-bar', { opacity: 0, duration: 0.4, ease: 'power2.out' }, 0)
    .to(mark, {
      x: to.left - from.left, y: to.top - from.top, scale: to.width / from.width,
      transformOrigin: '0 0', duration: 1.4, ease: 'expo.inOut',
    }, 0.15)
    .to('.intro-panel', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.4, ease: 'expo.inOut' }, 0.2)
    .to(heroImg, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0.45)
    // Called at 0 so the hero text is hidden before the wipe uncovers it.
    .add(() => onReveal(0.55), 0)
    .from('.site-header .primary, .site-header .hdr-actions', { opacity: 0, y: -12, duration: 0.9, ease: 'expo.out' }, 1.1);
}
