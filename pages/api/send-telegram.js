// Vercel Serverless Function для отправки сообщений в Telegram
module.exports = async (req, res) => {
  // Добавляем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем preflight запросы
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Received request body:', req.body);
    const { name, phone, comment } = req.body;

    // Проверяем обязательные поля
    if (!name || !phone) {
      console.log('Missing required fields:', { name: !!name, phone: !!phone });
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    // Telegram Bot Token - временно прямо в коде
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '546005770';

    console.log('Environment check:', {
      hasToken: !!BOT_TOKEN,
      hasChat: !!CHAT_ID,
      tokenLength: BOT_TOKEN ? BOT_TOKEN.length : 0,
      usingFallback: !process.env.TELEGRAM_BOT_TOKEN
    });

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing Telegram credentials');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID'
      });
    }

    // Форматируем сообщение для Telegram
    const message = `🏠 *Новая заявка с сайта Fullhouse*

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
    })}`;

    console.log('Sending message to Telegram...');

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

    console.log('Telegram API response:', {
      ok: telegramResponse.ok,
      status: telegramResponse.status,
      data: telegramData
    });

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramData);
      return res.status(500).json({
        error: 'Failed to send to Telegram',
        telegramError: telegramData,
        status: telegramResponse.status
      });
    }

    // Возвращаем успешный ответ
    console.log('Message sent successfully to Telegram');
    return res.status(200).json({ 
      success: true, 
      message: 'Order sent successfully',
      messageId: telegramData.result?.message_id
    });

  } catch (error) {
    console.error('Error sending order:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};