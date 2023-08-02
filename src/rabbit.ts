import dotenv from 'dotenv';
import client, { Channel, Connection } from 'amqplib';

dotenv.config();

const LINKS = process.env.RABBIT_LINKS || '';
const QUEUE = process.env.RABBIT_QUEUE || 'messages';

let channels: Channel[] = [];
let currentIndex = 0;

const connectQueue = async (link: string) => {
	try {
		const connection: Connection = await client.connect(link);
		const channel = await connection.createChannel();

		await channel.assertQueue(QUEUE);

		channels.push(channel);

		console.log(`Successfully connected to RabbitMQ ${link}!`);
	} catch (error) {
		console.error(error);
	}
};

const connect = () => {
	const links = LINKS.split(',');
	links.forEach((link) => connectQueue(link));
};

const send = async (message: any) => {
	if (channels.length) {
		let sent = false;
		do {
			try {
				currentIndex = (currentIndex + 1) % channels.length;
				sent = channels[currentIndex]?.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)));
			} catch (error) {
				console.error(error);
			}
		} while (!sent);
	}
};

export { connect, send };
