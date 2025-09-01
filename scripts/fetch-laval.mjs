import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'laval';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/d4f/h9jjnli0m79mkmhpy8umip2xrm0w5smx/1920_1080_102ac2dafdae9ba029c6325be6592945b/1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/83c/whmryofey1emdbeg9srvyn6lnm7luklv/1920_1080_102ac2dafdae9ba029c6325be6592945b/2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/38f/hls5e7ifqpai03kuizoi3fohcodokzcm/1920_1080_102ac2dafdae9ba029c6325be6592945b/3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a7f/zw1ajkjcpgj8tgzq6bziwjhz5zmz00fs/1920_1080_102ac2dafdae9ba029c6325be6592945b/4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/f16/wdugac3vw1sgeatojrka4qz3v8giadqn/1920_1080_102ac2dafdae9ba029c6325be6592945b/5-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/20f/nrvurk50618x9hkbbvrg4dl70g2lkgnc/1920_1080_102ac2dafdae9ba029c6325be6592945b/1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/860/sp92ochrugvv3q78l17vu1erpu6o8d7l/1920_1080_102ac2dafdae9ba029c6325be6592945b/2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/19d/m8vgiaf8p66hijekjrumn1jv3eu0slp6/1920_1080_102ac2dafdae9ba029c6325be6592945b/3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/927/v923us7l79qwjbywmmy0d3pnxlgktjmt/1920_1080_102ac2dafdae9ba029c6325be6592945b/4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/cc5/gw9f1s29fkcwwc1f0dg0ibaiyw2o1v4j/1920_1080_102ac2dafdae9ba029c6325be6592945b/5-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/4a5/pt3npemc2zxiirfvcgxv20w82062cxmm/1920_1080_102ac2dafdae9ba029c6325be6592945b/6-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/e7d/gb4hkl5o24yckbvae14uejkz9t0ci9ej/1920_1080_102ac2dafdae9ba029c6325be6592945b/6.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a36/0g07jdmu05ddvkeszofq1xjfnfw281km/1920_1080_102ac2dafdae9ba029c6325be6592945b/8-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/573/7qb2l079980xgzecu99maeeojlmfdsd9/1920_1080_102ac2dafdae9ba029c6325be6592945b/9-_1_.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/g22zbfLxqMF7z0nU50COJ88fXRQ2sKAwnzLf9XjD.jpg',
  'https://s.iimg.su/s/31/gDUWmRJxGZ0NPLYyG82S6ozDfMpR4zcYfES3of36.jpg',
  'https://s.iimg.su/s/31/gkbJNB5xq3KtHd6MBrMmG6AuubVrESsdbCQ7AXwk.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'лаваль'){
      const stats = { ...(p.stats||{}), bathrooms: 3, bedrooms: 4, livingRooms: 1 };
      return {
        ...p,
        title: 'Лаваль',
        slug,
        area: '281,1 м²',
        buildingArea: '330 м²',
        terracesArea: '90 м²',
        floors: 2,
        width: '26,3 м',
        length: '16,75 м',
        imageUrl: gallery[0] || p.imageUrl || '',
        gallery: gallery.length ? gallery : (p.gallery || []),
        planVariants,
        stats
      };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Laval updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
