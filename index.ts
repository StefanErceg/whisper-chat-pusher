import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './router';

dotenv.config();

const app = express();
const port = process.env.PORT;
const version = process.env.VERSION;

app.use(`/api/${version}`, router);

app.get('/', (req: Request, res: Response) => {
	res.send('Whisper chat pusher');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
