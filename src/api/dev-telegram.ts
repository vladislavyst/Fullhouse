// DEV API для локальной разработки
export const sendToTelegram = async (data: { name: string; phone: string; comment: string }) => {
  console.log('DEV MODE: Would send to Telegram:', data);
  
  // В dev режиме просто симулируем успешную отправку
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: 'DEV MODE: Заявка "отправлена" (симуляция)'
  };
};
