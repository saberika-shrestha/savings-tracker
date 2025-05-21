import {
	getAllSavings,
	getSavingsByMonth,
	deleteSavingsByMonth,
} from '../database/database.js';
import { Saving } from '../types/savings.js';
import { sendMessage } from './messageSender.js';
import {
	formatMessageAllMonths,
	formatMessageByMonth,
} from './messageFormatter.js';
import { monthAbbrevToNumber } from '../types/savings.js';

export function handleCommands(chatId: number, text: string) {
	const command = text.split(' ')[0].toLowerCase();
	switch (command) {
		case '/help':
			return `Available commands:
        /list - List all savings
        /get <month> - Get savings for a specific month
        /clear <month> - Clear savings for a specific month`;
		case '/list':
			return sendMessage(chatId, listSavings());
		case '/get':
			return sendMessage(chatId, listSavingsMonth(text));
		case '/clear':
			return sendMessage(chatId, removeSavingsByMonth(text));
		default:
			return sendMessage(chatId, `Unknown command\\: ${command}`);
	}
}

function listSavings() {
	const entries = getAllSavings.all() as Saving[];
	const formatted = formatMessageAllMonths(entries);
	if (!formatted || formatted.trim().length === 0) return 'No savings found\\.';
	return `${formatted}`;
}

function listSavingsMonth(text: string) {
	const month = text.split(' ')[1];
	if (!month) return 'Please provide a month\\.';
	if (month.length < 3) return 'Please provide a valid month\\.';
	if (month.length > 3) return 'Please provide a month in short format\\.';
	if (!/^[a-zA-Z]+$/.test(month)) return 'Please provide a valid month\\.';
	const monthNumber = monthAbbrevToNumber[month];
	const entries = getSavingsByMonth.all({ month: monthNumber }) as Saving[];
	const formatted = formatMessageByMonth(monthNumber, entries);
	return `${formatted}`;
}

function removeSavingsByMonth(text: string) {
	const month = text.split(' ')[1];
	if (!month) return 'Please provide a month\\.';
	if (month.length < 3) return 'Please provide a valid month\\.';
	if (month.length > 3) return 'Please provide a month in short format\\.';
	if (!/^[a-zA-Z]+$/.test(month)) return 'Please provide a valid month\\.';
	const monthNumber = monthAbbrevToNumber[month];
	const result = deleteSavingsByMonth.run({ month: monthNumber });
	if (result.changes === 0) {
		return `No savings found for month ${text.split(' ')[1]}`;
	}
	return `✅ Cleared savings for month ${text.split(' ')[1]}`;
}
