// РАБОТАЮЩИЙ API БЕЗ ВСЯКОЙ ФИГНИ - КОРНЕВАЯ ПАПКА
const https = require('https');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST' });
  }

  try {
    const { name, phone, comment } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Need name and phone' });
    }

    // ПРЯМЫЕ КЛЮЧИ - НИКАКОЙ ХЕРНИ С ПЕРЕМЕННЫМИ
    const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
    const CHAT_ID = '546005770';

    const message = `🏠 ЗАЯВКА С САЙТА (ROOT API)

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || 'Без комментариев'}

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

    const telegramResponse = await new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve({
              statusCode: response.statusCode,
              data: parsed
            });
          } catch (e) {
            resolve({
              statusCode: response.statusCode,
              data: { error: 'Invalid JSON', raw: data }
            });
          }
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.write(postData);
      request.end();
    });

    if (telegramResponse.statusCode === 200 && telegramResponse.data.ok) {
      return res.status(200).json({
        success: true,
        message: 'Заявка отправлена!'
      });
    } else {
      return res.status(500).json({
        error: 'Failed to send',
        details: telegramResponse.data
      });
    }

  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};
