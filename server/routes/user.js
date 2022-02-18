import express from 'express';
const userRouter = express.Router();
import Joi from 'joi';

import User from '../model/user.js';
import { signUp } from '../validations/user.js';
import { parseError, sessionizeUser } from "../util/helpers.js";

import sharp from 'sharp';

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

//Update User
userRouter.post("/edit", async (req, res) => {
	try {
		console.log(req.body.email) //console like this

		User.update({ email: req.body.email }, { $set: req.body }, function (err) {
			if (err) console.log(err);
			res.status(200).send(req.body);
		});
	} catch (err) {
		res.status(400).send(parseError(err));
	}
});

//Get User
userRouter.get("/", async (req, res) => {
	try {
		console.log(req.session.user) //console like this
		let email = req.session.user.email;

		const user = await User.findOne({ email });
		console.log(user);
		res.send(user);

	} catch (err) {
		res.status(400).send(parseError(err));
	}
});

//upload user profile picture
userRouter.post("/primaryPhoto", async (req, res) => {
	try {
		let user = req.session.user;

		let originalImg = req.body.img64;
		let cropData = req.body.cropData;

		let outputImage = user.username + '.jpg';

		const uri = originalImg.split(';base64,').pop();

		let imgBuffer = Buffer.from(uri, 'base64');

		sharp(imgBuffer).extract({ width: cropData.width, height: cropData.height, left: cropData.x, top: cropData.y }).toFile('../public/uploads/photos/' + outputImage)
			.then(function (new_file_info) {
				console.log("Image cropped and saved");
				console.log(new_file_info);
				User.update({ email: user.email }, { primaryPhoto: outputImage }, function (err) {
					if (err) console.log(err);
					res.status(200).send(user);
				});
			})
			.catch(function (err) {
				console.log("An error occured");
			});

	} catch (err) {
		console.log(err);
	}
});

export default userRouter;
