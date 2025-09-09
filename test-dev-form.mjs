// Тест dev формы с реальной отправкой
const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE';
const CHAT_ID = '546005770';

const message = `🏠 ТЕСТОВАЯ ЗАЯВКА ИЗ DEV СКРИПТА

👤 Имя: Тестовый Пользователь (Dev Script)
📞 Телефон: +7 918 040-04-02  
💬 Комментарий: Проверяем что dev режим теперь отправляет реальные заявки

📅 Дата: ${new Date().toLocaleString('ru-RU', {
  timeZone: 'Europe/Moscow'
})}
🔧 Режим: Development Script Test`;

console.log('🚀 Отправляем тестовую заявку из dev скрипта...');

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
  console.log('📱 Telegram response:', result);

  if (response.ok && result.ok) {
    console.log('✅ УСПЕШНО! Dev режим теперь отправляет реальные заявки!');
    console.log('📬 Message ID:', result.result.message_id);
  } else {
    console.log('❌ ОШИБКА Telegram API:', result);
  }
} catch (error) {
  console.error('❌ СЕТЕВАЯ ОШИБКА:', error.message);
}
