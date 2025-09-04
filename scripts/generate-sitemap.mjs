import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const PROJECTS_JSON = path.join(PUBLIC_DIR, 'projects.json');
const SITEMAP_XML = path.join(PUBLIC_DIR, 'sitemap.xml');

const SITE_URL = process.env.SITE_URL || 'https://sk-fullhouse.com';

function xmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function url(loc, lastmod) {
  return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
}

async function main() {
  const now = new Date();
  const base = SITE_URL.replace(/\/$/, '');

  /** Static top-level routes */
  const iso = new Date().toISOString().slice(0,10);
  const staticUrls = [
    url(`${base}/`, iso),
    url(`${base}/projects`, iso),
    url(`${base}/realized`, iso),
    url(`${base}/contact`, iso),
    url(`${base}/catalog`, iso),
    // New content pages
    url(`${base}/about`, iso),
    url(`${base}/licenses`, iso),
    url(`${base}/certificates`, iso),
    url(`${base}/construction`, iso),
    url(`${base}/reconstruction`, iso),
    url(`${base}/design`, iso),
  ];

  /** Project slugs */
  let projectUrls = [];
  try {
    const raw = fs.readFileSync(PROJECTS_JSON, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      const seen = new Set();
      for (const item of data) {
        const slug = (item && item.slug) ? String(item.slug).trim() : '';
        if (!slug || seen.has(slug)) continue;
        seen.add(slug);
        projectUrls.push(url(`${base}/projects/${slug}`, iso));
      }
    }
  } catch (err) {
    console.error('Failed to read projects.json for sitemap:', err.message);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticUrls, ...projectUrls].join('\n')}\n</urlset>\n`;

  fs.writeFileSync(SITEMAP_XML, xml, 'utf8');
  console.log(`Sitemap generated at ${SITEMAP_XML} with ${projectUrls.length} project URLs.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


