import fs from 'fs';
import { v4 as uuid } from 'uuid';

export const writeImage = (data: string) => {
	// Extract the content type (e.g., 'image/png') and base64 data
	const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

	if (!matches || matches.length !== 3) {
		throw new Error('Invalid base64 data format');
	}

	const base64String = matches[2];

	// Decode the base64 data to binary
	const binaryData = Buffer.from(base64String, 'base64');

	const name = uuid();

	const fileName = `${name}.png`;
	const filePath = `assets/${fileName}`;

	// Write the binary data to the file
	fs.writeFileSync(filePath, binaryData);

	return fileName;
};
