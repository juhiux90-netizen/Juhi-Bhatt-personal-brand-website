(function () {
  'use strict';

  /* ---------- Reveal on scroll (runs first, isolated) ---------- */
  (function initReveal() {
    try {
      var revealEls = document.querySelectorAll('.reveal');
      var reduced = false;
      try {
        reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (e) { reduced = false; }

      if (!('IntersectionObserver' in window) || reduced) {
        for (var i = 0; i < revealEls.length; i++) revealEls[i].classList.add('is-visible');
        return;
      }

      var revealObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      revealEls.forEach(function (el) { revealObserver.observe(el); });

      /* Safety net: if something prevents the observer from ever firing
         for an element, reveal everything after a few seconds so content
         is never permanently lost. */
      window.setTimeout(function () {
        var stuck = document.querySelectorAll('.reveal:not(.is-visible)');
        stuck.forEach(function (el) { el.classList.add('is-visible'); });
      }, 4000);
    } catch (err) {
      var all = document.querySelectorAll('.reveal');
      for (var j = 0; j < all.length; j++) all[j].classList.add('is-visible');
    }
  })();

  /* ---------- Nav: scrolled state ---------- */
  (function initNavScroll() {
    try {
      var nav = document.querySelector('[data-nav]');
      if (!nav) return;
      function onScroll() {
        if (window.scrollY > 24) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
      }
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    } catch (err) { /* nav shell still works without JS */ }
  })();

  /* ---------- Nav: active link on scroll ---------- */
  (function initActiveLink() {
    try {
      var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
      var sections = navLinks
        .map(function (a) {
          var id = a.getAttribute('href');
          return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
        })
        .filter(Boolean);

      if (!('IntersectionObserver' in window) || !sections.length) return;

      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var link = navLinks.filter(function (a) {
              return a.getAttribute('href') === '#' + entry.target.id;
            })[0];
            if (!link) return;
            if (entry.isIntersecting) {
              navLinks.forEach(function (l) { l.classList.remove('is-active'); });
              link.classList.add('is-active');
            }
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      sections.forEach(function (s) { sectionObserver.observe(s); });
    } catch (err) { /* non-critical */ }
  })();

  /* ---------- Mobile nav ---------- */
  (function initMobileNav() {
    try {
      var toggle = document.querySelector('[data-nav-toggle]');
      var links = document.querySelector('[data-nav-links]');
      var backdrop = document.querySelector('[data-nav-backdrop]');
      if (!toggle || !links || !backdrop) return;

      function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        links.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      function openMenu() {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
        links.classList.add('is-open');
        backdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
      toggle.addEventListener('click', function () {
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) closeMenu(); else openMenu();
      });
      backdrop.addEventListener('click', closeMenu);
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });
    } catch (err) { /* nav links still function as plain anchors */ }
  })();

  /* ---------- Accordion (Selected Work) ---------- */
  (function initAccordion() {
    try {
      var accordions = document.querySelectorAll('[data-accordion]');
      accordions.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var isOpen = btn.getAttribute('aria-expanded') === 'true';
          accordions.forEach(function (other) {
            if (other !== btn) other.setAttribute('aria-expanded', 'false');
          });
          btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        });
      });
    } catch (err) { /* non-critical */ }
  })();

})();
