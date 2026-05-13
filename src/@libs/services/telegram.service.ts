import { ENV } from '@/environments';
import axios from 'axios';

export const TelegramService = {
  async sentMsg(message: string) {
    try {
      const apiUrl = `https://api.telegram.org/bot${ENV.telegramBotToken}/sendMessage`;
      const data = await axios.post(apiUrl, {
        chat_id: ENV.telegramChatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      });
      return data?.data;
    } catch (error) {
      console.error('Telegram message send error:', error);
      return error;
    }
  },
};
