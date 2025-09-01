import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'cross-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = 'peskara';
const urls = [
  'https://kapitaldom.com/upload/resize_cache/iblock/d6f/hazffhaf1kr4f0s9jiutv7k6mkcazj6p/1920_1080_102ac2dafdae9ba029c6325be6592945b/01_92_Photo-_-10-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/3e7/vao3xl2160d59r2i6zq6r0naoi3pt5ct/1920_1080_102ac2dafdae9ba029c6325be6592945b/01_92_Photo-_-1-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/d96/rmdwh3jurheaz8039auozk91fxuggwu0/1920_1080_102ac2dafdae9ba029c6325be6592945b/01_92_Photo-_-2-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/6b4/0es8tqxhzfv15prd3r4p9axo9q9orf1w/1920_1080_102ac2dafdae9ba029c6325be6592945b/01_92_Photo-_-3-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/3cf/hz2m39u3c40r15fq95978tmr6cmw93g7/1920_1080_102ac2dafdae9ba029c6325be6592945b/01_92_Photo-_-4-_1_.jpg',
  'https://kapitaldom.com/upload/resize_cache/iblock/6f3/zl9vf2fnnorv4js9jvjji8js7s91i8js/1920_1080_102ac2dafdae9ba029c6325be6592945b/01_92_Photo-_-5-_1_.jpg'
];

async function ensureDir(dir){ await fs.mkdir(dir, { recursive: true }); }

async function downloadAll(){
  const outDir = path.resolve(__dirname, '../public/projects', slug);
  await ensureDir(outDir);
  const local = [];
  let i = 1;
  for(const u of urls){
    const idx = String(i).padStart(2,'0');
    const ext = path.extname(new URL(u).pathname) || '.jpg';
    const file = `${slug}-${idx}${ext}`;
    const dest = path.join(outDir, file);
    const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if(!res.ok) throw new Error(`HTTP ${res.status} for ${u}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(dest, buf);
    local.push(`/projects/${slug}/${file}`);
    i++;
  }
  return local;
}

async function updateProjectsJson(gallery){
  const projectsPath = path.resolve(__dirname, '../public/projects.json');
  const data = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
  const updated = data.map(p => {
    if((p.slug||'') === slug || (p.title||'').toLowerCase() === 'пескара'){
      return { ...p, imageUrl: gallery[0] || p.imageUrl, gallery };
    }
    return p;
  });
  await fs.writeFile(projectsPath, JSON.stringify(updated, null, 2), 'utf8');
}

async function main(){
  const gallery = await downloadAll();
  await updateProjectsJson(gallery);
  console.log('Downloaded', gallery.length, 'images for', slug);
}

main().catch(err=>{ console.error(err); process.exit(1); });
