import { Router } from 'express';
import { send } from './rabbit';
import { OK } from 'http-status';

export const router = Router();

router.post('/message', (req, res, next) => {
	try {
		const { content, meta } = req.body || {};
		console.log(content, meta);
		send({ content, meta });
		res.status(OK).send();
	} catch (err) {
		next(err);
	}
});
