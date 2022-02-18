import path from "path";
import express from "express";
import { fileURLToPath } from 'url';
var app = express(); // create express app

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from "express-session";
import connectStore from "connect-mongo";

import userRoutes from './routes/user.js';
import noteRouter from './routes/notes.js';
import awsRouter from './routes/aws.js';
import sessionRouter from './routes/session.js';

const MongoStore = connectStore(session);

dotenv.config();

console.log(dotenv.config());

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('MongoDB connected');
	} catch (err) {
		console.log(err)
	}
})();


// start express server on port 5000
app.listen(5000, () => {
	console.log("server started on port 5000");
});

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../public')));

// app.use(express.static('public'))

// parse application/json
app.use(bodyParser.json());

//use mongo session
app.use(session({
	name: process.env.SESS_NAME,
	secret: process.env.SESS_SECRET,
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'session',
		ttl: parseInt(process.env.SESS_LIFETIME) / 1000
	}),
	cookie: {
		sameSite: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: parseInt(process.env.SESS_LIFETIME)
	}
}));

// Handle auth failure error messages
app.use(function (req, res, next) {
	if (req && req.query && req.query.error) {
		req.flash('error', req.query.error);
	}
	if (req && req.query && req.query.error_description) {
		req.flash('error_description', req.query.error_description);
	}
	next();
});

app.use('/', noteRouter);
//AWS Endpoints
app.use('/', awsRouter);

app.use('/users', userRoutes);
app.use('/session', sessionRouter);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	console.log(path.resolve(__dirname, '../public', 'index.html'));
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// // Catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	const err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

export default app;

