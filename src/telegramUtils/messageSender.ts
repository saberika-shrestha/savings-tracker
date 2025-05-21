import 'dotenv/config';
import axios from 'axios';

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

export async function sendMessage(chatId: number, text: string) {
	try {
		const response = await axios.post(`${TELEGRAM_API}/sendMessage`, {
			chat_id: chatId,
			text: text,
			parse_mode: 'MarkdownV2',
		});
		return response.data;
	} catch (error) {
		console.error('Error sending message:', error);
		throw error;
	}
}
