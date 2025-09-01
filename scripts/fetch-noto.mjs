import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'noto';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/c4a/0r4ql90nlvjznwsekz8ns43dqi15gbhh/1920_1080_102ac2dafdae9ba029c6325be6592945b/1.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/2d2/65ksjdq6oikm4wfwtrcgs76u449wo25j/1920_1080_102ac2dafdae9ba029c6325be6592945b/1_2_.png'
];
const planUrls = [
  'https://s.iimg.su/s/31/gv8pI25xz7qDI68aCXF7ZoSaBMVd0nluflq7PbEv.jpg',
  'https://s.iimg.su/s/31/goocvvrxMXc4z8szVNtK1CEg6ub7A9hyJTUMZ9z5.jpg',
  'https://s.iimg.su/s/31/gZreUVBxyPqfdfqNf2JgYaUTh9TUey6yVYFB1vz8.jpg'
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
    id: 18,
    title: 'Ното',
    slug,
    price: 'от 9 897 450 ₽',
    area: '189,7 м²',
    buildingArea: '270 м²',
    terracesArea: '42 м²',
    floors: 1,
    width: '15,3 м',
    length: '20,2 м',
    imageUrl: gallery[0] || '',
    gallery,
    stats: {
      bathrooms: 2,
      bedrooms: 3,
      wardrobes: 3,
      garage: 1,
      livingRooms: 1
    },
    planVariants,
    constructionTime: 'от 4 мес.',
    designCost: 'от 1000 р/м²',
    mortgagePayment: 'от 47 472 руб/мес'
  };
  
  data.push(newProject);
  await fs.writeFile(projectsPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Noto added: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
