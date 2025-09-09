// РАБОТАЮЩИЙ API БЕЗ ВСЯКОЙ ФИГНИ
const https = require('https');
const querystring = require('querystring');

module.exports = (req, res) => {
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

  const { name, phone, comment } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Need name and phone' });
  }

  // ПРЯМЫЕ КЛЮЧИ - НИКАКОЙ ХЕРНИ С ПЕРЕМЕННЫМИ
  const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
  const CHAT_ID = '546005770';

  const message = `🏠 ЗАЯВКА С САЙТА

👤 ${name}
📞 ${phone}
💬 ${comment || 'Без комментариев'}

📅 ${new Date().toLocaleString('ru-RU')}`;

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

  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (response.statusCode === 200 && result.ok) {
          res.status(200).json({ success: true, message: 'Sent to Telegram' });
        } else {
          res.status(500).json({ error: 'Telegram error', details: result });
        }
      } catch (error) {
        res.status(500).json({ error: 'Parse error' });
      }
    });
  });

  request.on('error', (error) => {
    res.status(500).json({ error: 'Request failed', message: error.message });
  });

  request.write(postData);
  request.end();
};
