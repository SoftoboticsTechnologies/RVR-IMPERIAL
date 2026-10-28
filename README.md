# RVR Imperial EXIM Private Limited — Website

**Global Trade. Trusted Excellence.**
Static corporate website for www.rvrimperial.com, built in plain **HTML5 + CSS3 + vanilla JavaScript**. There are no frameworks, no npm and no build step.

- **Preview locally:** double-click `index.html`.
- **Deploy:** upload the whole folder to any web host (see section 8).

---

## 1. Folder structure

```
index.html              Home
about.html              About Us
mission-vision.html     Mission & Vision
services.html           Services (7 services, pricing, Incoterms, FCL/LCL)
products.html           Product portfolio + filterable list of all product lines
products/*.html         7 category pages
contact.html            Request a Quote (3 form tabs + WhatsApp fallback)
faq.html                FAQ (accordion + FAQPage schema)
privacy-policy.html     Privacy Policy (template, needs legal review)
terms.html              Terms of Use (template, needs legal review)
404.html                Custom error page
contact.php             Optional PHP mail handler (cPanel/PHP hosting)
.htaccess               Apache: custom 404, compression, caching
sitemap.xml  robots.txt  site.webmanifest  favicon.ico  apple-touch-icon.png

assets/css/style.css    The only stylesheet (design tokens / colours at the top)
assets/js/config.js     Phone, WhatsApp, e-mails, form service   <-- EDIT HERE
assets/js/main.js       Header, menus, reveal animations, counters, FAQ, filter, map, analytics events
assets/js/form.js       Form tabs, validation, submission, ?service= pre-select, WhatsApp builder
assets/images/          logo/  hero/  about/  services/  products/<category>/  og/
assets/logo/            Original logo files supplied by the client (pages use the optimised copies)
assets/document/        Original website content document (source of all copy)
```

## 2. Editing text

Every page is a normal HTML file, so open it in any editor (VS Code, Notepad++) and change the text. Page sections are marked with comments such as `<!-- ===== HERO ===== -->`.

The **header, mobile menu and footer are repeated in every page** (so search engines can read them). To change them, use your editor's **Find & Replace in all files** across the folder, including `products/`. Pages inside `products/` use `../` in front of paths. Keep that prefix when you edit them.

## 3. Editing contact details

1. `assets/js/config.js`: phone, WhatsApp number, recipient e-mails, form service.
2. The same details are also written into the HTML. Use Find & Replace across all files for:
   - `+91 98331 24583`, `+919833124583` and `919833124583` (the WhatsApp links)
   - `info@rvrimperial.com`
3. **Street address:** search for `EDIT: add full street address` (footer) and `EDIT: full street address` (contact page). The address is currently "Indore, Madhya Pradesh, India".

## 4. Form setup (delivers to BOTH e-mail addresses)

The forms submit with `fetch()` (no page reload) and show an inline success message. Spam protection uses a hidden honeypot field. Every form also has a **"Send via WhatsApp instead"** button that turns the filled fields into a formatted WhatsApp message.

Choose **one** provider in `assets/js/config.js` → `formProvider`.

### Option A: FormSubmit (default, free)
- Already configured to send to **info@rvrimperial.com**, with a **CC to rupali.jahagirdar@rvrimperial.com**.
- After the site is live, **submit the form once**. FormSubmit e-mails an **activation link** to info@rvrimperial.com. Click it, and from then on all submissions are delivered.
- Optional: FormSubmit then shows a random alias. Replace the e-mail in `formsubmitEndpoint` with that alias to hide the address.

### Option B: Web3Forms
1. Create a free access key at https://web3forms.com using info@rvrimperial.com.
2. Paste the key into `web3formsAccessKey` and set `formProvider: 'web3forms'`.
3. To also deliver to rupali.jahagirdar@rvrimperial.com, add a forwarding rule in the info@ mailbox (CC to a second address is a paid Web3Forms feature).

### Option C: PHP (cPanel hosting)
1. Set `formProvider: 'php'`.
2. `contact.php` sends every submission to both addresses.
3. Create the mailbox **no-reply@rvrimperial.com** in cPanel for better deliverability.

**URL parameters supported by the contact page:**
- `contact.html?service=private-label` pre-selects a service. Slugs: `international-import-export`, `global-sourcing`, `private-label`, `contract-manufacturing`, `bulk-supply`, `packaging-branding`, `export-documentation`.
- `?category=<category-slug>&product=<name>` pre-fills the product.
- `?tab=partner` (or `?tab=general`) opens a specific tab.

## 5. Replacing images

All images are **WebP** files in `assets/images/`, saved in several widths (for example `rice-600.webp`, or `category-480.webp`, `category-800.webp`, `category-1600.webp`). To replace one, export your photo in a **3:2 ratio** at the **same widths and file names**, then overwrite the files. No HTML changes are needed.

Free converter: https://squoosh.app (export as WebP, quality 70–80).

### Logo files (generated from the supplied logo; never stretched or recoloured)
- `logo/logo-light-*.webp`: header logo ("RVR / IMPERIAL / EXIM" crop) for light backgrounds; also used on an ivory plate in the mobile menu
- `logo/logo-full-*.webp|png`: full logo, shown on an ivory plate in the navy footer
- `logo/logo-dark-*.webp|png`: transparent crop without the black text, for any future dark-background use
- `logo/logo-monogram-*`, `/favicon.ico`, `/apple-touch-icon.png`, `logo/icon-192.png`, `logo/icon-512.png`: gold "RVR" monogram icons
- `og/og-image.jpg` (1200×630): social sharing image

## 6. PLACEHOLDERS THE CLIENT MUST REPLACE OR CONFIRM

### Placeholder photos (royalty-free from Unsplash, for illustration only)
No product photos were supplied, so **every photo is a placeholder**. Replace them with real product, warehouse and shipment photos when available. File names are `<name>-<width>.webp`.

| Folder (`assets/images/…`) | Files |
|---|---|
| `hero/` | hero-port (home hero background), containers-aerial, containers-stack |
| `about/` | warehouse-aisle, business-handshake, trade-documents, logistics-truck |
| `services/` | international-import-export, global-sourcing, private-label, contract-manufacturing, bulk-supply, packaging-branding, export-documentation |
| `products/agriculture-food-agro/` | category, rice, spices, turmeric, pulses, oilseeds, soybeans, groundnuts, makhana, puffed-rice, edible-oils, processed-food |
| `products/textiles-apparel-fashion/` | category, mens-clothing, womens-clothing, childrens-clothing, t-shirts, denim, kurtis, fashion-accessories, selected-textiles, lifestyle-apparel |
| `products/fmcg-personal-home-care/` | category, everyday-consumer, personal-hygiene, grooming-essentials, home-care, household-cleaning |
| `products/beauty-herbal-wellness/` | category, cosmetics, beauty-products, herbal-ayurvedic, wellness-nutraceutical |
| `products/home-lifestyle-handicrafts/` | category, home-decor, decorative-accessories, handicrafts, household-merchandise, furniture, furnishings, lifestyle-products |
| `products/packaging-plastics-polymer/` | category, packaging-materials, plastic-polymer, allied-merchandise |
| `products/machinery-tools-industrial/` | category, machinery, tools, electrical-products, industrial-supplies, commercial-merchandise |

Some placeholders only approximate the product (for example makhana, soybeans, puffed rice, plastic & polymer products, commercial merchandise) and should be replaced first.

### Placeholder text and settings
| Item | Where | Action |
|---|---|---|
| Full street address | Footer and contact page (`EDIT:` comments) | Add when available |
| Business hours ("Mon–Sat 10:00–18:30 IST") | contact.html (`EDIT:` comment) | **Confirm with client** |
| "We aim to respond to enquiries within 24 hours" | index.html quote section (HTML comment) | **Needs client confirmation** |
| Google Map | contact.html iframe | Replace with the exact office location (Google Maps → Share → Embed a map) |
| Directors' photos | about.html (monogram avatars "RJ" / "BS") | Optional: replace with photos |
| Social media links | Footer (commented out) | Uncomment when profiles exist. Never link to "#" |
| Testimonials section | index.html (`hidden` block) | Enable only with real, approved testimonials |
| Certifications section | index.html (`hidden` block) | Enable only after IEC / APEDA / FSSAI etc. are actually obtained |
| Privacy Policy and Terms | privacy-policy.html, terms.html | **Legal review required** |
| Google Analytics / Tag Manager | `<head>` of every page (commented out) | Add your ID and uncomment |
| Form activation | FormSubmit | Click the activation e-mail after the first submission |

### Honesty rules followed
No certifications, years of experience, client names, shipment counts, countries served or testimonials have been invented. The trust signals used are all true: Est. 2026, GST Registered (GSTIN), MCA Registered Pvt. Ltd. (CIN), Indore, India, 7 Product Categories and 7 Trade Services. The world map is labelled "Markets we serve / aim to serve".

## 7. Adding a product

On a category page (for example `products/agriculture-food-agro.html`), find a block that starts with
`<!-- PRODUCT CARD: copy this <article> block to add a new product -->`.
Copy the whole `<article> … </article>` block and change:
- the image path and alt text,
- the product name and the short line,
- the product name inside the WhatsApp link (URL-encoded, so spaces become `%20`) and the `product=` value in the "Request Quote" link.

To show the product on `products.html` as well, copy the card there too. That copy carries a `data-category="<category-slug>"` attribute, which the filter buttons use.

## 8. Deploying

- **cPanel / FTP:** upload all files and folders into `public_html/`. `.htaccess` provides the custom 404 page and caching. After SSL is active, uncomment the HTTPS/www redirect in `.htaccess`.
- **Netlify:** drag the folder onto https://app.netlify.com/drop. `404.html` is picked up automatically.
- **GitHub Pages:** push the folder to a repository and enable Pages.
- After going live, submit `https://www.rvrimperial.com/sitemap.xml` in Google Search Console, and consider creating a Google Business Profile.

Notes:
- Opening the files directly (`file://`) works for browsing. The browser may log a harmless message about `site.webmanifest`, which disappears on a real server.
- `404.html` uses root paths (`/assets/...`) so that it works at any URL depth. It only displays correctly on a web server.
- Fonts load from Google Fonts. Everything else (icons are inline SVG) is local.

## 9. Analytics events

When GA4 or GTM is enabled, these events are sent: `whatsapp_click`, `call_click`, `email_click`, `form_submit` and `whatsapp_form_send`.

## 10. Responsive and browser support

The layout is mobile-first, with breakpoints at 480 / 768 / 1024 / 1280px and content width capped at 1320px. It was checked at 320, 375, 414, 768, 1100 and 1440px widths. On phones the header is a 64px bar with a hamburger that opens a full-screen navy menu, the footer collapses into accordions, and a Call / WhatsApp / Get Quote bar sits at the bottom of the screen. Animations respect *prefers-reduced-motion*. Supported browsers are current Chrome, Edge, Firefox, Safari (macOS/iOS) and Samsung Internet.
