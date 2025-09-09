// Прямая отправка тестовой заявки в Telegram
import https from 'https';
const querystring = require('querystring');

const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
const CHAT_ID = '546005770';

const message = `🏠 ТЕСТОВАЯ ЗАЯВКА ОТ РАЗРАБОТЧИКА

👤 Имя: Тестовый Пользователь (от разработчика)
📞 Телефон: +7 918 040-04-02
💬 Комментарий: Проверяю работу формы заказа после исправления CSP

📅 Дата: ${new Date().toLocaleString('ru-RU', {
  timeZone: 'Europe/Moscow',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})}

✅ Статус: API настроен и готов к работе!`;

console.log('🚀 Отправляем тестовую заявку в Telegram...');

const postData = querystring.stringify({
  chat_id: CHAT_ID,
  text: message
});

const options = {
  hostname: 'api.telegram.org',
  path: `/bot${BOT_TOKEN}/sendMessage`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (response) => {
  let data = '';
  
  response.on('data', (chunk) => {
    data += chunk;
  });
  
  response.on('end', () => {
    try {
      const result = JSON.parse(data);
      if (response.statusCode === 200 && result.ok) {
        console.log('✅ Тестовая заявка успешно отправлена в Telegram!');
        console.log('📱 Проверьте ваш Telegram - должно прийти сообщение');
        console.log('🔗 Message ID:', result.result.message_id);
      } else {
        console.error('❌ Ошибка Telegram API:', result);
      }
    } catch (error) {
      console.error('❌ Ошибка парсинга ответа:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Ошибка запроса:', error.message);
});

req.write(postData);
req.end();
