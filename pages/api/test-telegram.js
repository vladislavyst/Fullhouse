// Vercel Serverless Function для тестирования Telegram API
module.exports = async (req, res) => {
  try {
    // Проверяем переменные окружения
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const diagnostics = {
      method: req.method,
      hasToken: !!BOT_TOKEN,
      hasChat: !!CHAT_ID,
      tokenLength: BOT_TOKEN ? BOT_TOKEN.length : 0,
      chatId: CHAT_ID ? CHAT_ID.substring(0, 3) + '***' : 'missing',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown'
    };

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({
        error: 'Missing environment variables',
        diagnostics,
        help: 'Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to Vercel environment variables'
      });
    }

    // Тестируем подключение к Telegram API
    const testResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getMe`,
      { method: 'GET' }
    );

    const botInfo = await testResponse.json();

    if (testResponse.ok) {
      return res.status(200).json({
        success: true,
        message: 'Telegram bot is configured correctly',
        bot: {
          username: botInfo.result?.username,
          first_name: botInfo.result?.first_name
        },
        diagnostics
      });
    } else {
      return res.status(500).json({
        error: 'Invalid Telegram bot token',
        telegramError: botInfo,
        diagnostics
      });
    }

  } catch (error) {
    return res.status(500).json({
      error: 'Test failed',
      details: error.message,
      stack: error.stack
    });
  }
};