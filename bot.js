import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

console.log('Bot started');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Бот работает. Нажми кнопку ниже.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Анкета',
            web_app: { url: process.env.MINI_APP_URL }
          }
        ]
      ]
    }
  });
});
