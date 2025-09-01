import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'verona';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/3e4/dway44f97vwnkj5qhxu1vd60w1d2pbl0/1920_1080_102ac2dafdae9ba029c6325be6592945b/1-_-148.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/14b/aztul3sm305wyr93aglqoxemeltwo9cq/1920_1080_102ac2dafdae9ba029c6325be6592945b/3-_-148.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/117/mkdyc12dissk6ypq7tz5we1k0lwmqpcn/1920_1080_102ac2dafdae9ba029c6325be6592945b/2-_-148.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/f2e/ik0wp0dhpsi29om5tzpcope3iqzjw7r2/1600_900_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_07_08-v-16.09.42_7b7665cb.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/4c2/2h4zxhl168ytzwmttpermywcc06r2wmm/1600_900_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_07_08-v-16.09.41_3410ebaf.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/bb9/t432gsnt2awmp0g8g8d3lckwuybxm7z0/1600_900_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_07_08-v-16.09.41_e730d85e.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/1b1/48kmwk2dnd258tef8q1qn03vrms7tcrq/1600_900_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_07_08-v-16.09.42_d3e3af13.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/7f1/0pufu9myzvyffly7t49jpifddcqqtogw/1600_900_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_07_08-v-16.09.42_f6a4d8f2.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/584/nett9mhphqj4e50s0ro4m0huuy5esfoy/1600_900_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_07_08-v-16.09.41_1ed60444.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gIbKd2exCDv9A9tSGNAAJXIEPyYd9wTqghSKrARJ.jpg',
  'https://s.iimg.su/s/31/gnraTWixvNaXdOOwMoThlRBumXjhnNwCAllkFPbt.jpg',
  'https://s.iimg.su/s/31/gy1mWGWxgPQEqfwaWQAkYYoc84XSvWYtiruYOn2f.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'верона'){
      const stats = { ...(p.stats||{}), bathrooms: 3, bedrooms: 4, wardrobes: 1, garage: 1, livingRooms: 1, office: 1 };
      return {
        ...p,
        title: 'Верона',
        slug,
        area: '300 м²',
        buildingArea: '264 м²',
        terracesArea: '107 м²',
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
  console.log('Verona updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
