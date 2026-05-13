export const ENV = {
  // Base
  webTitle: process.env.NEXT_PUBLIC_WEB_TITLE,
  webDescription: process.env.NEXT_PUBLIC_WEB_DESCRIPTION,
  //bd district and area api
  bdApi: process.env.NEXT_PUBLIC_BD_API,
  // Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  webHostUrl: process.env.NEXT_PUBLIC_WEB_HOST_URL,
  webIdentifier: process.env.NEXT_PUBLIC_WEB_IDENTIFIER,
  webMode: process.env.NEXT_PUBLIC_WEB_MODE,
  telegramChatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
  telegramBotToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN,

  // Flag
  isDevelopment: process.env.NEXT_PUBLIC_WEB_MODE === "development",
  isStaging: process.env.NEXT_PUBLIC_WEB_MODE === "staging",
  isProduction: process.env.NEXT_PUBLIC_WEB_MODE === "production",
  isEnableRBAC: process.env.NEXT_PUBLIC_ENABLE_RBAC,
  employerPanelUrl: process.env.NEXT_PUBLIC_EMPLOYER_PANEL_URL,
};
