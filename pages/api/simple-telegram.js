// Максимально простой API для отправки в Telegram
export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'API работает',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Только POST запросы' });
  }

  try {
    const { name, phone, comment } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Не хватает имени или телефона' });
    }

    // Прямые ключи для гарантированной работы
    const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
    const CHAT_ID = '546005770';

    const message = `🏠 ЗАЯВКА С САЙТА

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || 'Без комментариев'}

📅 ${new Date().toLocaleString('ru-RU')}`;

    // Используем простой HTTP запрос
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const payload = {
      chat_id: CHAT_ID,
      text: message
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Отправлено в Telegram',
        telegramResult: result
      });
    } else {
      return res.status(500).json({ 
        error: 'Ошибка Telegram API', 
        details: result 
      });
    }

  } catch (error) {
    return res.status(500).json({ 
      error: 'Ошибка сервера', 
      message: error.message 
    });
  }
}
