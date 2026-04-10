const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const MINI_APP_URL = 'https://instabots-production.up.railway.app';

const bot = new TelegramBot(token, { polling: true });

console.log('Bot started');

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    await bot.sendPhoto(
      chatId,
      './anketa11.png', // файл в корне
      {
        caption: `Привет.

Нажми кнопку ниже и открой анкету.`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Открыть анкету',
                web_app: { url: MINI_APP_URL }
              }
            ]
          ]
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
});
