import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const MINI_APP_URL = process.env.MINI_APP_URL;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendPhoto(chatId, 'ankieta11.png', {
    caption: `Привет.

Это анкета для разбора твоей системы обработки заявок в Instagram.

Нажми кнопку ниже и открой анкету.`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Анкета',
            web_app: { url: MINI_APP_URL }
          }
        ]
      ]
    }
  });
});
