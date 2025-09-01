import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'peskara';
const urls = [
  'https://s.iimg.su/s/31/g82xAJ0xLbPOXkpzmjzizdn5L9BRhkiAfKJok3mu.jpg',
  'https://s.iimg.su/s/31/gxabWXRx9O5PnsqobCko7REs7C0adP6ztka7e0gp.jpg',
  'https://s.iimg.su/s/31/ggzZpvgx1DTCIsViAlaHRCeVCotZkOdh6C0lIfO2.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'пескара'){
      return { ...p, planVariants };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Saved plan variants for Peskara:', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
