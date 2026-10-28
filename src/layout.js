import { contact, markets } from './data.js';

// Vector rebuild of the client's wordmark; inherits colour via currentColor.
// The intro variant masks the word between the two rules so it can rise into place.
export const logo = ({ label = 'Adres Investments', intro = false } = {}) => {
  const word = `<text class="logo-word" x="-2" y="61" textLength="244" lengthAdjust="spacingAndGlyphs" font-family="Jost, sans-serif" font-weight="400" font-size="66" fill="currentColor">ADRES</text>`;
  return `
<svg class="logo" viewBox="0 0 240 100" ${intro ? 'aria-hidden="true"' : `role="img" aria-label="${label}"`}>
  ${intro ? '<defs><clipPath id="introClip"><rect x="0" y="6.5" width="240" height="62.5"/></clipPath></defs>' : ''}
  <rect class="logo-top" x="0" y="0" width="240" height="6.5" fill="currentColor"/>
  ${intro ? `<g clip-path="url(#introClip)">${word}</g>` : word}
  <rect class="logo-bottom" x="0" y="69" width="240" height="4.5" fill="currentColor"/>
  <text class="logo-sub" x="1" y="98" textLength="238" lengthAdjust="spacing" font-family="Jost, sans-serif" font-weight="300" font-size="22" fill="currentColor">INVESTMENTS</text>
</svg>`;
};

export const icon = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5H16.6V4.4a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
};

const nav = [
  { label: 'Properties', href: 'properties.html', key: 'properties' },
  { label: 'Citizenship & Residency', href: 'citizenship.html', key: 'citizenship' },
  { label: 'Services', href: 'index.html#services', key: 'services' },
  { label: 'Insights', href: 'index.html#insights', key: 'insights' },
  { label: 'Contact', href: 'contact.html', key: 'contact' },
];

export function renderHeader(active) {
  const links = nav
    .map((n) => `<a href="${n.href}" ${n.key === active ? 'aria-current="page"' : ''}>${n.label}</a>`)
    .join('');
  return `
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header" id="siteHeader">
    <div class="hdr container">
      <a class="brand" href="index.html">${logo()}</a>
      <nav class="primary" aria-label="Primary">${links}</nav>
      <div class="hdr-actions">
        <div class="lang" role="group" aria-label="Language">
          <button class="is-on" type="button">EN</button><button type="button">TR</button><button type="button">AR</button>
        </div>
        <a class="hdr-wa" href="${contact.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon.whatsapp}</a>
        <a class="btn btn-line btn-sm hdr-cta" href="contact.html">Book a consultation</a>
        <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="mobileMenu">
          <span></span><span></span><span class="sr">Menu</span>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="mobileMenu" hidden>
    <nav aria-label="Mobile">${nav.map((n, i) => `<a href="${n.href}"><small>0${i + 1}</small>${n.label}</a>`).join('')}</nav>
    <div class="mobile-menu-foot">
      <a class="btn btn-gold" href="contact.html">Book a consultation</a>
      <a href="${contact.phoneHref}">${contact.phone}</a>
      <a href="mailto:${contact.email}">${contact.email}</a>
    </div>
  </div>`;
}

export function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="foot-top">
        <div class="foot-brand">
          <a class="brand" href="index.html">${logo()}</a>
          <p>Real estate investment and citizenship advisory. Headquartered in Istanbul, advising investors from more than 40 countries.</p>
        </div>
        <form class="newsletter" onsubmit="event.preventDefault(); this.classList.add('is-done');">
          <label for="nl" class="eyebrow">Private launches & market notes</label>
          <div class="nl-row">
            <input id="nl" type="email" required placeholder="Your email address" />
            <button class="btn btn-gold" type="submit">Subscribe</button>
          </div>
          <p class="nl-done">Thank you. You're on the list.</p>
        </form>
      </div>
      <div class="foot-cols">
        <div><h4>Markets</h4>${markets.map((m) => `<a href="properties.html?country=${m.id}">${m.name}</a>`).join('')}</div>
        <div><h4>Programs</h4>
          <a href="citizenship.html">Turkish Citizenship</a><a href="citizenship.html">Turkish Residence Permit</a>
          <a href="citizenship.html">UAE Golden Visa</a><a href="citizenship.html">Greek Golden Visa</a>
          <a href="citizenship.html">Cyprus Residency</a>
        </div>
        <div><h4>Company</h4>
          <a href="index.html#services">Services</a><a href="index.html#insights">Insights</a>
          <a href="contact.html">Partners</a><a href="contact.html">Careers</a><a href="contact.html">Contact</a>
        </div>
        <div><h4>Contact</h4>
          <a href="${contact.phoneHref}">${contact.phone}</a>
          <a href="mailto:${contact.email}">${contact.email}</a>
          <span>${contact.city}</span>
          <div class="socials">
            <a href="${contact.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>
            <a href="${contact.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon.facebook}</a>
            <a href="${contact.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon.whatsapp}</a>
          </div>
        </div>
      </div>
      <div class="foot-legal">
        <span>© ${new Date().getFullYear()} Adres Investments. All rights reserved.</span>
        <span><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></span>
      </div>
    </div>
  </footer>
  <a class="wa-float" href="${contact.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${icon.whatsapp}</a>`;
}

export function propertyCard(p, countryName, fmt) {
  return `
  <article class="prop-card" data-reveal>
    <a href="contact.html?property=${encodeURIComponent(p.name)}" class="prop-media">
      <img src="https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=900&q=75" alt="${p.name}" loading="lazy" />
      <span class="prop-tags">${p.eligible ? '<span class="tag tag-gold">Citizenship eligible</span>' : ''}<span class="tag">${p.status}</span></span>
    </a>
    <div class="prop-body">
      <p class="eyebrow">${p.location} · ${countryName(p.country)}</p>
      <h3><a href="contact.html?property=${encodeURIComponent(p.name)}">${p.name}</a></h3>
      <p class="prop-meta">${p.type} · ${p.beds} Bed · ${p.size}</p>
      <p class="prop-price"><small>From</small> ${fmt(p.price)}</p>
    </div>
  </article>`;
}
