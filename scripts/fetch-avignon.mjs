import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'avignon';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/bcb/tmy2j9r80hhv7rx7xr37zkqh137aueay/1920_1080_102ac2dafdae9ba029c6325be6592945b/1_-65.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/69b/7ul855u713jxjz9radh363o7qhnhrye5/1920_1080_102ac2dafdae9ba029c6325be6592945b/2-_-65.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/07a/rsbiiklccq5a4j3717gxc3jth1l7i8cg/1920_1080_102ac2dafdae9ba029c6325be6592945b/3-_-65-.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/413/tigbkeyip0d8dse37zyphr28nke7871w/1920_1080_102ac2dafdae9ba029c6325be6592945b/4-_-65png.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/819/tjm3dcwb0u5ra2iyu0kn8mz0xn45ze2g/1920_1080_102ac2dafdae9ba029c6325be6592945b/5-_-65.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/1b2/ms8ndnnvhgqo8ivbvbxnketrkzw2brkd/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.59_46a37b51.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/46b/ov6s5u1jy4su3x3kj7unjupqn9aqwrwf/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.59_890c8c62.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/3a9/jrrxeptwbzzsgvolqj2d1e93v6gvi5hk/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.34.00_a8496b97.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/c07/9pt7nlk31vjir4f9ds857n20rdp697rz/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.34.00_e41fb433.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/454/7rbrpm91vu1p515hudxv231k2ejugohb/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.34.00_fae3ea95.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/625/ss0q5s5iqfyudiz0ne4aw3pv2tcskvox/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.34.01_7b2857e8.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/868/ksegvuzxfpgrpo3ipkpu7ge1krrjy7a5/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.34.01_7bb6b7dc.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/470/f56lu1gw0dgz5seqwuymd6mreku8u4iz/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.34.01_a08ee562.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/bf3/w4l4onzijywfbhnd8ot1175n5il4vqr3/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.34.01_b392f113.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gjTmWd7xdVnk5qdWoz1UKndW7BVFpWDsZ7Praw2C.jpg',
  'https://s.iimg.su/s/31/gprRcNuxsSRcJq9QfOmZ99zvIUWhXuEANZptSW42.jpg',
  'https://s.iimg.su/s/31/gL6l8MDxJ2RQHkaFAdYmtU1Zzh05rmsPcN4UUwWE.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'авиньон'){
      const stats = { ...(p.stats||{}), bathrooms: 2, bedrooms: 2, wardrobes: 1, garage: 1, livingRooms: 1, office: 1 };
      return {
        ...p,
        title: 'Авиньон',
        slug,
        area: '168 м²',
        buildingArea: '245 м²',
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
  console.log('Avignon updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
