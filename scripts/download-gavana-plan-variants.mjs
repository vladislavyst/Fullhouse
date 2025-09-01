import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'gavana';
const urls = [
  'https://s.iimg.su/s/31/gcfedMix5uTvhn5D9TSfzJ5wZhZiywAF0CZPv48E.jpg',
  'https://s.iimg.su/s/31/gBZ8UKjxVqKzB4sMHKuVuUtJ6j9H1XtJlBTgBFp0.jpg',
  'https://s.iimg.su/s/31/gZReempxXaLRpp0MOFeGPDu4MRP9aZjIratBuiA2.jpg'
];

async function ensureDir(dir){ await fs.mkdir(dir, { recursive: true }); }

async function download(url, dest){
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if(!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function main(){
  const outDir = path.resolve(__dirname, '../public/projects', slug);
  await ensureDir(outDir);
  const planVariants = [];
  for(let i=0;i<urls.length;i++){
    const idx = String(i+1).padStart(2,'0');
    const file = `plan-variant-${idx}.jpg`;
    const dest = path.join(outDir, file);
    try{ await download(urls[i], dest); planVariants.push(`/projects/${slug}/${file}`); } catch {}
  }

  const projectsPath = path.resolve(__dirname, '../public/projects.json');
  const data = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
  const updated = data.map(p => {
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'гавана'){
      const stats = { ...(p.stats||{}), bathrooms: 2, bedrooms: 3 };
      return { ...p, planVariants, stats };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Saved plan variants for Gavana:', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
