import { NextFunction, Response, Router } from 'express';
import { send } from './rabbit';
import { OK } from 'http-status';

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
