// CommonJS версия для 100% совместимости с Vercel
const https = require('https');
const querystring = require('querystring');

module.exports = async (req, res) => {
  // CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'CommonJS API работает',
      timestamp: new Date().toISOString(),
      method: 'GET'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Только POST запросы разрешены' });
  }

  try {
    const { name, phone, comment } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ 
        error: 'Не хватает данных', 
        received: { name: !!name, phone: !!phone }
      });
    }

    // Прямые ключи
    const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
    const CHAT_ID = '546005770';

    const message = `🏠 ЗАЯВКА С САЙТА FULLHOUSE

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || 'Без комментариев'}

📅 Дата: ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })}`;

    // Используем нативный https модуль Node.js
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

    const telegramResult = await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          try {
            const result = JSON.parse(data);
            resolve({ statusCode: response.statusCode, result });
          } catch (error) {
            reject(new Error('Ошибка парсинга ответа Telegram'));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(postData);
      req.end();
    });

    if (telegramResult.statusCode === 200 && telegramResult.result.ok) {
      return res.status(200).json({
        success: true,
        message: 'Заявка успешно отправлена в Telegram!',
        telegramResponse: telegramResult.result,
        sentData: { name, phone, comment }
      });
    } else {
      return res.status(500).json({
        error: 'Telegram API вернул ошибку',
        telegramError: telegramResult.result,
        statusCode: telegramResult.statusCode
      });
    }

  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    return res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
