import { insertIntoDatabase } from '../database/database.js';
import { sendMessage } from './messageSender.js';
export async function addSaving(chatId, text, name) {
    const amount = text.split(' ')[0];
    console.log(amount);
    const description = text?.split(' ').slice(1).join(' ');
    if (amount.startsWith('-')) {
        insertIntoDatabase.run({
            amount: -parseFloat(amount.slice(1)),
            description,
        });
        await sendMessage(chatId, `✅ Saved\\: ${amount.replace('-', '\\-')} for ${description}`);
    }
    else {
        if (isNaN(parseFloat(amount))) {
            await sendMessage(chatId, 'Invalid amount format\\. Please use a number\\.');
            return;
        }
        insertIntoDatabase.run({
            amount,
            description,
        });
        await sendMessage(chatId, `✅ Saved\\: ${amount} for ${description}`);
    }
    console.log(`Received message from ${name}\\: ${text}`);
}
