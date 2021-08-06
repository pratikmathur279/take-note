import express from 'express';
const userRouter = express.Router();
import Joi from 'joi';

import User from '../model/user.js';
import { signUp } from '../validations/user.js';
import { parseError, sessionizeUser } from "../util/helpers.js";


//CREATE NEW USER
userRouter.post("", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		await Joi.validate({ username, email, password }, signUp);
		const newUser = new User({ username, email, password });
		await newUser.save();

		const sessionUser = sessionizeUser(newUser);
		req.session.user = sessionUser;
		res.send(sessionUser);
	} catch (err) {
		res.status(400).send(parseError(err));
	}
});

export default userRouter;
