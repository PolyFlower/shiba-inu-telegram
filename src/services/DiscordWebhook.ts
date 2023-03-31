import { WebhookClient } from 'discord.js';
import { Service } from 'typedi';

@Service()
class DiscordWebhook extends WebhookClient {
  constructor() {
    super({ id: process.env['DISCORD_WEBHOOK_ID'], token: process.env['DISCORD_WEBHOOK_TOKEN'] });
  }
}

export { DiscordWebhook };
