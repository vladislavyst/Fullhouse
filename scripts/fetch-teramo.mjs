import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'teramo';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/64b/lwhp2lplk3misc0h6m363vbkz3krp0wk/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/626/8oj76ditw6ybasyz9t07wwk639d7zl60/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/661/k9turly0mdh61drh4ieo6thngbcp9tgb/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/d66/67kcaeawqq3nj2xksk9w9kaesjroehpl/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/c00/q52jbo86myf7skpr5ymewcksws1mriat/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-5-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/6ed/7s5386w9u0mn6sbqbxabkmadpw0p77qg/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-6-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/cc9/h7g6p310t3mf9cozy307524h26mexwlv/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-7-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/017/ibcrdkm0xdfae2l8hmflgoy93uv1fdaz/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-8-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/bda/2z8qflx8ur1b6tduq1iyxzilcwu86n3a/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-9-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/d4d/xcccsoznisa9v28o6a3dlvpepdr7ctk3/1920_1080_102ac2dafdae9ba029c6325be6592945b/91_Photo-_-10-_1_.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gzW2UMoxMWHCcHwuT1OberbuF86L63WTD8A0PFfF.jpg',
  'https://s.iimg.su/s/31/gVJT3JTxzCK0LPvL43GdwmmNblkim9W2nusS4G8d.jpg',
  'https://s.iimg.su/s/31/g17sdnaxg7Oj6WnViLbug9zSyYaTG8y09p6DsLyL.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'терамо'){
      const stats = { ...(p.stats||{}), bathrooms: 4, bedrooms: 3, wardrobes: 1, livingRooms: 1 };
      return {
        ...p,
        title: 'Терамо',
        slug,
        area: '155 м²',
        buildingArea: '255 м²',
        terracesArea: '63,24 м²',
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
  console.log('Teramo updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
