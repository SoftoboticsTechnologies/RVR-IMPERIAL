/* ==========================================================================
   RVR IMPERIAL EXIM — main.js
   Sticky header · mobile menu · mega-menu · scroll reveal · counters ·
   back-to-top · FAQ accordion · product filter · footer accordion ·
   world-map tooltips · active nav link · analytics events
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Analytics helper (works when GA4 / GTM is enabled) ---------- */
  function track(eventName, params) {
    params = params || {};
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(Object.assign({ event: eventName }, params));
  }
  window.rvrTrack = track;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    var label = (a.getAttribute('data-track') || a.textContent || '').trim().slice(0, 80);
    if (href.indexOf('wa.me') > -1 || href.indexOf('whatsapp.com') > -1) track('whatsapp_click', { link_text: label, page: location.pathname });
    else if (href.indexOf('tel:') === 0) track('call_click', { link_text: label, page: location.pathname });
    else if (href.indexOf('mailto:') === 0) track('email_click', { link_text: label, page: location.pathname });
  });

  /* ---------- Sticky header ---------- */
  var header = $('.header');
  var backToTop = $('.back-to-top');
  var ticking = false;
  function onScroll() {
    var y = window.pageYOffset || doc.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (backToTop) backToTop.classList.toggle('is-visible', y > 600);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Mobile menu ---------- */
  var menu = $('#mobile-menu');
  var toggle = $('.nav-toggle');
  var lastFocus = null;

  function openMenu() {
    if (!menu) return;
    lastFocus = document.activeElement;
    menu.classList.add('is-open');
    menu.removeAttribute('aria-hidden');
    menu.removeAttribute('inert');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
    var closeBtn = $('.mobile-menu__close', menu);
    if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 50);
  }
  function closeMenu() {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  }
  if (toggle && menu) {
    toggle.addEventListener('click', openMenu);
    $$('.mobile-menu__close', menu).forEach(function (b) { b.addEventListener('click', closeMenu); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
    // Simple focus trap
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('a[href], button:not([disabled])', menu).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024) closeMenu(); });
  }

  // Mobile accordion sub-menus
  $$('.mobile-menu__acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.classList.toggle('is-open', !open);
    });
  });

  /* ---------- Desktop mega-menu (keyboard + click support) ---------- */
  var megaItems = $$('.nav__item.has-mega');
  function closeAllMega(except) {
    megaItems.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('is-open');
      var b = $('.nav__link[aria-expanded]', item);
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  megaItems.forEach(function (item) {
    var btn = $('button.nav__link', item);
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      closeAllMega(item);
    });
    item.addEventListener('mouseleave', function () {
      item.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) { item.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item.has-mega')) closeAllMega();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      var openItem = $('.nav__item.has-mega.is-open');
      closeAllMega();
      if (openItem) { var b = $('button.nav__link', openItem); if (b) b.focus(); }
    }
  });

  /* ---------- Active nav link fallback ---------- */
  if (!$('.nav__link[aria-current="page"], .nav__link.is-active')) {
    var path = location.pathname.split('/').pop() || 'index.html';
    $$('.nav__link[href]').forEach(function (a) {
      if (a.getAttribute('href').split('/').pop() === path) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Count-up (TRUE numbers only: 7, 7, 2026) ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var start = parseInt(el.getAttribute('data-count-from') || '0', 10);
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = target; return; }
    var duration = 1600, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { countUp(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- FAQ accordion ---------- */
  $$('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      item.classList.toggle('is-open', !open);
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.setAttribute('aria-hidden', String(open));
    });
  });

  /* ---------- Product category filter ---------- */
  var filterBtns = $$('.filter-btn');
  if (filterBtns.length) {
    var filterItems = $$('[data-category]');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        filterItems.forEach(function (it) {
          var cats = it.getAttribute('data-category').split(' ');
          var show = f === 'all' || cats.indexOf(f) > -1;
          it.classList.toggle('is-filtered-out', !show);
          if (show) it.classList.add('is-visible');
        });
      });
    });
  }

  /* ---------- Footer accordion (phones) ---------- */
  var footerBtns = $$('.footer__group .footer__title');
  function syncFooter() {
    var desktop = window.innerWidth >= 768;
    footerBtns.forEach(function (btn) {
      var group = btn.closest('.footer__group');
      btn.setAttribute('aria-expanded', String(desktop || group.classList.contains('is-open')));
      btn.tabIndex = desktop ? -1 : 0;
    });
  }
  syncFooter();
  window.addEventListener('resize', syncFooter);
  footerBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (window.innerWidth >= 768) return;
      var group = btn.closest('.footer__group');
      var open = group.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------- World map tooltips ---------- */
  $$('.world-map').forEach(function (map) {
    var tip = $('.map-tooltip', map);
    var svg = $('svg', map);
    function show(node) {
      if (!tip) return;
      var rect = map.getBoundingClientRect();
      var c = node.querySelector('.world-map__ping, .world-map__hub').getBoundingClientRect();
      var x = c.left + c.width / 2 - rect.left;
      x = Math.max(120, Math.min(rect.width - 120, x));
      tip.style.left = x + 'px';
      tip.style.top = (c.top - rect.top) + 'px';
      tip.innerHTML = '<strong>' + node.getAttribute('data-title') + '</strong>' + node.getAttribute('data-text');
      tip.classList.add('is-visible');
    }
    function hide() { if (tip) tip.classList.remove('is-visible'); }
    $$('.world-map__node', svg).forEach(function (n) {
      n.addEventListener('mouseenter', function () { show(n); });
      n.addEventListener('focus', function () { show(n); });
      n.addEventListener('click', function () { show(n); });
      n.addEventListener('mouseleave', hide);
      n.addEventListener('blur', hide);
    });
  });
})();
