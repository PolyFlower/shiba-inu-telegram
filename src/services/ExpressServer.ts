import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import { Inject, Service } from 'typedi';
import { IExpressServer } from '../interfaces/ExpressServer.interface';
import { TelegramBotEx } from './TelegramBotEx';

/**
 * ExpressServer class that implements the IExpressServer interface.
 * Basic express server which listens for POST requests from Telegram
 * @implements {IExpressServer}
 */
@Service()
class ExpressServer implements IExpressServer {
  /**
   * Injects the TelegramBotEx instance.
   * @type {TelegramBotEx}
   * @private
   */
  @Inject()
  private _bot: TelegramBotEx;

  /**
   * The Express application instance.
   * @type {Application}
   * @private
   */
  private _express: Application;

  /**
   * The port number to listen on.
   * @type {Number}
   * @private
   */
  private _port: Number;

  /**
   * Creates an instance of ExpressServer.
   * @param {Number} [port] - The port number to listen on. If not provided, it is read from the `process.env.PORT` environment variable.
   */
  constructor(port?: Number) {
    this._port = port || Number(process.env['PORT']);
    this._express = express();
    this._express.use(express.json());
    process.env['NODE_ENV'] === 'development' ? this._express.use(morgan('dev')) : () => {};
    this._express.post(process.env['TELEGRAM_WEBHOOK_ROUTE'], this.telegramWebhookMiddleware);
  }

  /**
   * Starts the Express server and listens on the specified port.
   * @returns {void}
   */
  listen = (): void => {
    this._express.listen(this._port, () => {
      console.log('Started express server');
    });
  };

  /**
    Handles incoming requests from Telegram webhook
    @param {Object} req - The incoming request object.
    @param {Object} res - The outgoing response object.
    @returns {void}
  */
  private telegramWebhookMiddleware = (req: Request, res: Response): void => {
    /**
     * Validates if the request came from the valid Telegram Bot API.
     * @param header - The Telegram Bot API secret token header.
     * @param token - The Telegram Bot API secret token.
     * @returns True if the token is valid, false otherwise.
     */
    const isValidToken = (header: string | string[] | undefined, token: string): boolean => {
      return header === token;
    };

    const secretToken: string = process.env['TELEGRAM_SECRET_TOKEN'];
    const telegramBotApiHeader: string | string[] | undefined = req.headers['x-telegram-bot-api-secret-token'];

    if (isValidToken(telegramBotApiHeader, secretToken)) {
      this._bot.processUpdate(req.body);
      res.sendStatus(StatusCodes.OK); // equivalent to res.sendStatus(200);
    } else {
      res.sendStatus(StatusCodes.FORBIDDEN); // equivalent to res.sendStatus(403);
    }
  };

  /**
   * Gets the Express application instance.
   * @returns {Application} The Express application instance.
   */
  public get express(): Application {
    return this._express;
  }

  /**
   * @deprecated
   * Use Container.get(TelegramBotEx)
   *
   * Gets the TelegramBotEx instance.
   * @returns {TelegramBotEx} The TelegramBotEx instance.
   */
  public get bot(): TelegramBotEx {
    return this._bot;
  }
}

export { ExpressServer };
