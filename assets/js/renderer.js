/* ============================================================
   Sanka Holdings Medical Catalog — DOM Renderer
   Reads CATALOG_CONFIG, CLINICS, INTRO, CHAPTERS, UI from data.js
   and renders the full catalog into the page.
   ============================================================ */

(function () {
  'use strict';

  /* ── Language Detection ─────────────────────────────────── */
  const htmlLang = document.documentElement.lang || 'ja';
  // Map HTML lang attribute to data key
  const langMap = { 'ja': 'ja', 'zh-Hans': 'zh', 'zh-CN': 'zh', 'en': 'en' };
  const L = langMap[htmlLang] || 'ja';

  function t(obj) {
    if (!obj) return '';
    return obj[L] || obj['ja'] || '';
  }

  /* ── SVG Icons ──────────────────────────────────────────── */
  const SVG = {
    externalLink: `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10L10 2M5 2h5v5"/></svg>`,
    printer: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="1" width="10" height="8" rx="1"/><path d="M3 9H1v5h14V9h-2"/><path d="M5 13h6M5 11h4"/></svg>`,
    menu: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    close: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    diamond: `◆`,
  };

  /* ── Resolve clinic short-name list ────────────────────── */
  function resolveClinicTags(clinicIds) {
    if (!clinicIds || clinicIds.length === 0) return '';
    if (clinicIds.includes('all')) {
      return `<span class="clinic-tag">${t(UI.allClinics)}</span>`;
    }
    return clinicIds
      .map(id => {
        const c = CLINICS[id];
        if (!c) return '';
        return `<span class="clinic-tag">${t(c.nameShort)}</span>`;
      })
      .join('');
  }

  /* ── Resolve chapter clinic badges ─────────────────────── */
  function resolveClinicBadges(clinicIds) {
    return clinicIds
      .map(id => {
        const c = CLINICS[id];
        if (!c) return '';
        return `<span class="clinic-badge">${t(c.name)}</span>`;
      })
      .join('');
  }

  /* ── Price display ──────────────────────────────────────── */
  function renderPrice(price) {
    if (!CATALOG_CONFIG.showPrices) return '';
    if (!price) {
      return `<span class="menu-price">${t(UI.price.consultation)}</span>`;
    }
    return `<span class="menu-price">${t(price)}</span>`;
  }

  /* ── Menu Card ──────────────────────────────────────────── */
  function renderMenuCard(menu) {
    const effectLines = t(menu.effect).split('\n').map(l => l.trim()).filter(Boolean);
    const effectHtml = effectLines.map((l, i) => {
      if (i === 0) return `<p class="menu-card__effect">${l}</p>`;
      if (l.startsWith('【') || l.startsWith('[') || l.startsWith('Key')) {
        return `<p class="menu-card__effect" style="margin-top:10px;"><strong style="color:var(--gold-light);">${l}</strong></p>`;
      }
      return `<p class="menu-card__effect">${l}</p>`;
    }).join('');

    const priceHtml = CATALOG_CONFIG.showPrices
      ? `<div class="menu-card__price price-info">${renderPrice(menu.price)}</div>`
      : '<!-- price hidden: set CATALOG_CONFIG.showPrices = true to display -->';

    return `
      <div class="menu-card${menu.featured ? ' menu-card--featured' : ''}">
        <div class="menu-card__name">${t(menu.name)}</div>
        ${effectHtml}
        ${priceHtml}
        <div class="menu-card__footer">
          ${resolveClinicTags(menu.clinicIds)}
        </div>
      </div>`;
  }

  /* ── Category ───────────────────────────────────────────── */
  function renderCategory(cat) {
    const cards = cat.menus.map(renderMenuCard).join('');
    return `
      <div class="menu-category">
        <div class="menu-category__header">
          <span class="menu-category__num">${cat.num}</span>
          <span class="menu-category__name">${t(cat.title)}</span>
        </div>
        <div class="menu-grid">${cards}</div>
      </div>`;
  }

  /* ── Chapter Hero Image ─────────────────────────────────── */
  function renderChapterHero(ch) {
    if (!ch.heroClinicId) return '';
    const c = CLINICS[ch.heroClinicId];
    if (!c || !c.image) return '';
    return `
      <div class="chapter-hero">
        ${renderPicture(c.image, 'chapter-hero__img')}
      </div>`;
  }

  /* ── Chapter Section ────────────────────────────────────── */
  function renderChapter(ch) {
    const cats = ch.categories.map(renderCategory).join('');
    return `
      <section class="chapter-section" data-section="${ch.id}">
        <div class="container">
          <div class="chapter-header">
            <div class="chapter-header__num">${ch.num}</div>
            <div class="chapter-header__info">
              <div class="chapter-header__en">${ch.enLabel}</div>
              <h2 class="chapter-header__title">${t(ch.title)}</h2>
              <p class="chapter-header__desc">${t(ch.desc)}</p>
            </div>
          </div>
          ${renderChapterHero(ch)}
          <div class="chapter-clinics">
            ${resolveClinicBadges(ch.clinicIds)}
          </div>
          ${cats}
        </div>
      </section>`;
  }

  /* ── Intro Hero ─────────────────────────────────────────── */
  function renderIntroHero() {
    const stats = INTRO.hero.stats.map(s => `
      <div class="stat-block">
        <div class="stat-block__num">${s.num}</div>
        <div class="stat-block__label">${t(s.label)}</div>
      </div>`).join('');

    return `
      <section class="intro-hero" data-section="intro-1">
        <div class="intro-hero__inner">
          <p class="intro-hero__eyebrow">${t(INTRO.hero.eyebrow)}</p>
          <h1 class="intro-hero__title">${t(INTRO.hero.title)}</h1>
          <p class="intro-hero__sub">${t(INTRO.hero.sub)}</p>
          <div class="intro-hero__stats">${stats}</div>
        </div>
      </section>`;
  }

  /* ── Intro Service ──────────────────────────────────────── */
  function renderIntroService() {
    const flows = INTRO.service.flows.map(f => `
      <div class="flow-step">
        <div class="flow-step__num">${f.num}</div>
        <div class="flow-step__title">${t(f.title)}</div>
        <div class="flow-step__desc">${t(f.desc)}</div>
      </div>`).join('');

    const features = INTRO.service.features.map(f => `
      <div class="feature-card">
        <div class="feature-card__icon">${f.icon}</div>
        <div class="feature-card__title">${t(f.title)}</div>
        <div class="feature-card__desc">${t(f.desc)}</div>
      </div>`).join('');

    return `
      <section class="intro-service" data-section="intro-2">
        <div class="container">
          <div class="section-header">
            <div class="section-header__number">${INTRO.service.number}</div>
            <h2 class="section-header__title">${t(INTRO.service.title)}</h2>
            <div class="section-header__subtitle">${t(INTRO.service.sub)}</div>
            <span class="gold-line"></span>
            <p style="font-size:13.5px; color:var(--text-secondary); max-width:640px; margin-top:16px; line-height:1.9;">${t(INTRO.service.desc)}</p>
          </div>
          <div class="flow-steps">${flows}</div>
          <div class="feature-grid">${features}</div>
        </div>
      </section>`;
  }

  /* ── Picture element helper (WebP + JPG fallback) ───────── */
  function renderPicture(image, cssClass) {
    if (!image) return '';
    if (image.webp) {
      return `<picture>
        <source srcset="${image.webp}" type="image/webp">
        <img class="${cssClass}" src="${image.src}" alt="${image.alt}" loading="lazy">
      </picture>`;
    }
    return `<img class="${cssClass}" src="${image.src}" alt="${image.alt}" loading="lazy">`;
  }

  /* ── Clinic Gallery Strip ───────────────────────────────── */
  function renderClinicGallery(id) {
    const c = CLINICS[id];
    if (!c || !c.gallery || c.gallery.length === 0) return '';
    const imgs = c.gallery.map(img =>
      `<img class="clinic-gallery__img" src="${img.src}" alt="${img.alt}" loading="lazy">`
    ).join('');
    return `<div class="clinic-gallery">${imgs}</div>`;
  }

  /* ── Clinic Card ────────────────────────────────────────── */
  function renderClinicCard(id, isPrimary) {
    const c = CLINICS[id];
    if (!c) return '';
    const imgHtml = c.image ? renderPicture(c.image, 'clinic-card__img') : '';
    return `
      <div class="clinic-card${isPrimary ? ' clinic-card--primary' : ''}${c.image ? ' clinic-card--has-img' : ''}">
        ${imgHtml}
        ${renderClinicGallery(id)}
        <div class="clinic-card__body">
          <div class="clinic-card__location">${t(c.location)}</div>
          <div class="clinic-card__name">${t(c.name)}</div>
          <div class="clinic-card__specialty">${t(c.specialty)}</div>
          <a href="${c.url}" class="clinic-card__link" target="_blank" rel="noopener">
            ${SVG.externalLink}
            ${c.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
        </div>
      </div>`;
  }

  /* ── Clinic Directory ───────────────────────────────────── */
  function renderClinicDirectory() {
    const categorySections = CLINIC_DIRECTORY.categories.map(cat => {
      const cards = cat.clinicIds
        .map((id, idx) => renderClinicCard(id, idx === 0))
        .join('');
      return `
        <div class="clinic-dir-category">
          <div class="clinic-dir-category__header">
            <span class="clinic-dir-category__num">${cat.num}</span>
            <span class="clinic-dir-category__title">${t(cat.title)}</span>
          </div>
          <div class="clinic-grid">${cards}</div>
        </div>`;
    }).join('');

    return `
      <section class="clinic-directory" data-section="clinics">
        <div class="container">
          <div class="section-header text-center">
            <div class="section-header__number" style="text-align:center;">9</div>
            <h2 class="section-header__title">${t(UI.clinicDir.title)}</h2>
            <div class="section-header__subtitle">${t(UI.clinicDir.sub)}</div>
            <span class="gold-line--center gold-line"></span>
          </div>
          ${categorySections}
        </div>
      </section>`;
  }

  /* ── Header ─────────────────────────────────────────────── */
  function renderHeader() {
    const langPaths = { ja: '../ja/', zh: '../zh-cn/', en: '../en/' };
    const langLabels = { ja: 'JA', zh: 'ZH', en: 'EN' };
    const langLinks = ['ja', 'zh', 'en'].map(lk => {
      const path = (lk === L)
        ? 'index.html'
        : `${langPaths[lk]}index.html`;
      return `<a href="${path}" class="${lk === L ? 'active' : ''}">${langLabels[lk]}</a>`;
    }).join('');

    return `
      <header class="site-header">
        <div class="site-header__brand">
          <button id="nav-toggle" aria-label="${L === 'ja' ? 'メニュー' : L === 'zh' ? '菜单' : 'Menu'}" aria-expanded="false">
            ${SVG.menu}
          </button>
          <div class="site-header__logo-mark">S</div>
          <div class="site-header__name">
            <strong>${t(CATALOG_CONFIG.company)}</strong>
            <span class="site-header__tagline">${t(CATALOG_CONFIG.tagline)}</span>
          </div>
        </div>
        <div class="site-header__actions">
          <nav class="lang-switcher" aria-label="${L === 'ja' ? '言語切替' : L === 'zh' ? '语言切换' : 'Switch language'}">
            ${langLinks}
          </nav>
          <button class="btn-print" aria-label="${t(UI.print)}">
            ${SVG.printer}
            ${t(UI.print)}
          </button>
        </div>
      </header>`;
  }

  /* ── Sidebar Nav ────────────────────────────────────────── */
  function renderNav() {
    const chapterItems = CHAPTERS.map(ch => `
      <div class="nav-item" data-target="${ch.id}">
        <span class="nav-item__num">${ch.num}</span>${t(ch.title)}
      </div>`).join('');

    return `
      <nav class="site-nav" aria-label="${L === 'ja' ? '目次' : L === 'zh' ? '目录' : 'Contents'}">
        <div class="nav-section">
          <div class="nav-section__label">${t(UI.nav.toc)}</div>
          <div class="nav-item" data-target="intro-1">
            <span class="nav-item__num">0.1</span>${t(UI.nav.intro1)}
          </div>
          <div class="nav-item" data-target="intro-2">
            <span class="nav-item__num">0.2</span>${t(UI.nav.intro2)}
          </div>
        </div>
        <div class="nav-section">
          <div class="nav-section__label">${t(UI.nav.menu)}</div>
          ${chapterItems}
        </div>
        <div class="nav-section">
          <div class="nav-section__label">${t(UI.nav.clinic)}</div>
          <div class="nav-item" data-target="clinics">
            <span class="nav-item__num">—</span>${t(UI.nav.clinics)}
          </div>
        </div>
      </nav>
      <div class="nav-backdrop" id="nav-backdrop"></div>`;
  }

  /* ── Footer ─────────────────────────────────────────────── */
  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="site-footer__brand">
          ${t(CATALOG_CONFIG.company)} — ${t(UI.footer.catalog)}
        </div>
        <div class="site-footer__copy">
          &copy; ${CATALOG_CONFIG.year} Sanka Holdings Co., Ltd. ${t(UI.footer.copy)}.
        </div>
      </footer>`;
  }

  /* ── Main ───────────────────────────────────────────────── */
  function renderMain() {
    const chapters = CHAPTERS.map(renderChapter).join('');
    return `
      <main class="site-main">
        ${renderIntroHero()}
        ${renderIntroService()}
        ${chapters}
        ${renderClinicDirectory()}
      </main>`;
  }

  /* ── Bootstrap ──────────────────────────────────────────── */
  function render() {
    // Insert backdrop div for mobile nav
    document.body.insertAdjacentHTML('afterbegin',
      renderNav() + renderHeader() + renderMain() + renderFooter()
    );

    // Apply language-specific body class for font selection
    document.body.classList.add('lang-' + L);

    // Update page title
    document.title = `${t(CATALOG_CONFIG.company)} — ${t(CATALOG_CONFIG.tagline)}`;
  }

  /* ── Mobile nav backdrop ────────────────────────────────── */
  function initBackdrop() {
    const backdrop = document.getElementById('nav-backdrop');
    const nav = document.querySelector('.site-nav');
    const toggle = document.getElementById('nav-toggle');
    if (!backdrop || !nav || !toggle) return;

    function close() {
      nav.classList.remove('site-nav--open');
      backdrop.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
    }

    backdrop.addEventListener('click', close);

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('site-nav--open');
      backdrop.classList.toggle('visible', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close nav on item click (mobile)
    nav.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', close);
    });
  }

  /* ── Run ────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { render(); initBackdrop(); });
  } else {
    render(); initBackdrop();
  }

})();
