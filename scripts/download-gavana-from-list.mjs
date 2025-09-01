import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'gavana';
const imageUrls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/7b8/cygumo81lzmt60xyseid1tv49l15jos3/1920_1080_102ac2dafdae9ba029c6325be6592945b/1_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/215/mhlwbc48i0mmj6kzsyv0x264mihjq0wl/1920_1080_102ac2dafdae9ba029c6325be6592945b/2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/1f4/ffodecrx5ir06biugy2v5jnx32pvjy21/1920_1080_102ac2dafdae9ba029c6325be6592945b/3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/ea4/e21czxwpcpvvo3jpp5rvlp1p9e9ilhuy/1920_1080_102ac2dafdae9ba029c6325be6592945b/4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/613/cmw1tiyrkpcaibnmagotfaqta9e4iy1u/1920_1080_102ac2dafdae9ba029c6325be6592945b/5-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/33b/ow38rjpbutvzxh1ok0jiytpplgfn7rzl/1920_1080_102ac2dafdae9ba029c6325be6592945b/6-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/281/6tobsacq6ddkdytu7n6book4ic2qfjxv/1920_1080_102ac2dafdae9ba029c6325be6592945b/101_00_Gavana_Photo-_-1.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/f74/l7l6y63o25fe9xu9qho4fq3v6vjlein5/1920_1080_102ac2dafdae9ba029c6325be6592945b/101_00_Gavana_Photo-_-2.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/a0a/1200_864_102ac2dafdae9ba029c6325be6592945b/5_min.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/aaf/1200_864_102ac2dafdae9ba029c6325be6592945b/Bezymyannyy26_min.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/fee/1200_864_102ac2dafdae9ba029c6325be6592945b/2_3_min.jpg'
];
const planUrls = [
  'https://iimg.su/i/yQUpJW'
];

async function ensureDir(dir){ await fs.mkdir(dir, { recursive: true }); }

async function download(url, dest){
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if(!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function downloadAll(){
  const outDir = path.resolve(__dirname, '../public/projects', slug);
  await ensureDir(outDir);
  const gallery = [];
  let i = 1;
  for(const u of imageUrls){
    const idx = String(i).padStart(2,'0');
    const ext = path.extname(new URL(u).pathname) || '.jpg';
    const file = `${slug}-${idx}${ext}`;
    const dest = path.join(outDir, file);
    try { await download(u, dest); gallery.push(`/projects/${slug}/${file}`); } catch {}
    i++;
  }
  const plans = [];
  let pidx = 1;
  for(const u of planUrls){
    const file = `plan-${String(pidx).padStart(2,'0')}.jpg`;
    const dest = path.join(outDir, file);
    try { await download(u, dest); plans.push(`/projects/${slug}/${file}`); } catch {}
    pidx++;
  }
  return { gallery, plans };
}

async function updateProjectsJson({ gallery, plans }){
  const projectsPath = path.resolve(__dirname, '../public/projects.json');
  const data = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
  const updated = data.map(p => {
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'гавана'){
      return {
        ...p,
        imageUrl: gallery[0] || p.imageUrl || '',
        gallery: gallery.length ? gallery : (p.gallery || []),
        plans: plans.length ? plans : (p.plans || []),
        floors: 1,
        area: '130 м²'
      };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
}

async function main(){
  const res = await downloadAll();
  await updateProjectsJson(res);
  console.log('Gavana images saved:', res.gallery.length, 'plans:', res.plans.length);
}

main().catch(err=>{ console.error(err); process.exit(1); });
