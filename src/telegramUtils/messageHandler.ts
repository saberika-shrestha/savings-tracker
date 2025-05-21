import { TelegramUpdate } from '../types/TelegramMessage.js';
import { handleCommands } from './commands.js';
import { addSaving } from './addSaving.js';

export async function handleMessage(update: TelegramUpdate): Promise<void> {
	if (!update.message) {
		console.error('No message found in update');
		return;
	}
	const chatId = update.message.chat.id as number;
	const text = update.message.text as string;
	const name = (update.message.from?.username ||
		update.message.from?.first_name) as string;
	if (!text) {
		console.error('No text found in message');
		return;
	}
	if (text.startsWith('/')) handleCommands(chatId, text);
	else addSaving(chatId, text, name);
}
