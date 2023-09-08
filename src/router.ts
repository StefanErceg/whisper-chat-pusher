import { OK } from 'http-status';
import { NextFunction, Response, Router } from 'express';

import { send } from './rabbit';
import { writeImage } from './images';
import { RequestWithUserId, authMiddleware } from './middlewares/auth.middleware';

export const router = Router();

// router.use(authMiddleware);

router.post('/message', async (req: RequestWithUserId, res: Response, next: NextFunction) => {
	try {
		const { content, receiver, sender, meta } = req.body || {};
		send({ content, receiver, sender, meta });
		res.status(OK).send();
	} catch (err) {
		next(err);
	}
});

router.post('/logo', async (req: RequestWithUserId, res: Response, next: NextFunction) => {
	try {
		const { encoded } = req.body || {};
		const logoLink = writeImage(encoded);
		res.status(OK).send(logoLink);
	} catch (err) {
		next(err);
	}
});
