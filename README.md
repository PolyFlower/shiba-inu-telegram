# ShibaInu - TypeScript Voice Message Forwarder

This TypeScript application forwards voice messages sent to a Telegram channel where a Telegram bot is present and forwards them to a Discord webhook.

## Installation

1. Create account on [NGROK](https://dashboard.ngrok.com/get-started/your-authtoken)
2. Get your auth-token from [Dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
3. Create telegram bot with [BotFather](https://t.me/BotFather)
4. Add bot to your test channel, grant message view access to bot.
5. Setup webhook on Discord channel in integrations panel
6. Get webhook url from channel integrations and copy webhook ID and token ex. https://discord.com/api/webhooks/{ID}/{TOKEN}

7. Clone the repository:

```
$ git clone https://github.com/PolyFlower/shiba-inu
```

8. Install dependencies:

```
$ npm install
```

9. Create a `.env.dev` file with the following variables:

```
NODE_ENV="development"

TELEGRAM_BOT_TOKEN=""
TELEGRAM_SECRET_TOKEN=""
TELEGRAM_WEBHOOK_ROUTE="/telegramWebhook"
DISCORD_WEBHOOK_ID=""
DISCORD_WEBHOOK_TOKEN=""
PORT=""

NGROK_TOKEN=""
```

> Note: same for production .env, but remove NGROK_TOKEN, also NODE_ENV = "production"

## Usage

To start the application in development mode, run the following command:

> `npm run start:local`

Send voice message in private/channel.
