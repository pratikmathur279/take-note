import express from "express";
import Joi from "joi";

import User from "../model/user.js";
import { signIn } from "../validations/user.js";
import { parseError, sessionizeUser } from "../util/helpers.js";

const sessionRouter = express.Router();

//CHECK IF USER IS LOGGED IN
sessionRouter.get("", ({ session: { user } }, res) => {
	res.send({ user });
});

// SESSION LOGIN
sessionRouter.post("", async (req, res) => {
	console.log(req.body);
	try {
		const { email, password } = req.body
		await Joi.validate({ email, password }, signIn);
		const user = await User.findOne({ email });
		if (user && user.comparePasswords(password)) {
			const sessionUser = sessionizeUser(user);
			req.session.user = sessionUser
			res.send(sessionUser);
		} else {
			throw new Error('Invalid login credentials');
		}
	} catch (err) {
		res.status(401).send(parseError(err));
	}
});


// SESSION LOGOUT
sessionRouter.delete("", ({ session }, res) => {
	try {
		const user = session.user;
		if (user) {
			session.destroy(err => {
				if (err) throw (err);
				res.clearCookie(process.env.SESS_NAME);
				console.log(user);
				res.send(user);
			});
		} else {
			throw new Error('Something went wrong');
		}
	} catch (err) {
		res.status(422).send(parseError(err));
	}
});



export default sessionRouter;