import 'dotenv/config';
import express, { Request, Response } from 'express';
import { TelegramUpdate } from './types/TelegramMessage.js';
import { handleMessage } from './telegramUtils/messageHandler.js';

const app = express();
app.use(express.json());

app.post('/', async (req: Request<TelegramUpdate>, res: Response) => {
	handleMessage(req.body);
	res.sendStatus(200);
});

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, this is a Telegram bot!');
});

app.listen(3000, async () => {
	console.log(`Server running on port 3000`);
});
