Build a complete, production-ready, premium multi-page STATIC corporate website for **RVR IMPERIAL EXIM PRIVATE LIMITED**, an India-based merchant import-export and global sourcing company.

TECH STACK (mandatory): plain **HTML5 + CSS3 + vanilla JavaScript (ES6)** only. No frameworks, no build tools, no npm, no React/Vue/Next/Tailwind/Bootstrap/jQuery. Section 7 has the details.

RESPONSIVE (mandatory): the whole website, INCLUDING THE HEADER AND FOOTER, must be fully responsive and work perfectly on every device: mobile, tablet, laptop, desktop and large screens. Section 7 has the details.

The site must feel premium, elegant, international, modern and catchy, while staying informative, trustworthy and quick to load. It is a B2B lead-generation site: every page should guide visitors toward **Request a Quote / WhatsApp Enquiry**.

==================================================
1. PROJECT FILES (already in the workspace)
==================================================
- `assets/document/website content.docx` (and the identical `website content.pdf`): the source of truth for ALL copy. Use its text word for word wherever it fits. Do not invent claims.
- `assets/logo/RVR Imperial Gold Corporate Logo.png` (1160×906, solid WHITE background): metallic gold "RVR", navy "IMPERIAL", gold "EXIM", black "PRIVATE LIMITED", and the tagline "GLOBAL REACH | TRUSTED PARTNERSHIP | LIMITLESS POSSIBILITIES" with a small gold globe icon. Use it on white or ivory backgrounds.
- `assets/logo/RVR Imperial bg-removed.png` (1536×1024, transparent PNG with a gold glow). WARNING: its "PRIVATE LIMITED" and tagline text are BLACK and disappear on dark backgrounds.
  Logo handling:
  a) Create optimised WebP/PNG versions: a horizontal header logo, a footer logo, and a favicon / apple-touch-icon / OG image (use the gold "RVR" monogram for the favicon).
  b) On dark navy sections, either crop to "RVR / IMPERIAL / EXIM" only, or place the logo on an ivory/white plate, so no black text sits on a dark background.
  c) Never stretch, recolour or redraw the logo.
- No product photos, client logos or testimonials were supplied. Use high-quality royalty-free placeholder images (for example Unsplash: spices, rice, textiles, containers, ports, cargo ships, warehouses, handicrafts, packaging). Save them locally in `/assets/images/...` with clear names so they are easy to swap, and list every placeholder in the README.

==================================================
2. COMPANY FACTS (use exactly)
==================================================
- Legal name: RVR IMPERIAL EXIM PRIVATE LIMITED (short form: RVR Imperial EXIM)
- Tagline: "Global Trade. Trusted Excellence."
- Logo tagline: "Global Reach | Trusted Partnership | Limitless Possibilities"
- Positioning line: "Your Trusted Partner in Global Sourcing & Trade"
- Incorporated: 2026
- GSTIN: 23AAPCR8998C1ZR
- CIN: U46909MP2026PTC084244
- Address: Indore, Madhya Pradesh, India (no full street address was given; keep it as a placeholder that is easy to edit)
- Phone / WhatsApp: +91 98331 24583 (tel:+919833124583, https://wa.me/919833124583)
- Official email: info@rvrimperial.com
- Form submissions go to: info@rvrimperial.com AND rupali.jahagirdar@rvrimperial.com
- Preferred enquiry channel: WhatsApp (primary), email (secondary)
- Domain: https://www.rvrimperial.com
- Directors: Rupali Jahagirdar (Director) and Bhaval Shah (Director)
- Social media, Google Business Profile, clients and client logos: NONE yet. Keep social icon slots in the footer but leave them commented out until links exist. Do not link to "#".

==================================================
3. STRICT CONTENT RULES (honesty and compliance)
==================================================
- The company is new (2026). Do NOT invent certifications (APEDA, FSSAI, ISO, IEC and so on), years of experience, numbers of countries served, shipment counts, client names, testimonials or awards. The reference sites show such things; DO NOT copy them as facts.
- Use only trust signals that are true: "Est. 2026", "GST Registered", "Registered Private Limited Company (MCA)", "Indore, India", "7 Product Categories", "7 Trade Services", "24-hour enquiry response" (mark this one with an HTML comment saying it needs client confirmation).
- Keep the document's careful wording ("we aim to", "coordinate", "subject to applicable regulations").
- Include the disclaimer: "Product availability, specifications, minimum order quantities, and supply arrangements are confirmed according to individual requirements and applicable regulations."
- Include Testimonials and Certifications sections as ready-made HTML blocks that are commented out (or carry a `hidden` attribute), so they can be switched on later.

==================================================
4. DESIGN DIRECTION (taken from the logo)
==================================================
Mood: "Imperial luxury meets global trade": metallic gold on deep navy, with spacious ivory content sections. Think of a private-bank or luxury-brand look applied to an export house. Elegant, not flashy.

Colour tokens (define them as CSS custom properties in :root in style.css):
- --navy-950: #060E24 (darkest backgrounds, footer)
- --navy-900: #0B1A3F (hero, dark sections)
- --navy-700: #13296B (the "IMPERIAL" navy, headings on light sections)
- --gold-500: #C9972B (primary metallic gold)
- --gold-400: #E0B54A
- --gold-200: #F5D98A (highlight)
- --gold-700: #8F6517 (gold shadow)
- --ivory-50: #FCFAF4 (light section background)
- --ivory-100: #F6F0E2 (alternate light section)
- --ink: #1A1F2E (body text on light backgrounds)
- --muted: #6B7280
- WhatsApp green #25D366, used ONLY on WhatsApp buttons
- Gold gradient: linear-gradient(135deg, #F5D98A 0%, #E0B54A 30%, #C9972B 60%, #8F6517 100%). Use it for primary buttons, icon circles, dividers and number badges, and as a "metallic text" effect on key heading words (background-clip:text).
- Shadows: a soft navy shadow for cards, and a gold glow shadow on hover for primary CTAs.

Typography (Google Fonts):
- Display headings: "Cormorant Garamond" (600/700) or "Playfair Display": elegant serif for H1/H2.
- Eyebrows, labels, nav, buttons: "Montserrat" (500–700), UPPERCASE with wide letter-spacing (0.2–0.3em), echoing the spaced "I M P E R I A L / E X I M" in the logo.
- Body: "Inter" (400/500/600), as used on the main reference site.
- Fluid type scale using clamp(); generous line-height; maximum line length around 70ch.

Signature design motifs (repeat them across the site):
- The logo's double gold rule lines (═══ EXIM ═══): use thin gold double lines on both sides of section eyebrows, e.g. "══ OUR SERVICES ══".
- A small gold globe icon used as a section divider (as at the bottom of the logo).
- Large faded serif numerals "01, 02 …" on service and why-us cards.
- Faint world-map or latitude-line patterns on navy backgrounds.
- Glassmorphism cards (backdrop-filter blur, 1px gold/white border at 10–20% opacity) on dark sections.
- Image cards with a navy gradient overlay (bottom to top) and gold text on hover.

Animation (CSS + vanilla JS; subtle and premium; respect prefers-reduced-motion):
- Fade-up / stagger reveal on scroll (vanilla JS IntersectionObserver adding an `.is-visible` class, with CSS transitions).
- Floating badge cards in the hero (slow up-and-down "float" @keyframes), as on hariharglobalexim.com.
- A shimmer sweep across the gold buttons and metallic headings on hover (CSS pseudo-element).
- An infinite CSS marquee strip of product categories (e.g. "Rice • Spices • Turmeric • Makhana • Textiles • Handicrafts • Packaging • …").
- Animated dashed trade-route arcs from India on an inline-SVG world map (stroke-dashoffset animation), with pulsing "ping" dots.
- JS count-up only for TRUE numbers (7 categories, 7 services, 2026).
- Sticky header that shrinks and gains a blurred background on scroll.
- No heavy parallax that hurts performance.

==================================================
5. REFERENCE SITES (structure to follow)
==================================================
PRIMARY reference: https://hariharglobalexim.com/. Follow its overall structure, section rhythm and UX most closely, but restyle it in RVR's navy and gold:
- Sticky top header: logo · Home · About · Mission · Products (dropdown/mega-menu of categories) · Services · Contact · gold "Send Enquiry" button.
- Hero: a small badge, a big headline, a paragraph, two CTAs ("Explore Products", "Get a Quote"), feature tags (e.g. Bulk Supply · Custom Packaging · Private Label · Export Documentation), a large hero image with 2–3 floating info cards around it, and a stats row.
- Feature strip of six icon highlights.
- About block with image collage and "Know More About Us".
- Numbered product category cards, each with image, title, short description and "Explore Now".
- Trust/compliance cards. For RVR use: GST Registered (GSTIN), MCA Registered (CIN), Est. 2026, Indore, India. NO invented certifications.
- "Global Footprint" world map. For RVR use "Connecting India with Global Markets", with India as the sourcing hub and animated routes towards Middle East, Europe, Africa, Asia-Pacific and the Americas, labelled "Markets we serve / aim to serve". Do not claim countries already served.
- "Why Choose Us": numbered 01–0X grid.
- Big CTA band: "Looking for Bulk Supply or Custom Orders?" with "Send Enquiry" and "WhatsApp Us".
- Rich footer: brand block, quick links, product categories, contact.
- Mobile bottom action bar: Call · WhatsApp · Enquiry.

Secondary references (take these specific ideas):
- https://www.vpglobalexim.com/ : quote form with tabs ("General Inquiry" / "Quote Request"), Country dropdown, Product of Interest dropdown (with "Multiple / Not sure"), Estimated Quantity; "End-to-End Export Services" card row; "Industries We Serve" tag list; map regions with hover tooltips; Privacy / Terms pages.
- https://indusglobalexport.com/ : "Documentation that clears customs, not delays it" style section; quality-control messaging; FAQ page ("Frequently asked questions about sourcing from India"); category filtering on the Products page; product detail with "Specifications / Key highlights"; FCL & LCL options; "Become a Partner" CTA; closing "Start sourcing with a partner who delivers" band.
- https://akshadainternational.com/ : top utility bar (email · phone · "GST Registered"); WhatsApp buttons with pre-filled messages on every product card; sticky mobile action bar plus a floating WhatsApp button; closing bulk-enquiry CTA.
- https://www.simplyexim.com/ : "From inquiry to delivery in 5 seamless steps" export process timeline; separate supplier form ("Become a Trade Partner") alongside the buyer quote form; "Strategic Export Hubs" and "From India to the World" messaging; success messages after submission.

==================================================
6. SITEMAP AND PAGE CONTENT
==================================================
Global elements on every page:
- Top utility bar (hidden on mobile): ✉ info@rvrimperial.com · ☎ +91 98331 24583 · "GST Registered · Indore, India".
- Sticky header with mega-menu for Products and Services; on mobile, a hamburger menu that opens as a full-screen navy overlay.
- Floating WhatsApp button (bottom-right, pulse ring), plus a sticky mobile bottom bar: Call | WhatsApp | Get Quote.
- Back-to-top button.
- Footer (navy-950): logo, short brand description, "Global Trade. Trusted Excellence."; Quick Links; Products; Services; Contact (address, phone, email, WhatsApp); Company details (GSTIN, CIN); copyright "© 2026 RVR Imperial EXIM Private Limited. All rights reserved."; Privacy Policy · Terms of Use.
- Pre-filled WhatsApp message: "Hello RVR Imperial EXIM, I'm interested in sourcing [product]. Please share details and a quotation." (On product cards, replace [product] with the product name, URL-encoded.)

---------- 6.1 HOME (index.html) ----------
1. HERO (navy with a cargo-ship/port background image, navy overlay, gold metallic headline)
   - Badge: "Merchant Exporter · Importer · Global Sourcing Partner"
   - H1: "Global Trade. Trusted Excellence." (gold metallic text on "Trusted Excellence")
   - Sub-headline: "Your Trusted Partner in Global Sourcing & Trade"
   - Paragraph: "RVR Imperial EXIM Private Limited is an India-based merchant import-export and global trading company connecting international buyers with reliable sourcing opportunities, quality-focused suppliers, and competitive supply solutions."
   - CTAs: [Request a Quote] (gold) and [Explore Products] (outline) + small "WhatsApp Us" link
   - Feature tags: Bulk Supply · Private Label · Custom Packaging · Export Documentation
   - Floating cards: "7 Product Categories", "One Trusted Trading Partner", "Global Reach · India Sourcing Hub"
2. MARQUEE strip of product keywords.
3. ABOUT INTRO: eyebrow "WHO WE ARE"; H2 "Born in India. Connecting the World."; two paragraphs from "Brief About the Company"; a value-proposition quote card: "One trusted trading partner for diverse product sourcing, tailored supply solutions, and coordinated international trade—helping your business source smarter, trade confidently, and grow globally."; button "Know More About Us".
4. WHO WE SERVE (icon chips): Importers · Distributors · Wholesalers · Retailers · Corporate Buyers · Brand Owners · Institutional Buyers.
5. SERVICES (7 numbered cards, 01–07): eyebrow "OUR SERVICES"; H2 "Comprehensive Trade Solutions. One Reliable Partner." Use each service title and one-line description from the document. Each card links to services.html#anchor.
6. PRODUCT PORTFOLIO (7 image cards): H2 "Our Product Portfolio"; sub "Diverse Categories. Global Business Opportunities." Each card has image, title, item list and "Explore Now".
7. EXPORT PROCESS TIMELINE (6 steps, horizontal on desktop, vertical on mobile), built from the document's workflow:
   01 Share Your Requirements → 02 Product Sourcing & Supplier Matching → 03 Tailored Quotation (Incoterms) → 04 Specifications, Packaging & Private Label → 05 Order & Quality Coordination → 06 Export Documentation & Shipment.
8. WHY PARTNER WITH RVR IMPERIAL EXIM (5 cards from the document): Diversified Product Access; Flexible Sourcing Solutions; Buyer-Focused Collaboration; Integrated Trade Coordination; Long-Term Partnership Mindset. Add an image and a "Built on trust, transparency, consistency, and shared growth" banner.
9. GLOBAL REACH MAP (navy, inline SVG with animated routes from India): H2 "Connecting Indian Suppliers with Global Buyers."
10. TRUST STRIP: GST Registered (23AAPCR8998C1ZR) · MCA Registered Pvt. Ltd. (CIN) · Est. 2026 · Headquartered in Indore, India.
11. QUOTE CTA + FORM (split layout): left side "LET'S TAKE YOUR BUSINESS GLOBAL" with "Source with Confidence. Trade with Purpose. Grow Without Borders." and the checklist of what to share; right side the quick enquiry form. Buttons: "Start a Business Inquiry", "WhatsApp Us".
12. Closing quote band: "When trust connects markets, opportunities know no boundaries."

---------- 6.2 ABOUT (about.html) ----------
- Page hero (navy banner, breadcrumb).
- Company overview: the full "Brief About the Company" text.
- "Why Choose RVR Imperial EXIM?": the full paragraph text, plus the 5 bolded approach points as icon chips: Competitive Sourcing · Clear Communication · Flexible Product Solutions · Coordinated Export Documentation · Long-Term Business Reliability.
- "Our Journey: Born in India. Connecting the World.": the full Journey text as an elegant vertical story, with the closing principle in a large serif pull-quote.
- Core values (from the text): Trust · Transparency · Consistency · Shared Growth · Integrity · Customer Satisfaction.
- Leadership: two elegant cards for Rupali Jahagirdar (Director) and Bhaval Shah (Director). Use a monogram avatar (gold initials on navy) unless photos are added later. No invented bios.
- Corporate information table: legal name, CIN, GSTIN, year of incorporation, registered city, domain.

---------- 6.3 MISSION (mission-vision.html) ----------
- "Our Mission: Simplifying Global Trade. Creating Lasting Value.": the full mission text.
- Purpose statement highlighted: "Our purpose is to make global trade simpler, partnerships stronger, and business opportunities more accessible—one trusted relationship at a time."
- Ambition (from the Journey text): "to establish RVR Imperial EXIM as a respected international trading partner…" presented as the Vision.
- Values grid (same as About).

---------- 6.4 SERVICES (services.html) ----------
- Hero: "Services & Products: Your Trusted Partner in Global Trade"; sub "Connecting Markets. Sourcing Quality. Creating Global Opportunities."; intro paragraphs from the document.
- The 7 services, each in an alternating image/text block with an anchor id, using BOTH the "Our Services" description and the "Service Description & Pricing" description and pricing basis:
  01 International Import & Export
  02 Global Sourcing & Strategic Procurement
  03 Private Label & White Label Solutions
  04 Contract Manufacturing & Customized Products
  05 Bulk Supply & B2B Trading
  06 Packaging, Branding & Product Customization
  07 Export Documentation & Shipment / Logistics Coordination
  Each block shows "Pricing basis:" with the document's pricing line, plus a "Request a Quote for this service" button linking to contact.html?service=<slug>, which form.js reads to pre-select the service.
- "Tailored Solutions for Global Buyers: Your Requirements. Our Sourcing Approach.": 6 icon cards: Product Sourcing, Bulk Procurement, Private Label Development, Customized Packaging, Supplier Coordination, International Trade Support.
- "Pricing: Flexible Trade Solutions. Transparent Commercial Terms.": intro text plus 4 cards: Bulk Orders, Customized Orders, Private Label Orders, International Shipments. Add a note that product prices depend on category, grade, specifications, quantity, packaging, availability and agreed Incoterms. Optionally show a small Incoterms explainer (EXW, FOB, CFR, CIF, DAP) and an FCL / LCL note.
- CTA: "Request a Quote | Submit Your Requirements | Contact Our Trade Team".

---------- 6.5 PRODUCTS (products.html) + 7 CATEGORY PAGES ----------
- Overview page: H1 "Our Product Portfolio"; sub "Diverse Categories. Global Business Opportunities."; intro "We offer a multi-category sourcing and trading portfolio designed to serve the needs of international buyers across established and emerging markets."; a grid of the 7 categories with JS filter buttons; the availability disclaimer.
- Category pages (/products/<slug>.html), each with a hero image, overview, a grid of item cards (image, name, short line, "Enquire on WhatsApp" + "Request Quote" buttons), "Customization available" (packaging, private label, specifications), "Key details we need for a quote", and the disclaimer:
  1. agriculture-food-agro.html: Agriculture, Food & Agro Commodities: Rice, Spices, Turmeric, Pulses, Oilseeds, Soybeans, Groundnuts, Makhana, Puffed Rice, Edible Oils, Selected Processed Food Products
  2. textiles-apparel-fashion.html: Textiles, Apparel & Fashion: Men's Clothing, Women's Clothing, Children's Clothing, T-shirts, Denim, Kurtis, Fashion Accessories, Selected Textiles, Lifestyle Apparel
  3. fmcg-personal-home-care.html: FMCG, Personal Care & Home Care: Everyday Consumer Products, Personal Hygiene Products, Grooming Essentials, Home Care Products, Household Cleaning Solutions
  4. beauty-herbal-wellness.html: Beauty, Herbal & Wellness Products: Cosmetics, Beauty Products, Herbal & Ayurvedic Products, Wellness & Nutraceutical Products (add "subject to applicable regulatory requirements")
  5. home-lifestyle-handicrafts.html: Home, Lifestyle & Handicrafts: Home Décor, Decorative Accessories, Handicrafts, Household Merchandise, Furniture, Furnishings, Lifestyle Products
  6. packaging-plastics-polymer.html: Packaging, Plastics & Polymer Products: Packaging Materials, Plastic & Polymer Products, Packaging & Allied Merchandise
  7. machinery-tools-industrial.html: Machinery, Tools & Industrial Supplies: Selected Machinery, Tools, Electrical Products, Industrial Supplies, General Commercial Merchandise
- Write the product cards directly in each category page's HTML using one repeatable card block, so new items can be added by copying a card. Images go in /assets/images/products/<category>/.

---------- 6.6 REQUEST A QUOTE / CONTACT (contact.html) ----------
- Hero: "Request a Custom Quotation".
- Left column: contact cards (WhatsApp, Phone, Email, Address: Indore, MP, India), business hours placeholder, GSTIN/CIN, and an embedded Google Maps iframe of Indore (placeholder).
- Right column: a form with JS tabs [Buyer Quote Request] [General Inquiry] [Become a Trade Partner].
  * Buyer Quote fields: Full Name*, Company Name*, Country* (full country dropdown), Email*, Phone/WhatsApp* (with country code), Product Category* (the 7 categories + "Multiple / Not sure"), Product Name & Specifications*, Required Quantity, Destination Country & Delivery Location, Packaging / Private Label Requirements, Preferred Incoterm (EXW/FOB/CFR/CIF/DAP/Not sure), Message, consent checkbox.
  * General Inquiry: Name, Email, Phone, Subject, Message.
  * Trade Partner (for Indian suppliers and manufacturers): Company, Contact Person, Phone/WhatsApp, Email, City/State, Products you supply, Capacity / MOQ, Certifications (optional), Message.
- Submission (static site): use a third-party form service (Web3Forms, Formspree or FormSubmit) that delivers to BOTH info@rvrimperial.com and rupali.jahagirdar@rvrimperial.com. Optionally provide a contact.php mail handler for cPanel/PHP hosting. Submit with fetch(); add vanilla-JS validation, a honeypot field for spam, a loading state on the button, and an inline success message ("Thank you! Your request has been received. Our trade team will get back to you shortly.") without a page reload.
- ALSO add a "Send via WhatsApp instead" button that builds a formatted wa.me message from the filled form fields (encodeURIComponent), because WhatsApp is the client's preferred channel.
- "What to share for a quotation" checklist from the document.

---------- 6.7 FAQ (faq.html) ----------
Write 8–10 FAQs based ONLY on facts in the document (which products you source, private label, customized packaging, how pricing works, which details a quote needs, Incoterms, documentation and shipment coordination, who you serve, how to become a supplier partner). Use an accessible accordion (button + aria-expanded, vanilla JS) and add FAQPage JSON-LD.

---------- 6.8 LEGAL ----------
privacy-policy.html and terms.html with standard B2B website templates naming RVR Imperial EXIM Private Limited, Indore, India and info@rvrimperial.com (mark them for legal review). Also a custom 404.html in brand style.

==================================================
7. TECH STACK AND QUALITY REQUIREMENTS
==================================================
- Stack: a SIMPLE STATIC WEBSITE in plain HTML5 + CSS3 + vanilla JavaScript (ES6) only.
  * NO frameworks, NO build tools, NO npm/node_modules, NO React/Vue/Next/Tailwind/Bootstrap/jQuery. The site must open by double-clicking index.html and deploy by uploading the folder to any host (cPanel/FTP, Netlify drag-and-drop, GitHub Pages).
  * Allowed external resources: Google Fonts, and icons as inline SVG (preferred) or via a Lucide / Font Awesome CDN. Write all animations in vanilla JS with IntersectionObserver and CSS; no animation libraries are needed.
  * Every page is its own .html file with fully written HTML content, so all text is crawlable for SEO.
- Folder structure:
  /index.html, /about.html, /mission-vision.html, /services.html, /products.html, /contact.html, /faq.html, /privacy-policy.html, /terms.html, /404.html
  /products/ (the 7 category pages; use correct relative paths ../assets/...)
  /assets/css/style.css: one main stylesheet with the design tokens as CSS variables at the top, then reset/base, typography, layout, components, sections, utilities and responsive rules, each with a clear comment header.
  /assets/js/main.js: sticky header, mobile menu, mega-menu, scroll reveal, counters, back-to-top, FAQ accordion, product filter, active nav link.
  /assets/js/form.js: form tabs, validation, fetch submission, ?service= pre-select, WhatsApp message builder.
  /assets/js/config.js: phone, WhatsApp number, emails, form endpoint/access key, so these are edited in one place.
  /assets/images/ (logo/, hero/, products/, services/, icons/, og/)
  /favicon.ico, /apple-touch-icon.png, /site.webmanifest, /sitemap.xml, /robots.txt, /README.md
- Shared header and footer: write the same markup into every page (no JS-injected includes that hide content from search engines). Keep it consistent so it can be updated with find-and-replace, and mark the active nav link per page.
- Modern CSS: custom properties, Flexbox/Grid, clamp(), backdrop-filter, @keyframes, scroll-behavior: smooth. Mobile-first breakpoints at 480 / 768 / 1024 / 1280px.
- FULLY RESPONSIVE ON ALL DEVICES, INCLUDING THE HEADER AND FOOTER (mandatory):
  * Must look and work perfectly on small phones (320–375px), large phones (390–480px), tablets portrait and landscape (768–1024px), laptops (1280–1440px), large desktops (1920px+) and ultra-wide screens (cap the content width at about 1280–1400px, centred). Test both portrait and landscape.
  * No horizontal scroll at any width. No overlapping or cut-off text, images or buttons. Use `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page.
  * HEADER: on desktop, the full nav with the mega-menu on hover and keyboard focus. Below 1024px, a hamburger button that opens a full-screen navy slide-in menu with accordion sub-menus for Products and Services, large tap targets, a close (×) button, and body scroll locked while it is open. The logo scales down cleanly. The utility bar is hidden on mobile, and the sticky header stays compact (about 64px) on phones.
  * FOOTER: 4–5 columns on desktop, 2 columns on tablet, and a single stacked column on mobile (with optional accordion link groups). Contact links are tappable (tel:, mailto:, wa.me). Long text such as the email address, GSTIN and CIN wraps without overflowing. Add bottom padding on mobile so the sticky Call/WhatsApp/Quote bar never covers footer content.
  * All grids (services, categories, process timeline, why-us, forms) reflow from 3–4 columns to 2 to 1. The hero stacks on mobile, and its floating cards reposition or hide so they don't overlap. Tables (company info, pricing) scroll horizontally inside their own wrapper or stack as cards. Form fields are full-width on mobile with a font-size of 16px or more (prevents iOS zoom).
  * Touch targets are at least 44×44px. Hover-only effects also have tap/focus equivalents. Images use object-fit and srcset so nothing distorts. Use fluid typography and spacing with clamp().
  * The floating WhatsApp button and the mobile action bar must not overlap each other or the back-to-top button.
  * Test in Chrome, Safari (iOS), Firefox, Edge and Samsung Internet, and in Chrome DevTools device mode (iPhone SE, iPhone 14 Pro Max, Galaxy S20, iPad Mini, iPad Pro, 1366px laptop, 1920px desktop).
- Performance: Lighthouse 90+ on every metric; WebP images with width/height attributes, srcset and loading="lazy"; preconnect to Google Fonts with display=swap; JS loaded with `defer`; no layout shift; total page weight kept light.
- Accessibility: WCAG 2.1 AA contrast (watch gold-on-ivory text; use --gold-700 or navy for small text), semantic HTML (header, nav, main, section, article, footer), keyboard navigation, visible focus rings, aria labels, alt text on every image, a skip-to-content link, and prefers-reduced-motion support.
- SEO: unique <title> and meta description per page; Open Graph / Twitter cards with the logo OG image; canonical URLs on https://www.rvrimperial.com; sitemap.xml; robots.txt; JSON-LD for Organization + LocalBusiness (name, logo, url, telephone, email, address Indore MP IN, taxID/GSTIN), BreadcrumbList on inner pages, and FAQPage. Target keywords: "merchant exporter India", "import export company Indore", "global sourcing partner India", "private label manufacturer India", "bulk supplier India", plus each product category.
- Analytics-ready: a commented-out Google Analytics / Tag Manager snippet in the <head>; track WhatsApp clicks, call clicks and form submissions as events in main.js.
- Clean, well-indented HTML with BEM-style reusable CSS classes: .header, .mega-menu, .footer, .section-heading (with the gold double-line eyebrow), .btn--gold, .btn--outline, .service-card, .category-card, .process-timeline, .world-map, .quote-form, .whatsapp-float, .mobile-action-bar, .cta-band and so on. Comment each page section in the HTML (e.g. <!-- ===== HERO ===== -->). No console errors.
- README covering how to edit text, images and contact details, how to set up the form service (where to paste the access key), how to deploy (upload via cPanel/FTP or drag-and-drop to Netlify), and a list of every placeholder image or text the client must replace.

==================================================
8. DELIVERABLE CHECKLIST
==================================================
[ ] Pure HTML/CSS/vanilla JS static site, which opens locally without a server or build step
[ ] All pages above built and linked, with no "#" dead links and correct relative paths in /products/
[ ] All document copy used accurately; no invented certifications, statistics, clients or testimonials
[ ] Logo used correctly on light and dark backgrounds; favicon and OG image generated
[ ] Navy + metallic gold + ivory premium theme with consistent motifs
[ ] Working quote / inquiry / partner forms going to both email addresses, plus the WhatsApp fallback
[ ] Floating WhatsApp button + mobile Call/WhatsApp/Quote bar
[ ] Fully responsive on every device (phone, tablet, laptop, desktop, ultra-wide), INCLUDING the header (hamburger menu) and footer (stacked columns), with no horizontal scroll
[ ] Accessible, fast, SEO and JSON-LD complete
[ ] README with the list of placeholders and edit instructions
