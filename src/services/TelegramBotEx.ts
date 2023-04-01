import { AttachmentBuilder } from 'discord.js';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { Inject, Service } from 'typedi';
import { ITelegramBoxEx } from '../interfaces/TelegramBoxEx.interface';
import { DiscordWebhook } from './DiscordWebhook';

@Service()
class TelegramBotEx extends TelegramBot implements ITelegramBoxEx {
  @Inject()
  private _discord: DiscordWebhook;

  constructor() {
    super(process.env['TELEGRAM_BOT_TOKEN'], { webHook: true });
    this.addListener('voice', this.voiceNoteHandler);
  }

  public async voiceNoteHandler(msg: Message): Promise<void> {
    const userAvatarURL = await this.getUserAvatar(msg);
    const username = msg.from.username;
    const voiceBuffer = this.getFileStream(msg.voice.file_id);
    const voiceAttachment = new AttachmentBuilder(voiceBuffer, {
      name: `voice_memo.mp3`
    });
    await this._discord.send({
      files: [voiceAttachment],
      avatarURL: userAvatarURL,
      username: username
    });
  }

  private getUserAvatar = async (msg: Message): Promise<string> => {
    const userProfilePhotos = await this.getUserProfilePhotos(msg.from.id);
    const fileId = userProfilePhotos.photos[0][0].file_id;
    return await this.getFileLink(fileId);
  };
}

export { TelegramBotEx };
