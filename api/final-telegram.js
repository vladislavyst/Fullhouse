// ФИНАЛЬНАЯ ВЕРСИЯ - ТОЧНО РАБОТАЕТ
export default async function handler(req, res) {
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

  try {
    const { name, phone, comment } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone required' });
    }

    // ПРЯМЫЕ КЛЮЧИ
    const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
    const CHAT_ID = '546005770';

    const message = `🏠 ЗАЯВКА С САЙТА FULLHOUSE

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || 'Без комментариев'}

📅 Дата: ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow'
    })}`;

    // Используем простой fetch
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    const result = await response.json();

    if (response.ok && result.ok) {
      return res.status(200).json({
        success: true,
        message: 'Заявка отправлена в Telegram!',
        telegram_result: result
      });
    } else {
      return res.status(500).json({
        error: 'Telegram API error',
        details: result
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
}
