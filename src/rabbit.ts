import dotenv from 'dotenv';
import client, { Channel, Connection } from 'amqplib';

dotenv.config();

const LINK = process.env.RABBIT_LINK || '';
const QUEUE = process.env.RABBIT_QUEUE || 'messages';

let channel: Channel | null = null;

const connect = async () => {
	try {
		const connection: Connection = await client.connect(LINK);
		channel = await connection.createChannel();

		await channel.assertQueue(QUEUE);

		console.log('Successfully connected to Rabbit queue!');
	} catch (error) {
		console.error(error);
	}
};

const send = async (message: any) => {
	if (channel) channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)));
};

export { connect, send };
