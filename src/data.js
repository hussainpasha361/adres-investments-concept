// Content source for the redesign. Listings are placeholders until the client
// supplies real inventory; program thresholds need sign-off from Adres' legal team.

export const img = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const contact = {
  phone: '+90 533 193 31 14',
  phoneHref: 'tel:+905331933114',
  whatsapp: 'https://wa.me/905331933114',
  email: 'info@adresinvestments.com',
  city: 'Istanbul, Türkiye',
  instagram: 'https://www.instagram.com/adres_investments/',
  facebook: 'https://www.facebook.com/people/Adres-Investments/61572754475999/',
};

export const markets = [
  { id: 'turkey', name: 'Türkiye', city: 'Istanbul · Bodrum · Antalya', line: 'Citizenship from USD 400,000', image: 'photo-1524231757912-21f4fe3a7200' },
  { id: 'dubai', name: 'Dubai', city: 'Downtown · Marina · Palm Jumeirah', line: '10-year Golden Visa from AED 2M', image: 'photo-1512453979798-5ea266f8880c' },
  { id: 'greece', name: 'Greece', city: 'Athens · Riviera · Cyclades', line: 'Golden Visa from €250,000', image: 'photo-1570077188670-e3a8d69ac5ff' },
  { id: 'spain', name: 'Spain', city: 'Marbella · Barcelona · Madrid', line: 'Prime lifestyle & rental yield', image: 'photo-1539037116277-4db20889f2d4' },
  { id: 'uk', name: 'United Kingdom', city: 'London · Manchester', line: 'Prime residential & income assets', image: 'photo-1513635269975-59663e0ac1ad' },
  { id: 'cyprus', name: 'Cyprus', city: 'Limassol · Paphos', line: 'Permanent residency from €300,000', image: 'photo-1613490493576-7fde63acd811' },
  { id: 'indonesia', name: 'Indonesia', city: 'Bali · Jakarta', line: 'Villas & investor visas', image: 'photo-1537996194471-e657df975ab4' },
];

export const properties = [
  { id: 1, name: 'Bosphorus Terrace Residences', country: 'turkey', location: 'Beşiktaş, Istanbul', type: 'Apartment', beds: '2–4', size: '120–310 m²', price: 520000, eligible: true, status: 'Ready', image: 'photo-1600607687939-ce8a6c25118c' },
  { id: 2, name: 'Marina Crest Tower', country: 'dubai', location: 'Dubai Marina', type: 'Apartment', beds: '1–3', size: '78–190 m²', price: 610000, eligible: true, status: 'Off-plan', image: 'photo-1600566753190-17f0baa2a6c3' },
  { id: 3, name: 'Villa Aegean', country: 'greece', location: 'Vouliagmeni, Athens Riviera', type: 'Villa', beds: '4', size: '340 m²', price: 1450000, eligible: true, status: 'Ready', image: 'photo-1613490493576-7fde63acd811' },
  { id: 4, name: 'Göktürk Forest Villas', country: 'turkey', location: 'Eyüpsultan, Istanbul', type: 'Villa', beds: '5', size: '420 m²', price: 1180000, eligible: true, status: 'Ready', image: 'photo-1600596542815-ffad4c1539a9' },
  { id: 5, name: 'Seafront Limassol Suites', country: 'cyprus', location: 'Limassol', type: 'Apartment', beds: '2–3', size: '105–160 m²', price: 395000, eligible: true, status: 'Off-plan', image: 'photo-1600585154340-be6161a56a0c' },
  { id: 6, name: 'Canggu Jungle Retreat', country: 'indonesia', location: 'Canggu, Bali', type: 'Villa', beds: '3', size: '260 m²', price: 465000, eligible: false, status: 'Ready', image: 'photo-1537996194471-e657df975ab4' },
  { id: 7, name: 'Kensington Mews House', country: 'uk', location: 'Kensington, London', type: 'Town House', beds: '4', size: '290 m²', price: 3200000, eligible: false, status: 'Ready', image: 'photo-1512917774080-9991f1c4c750' },
  { id: 8, name: 'Golden Mile Residence', country: 'spain', location: 'Marbella', type: 'Residence', beds: '3–5', size: '210–480 m²', price: 1950000, eligible: false, status: 'Off-plan', image: 'photo-1580587771525-78b9dba3b914' },
  { id: 9, name: 'Downtown Boulevard Lofts', country: 'dubai', location: 'Downtown Dubai', type: 'Apartment', beds: '1–2', size: '70–130 m²', price: 560000, eligible: true, status: 'Ready', image: 'photo-1600210492486-724fe5c67fb0' },
];

// usd = approximate USD floor used by the calculator.
export const programs = [
  { id: 'tr-cit', code: 'TR', country: 'Türkiye', name: 'Turkish Citizenship by Investment', goal: 'citizenship', min: 'USD 400,000', usd: 400000, term: 'Passport · lifetime', timeline: '6–8 months', href: 'citizenship.html' },
  { id: 'tr-rp', code: 'TR', country: 'Türkiye', name: 'Turkish Residence Permit', goal: 'residency', min: 'USD 200,000', usd: 200000, term: 'Renewable', timeline: '1–2 months', href: 'citizenship.html' },
  { id: 'ae-gv', code: 'AE', country: 'Dubai', name: 'UAE Golden Visa', goal: 'residency', min: 'AED 2,000,000', usd: 545000, term: '10 years', timeline: '4–8 weeks', href: 'citizenship.html' },
  { id: 'gr-gv', code: 'GR', country: 'Greece', name: 'Greek Golden Visa', goal: 'residency', min: '€250,000', usd: 270000, term: '5 years, renewable', timeline: '6–9 months', href: 'citizenship.html' },
  { id: 'cy-pr', code: 'CY', country: 'Cyprus', name: 'Cyprus Permanent Residency', goal: 'residency', min: '€300,000', usd: 325000, term: 'Permanent', timeline: '3–4 months', href: 'citizenship.html' },
  { id: 'id-gv', code: 'ID', country: 'Indonesia', name: 'Indonesia Golden Visa', goal: 'residency', min: 'On request', usd: 350000, term: '5–10 years', timeline: 'Case by case', href: 'citizenship.html' },
];

export const services = [
  { title: 'Real Estate Consultancy', body: 'Independent advice, curated shortlists and off-market access across seven markets. We negotiate, verify and close.' },
  { title: 'Citizenship & Residency', body: 'End-to-end management of investment migration files, from eligibility review to passport collection.' },
  { title: 'Architecture & Design', body: 'Interior architecture and turnkey fit-outs that lift rental yield and resale value.' },
  { title: 'Property Management', body: 'Leasing, maintenance and reporting handled locally, so your asset performs while you are away.' },
  { title: 'Legal Assistance', body: 'Title checks, valuation reports, tax numbers, power of attorney and bank accounts, with licensed partners.' },
];

export const testimonials = [
  { quote: 'I found a property in Istanbul that fit my budget, and every legal step was explained clearly. My Turkish passport application is now in its final stage.', name: 'Tariq Ali', meta: 'Businessman · Bangladesh' },
  { quote: 'From the first call to the Golden Visa approval, the process was smooth. The team handled the paperwork and kept me informed at every step.', name: 'Karan Desai', meta: 'Investor · India' },
  { quote: 'I bought a commercial unit in Türkiye, received citizenship and I am already planning my second investment with Adres.', name: 'Zeeshan Rafiq', meta: 'Investor · Pakistan' },
  { quote: 'Responsive, honest and knowledgeable. They found the right residential property in Istanbul for my family.', name: 'Ali Reza', meta: 'Homeowner · Iran' },
];

export const insights = [
  { tag: 'Citizenship', date: 'Apr 2025', title: 'How foreign investors obtain Turkish citizenship through real estate', image: 'photo-1524231757912-21f4fe3a7200' },
  { tag: 'Guide', date: 'Apr 2025', title: 'The property buying process for foreigners in Türkiye, step by step', image: 'photo-1600607687939-ce8a6c25118c' },
  { tag: 'Due diligence', date: 'Apr 2025', title: 'Avoiding legal risk when buying abroad: what to check before you sign', image: 'photo-1600585154340-be6161a56a0c' },
];

export const countryName = (id) => markets.find((m) => m.id === id)?.name ?? id;
export const fmtUSD = (n) => 'USD ' + n.toLocaleString('en-US');
