import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'batu';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/d62/cqxdvjvzhk3gaovvhftqko1tf83t10mv/1920_1080_102ac2dafdae9ba029c6325be6592945b/60-_-1.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/d5d/apxi09zhquglozl3i1g37f0u6i1237rw/1920_1080_102ac2dafdae9ba029c6325be6592945b/60-_-2.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/3a5/cnhjt673bb09b5rky7z1hw3b81s3fxh2/1920_1080_102ac2dafdae9ba029c6325be6592945b/60-_-3.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/70c/iqa23xmjmy2bk8prjwyud0lk73ttw96j/1920_1080_102ac2dafdae9ba029c6325be6592945b/60-_-4.png'
];
const planUrls = [
  'https://s.iimg.su/s/31/gwbiCEjx2oFylaZm9uE01CQgYCylqmjl6ve8931z.jpg',
  'https://s.iimg.su/s/31/gs0ddU0x2jdoJHRMrW49RLy3d96YPZCvmfYjMS1N.jpg',
  'https://s.iimg.su/s/31/gNZFCxRxmuN5DFp6hEWtkS70tjCsmXMCmU46QzII.jpg'
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
  
  // Add new project entry
  const newProject = {
    id: 17,
    title: 'Бату',
    slug,
    price: 'от 5 800 000 ₽',
    area: '199 м²',
    buildingArea: '271 м²',
    terracesArea: '27 м²',
    floors: 1,
    imageUrl: gallery[0] || '',
    gallery,
    stats: {
      bathrooms: 2,
      bedrooms: 3,
      garage: 1,
      livingRooms: 1
    },
    planVariants
  };
  
  data.push(newProject);
  await fs.writeFile(projectsPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Batu added: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
