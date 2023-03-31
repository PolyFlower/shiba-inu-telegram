import { Application } from 'express';
import { TelegramBotEx } from '../services/TelegramBotEx';

interface IExpressServer {
  listen(): void;
  express: Application;
  bot: TelegramBotEx;
}

export { IExpressServer };
