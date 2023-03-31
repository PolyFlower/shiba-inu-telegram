const EnvHandler = {
  VercelUrl: process.env['VERCEL_URL'],
  TelegramBotToken: process.env['TELEGRAM_TOKEN'],
  TelegramSecretToken: process.env['TELEGRAM_SECRET_TOKEN'],
  DiscordWebhookID: process.env['DISCORD_WEBHOOK_ID'],
  DiscordWebhookToken: process.env['DISCORD_WEBHOOK_TOKEN'],
  Port: process.env['PORT']
};

export default EnvHandler;
