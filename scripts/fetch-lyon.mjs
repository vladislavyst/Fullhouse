import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'lyon';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/f3d/9u7wrl6btczt41uqc0rxxtrifbo69g51/1920_1080_102ac2dafdae9ba029c6325be6592945b/1_18.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/46b/ji3dyj25x42mwa28es1tt19yxf00apwr/1920_1080_102ac2dafdae9ba029c6325be6592945b/2-_-18.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/28f/m25onb2kceqdoo2jlulr3ij90ftfpmpe/1920_1080_102ac2dafdae9ba029c6325be6592945b/4-_-18.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/d20/temr11pv9qsi1lj3ta1xh4xdllv7ee9f/1920_1080_102ac2dafdae9ba029c6325be6592945b/3-_-18.png',
  'https://kapitaldom.com/upload/resize_cache/iblock/ace/8gn4ukgnd0qnskwadyvs81cjm72tq94i/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.53_a069c8b9.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/aba/mel2cb4q5y29tw31bzpjxwp22ny5e77w/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.53_26a2f346.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/7cc/bnqzd5qdxe5mtpkw8vert3k7lorjzq0b/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.53_32f0cc29.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/9d7/q5jgs8rw3qk25etmsqdy27nrsbl3d39r/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.54_3471fa37.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a8f/g12arkye9ov2eblabq28dx35x5do8hgq/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.54_9f9aa8cf.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/bc7/2ktqbzes09rdbwfdkct54i5nwvb2gwu5/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.54_35283b17.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/730/2oo4d29w7poelluv982dktdbk89c0qgd/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.55_fd0b4b68.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/c41/xhuhqxm9xl3zxvjn77i0wjj1n2262ni7/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.55_7d45b49b.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/dce/xg8tj1kiw2po17q7zc6328v2c0m50brn/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.55_a3bd3ecc.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/d83/6xhbpt024o3u9fsjp0yf7dezfna71vkv/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.56_0418d083.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/e32/tvqpczurx99ivp399l8dblcb67u1l1b6/1920_1080_102ac2dafdae9ba029c6325be6592945b/Izobrazhenie-WhatsApp-2025_06_02-v-10.33.55_e1edd329.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gtVAVi5xFWCYKXiZlH0TH1bdmnsCBuYYQOOdNkqK.jpg',
  'https://s.iimg.su/s/31/glmRP0Cx3rT7ft7GldJWcIHBIfW0GJAJFZtwoTJk.jpg',
  'https://s.iimg.su/s/31/gSnRWINxM1ELRNIUVUOz7vCqrSZMtM91sy66kMzo.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'лион'){
      const stats = { ...(p.stats||{}), bathrooms: 2, bedrooms: 5, wardrobes: 1, garage: 1, livingRooms: 1, office: 1 };
      return {
        ...p,
        title: 'Лион',
        slug,
        area: '288 м²',
        buildingArea: '265 м²',
        terracesArea: '49 м²',
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
  console.log('Lyon updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
