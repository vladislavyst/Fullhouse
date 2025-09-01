import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'beijing';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/fa5/cej61idm015wci4ej0fs5u41vh03bf51/1920_1080_102ac2dafdae9ba029c6325be6592945b/1.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/d97/wln6g8xtp8qrk7sujii48j4xxmg2b7ok/1920_1080_102ac2dafdae9ba029c6325be6592945b/2.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a7c/2yiusswos2uphqa1ndh55e57s5m1wm50/1920_1080_102ac2dafdae9ba029c6325be6592945b/3.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/e28/jdecqhqlqf7f0zkhfhwzuzjxcgasheqo/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_05_21-v-16.24.37_37ea0655.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/823/t9emmspzk4gvq4w23u96mxpjpc5u1tat/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_05_21-v-16.24.39_75e6cad3.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/715/qaoh1lwp33zmk9o2r1cd72xyjdsbfmtk/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_05_21-v-16.24.40_9c9ba629.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/8b2/obi73n5v4v2fnkgnbq07sikjpc0fpc5o/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_05_30-v-14.07.15_eec8cf48.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a0e/c254wh1bdcvle0qt4z1z0xplfjv6epg5/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.51_bf4bdcea.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/306/ev2jwewbxh4utno1cc013d44c40mri9l/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.56_76586e3a.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gVkLNeXxvWdMMbMw0qLRKMMCm8PcL0Brs4mRQLzt.jpg',
  'https://s.iimg.su/s/31/gX0Kjz0xu03ed2u3JEXVfSqufZ8YUs63UzWGgNps.jpg',
  'https://s.iimg.su/s/31/gIfzq2jxa9UFYPwSvPWUhs1owvkUgudkIn9Me0wz.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'пекин'){
      const stats = { ...(p.stats||{}), bathrooms: 2, bedrooms: 3, livingRooms: 1 };
      return {
        ...p,
        title: 'Пекин',
        slug,
        area: '120 м²',
        buildingArea: '185 м²',
        terracesArea: '22 м²',
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
  console.log('Beijing updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
