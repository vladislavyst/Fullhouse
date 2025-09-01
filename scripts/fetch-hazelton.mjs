import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'hazelton';
const galleryUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/510/0z93g08yunuoudcn5ztaif14y6hlntqh/1920_1080_102ac2dafdae9ba029c6325be6592945b/1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/3b7/tmhqm9f8w5aj4wgw1qbdby3392tyom99/1920_1080_102ac2dafdae9ba029c6325be6592945b/2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/c02/2kwyheohq7veyc0yc6i2f3jbwrxannud/1920_1080_102ac2dafdae9ba029c6325be6592945b/3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/e1c/mz6rwql0sjo3gjgditvr1bao4b8jp02j/1920_1080_102ac2dafdae9ba029c6325be6592945b/4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/017/tev10fgmuchh8eb5uz2wtas22biidcab/1920_1080_102ac2dafdae9ba029c6325be6592945b/vanna40000.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/bbc/6ylbtnb5ldtcr7s35pwn7mk5xmqmfgoe/1920_1080_102ac2dafdae9ba029c6325be6592945b/vid-iz-koridora.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/79a/j36u4vsi604u6sx931j3p3fr0wuqr5rt/1920_1080_102ac2dafdae9ba029c6325be6592945b/sp-1.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/42f/0phqiuix0b01fdvj0gfwd2nnwn2qp5el/1920_1080_102ac2dafdae9ba029c6325be6592945b/spalnya-3.jpg'
];
const planUrls = [
  'https://s.iimg.su/s/31/gcrdjR4xwHop2h4zAqEy46tayyJOFe6XMZIB8qzp.jpg',
  'https://s.iimg.su/s/31/gnfg5HrxUSpRzeZXlb4cUZjzooWzqYzWRfJf9tmg.jpg',
  'https://s.iimg.su/s/31/gqlnTx8xZU1e8jUubM7k5cB8rZ67MEUrdpY5bHMv.jpg'
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
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'хазелтон'){
      const stats = { ...(p.stats||{}), bathrooms: 4, bedrooms: 3, wardrobes: 1, garage: 1, livingRooms: 1 };
      return {
        ...p,
        title: 'Хазелтон',
        slug,
        area: '302,02 м²',
        buildingArea: '430 м²',
        terracesArea: '177 м²',
        floors: 2,
        width: '19 м',
        length: '34,6 м',
        imageUrl: gallery[0] || p.imageUrl || '',
        gallery: gallery.length ? gallery : (p.gallery || []),
        planVariants,
        stats
      };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Hazelton updated: gallery', gallery.length, 'plans', planVariants.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
