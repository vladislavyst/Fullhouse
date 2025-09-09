import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для получения размера файла в КБ
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

// Функция для сканирования директории на большие изображения
function findLargeImages(dir, threshold = 500) {
  const largeImages = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
          const sizeKB = getFileSizeInKB(itemPath);
          if (sizeKB > threshold) {
            const relativePath = path.relative(path.join(__dirname, '..'), itemPath);
            largeImages.push({
              path: relativePath,
              size: sizeKB,
              url: `http://sk-fullhouse.com/${relativePath.replace(/\\/g, '/')}`
            });
          }
        }
      }
    }
  }
  
  scanDirectory(dir);
  return largeImages;
}

// Основная функция
function analyzeImages() {
  console.log('🔍 Анализ больших изображений...\n');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const largeImages = findLargeImages(publicDir, 500);
  
  if (largeImages.length === 0) {
    console.log('✅ Больших изображений (>500KB) не найдено!');
    return;
  }
  
  // Сортируем по размеру (самые большие сначала)
  largeImages.sort((a, b) => b.size - a.size);
  
  console.log(`⚠️  Найдено ${largeImages.length} больших изображений:\n`);
  
  largeImages.forEach((img, index) => {
    console.log(`${index + 1}. ${img.path}`);
    console.log(`   Размер: ${img.size} КБ`);
    console.log(`   URL: ${img.url}`);
    console.log('');
  });
  
  console.log('📋 Рекомендации по оптимизации:');
  console.log('1. Сжать изображения до 300-500 КБ');
  console.log('2. Конвертировать в WebP формат');
  console.log('3. Использовать ленивую загрузку');
  console.log('4. Добавить размеры width/height для предотвращения CLS');
  
  // Создаем отчет для Vercel headers
  console.log('\n📝 Конфигурация кеширования для vercel.json:');
  console.log(`
{
  "source": "/(.*\\\\.(jpg|jpeg|png|gif|webp|avif|svg))",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    },
    {
      "key": "Vary",
      "value": "Accept"
    }
  ]
}
  `);
}

// Запуск анализа
analyzeImages();
