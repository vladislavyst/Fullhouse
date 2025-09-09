// СУПЕР ПРОСТОЙ API ДЛЯ VERCEL
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, phone, comment } = req.body

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone required' })
    }

    // Telegram credentials
    const BOT_TOKEN = '8430823667:AAEhuKe7X8vgs3SsB44dmtYjqjz7rlWMyoE'
    const CHAT_ID = '546005770'

    const message = `🏠 ЗАЯВКА С САЙТА

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || 'Без комментариев'}

📅 Дата: ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow'
    })}`

    // Send to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    })

    const telegramResult = await telegramResponse.json()

    if (telegramResponse.ok && telegramResult.ok) {
      return res.status(200).json({
        success: true,
        message: 'Заявка отправлена в Telegram!'
      })
    } else {
      return res.status(500).json({
        error: 'Failed to send to Telegram',
        details: telegramResult
      })
    }

  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    })
  }
}
