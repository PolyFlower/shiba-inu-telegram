import 'reflect-metadata'; // Initial import for global support of typedi
import { Container } from 'typedi';
import { DiscordWebhook } from './services/DiscordWebhook';
import { ExpressServer } from './services/ExpressServer';
import { TelegramBotEx } from './services/TelegramBotEx';

const discordWebhookInstance = Container.get(DiscordWebhook);
const telegramBotInstance = Container.get(TelegramBotEx);
const expressServerInstance = Container.get(ExpressServer);
telegramBotInstance.setWebHook(`${process.env['VERCEL_URL']}${process.env['TELEGRAM_WEBHOOK_ROUTE']}`, {
  drop_pending_updates: true,
  secret_token: process.env['TELEGRAM_SECRET_TOKEN']
});
expressServerInstance.listen();
