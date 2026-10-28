/* ==========================================================================
   RVR IMPERIAL EXIM — form.js
   Form tabs · validation · fetch submission (FormSubmit / Web3Forms / PHP) ·
   ?service= / ?category= / ?product= pre-select · WhatsApp message builder
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.RVR_CONFIG || {};
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Tabs (ARIA tablist) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);

    // Phones: the same choices as a dropdown (CSS shows it below 768px and hides the tabs)
    var picker = document.createElement('div');
    picker.className = 'field tabs-select';
    var pickId = (tabs[0] ? tabs[0].id : 'tab') + '-select';
    picker.innerHTML = '<label for="' + pickId + '">Enquiry type</label><select id="' + pickId + '"></select>';
    var select = $('select', picker);
    tabs.forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.textContent.trim();
      select.appendChild(opt);
    });
    list.parentNode.insertBefore(picker, list);
    select.addEventListener('change', function () {
      var t = document.getElementById(select.value);
      if (t) activate(t);
    });

    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.setAttribute('tabindex', on ? '0' : '-1');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      select.value = tab.id;
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (e) {
        var idx = null;
        if (e.key === 'ArrowRight') idx = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') idx = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') idx = 0;
        if (e.key === 'End') idx = tabs.length - 1;
        if (idx !== null) { e.preventDefault(); activate(tabs[idx], true); }
      });
    });
    // Open a tab from the URL: contact.html?tab=partner  (or #partner)
    var params = new URLSearchParams(location.search);
    var wanted = params.get('tab') || location.hash.replace('#', '');
    if (wanted) {
      var match = tabs.filter(function (t) { return t.getAttribute('data-tab') === wanted; })[0];
      if (match) activate(match);
    }
  });

  /* ---------- Pre-select from URL (?service=, ?category=, ?product=) ---------- */
  (function prefill() {
    var params = new URLSearchParams(location.search);
    var service = params.get('service');
    var category = params.get('category');
    var product = params.get('product');
    if (service) {
      $$('select[data-prefill="service"]').forEach(function (s) {
        if ($('option[value="' + service + '"]', s)) s.value = service;
      });
    }
    if (category) {
      $$('select[data-prefill="category"]').forEach(function (s) {
        if ($('option[value="' + category + '"]', s)) s.value = category;
      });
    }
    if (product) {
      $$('[data-prefill="product"]').forEach(function (f) { if (!f.value) f.value = product; });
    }
  })();

  /* ---------- Country -> dialling code ---------- */
  $$('select[data-dial-target]').forEach(function (sel) {
    sel.addEventListener('change', function () {
      var target = document.getElementById(sel.getAttribute('data-dial-target'));
      var opt = sel.options[sel.selectedIndex];
      var dial = opt && opt.getAttribute('data-dial');
      var current = target ? target.value.trim() : '';
      if (target && dial && (!current || current === '+' || target.getAttribute('data-auto') === '1')) {
        target.value = dial;
        target.setAttribute('data-auto', '1');
      }
    });
  });

  /* ---------- Validation ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function fieldLabel(input) {
    var lbl = input.id && document.querySelector('label[for="' + input.id + '"]');
    return lbl ? lbl.textContent.replace('*', '').trim() : (input.name || 'This field');
  }
  function setError(input, msg) {
    var field = input.closest('.field');
    if (!field) return;
    var err = $('.field__error', field);
    field.classList.toggle('has-error', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg || '';
  }
  function validateInput(input) {
    var v = (input.type === 'checkbox') ? input.checked : String(input.value || '').trim();
    var msg = '';
    if (input.required && !v) {
      msg = input.type === 'checkbox' ? 'Please confirm to continue.' : fieldLabel(input) + ' is required.';
    } else if (v && input.type === 'email' && !EMAIL_RE.test(v)) {
      msg = 'Please enter a valid e-mail address.';
    } else if (v && input.type === 'tel' && input.getAttribute('data-role') !== 'dial') {
      var digits = String(v).replace(/\D/g, '');
      if (digits.length < 6 || digits.length > 15) msg = 'Please enter a valid phone / WhatsApp number.';
    }
    setError(input, msg);
    return !msg;
  }
  function validateForm(form) {
    var ok = true, first = null;
    $$('input, select, textarea', form).forEach(function (input) {
      if (input.closest('.hp-field') || input.type === 'hidden' || input.disabled) return;
      if (!validateInput(input)) { ok = false; if (!first) first = input; }
    });
    if (first) first.focus();
    return ok;
  }

  /* ---------- Collect form data as ordered label/value pairs ---------- */
  function collect(form) {
    var pairs = [];
    $$('input, select, textarea', form).forEach(function (el) {
      if (!el.name || el.name.charAt(0) === '_' || el.closest('.hp-field') || el.type === 'hidden') return;
      if (el.getAttribute('data-role') === 'dial') return; // merged into phone
      var val;
      if (el.type === 'checkbox') val = el.checked ? 'Yes' : 'No';
      else if (el.tagName === 'SELECT') val = el.value ? el.options[el.selectedIndex].text : '';
      else val = String(el.value || '').trim();
      if (el.getAttribute('data-role') === 'phone') {
        var dialEl = el.closest('.phone-group') && $('[data-role="dial"]', el.closest('.phone-group'));
        var dialVal = dialEl ? dialEl.value.trim() : '';
        if (dialVal && dialVal !== '+' && val) val = dialVal + ' ' + val;
      }
      pairs.push([el.name, val]);
    });
    return pairs;
  }

  /* ---------- WhatsApp message builder ---------- */
  function buildWhatsApp(form) {
    var type = form.getAttribute('data-form-type') || 'Enquiry';
    var lines = ['Hello RVR Imperial EXIM,', '', '*' + type + '* (sent from rvrimperial.com)', ''];
    collect(form).forEach(function (p) {
      if (p[1] && p[0] !== 'Consent') lines.push('*' + p[0] + ':* ' + p[1]);
    });
    lines.push('', 'Please share details and a quotation. Thank you.');
    return 'https://wa.me/' + (CFG.whatsappNumber || '919833124583') + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  $$('[data-wa-send]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var form = btn.closest('form');
      if (!form) return;
      // Light check: at least a name or product so the message is useful
      var url = buildWhatsApp(form);
      if (window.rvrTrack) window.rvrTrack('whatsapp_form_send', { form_type: form.getAttribute('data-form-type') });
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ---------- Submission ---------- */
  function showStatus(form, type, msg) {
    var box = $('.form-status', form);
    if (!box) return;
    box.className = 'form-status is-' + type;
    box.innerHTML = (type === 'success'
      ? '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'
      : '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>') +
      '<span>' + msg + '</span>';
    box.setAttribute('tabindex', '-1');
    box.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function send(form) {
    var type = form.getAttribute('data-form-type') || 'Website Enquiry';
    var pairs = collect(form);
    var subject = 'New ' + type + ' — rvrimperial.com';
    var provider = CFG.formProvider || 'formsubmit';
    var payload = {}, url, opts;

    pairs.forEach(function (p) { payload[p[0]] = p[1]; });
    payload['Form Type'] = type;
    payload['Page'] = location.href;

    if (provider === 'web3forms') {
      url = CFG.web3formsEndpoint;
      payload.access_key = CFG.web3formsAccessKey;
      payload.subject = subject;
      payload.from_name = 'RVR Imperial EXIM Website';
      payload.botcheck = '';
      if (payload['Email']) payload.replyto = payload['Email'];
      opts = { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) };
    } else if (provider === 'php') {
      url = CFG.phpEndpoint;
      var fd = new FormData();
      Object.keys(payload).forEach(function (k) { fd.append(k, payload[k]); });
      fd.append('_subject', subject);
      opts = { method: 'POST', headers: { Accept: 'application/json' }, body: fd };
    } else {
      url = CFG.formsubmitEndpoint;
      payload._subject = subject;
      payload._cc = (CFG.ccEmails || []).join(',');
      payload._template = 'table';
      payload._captcha = 'false';
      if (payload['Email']) payload._replyto = payload['Email'];
      opts = { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) };
    }

    return fetch(url, opts).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        var ok = res.ok && (data.success === undefined || data.success === true || data.success === 'true');
        if (!ok) throw new Error((data && data.message) || 'Request failed');
        return data;
      });
    });
  }

  $$('form.js-enquiry-form').forEach(function (form) {
    form.setAttribute('novalidate', '');

    $$('input, select, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value) validateInput(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field') && input.closest('.field').classList.contains('has-error')) validateInput(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Honeypot: bots fill hidden fields — pretend success, send nothing
      var hp = $('.hp-field input', form);
      if (hp && hp.value) { showStatus(form, 'success', CFG.successMessage); form.reset(); return; }
      if (!validateForm(form)) return;

      var btn = $('button[type="submit"]', form);
      var label = btn && $('.btn__label', btn);
      var original = label ? label.textContent : '';
      if (btn) { btn.classList.add('is-loading'); btn.disabled = true; if (label) label.textContent = 'Sending'; }

      send(form).then(function () {
        showStatus(form, 'success', CFG.successMessage);
        form.reset();
        if (window.rvrTrack) window.rvrTrack('form_submit', { form_type: form.getAttribute('data-form-type') });
      }).catch(function () {
        showStatus(form, 'error', CFG.errorMessage);
      }).then(function () {
        if (btn) { btn.classList.remove('is-loading'); btn.disabled = false; if (label) label.textContent = original; }
      });
    });
  });

  /* ---------- Quote / enquiry popup ----------
     Any link with data-quote-modal opens the popup (#quote-modal) instead of
     navigating to contact.html. Optional data-tab / data-service /
     data-category / data-product pre-fill the form. On contact.html (no popup)
     the link scrolls to the form instead. Without JS the link still works. */
  var modal = document.getElementById('quote-modal');

  function prefillFrom(wrap, data) {
    var tab = $('[role="tab"][data-tab="' + (data.tab || 'buyer') + '"]', wrap);
    if (tab) tab.click();
    var fields = { service: data.service, category: data.category };
    Object.keys(fields).forEach(function (key) {
      if (!fields[key]) return;
      $$('select[data-prefill="' + key + '"]', wrap).forEach(function (s) {
        if ($('option[value="' + fields[key] + '"]', s)) s.value = fields[key];
      });
    });
    if (data.product) $$('[data-prefill="product"]', wrap).forEach(function (f) { f.value = data.product; });
  }

  function openModal() {
    $$('.form-status', modal).forEach(function (b) { b.className = 'form-status'; b.innerHTML = ''; });
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
    document.body.classList.add('is-locked');
    modal.scrollTop = 0;
    var body = $('.quote-modal__body', modal);
    if (body) body.scrollTop = 0;
    if (window.rvrTrack) window.rvrTrack('quote_popup_open', { page: location.pathname });
  }
  function closeModal() {
    if (typeof modal.close === 'function' && modal.open) modal.close();
    else modal.removeAttribute('open');
    document.body.classList.remove('is-locked');
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('[data-quote-modal]');
    if (!trigger) return;
    var wrap = modal || document.getElementById('quote-form');
    if (!wrap) return; // no form on this page: follow the link
    e.preventDefault();
    prefillFrom(wrap, trigger.dataset);
    if (modal) openModal();
    else wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if (modal) {
    $$('[data-modal-close]', modal).forEach(function (b) { b.addEventListener('click', closeModal); });
    // Click on the dark backdrop closes the popup
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    modal.addEventListener('close', function () { document.body.classList.remove('is-locked'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.hasAttribute('open')) closeModal(); });
  }
})();
