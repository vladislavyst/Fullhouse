// ФИНАЛЬНАЯ ВЕРСИЯ - ПРАВИЛЬНАЯ СТРУКТУРА ДЛЯ VERCEL
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  console.log('=== FINAL TELEGRAM API CALLED ===');
  console.log('Request body:', req.body);

  try {
    const { name, phone, comment } = req.body;

    if (!name || !phone) {
      console.log('Missing required fields:', { name: !!name, phone: !!phone });
      return res.status(400).json({ error: 'Name and phone required' });
    }

    // ПРЯМЫЕ КЛЮЧИ - БЕЗ ПЕРЕМЕННЫХ СРЕДЫ
    const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
    const CHAT_ID = '546005770';

    console.log('Using hardcoded credentials');

    const message = `🏠 ЗАЯВКА С САЙТА FULLHOUSE

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || 'Без комментариев'}

📅 Дата: ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow'
    })}`;

    console.log('Message to send:', message);

    // Используем простой fetch или fallback
    const fetchFunction = global.fetch || require('node-fetch');
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    console.log('Sending to Telegram URL:', telegramUrl);

    const response = await fetchFunction(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    console.log('Telegram response status:', response.status);

    const result = await response.json();
    console.log('Telegram response data:', result);

    if (response.ok && result.ok) {
      console.log('SUCCESS: Message sent to Telegram');
      return res.status(200).json({
        success: true,
        message: 'Заявка отправлена в Telegram!',
        telegram_result: result
      });
    } else {
      console.log('TELEGRAM ERROR:', result);
      return res.status(500).json({
        error: 'Telegram API error',
        details: result
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    });
  }
};
