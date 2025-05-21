import 'dotenv/config';
import express from 'express';
import { handleMessage } from './telegramUtils/messageHandler.js';
const app = express();
app.use(express.json());
app.post('/', async (req, res) => {
    handleMessage(req.body);
    res.sendStatus(200);
});
app.get('/', (req, res) => {
    res.send('Hello, this is a Telegram bot!');
});
app.listen(3000, async () => {
    console.log(`Server running on port 3000`);
});
