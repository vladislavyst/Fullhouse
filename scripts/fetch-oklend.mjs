import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'oklend';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/38a/hvwt80szteqafn19bv9w26wqw0n9f4n8/1920_1080_102ac2dafdae9ba029c6325be6592945b/2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/1c5/nzit7l7av5orcvbkkytmsx3rqsjtvp1i/1920_1080_102ac2dafdae9ba029c6325be6592945b/3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/ba3/blnebkhcq037sy0pokpezpc3k9o6da9d/1920_1080_102ac2dafdae9ba029c6325be6592945b/4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/511/8lvfosasrpsfnhb78t802f3kbs94dwg7/1920_1080_102ac2dafdae9ba029c6325be6592945b/5-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/435/qr1vs0vlneb81837okecks6rn9h9r9v5/1920_1080_102ac2dafdae9ba029c6325be6592945b/6-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/8af/z7gk6gx7ifxn7ukkjvy1kyqf35ov8qwg/1920_1080_102ac2dafdae9ba029c6325be6592945b/7-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/3b9/x7epl5s78l8xzf097g8vw71ln203lkp3/1920_1080_102ac2dafdae9ba029c6325be6592945b/1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/fae/bf3q0knkdcizj3l5rf2qklef58cfok5c/1920_1080_102ac2dafdae9ba029c6325be6592945b/8-_1_.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gsalY8hxVzeHhnDnqOMPDbBDSF2bilLGVS7GPy8U.jpg',
  'https://s.iimg.su/s/31/gIjjUl1xnDasao9GoJjLEmouXS6BEvNCfqohCgJC.jpg',
  'https://s.iimg.su/s/31/gqxGxjbxIcHH3I9eTpiBGejzTwaIoHnfbDAi7zn0.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'окленд'){
      const stats = { ...(p.stats||{}), bathrooms: 3, bedrooms: 4, wardrobes: 2, livingRooms: 1 };
      return {
        ...p,
        area: '250 м²',
        buildingArea: '425 м²',
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
  console.log('Oklend updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
