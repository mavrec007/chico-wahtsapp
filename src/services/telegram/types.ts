
// telegram/types.ts
export interface TelegramNotification {
  chatId: string;
  message: string;
  parseMode?: 'HTML' | 'Markdown';
}
