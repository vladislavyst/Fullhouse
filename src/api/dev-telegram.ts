// DEV API для локальной разработки - РЕАЛЬНАЯ ОТПРАВКА
export const sendToTelegram = async (data: { name: string; phone: string; comment: string }) => {
  console.log('DEV MODE: Отправляем реальную заявку в Telegram:', data);
  
  // ОТКРЫТЫЕ ДАННЫЕ TELEGRAM BOT
  const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
  const CHAT_ID = '546005770';
  
  const message = `🏠 ЗАЯВКА С DEV РЕЖИМА

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
💬 Комментарий: ${data.comment}

📅 Дата: ${new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow'
  })}
🔧 Режим: Development`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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
    console.log('DEV Telegram response:', result);

    if (response.ok && result.ok) {
      return {
        success: true,
        message: 'DEV MODE: Заявка реально отправлена в Telegram!'
      };
    } else {
      throw new Error('Telegram API error: ' + JSON.stringify(result));
    }
  } catch (error) {
    console.error('DEV Telegram error:', error);
    return {
      success: false,
      error: 'Ошибка отправки в dev режиме: ' + error.message
    };
  }
};
