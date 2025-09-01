import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fetch from 'cross-fetch';

puppeteer.use(StealthPlugin());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = 'https://kapitaldom.com/proyekty/peskara/';
const TARGET_IDS = [11,12,13,14,15,16,17].map(n => `representation-${n}`);
const OUT_DIR = path.resolve(__dirname, '../public/projects/peskara');

async function ensureDir(dir){ await fs.mkdir(dir, { recursive: true }); }

async function download(url, dest){
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }});
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function main(){
  await ensureDir(OUT_DIR);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36');
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' });
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 180000 });

  const localFiles = [];
  for(let i=0;i<TARGET_IDS.length;i++){
    const id = TARGET_IDS[i];
    const idx = String(i+1).padStart(2,'0');
    const out = path.join(OUT_DIR, `peskara-${idx}.png`);
    try {
      await page.evaluate((id)=>{ const el=document.getElementById(id); if(el){ el.scrollIntoView({behavior:'instant', block:'center'});} }, id);
      const handle = await page.$(`#${id}`);
      if(handle){
        // try to get nested image src first
        const imgSrc = await page.evaluate(el=>{
          const img = el.querySelector('img');
          return img ? (img.getAttribute('src') || img.getAttribute('data-src') || '') : '';
        }, handle);
        if(imgSrc && /^https?:\/\//i.test(imgSrc)){
          try {
            await download(imgSrc, out);
          } catch {
            await handle.screenshot({ path: out });
          }
        } else {
          await handle.screenshot({ path: out });
        }
      } else {
        // fallback: full page screenshot slice
        await page.screenshot({ path: out, fullPage: true });
      }
      localFiles.push(`/projects/peskara/${path.basename(out)}`);
    } catch (e) {
      // skip on error
    }
  }
  await browser.close();

  // Update projects.json
  const projectsPath = path.resolve(__dirname, '../public/projects.json');
  const json = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
  const updated = json.map(p => {
    if((p.slug||'') === 'peskara' || (p.title||'').toLowerCase() === 'пескара'){
      const imageUrl = localFiles[0] || p.imageUrl;
      const gallery = localFiles.length ? localFiles : (p.gallery || []);
      return { ...p, imageUrl, gallery };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Peskara images saved:', localFiles.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
