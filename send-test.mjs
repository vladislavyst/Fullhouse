// Простая отправка тестовой заявки
import https from 'https';

const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
const CHAT_ID = '546005770';

const message = `🏠 ТЕСТОВАЯ ЗАЯВКА С КОМПЬЮТЕРА

👤 Имя: Тестовый Пользователь
📞 Телефон: +7 918 040-04-02
💬 Комментарий: Проверяем работу API после исправлений

📅 Дата: ${new Date().toLocaleString('ru-RU', {
  timeZone: 'Europe/Moscow'
})}`;

const postData = JSON.stringify({
  chat_id: CHAT_ID,
  text: message
});

const options = {
  hostname: 'api.telegram.org',
  port: 443,
  path: `/bot${BOT_TOKEN}/sendMessage`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🚀 Отправляем тестовую заявку в Telegram...');

const request = https.request(options, (response) => {
  let data = '';
  
  response.on('data', (chunk) => {
    data += chunk;
  });
  
  response.on('end', () => {
    try {
      const result = JSON.parse(data);
      if (response.statusCode === 200 && result.ok) {
        console.log('✅ УСПЕШНО! Тестовая заявка отправлена в Telegram!');
        console.log('📱 Message ID:', result.result.message_id);
      } else {
        console.log('❌ ОШИБКА Telegram API:', result);
      }
    } catch (e) {
      console.log('❌ ОШИБКА парсинга ответа:', data);
    }
  });
});

request.on('error', (error) => {
  console.log('❌ СЕТЕВАЯ ОШИБКА:', error.message);
});

request.write(postData);
request.end();
