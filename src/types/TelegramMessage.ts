interface TelegramMessage {
	message_id?: number;
	from?: {
		id: number;
		is_bot: boolean;
		first_name: string;
		username?: string;
		language_code?: string;
	};
	chat: {
		id: number;
		first_name: string;
		username?: string;
		type: string;
	};
	date?: number;
	text?: string;
}

export interface TelegramUpdate {
	update_id: number;
	message?: TelegramMessage;
}
