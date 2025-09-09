import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для создания .htaccess файла для автоматической подачи WebP
function generateHtaccess() {
  const htaccessContent = `
# Автоматическая подача WebP изображений
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Проверяем поддержку WebP браузером
  RewriteCond %{HTTP_ACCEPT} image/webp
  
  # Проверяем существование WebP файла
  RewriteCond %{REQUEST_FILENAME} \\.(jpe?g|png)$
  RewriteCond %{REQUEST_FILENAME}\\.webp -f
  
  # Перенаправляем на WebP версию
  RewriteRule ^(.+)\\.(jpe?g|png)$ $1.$2.webp [T=image/webp,E=accept:1]
</IfModule>

# Устанавливаем правильные MIME типы
<IfModule mod_mime.c>
  AddType image/webp .webp
</IfModule>

# Кеширование изображений
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
`;

  const htaccessPath = path.join(__dirname, '..', 'public', '.htaccess');
  fs.writeFileSync(htaccessPath, htaccessContent.trim());
  console.log('✅ Создан .htaccess файл для автоматической подачи WebP');
}

// Функция для создания сервис воркера для обработки изображений
function generateImageServiceWorker() {
  const swContent = `
// Дополнение к существующему service worker для оптимизации изображений

// Функция для проверки поддержки WebP
function supportsWebP() {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Обработка запросов изображений
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Проверяем, является ли запрос изображением
  if (url.pathname.match(/\\.(jpe?g|png)$/i)) {
    event.respondWith(
      (async () => {
        const supportsWebPFormat = await supportsWebP();
        
        if (supportsWebPFormat) {
          // Пробуем загрузить WebP версию
          const webpUrl = url.pathname + '.webp';
          try {
            const webpResponse = await fetch(webpUrl);
            if (webpResponse.ok) {
              return webpResponse;
            }
          } catch (e) {
            // WebP версия не найдена, загружаем оригинал
          }
        }
        
        // Загружаем оригинальное изображение
        return fetch(event.request);
      })()
    );
  }
});
`;

  console.log('📝 Код для service worker (добавьте в существующий sw.js):');
  console.log(swContent);
}

// Функция для создания инструкций по оптимизации
function generateOptimizationInstructions() {
  const instructions = `
# 🚀 Инструкции по оптимизации изображений

## Найденные проблемы:
- 44 изображения размером более 500KB
- Самое большое: 2932KB (render.png)
- Общий объем больших изображений: ~65MB

## Рекомендации:

### 1. Сжатие изображений
Используйте онлайн сервисы:
- https://tinypng.com/ (PNG/JPEG)
- https://squoosh.app/ (Google)
- https://imageoptim.com/ (Mac)

### 2. Конвертация в WebP
\`\`\`bash
# Установите cwebp (Google WebP tools)
# Для каждого изображения:
cwebp -q 80 input.jpg -o input.jpg.webp
\`\`\`

### 3. Создание разных размеров
Для больших изображений создайте версии:
- 400px ширина (для мобильных)
- 800px ширина (для планшетов)  
- 1200px ширина (для десктопов)

### 4. Приоритетные изображения для оптимизации:

1. **public/Янтарный/render.png** (2932KB) → сжать до 300KB
2. **public/0_3.png** (2025KB) → главное изображение, критично!
3. **public/Forest Residence.jpeg** (917KB) → сжать до 400KB
4. Все PNG файлы проектов → конвертировать в WebP

### 5. Настройка ленивой загрузки
\`\`\`jsx
<img 
  src="image.jpg" 
  loading="lazy" 
  width="800" 
  height="600"
  alt="Описание"
/>
\`\`\`

### 6. Использование современных форматов
Порядок приоритета:
1. AVIF (лучшее сжатие)
2. WebP (хорошая поддержка)
3. JPEG/PNG (fallback)

## Ожидаемый результат:
- ⚡ Улучшение LCP на 2-3 секунды
- 📱 Ускорение загрузки на мобильных в 3-5 раз
- 🎯 Повышение Core Web Vitals score
- 💾 Экономия трафика пользователей
`;

  const instructionsPath = path.join(__dirname, '..', 'IMAGE_OPTIMIZATION.md');
  fs.writeFileSync(instructionsPath, instructions.trim());
  console.log('📋 Созданы подробные инструкции: IMAGE_OPTIMIZATION.md');
}

// Основная функция
function main() {
  console.log('🔧 Настройка оптимизации изображений...\n');
  
  generateHtaccess();
  generateImageServiceWorker();
  generateOptimizationInstructions();
  
  console.log('\n✅ Настройка завершена!');
  console.log('📁 Созданы файлы:');
  console.log('   - public/.htaccess (автоматическая подача WebP)');
  console.log('   - IMAGE_OPTIMIZATION.md (инструкции)');
  console.log('\n🎯 Следующие шаги:');
  console.log('1. Сжать критические изображения (0_3.png, render.png)');
  console.log('2. Конвертировать в WebP формат');
  console.log('3. Добавить width/height атрибуты к <img> тегам');
  console.log('4. Протестировать с помощью PageSpeed Insights');
}

main();
