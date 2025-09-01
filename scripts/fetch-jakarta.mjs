import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'jakarta';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/a0d/7j598f0utoevttccxkh2zdy8ixyeu44q/1920_1080_102ac2dafdae9ba029c6325be6592945b/00_81_Photo-_-1.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/154/2iz6y46uzu3e1na2r0rein3exad8cpld/1920_1080_102ac2dafdae9ba029c6325be6592945b/00_81_Photo-_-2.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/351/np441ebubsr1rlmn3namw0f42v9e5o6r/1920_1080_102ac2dafdae9ba029c6325be6592945b/00_81_Photo-_-3.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/73f/hx10gknw1qycpofe72iloftry39fu9f9/1920_1080_102ac2dafdae9ba029c6325be6592945b/00_81_Photo-_-4.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/123/smu3liubtftcje1tl7tvv35g7ktib9hi/907_756_102ac2dafdae9ba029c6325be6592945b/1.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/086/a92qtpksywo1d9r50oxe6yii1tgmgha5/907_756_102ac2dafdae9ba029c6325be6592945b/4.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gLV9ykrx9ocDwvIPn7tCZTnP7yZLyEwc04HMbjqz.jpg',
  'https://s.iimg.su/s/31/gxSoWrCxVALr2AaviUbGkq16vdfbDIDvsirCzi4W.jpg',
  'https://s.iimg.su/s/31/gRtXmgRxLKz32Tt7oRYRabNYDwW4N7trGORLvSCG.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'джакарта'){
      const stats = { ...(p.stats||{}), bathrooms: 3, bedrooms: 4, wardrobes: 2, garage: 1, livingRooms: 1 };
      return {
        ...p,
        title: 'Джакарта',
        slug,
        area: '221,47 м²',
        buildingArea: '215,32 м²',
        terracesArea: '43,40 м²',
        floors: 2,
        width: '14 м',
        length: '18 м',
        imageUrl: gallery[0] || p.imageUrl || '',
        gallery: gallery.length ? gallery : (p.gallery || []),
        planVariants,
        stats
      };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Jakarta updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
