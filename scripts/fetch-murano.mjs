import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'murano';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/283/y84t11sibot8zjv8yjsguoesuenzrbgd/1920_1080_102ac2dafdae9ba029c6325be6592945b/2.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/ab6/iv4kv05v10fnc2euvf3diikm3ox452d4/1920_1080_102ac2dafdae9ba029c6325be6592945b/3.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/97e/c0e66sy0gr6kxgx26u208xbsu7sx5zsd/1920_1080_102ac2dafdae9ba029c6325be6592945b/3.1.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a31/z5w5qy1we0xw6ee41hfs2ji5xr50051m/1920_1080_102ac2dafdae9ba029c6325be6592945b/3.2.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/71e/sagkpeedloytr5y4n0cio6zdmvsjza8p/1920_1080_102ac2dafdae9ba029c6325be6592945b/3.3.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/58e/n39hu76m4ekfkz7umz42ez48mnh0x2o6/1920_1080_102ac2dafdae9ba029c6325be6592945b/4.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/bfe/ztkf3ef2rijpeern4c2349fxzlcz3694/1920_1080_102ac2dafdae9ba029c6325be6592945b/5.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/6b3/6h7tqnkrc93dx8wnpixh18050hh10w1g/1920_1080_102ac2dafdae9ba029c6325be6592945b/1.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gNPHJvTxdWHSC5pLc3XF1aaSFwZBIgn937D48pAz.jpg',
  'https://s.iimg.su/s/31/gkGzQmwxbtiK9udZE4IEhHs0cFPL501azzPaKhOU.jpg',
  'https://s.iimg.su/s/31/gtz0VHoxR9PqdNdpYyjNJVVufjjJ2lJGUmKC1j7k.jpg'
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
  const gallery = [];
  let i = 1;
  for(const u of galleryUrls){
    const idx = String(i).padStart(2,'0');
    const ext = path.extname(new URL(u).pathname) || '.jpg';
    const file = `${slug}-${idx}${ext}`;
    const dest = path.join(outDir, file);
    try { await download(u, dest); gallery.push(`/projects/${slug}/${file}`); } catch {}
    i++;
  }
  const planVariants = [];
  for(let j=0;j<planUrls.length;j++){
    const file = `plan-variant-${String(j+1).padStart(2,'0')}.jpg`;
    const dest = path.join(outDir, file);
    try { await download(planUrls[j], dest); planVariants.push(`/projects/${slug}/${file}`); } catch {}
  }

  const projectsPath = path.resolve(__dirname, '../public/projects.json');
  const data = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
  const updated = data.map(p => {
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'мурано'){
      const stats = { ...(p.stats||{}), bathrooms: 3, bedrooms: 3, wardrobes: 3, garage: 1 };
      return {
        ...p,
        imageUrl: gallery[0] || p.imageUrl || '',
        gallery: gallery.length ? gallery : (p.gallery || []),
        planVariants,
        stats
      };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Murano updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
