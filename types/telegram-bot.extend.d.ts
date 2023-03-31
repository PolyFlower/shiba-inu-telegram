import 'node-telegram-bot-api';

declare module 'node-telegram-bot-api' {
  interface SetWebHookOptions {
    drop_pending_updates?: boolean;
    secret_token?: string;
  }
}
