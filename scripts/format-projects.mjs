import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatAbout(text) {
	if (!text) return '';
	const normalized = text
		.replace(/\r\n/g, '\n')
		.split(/\n{2,}/)
		.map(s => s.trim())
		.filter(Boolean)
		.map(s => s.charAt(0).toUpperCase() + s.slice(1))
		.join('\n\n');
	return normalized;
}

async function main() {
	const projectsPath = path.resolve(__dirname, '../public/projects.json');
	const raw = await fs.readFile(projectsPath, 'utf8');
	const items = JSON.parse(raw);

	const alstenIdx = items.findIndex(p => (p.slug || '').toLowerCase() === 'alsten' || (p.title || '').toLowerCase().includes('алстен'));
	const alsten = alstenIdx >= 0 ? [items[alstenIdx]] : [];
	const others = items.filter((_, i) => i !== alstenIdx);

	const withAbout = [];
	const withoutAbout = [];
	for (const p of others) {
		const about = formatAbout(p.about || '');
		const entry = { ...p, about };
		if (about) withAbout.push(entry); else withoutAbout.push(entry);
	}

	withAbout.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

	const result = [...alsten, ...withAbout, ...withoutAbout];
	await fs.writeFile(projectsPath, JSON.stringify(result, null, 2), 'utf8');
	console.log('Formatted projects:', result.length);
}

main().catch(err => { console.error(err); process.exit(1); } );
