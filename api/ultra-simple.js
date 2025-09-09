// РЕЗЕРВНЫЙ API В КОРНЕВОЙ ПАПКЕ api/
const https = require('https');

module.exports = async (req, res) => {
  console.log('=== РЕЗЕРВНЫЙ ULTRA SIMPLE API CALLED ===');
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Wrong method:', req.method);
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  console.log('Request body:', req.body);

  try {
    const { name, phone, comment } = req.body;

    if (!name || !phone) {
      console.log('Missing fields');
      return res.status(400).json({ error: 'Name and phone required' });
    }

    // ПРЯМЫЕ КЛЮЧИ
    const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
    const CHAT_ID = '546005770';

    const message = `🏠 ЗАЯВКА С САЙТА (РЕЗЕРВНЫЙ API)

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || 'Без комментариев'}

📅 ${new Date().toLocaleString('ru-RU')}`;

    console.log('Sending message:', message);

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

    console.log('HTTPS options:', options);

    // Простой промис для https запроса
    const telegramResponse = await new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          console.log('Telegram raw response:', data);
          try {
            const parsed = JSON.parse(data);
            resolve({
              statusCode: response.statusCode,
              data: parsed
            });
          } catch (e) {
            console.log('JSON parse error:', e);
            resolve({
              statusCode: response.statusCode,
              data: { error: 'Invalid JSON', raw: data }
            });
          }
        });
      });

      request.on('error', (error) => {
        console.log('HTTPS request error:', error);
        reject(error);
      });

      request.write(postData);
      request.end();
    });

    console.log('Telegram response:', telegramResponse);

    if (telegramResponse.statusCode === 200 && telegramResponse.data.ok) {
      console.log('SUCCESS!');
      return res.status(200).json({
        success: true,
        message: 'Заявка отправлена!'
      });
    } else {
      console.log('Telegram error:', telegramResponse.data);
      return res.status(500).json({
        error: 'Failed to send',
        details: telegramResponse.data
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
};
