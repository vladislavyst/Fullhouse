import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(s = '') {
	return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function para(text = '') {
	return text.split(/\n{2,}/).map(p => `<p>${escapeHtml(p.trim())}</p>`).join('\n');
}

async function main() {
	const projectsPath = path.resolve(__dirname, '../public/projects.json');
	const raw = await fs.readFile(projectsPath, 'utf8');
	const items = JSON.parse(raw);
	for (const p of items) {
		const slug = (p.slug || (p.title || '').toLowerCase().replace(/[^a-z0-9-]+/g, '-')).trim();
		if (!slug) continue;
		const dir = path.resolve(__dirname, '../public/projects', slug);
		await fs.mkdir(dir, { recursive: true });
		const cover = p.imageUrl || '';
		const title = p.title || slug;
		const content = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>
body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;margin:0;background:#f6f7f9;color:#111}
.header{padding:24px 16px;background:#fff;border-bottom:1px solid #eee;position:sticky;top:0}
.container{max-width:960px;margin:0 auto;padding:24px 16px}
.hero{border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 2px 8px rgba(16,24,40,.06)}
.hero-img{width:100%;height:420px;object-fit:cover;background:#e5e7eb}
.title{font-size:40px;line-height:1.1;margin:16px 0}
.meta{color:#6b7280;margin-bottom:12px}
.content{background:#fff;border-radius:16px;padding:24px;box-shadow:0 2px 8px rgba(16,24,40,.06)}
.content p{margin:0 0 12px 0;line-height:1.7;color:#374151}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-top:16px}
.card{background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee}
.footer{padding:24px 16px;color:#6b7280}
.back{color:#2563eb;text-decoration:none}
</style>
</head>
<body>
  <div class="header"><div class="container"><a class="back" href="/projects">← Все проекты</a></div></div>
  <div class="container">
    <div class="hero card">
      ${cover ? `<img class=\"hero-img\" src=\"${cover}\" alt=\"${escapeHtml(title)}\"/>` : `<div class=\"hero-img\"></div>`}
    </div>
    <h1 class="title">${escapeHtml(title)}</h1>
    <div class="content card">
      ${para(p.about || 'Описание будет добавлено позже.')}
    </div>
    ${Array.isArray(p.gallery) && p.gallery.length ? `<div class=\"gallery\">${p.gallery.map(src => `<img src=\"${src}\" style=\"width:100%;height:180px;object-fit:cover;border-radius:8px;border:1px solid #eee;\"/>`).join('')}</div>` : ''}
  </div>
  <div class="footer container">Источник: ${p.url ? `<a href=\"${p.url}\" target=\"_blank\" rel=\"noopener\">ссылка</a>` : 'не указан'}</div>
</body>
</html>`;
		await fs.writeFile(path.join(dir, 'index.html'), content, 'utf8');
	}
	console.log('Static pages generated.');
}

main().catch(err => { console.error(err); process.exit(1); });
