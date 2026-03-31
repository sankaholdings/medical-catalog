/* ============================================================
   Sanka Holdings Medical Catalog — Catalog JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Active Nav Tracking ────────────────────────────────── */
  function initScrollSpy() {
    const sections = document.querySelectorAll('[data-section]');
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    if (!sections.length || !navItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            navItems.forEach((item) => {
              item.classList.toggle('active', item.getAttribute('data-target') === id);
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ── Smooth Scroll ──────────────────────────────────────── */
  function initNavScroll() {
    document.querySelectorAll('.nav-item[data-target]').forEach((item) => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const target = document.querySelector(`[data-section="${targetId}"]`);
        if (target) {
          const headerH = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '64',
            10
          );
          const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── Print Handler ──────────────────────────────────────── */
  function initPrint() {
    document.querySelectorAll('.btn-print').forEach((btn) => {
      btn.addEventListener('click', () => window.print());
    });
  }

  /* ── Entrance Animations ────────────────────────────────── */
  function initAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const fadeEls = document.querySelectorAll('.menu-card, .clinic-card, .feature-card, .flow-step');
    fadeEls.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    });

    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, i * 40);
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeEls.forEach((el) => animObserver.observe(el));
  }

  /* ── Mobile Nav Toggle ──────────────────────────────────── */
  function initMobileNav() {
    const toggleBtn = document.getElementById('nav-toggle');
    const nav = document.querySelector('.site-nav');
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('site-nav--open');
      toggleBtn.setAttribute('aria-expanded', open);
    });

    // Close on nav item click (mobile)
    nav.querySelectorAll('.nav-item').forEach((item) => {
      item.addEventListener('click', () => {
        nav.classList.remove('site-nav--open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        nav.classList.remove('site-nav--open');
      }
    });
  }

  /* ── Init ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollSpy();
    initNavScroll();
    initPrint();
    initAnimations();
    initMobileNav();
  });
})();
