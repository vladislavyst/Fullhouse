import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'barcelona';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/998/8ipu5jhpnukb3sfs23p6lzcxgq71ih4q/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/afc/etwtewiwr7a0r7jurht88ud2tdqr7p32/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/f4f/pbh37x26hnjmtg59b7omnqoiavj4zai9/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a17/nbsbv9oiis8z44pqkaa70imvan8yb5g2/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/1c9/c84bvix4g3oilgw19klj85c32rwadgc6/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-5-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/276/nxqtsmps14577xrq9qyqchlom1om7ro9/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-6-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/c8c/a6f5gs7oohdosjpra893a9shbsp1m8dg/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-7-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/59f/eabc1isbqwajnyuimv5gsa2lvu75no1h/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-8-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/0de/s3u8up0vydj8l34i7cks9g2zijz0ai9f/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-9-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/300/h2zqj3bi4su1ao7ezxfsis5tp5vs5cz0/1920_1080_102ac2dafdae9ba029c6325be6592945b/22_Engelsa_Photo-_-10-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/e87/1r88yz3zugy128qjhb8mbs67jop91akl/1920_1080_102ac2dafdae9ba029c6325be6592945b/01_Engelsa_khoz_26-_-Foto-_1_.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gQuq0flxNP1zwKUpBejHtqBkZPnBoRY2L7GHwUmF.jpg',
  'https://s.iimg.su/s/31/gcpSlYNxlXisCMPX3FyjyCBDqKQmejvlmhnvTcVy.jpg',
  'https://s.iimg.su/s/31/gG8Qq89xd3tAGNvZb8fZSzlH7l6BQyjGDCkcJbDT.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'барселона'){
      const stats = { ...(p.stats||{}), bathrooms: 2, bedrooms: 3, wardrobes: 2, livingRooms: 1 };
      return {
        ...p,
        title: 'Барселона',
        slug,
        area: '250 м²',
        buildingArea: '190 м²',
        terracesArea: '50 м²',
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
  console.log('Barcelona updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
