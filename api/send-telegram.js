export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, comment } = req.body;

    // Проверяем обязательные поля
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    // Telegram Bot Token (нужно будет добавить в переменные окружения)
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing Telegram credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Форматируем сообщение для Telegram
    const message = `
🏠 *Новая заявка с сайта Fullhouse*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
💬 *Комментарий:* ${comment || 'Без комментариев'}

📅 *Дата:* ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })}
    `;

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramData);
      throw new Error('Failed to send to Telegram');
    }

    // Возвращаем успешный ответ
    return res.status(200).json({ 
      success: true, 
      message: 'Order sent successfully' 
    });

  } catch (error) {
    console.error('Error sending order:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
