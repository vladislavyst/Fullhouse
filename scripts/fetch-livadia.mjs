import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'livadia';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/f88/101wha08qddedsix18ecbemt65k3i6dc/1920_1080_102ac2dafdae9ba029c6325be6592945b/09_VID-1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/f9a/e0aehozk2gzd2fddkrqmeyjx0r4az39h/1920_1080_102ac2dafdae9ba029c6325be6592945b/09_VID-2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/560/lo4hc0pz3f3c1vkkiq88bnvies0dawbx/1920_1080_102ac2dafdae9ba029c6325be6592945b/09_VID-3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/253/6muxz20blioc3oky8eysvl2ntdiq5wfd/1920_1080_102ac2dafdae9ba029c6325be6592945b/09_VID-5-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/0bd/6m6jmy3fxpiq9290i6u1zhoqbic63f5w/1920_1080_102ac2dafdae9ba029c6325be6592945b/09_VID-6-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/53c/pdl693hha8lq28w03zkcfd1g2vn18mwd/1920_1080_102ac2dafdae9ba029c6325be6592945b/09_VID-7-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/b81/optq14zbpxbe564s80vmb1lksrt0qdfi/1920_1080_102ac2dafdae9ba029c6325be6592945b/09_VID-9-_1_.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gNvGGGOx5qHJq6fdMlthpS64FitGXz5kewGkFzVT.jpg',
  'https://s.iimg.su/s/31/gz3A58qxZCfOBj31cpMiIpJwtUjUNwrJFbbkbMIY.jpg',
  'https://s.iimg.su/s/31/gJCmh9Pxf54shaNbEFvhmzGMKFMGeLTlwm3S4Vsr.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'ливадия'){
      const stats = { ...(p.stats||{}), bathrooms: 3, bedrooms: 4, wardrobes: 1, garage: 1, livingRooms: 1 };
      return {
        ...p,
        title: 'Ливадия',
        slug,
        area: '194,7 м²',
        buildingArea: '310 м²',
        terracesArea: '35 м²',
        floors: 2,
        imageUrl: gallery[0] || p.imageUrl || '',
        gallery: gallery.length ? gallery : (p.gallery || []),
        planVariants,
        stats
      };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Livadia updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
