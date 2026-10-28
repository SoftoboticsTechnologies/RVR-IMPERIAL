/* ==========================================================================
   RVR IMPERIAL EXIM — Site configuration
   Edit contact details and the form service here. Everything that the
   JavaScript needs (WhatsApp number, form endpoint, recipient e-mails)
   is read from this one object.

   NOTE: phone numbers / e-mails are ALSO written directly into the HTML
   (so they work without JavaScript and are visible to search engines).
   If you change them, also run a find-and-replace across all .html files.
   ========================================================================== */
window.RVR_CONFIG = {
  companyName: 'RVR Imperial EXIM Private Limited',

  phoneDisplay: '+91 98331 24583',
  phoneE164: '+919833124583',
  whatsappNumber: '919833124583',   // digits only, with country code, no "+"

  // Default pre-filled WhatsApp message ([product] is replaced automatically)
  whatsappTemplate: "Hello RVR Imperial EXIM, I'm interested in sourcing [product]. Please share details and a quotation.",

  // Form submissions are delivered to BOTH of these addresses
  primaryEmail: 'info@rvrimperial.com',
  ccEmails: ['rupali.jahagirdar@rvrimperial.com'],

  /* ------------------------------------------------------------------
     FORM SERVICE
     provider: 'formsubmit' (default, free, supports CC to a 2nd address)
               'web3forms'  (paste your access key below)
               'php'        (uses /contact.php on PHP / cPanel hosting)
     ------------------------------------------------------------------ */
  formProvider: 'formsubmit',

  // FormSubmit: after the FIRST test submission, FormSubmit e-mails an
  // activation link to info@rvrimperial.com. Click it once. You may then
  // replace the e-mail below with the random alias FormSubmit gives you.
  formsubmitEndpoint: 'https://formsubmit.co/ajax/info@rvrimperial.com',

  // Web3Forms: create a free key at https://web3forms.com (use info@rvrimperial.com)
  web3formsEndpoint: 'https://api.web3forms.com/submit',
  web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',

  // PHP handler (relative to site root)
  phpEndpoint: 'contact.php',

  successMessage: 'Thank you! Your request has been received. Our trade team will get back to you shortly.',
  errorMessage: 'Sorry, something went wrong while sending your request. Please try again, or send it via WhatsApp / e-mail instead.'
};
