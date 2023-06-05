import dotenv from 'dotenv';
import { UNAUTHORIZED } from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const secret = process.env.JWT_SECRET || '';

export interface RequestWithUserId extends Request {
	userId?: string;
}

export const verifyJwt = (token: string) => {
	try {
		return jwt.verify(token, secret) as JwtPayload;
	} catch {
		return null;
	}
};

export const authMiddleware = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
	try {
		const accessToken = req.cookies.access_token || '';
		const decoded = verifyJwt(accessToken);

		if (!decoded) return res.status(UNAUTHORIZED).send('Please login!');

		const { userId = '' } = decoded;
		req.userId = userId;

		next();
	} catch (err) {
		console.error(err);
		return res.status(UNAUTHORIZED).send('Invalid token!');
	}
};
