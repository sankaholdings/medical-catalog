/**
 * Sanka Holdings Medical Catalog — PDF Generator
 *
 * Usage:
 *   npm run pdf          → generate all 3 language PDFs
 *   npm run pdf:ja       → Japanese only
 *   npm run pdf:zh       → Simplified Chinese only
 *   npm run pdf:en       → English only
 *   node scripts/pdf.js ja zh-cn   → specify langs as args
 *
 * Output: dist/sanka-catalog-{lang}.pdf
 *
 * Requirements:
 *   npm install   (installs puppeteer)
 */

'use strict';

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

/* ── Config ─────────────────────────────────────────────── */
const ALL_LANGS = ['ja', 'zh-cn', 'en'];

const PDF_NAMES = {
  'ja':    'catalog-ja.pdf',
  'zh-cn': 'catalog-zh-cn.pdf',
  'en':    'catalog-en.pdf',
};

const PDF_OPTIONS = {
  format: 'A4',
  printBackground: true,
  margin: {
    top:    '15mm',
    right:  '14mm',
    bottom: '18mm',
    left:   '14mm',
  },
  // Embed fonts
  preferCSSPageSize: false,
};

/* ── Helpers ─────────────────────────────────────────────── */
function ensureDistDir() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log(`Created: dist/`);
  }
  return distDir;
}

function getLangs() {
  const args = process.argv.slice(2);
  if (args.length === 0) return ALL_LANGS;
  const valid = args.filter(a => ALL_LANGS.includes(a));
  if (valid.length === 0) {
    console.error(`Unknown language(s): ${args.join(', ')}`);
    console.error(`Valid options: ${ALL_LANGS.join(', ')}`);
    process.exit(1);
  }
  return valid;
}

/* ── Temporary HTTP Server ──────────────────────────────── */
// Using a local HTTP server ensures Google Fonts and relative
// asset paths resolve correctly (file:// blocks external fonts).

function startServer(rootDir, port) {
  const http = require('http');
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css':  'text/css',
    '.js':   'application/javascript',
  };
  const server = http.createServer((req, res) => {
    let filePath = path.join(rootDir, req.url === '/' ? '/index.html' : req.url);
    // strip query strings
    filePath = filePath.split('?')[0];
    if (!fs.existsSync(filePath)) {
      res.writeHead(404); res.end(); return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  });
  return new Promise(resolve => server.listen(port, () => resolve(server)));
}

/* ── PDF Generator ──────────────────────────────────────── */
async function generatePDF(browser, lang, distDir, port) {
  const htmlPath = path.resolve(__dirname, '..', lang, 'index.html');

  if (!fs.existsSync(htmlPath)) {
    console.error(`  ✗ File not found: ${htmlPath}`);
    return;
  }

  const outputPath = path.join(distDir, PDF_NAMES[lang]);
  // Use local server so Google Fonts (and relative assets) load correctly
  const pageUrl = `http://localhost:${port}/${lang}/index.html`;

  console.log(`  Generating ${PDF_NAMES[lang]}  (${pageUrl})`);

  const page = await browser.newPage();

  try {
    // A4-like viewport width for consistent print layout
    await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });

    await page.goto(pageUrl, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000,
    });

    // Wait for fonts and JS renderer to finish
    await page.waitForFunction(() => document.fonts.ready, { timeout: 20000 });
    await new Promise(r => setTimeout(r, 800));

    await page.pdf({ ...PDF_OPTIONS, path: outputPath });

    const stats = fs.statSync(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✓ ${PDF_NAMES[lang]} (${sizeMB} MB)`);
  } catch (err) {
    console.error(`  ✗ Failed to generate ${PDF_NAMES[lang]}:`, err.message);
  } finally {
    await page.close();
  }
}

/* ── Main ───────────────────────────────────────────────── */
async function main() {
  const langs = getLangs();
  const distDir = ensureDistDir();
  const PORT = 18080;
  const rootDir = path.resolve(__dirname, '..');

  console.log(`\nSanka Holdings Medical Catalog — PDF Generator`);
  console.log(`Languages: ${langs.join(', ')}`);
  console.log(`Output:    dist/\n`);

  // Start local server (needed for Google Fonts to load)
  const server = await startServer(rootDir, PORT);
  console.log(`  Local server started on port ${PORT}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
    ],
  });

  try {
    for (const lang of langs) {
      await generatePDF(browser, lang, distDir, PORT);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\nDone. PDFs saved to dist/');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
