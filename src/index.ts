import fs from 'fs';
import cors from 'cors';
import https from 'https';
import dotenv from 'dotenv';
import express from 'express';

import { router } from './router';
import { connect } from './rabbit';

dotenv.config();

const app = express();
const port = process.env.PORT;
const version = process.env.VERSION;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/${version}`, router);

https
	.createServer(
		{
			key: fs.readFileSync('cert/key.pem'),
			cert: fs.readFileSync('cert/cert.pem'),
		},
		app
	)
	.listen(port, () => {
		console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
	});

//connect to RabbitMQs
connect();
