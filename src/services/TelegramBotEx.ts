import { AttachmentBuilder } from 'discord.js';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { Inject, Service } from 'typedi';
import { ITelegramBoxEx } from '../interfaces/TelegramBoxEx.interface';
import { DiscordWebhook } from './DiscordWebhook';

// interface MessageBasicInfo {
//   chatID: number;
//   replyID: number;
//   username: string;
//   isBot: boolean;
//   date: number;
//   text: string;
// }

// interface ChatBasicInfo {
//   id: number;
//   title: string;
//   type: string;
// }

// interface ForwardedChatBasicInfo {
//   id: number;
//   title: string;
//   username: string;
//   type: ChatType;
// }

// interface VoiceFileBasicInfo {
//   duration: number;
//   mime_type: string;
//   file_id: string;
//   file_unique_id: string;
//   file_size: number;
// }

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
    const chatTitle = msg.chat.title;
    const voiceBuffer = this.getFileStream(msg.voice.file_id);
    const voiceAttachment = new AttachmentBuilder(voiceBuffer, {
      name: `voice_memo.mp3`
    });
    await this._discord.send({
      content: `Источник: ${chatTitle}\n`,
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

  // private getMessageBasicInfo = (msg: Message): MessageBasicInfo => ({
  //   chatID: msg.chat.id,
  //   isBot: msg.from.is_bot,
  //   username: msg.from.username,
  //   replyID: msg.message_id,
  //   date: msg.date,
  //   text: msg.text
  // });

  // private getChatBasicInfo = (msg: Message): ChatBasicInfo => ({
  //   id: msg.chat.id,
  //   title: msg.chat.title,
  //   type: msg.chat.type
  // });

  // private getForwardedChatBasicInfo = (msg: Message): ForwardedChatBasicInfo => ({
  //   id: msg.forward_from_chat.id,
  //   title: msg.forward_from_chat.title,
  //   type: msg.forward_from_chat.type,
  //   username: msg.forward_from_chat.username
  // });

  // private getVoiceFileBasicInfo = (msg: Message): VoiceFileBasicInfo => ({
  //   duration: msg.voice.duration,
  //   mime_type: msg.voice.mime_type,
  //   file_id: msg.voice.file_id,
  //   file_unique_id: msg.voice.file_unique_id,
  //   file_size: msg.voice.file_size
  // });
}

export { TelegramBotEx };
