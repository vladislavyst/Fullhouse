import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'rodos';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/db9/j0u83rjj2wcd57v8cxd651dtom6o6rr5/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a30/cz0multhwarbhq4ejs2m9im5p6r7y549/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/6ed/9d0qtwp61tizwxn9mmvyagn5svhndo52/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/930/15tibgx9xz6fa15izn5al7k00oojaz0z/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/33f/li4kwqztpnz1zi5p8nhn313jamkr1xtw/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-5-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/889/0468240ceuk4p4o1gh70qfuqdalogz87/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-6-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/e58/0284yt61bobx4z87egmq0an8ihm19hpw/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-7-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/f53/gzx702901r0pwvnucxuhcls3r5ts9ewc/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-8-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/7cc/rkg8jqmt1707t0k6ss2mtlexdbgn7ewt/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-9-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/da0/mhzrtf4q4hwmyie8poosi61tuo9e3oox/1920_1080_102ac2dafdae9ba029c6325be6592945b/0_Rodos_Photo-_-10-_1_.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/grhDz3yxbGBUPmV0VJHiVbpuEQSTTstOJqzUCRb9.jpg',
  'https://s.iimg.su/s/31/glg2hH8x7wbABHSRuVUD5bhtCJ96MnBM5jRskCDL.jpg',
  'https://s.iimg.su/s/31/gKN1Mu7xeQJZf1TmhkWfb1zIs8fmGkX9bgTLS2vw.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'родос'){
      const stats = { ...(p.stats||{}), bathrooms: 2, bedrooms: 3, wardrobes: 1, garage: 1, livingRooms: 1 };
      return {
        ...p,
        area: '167 м²',
        buildingArea: '300 м²',
        terracesArea: '110 м²',
        floors: 1,
        imageUrl: gallery[0] || p.imageUrl || '',
        gallery: gallery.length ? gallery : (p.gallery || []),
        planVariants,
        stats
      };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Rodos updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
