/**
 * Created by 1nept on 2017-01-12.
 */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import cookie_parser from 'cookie-parser';

import api from './routes';

//server setting
const app = express();
const port = 3000;
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {console.log('Hi mongodb')});
mongoose.connect('mongodb://localhost/ygy');
mongoose.Promise = global.Promise;

app.use(cookie_parser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.set('trust proxy', 1);

//routes api
app.use('/api', api);

//for static files
app.use('/', express.static(path.join(__dirname, './../public')));

//index 라우팅
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.listen(port, () => {
    console.log('I\'m waiting for you :) PORT :', port);
});
























