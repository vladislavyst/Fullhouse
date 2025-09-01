import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fetch from 'cross-fetch';
import { load as cheerioLoad } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

puppeteer.use(StealthPlugin());

const BASE_URL = 'https://kapitaldom.com/proyekty/';
const SITEMAP_URL = 'https://kapitaldom.com/sitemap.xml';

async function ensureDir(dir) {
	await fs.mkdir(dir, { recursive: true });
}

async function getSitemapProjectUrls(limit = 20) {
	try {
		const res = await fetch(SITEMAP_URL, { headers: { 'User-Agent': 'Mozilla/5.0' }});
		if (!res.ok) return [];
		const xml = await res.text();
		const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);
		const projectUrls = urls
			.filter(u => /\/proyekty\//.test(u) && !/\/proyekty\/?$/.test(u))
			.map(u => u.replace(/#.*$/, ''));
		return Array.from(new Set(projectUrls)).slice(0, limit);
	} catch {
		return [];
	}
}

async function scrapeListing(page) {
	// fallback listing via browser if sitemap is not enough
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
	await page.setExtraHTTPHeaders({ 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' });
	await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 180000 });
	for (let i = 0; i < 20; i++) {
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await new Promise(r => setTimeout(r, 800));
	}
	const links = await page.evaluate(() => {
		const set = new Set();
		for (const a of Array.from(document.querySelectorAll('a[href*="/proyekty/"]'))) {
			const href = a.getAttribute('href') || '';
			if (!href) continue;
			try {
				const url = new URL(href, location.origin).toString();
				if (/\/proyekty\/$/.test(url)) continue;
				set.add(url.replace(/#.*$/, ''));
			} catch {}
		}
		return Array.from(set);
	});
	return links.slice(0, 20);
}

async function scrapeProjectCheerio(url) {
	const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' } });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const html = await res.text();
	const $ = cheerioLoad(html);
	const title = ($('h1').first().text() || $('title').text() || '').trim();
	const about = $('p').map((_, p) => $(p).text().trim()).get().filter(Boolean).slice(0, 10).join('\n\n');
	const slug = url.replace(/\/$/, '').split('/').filter(Boolean).pop();
	return { slug, url, title: title || slug, about };
}

async function scrapeProjectPuppeteer(browser, url) {
	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
	await page.setExtraHTTPHeaders({ 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' });
	await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
	await new Promise(r => setTimeout(r, 800));
	const data = await page.evaluate(() => {
		const title = (document.querySelector('h1')?.textContent || document.title || '').trim();
		const ps = Array.from(document.querySelectorAll('p')).map(p => (p.textContent || '').trim()).filter(Boolean);
		const about = ps.slice(0, 10).join('\n\n');
		return { title, about };
	});
	const slug = url.replace(/\/$/, '').split('/').filter(Boolean).pop();
	await page.close();
	return { slug, url, title: data.title || slug, about: data.about };
}

async function saveProjects(projects) {
	const projectsJsonPath = path.resolve(__dirname, '../public/projects.json');
	let existing = [];
	try { existing = JSON.parse(await fs.readFile(projectsJsonPath, 'utf8')); } catch {}
	const bySlug = new Map(existing.map(p => [String(p.slug || p.title || '').toLowerCase(), p]));
	for (const p of projects) {
		const key = String(p.slug || p.title).toLowerCase();
		bySlug.set(key, { ...bySlug.get(key), ...p });
	}
	const merged = Array.from(bySlug.values());
	await fs.writeFile(projectsJsonPath, JSON.stringify(merged, null, 2), 'utf8');
	return merged.length;
}

async function main() {
	const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox','--disable-setuid-sandbox'] });
	const page = await browser.newPage();
	try {
		let links = await getSitemapProjectUrls(20);
		if (!links.length) {
			links = await scrapeListing(page);
		}
		const out = [];
		for (const link of links) {
			try {
				let proj;
				try {
					proj = await scrapeProjectCheerio(link);
				} catch {
					proj = await scrapeProjectPuppeteer(browser, link);
				}
				out.push({ title: proj.title, slug: proj.slug, url: proj.url, about: proj.about });
				await new Promise(r => setTimeout(r, 150));
			} catch {}
		}
		const count = await saveProjects(out);
		console.log('Saved projects:', count);
	} finally {
		await browser.close();
	}
}

main().catch(err => { console.error(err); process.exit(1); });
