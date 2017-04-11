
'use strict';

import express from 'express';
import http from 'http';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import cookie_parser from 'cookie-parser';
import connect_memcached from 'connect-memcached';
import oauth2 from './routes/oauth2';
import passport from 'passport';
import configure from './configure';

import api from './routes';

//server setting
const app = express();
const server = http.Server(app);
const io = socket(server);

const port = configure.PORT;
const db = mongoose.connection;
mongoose.connect(configure.MONGO_URL);
mongoose.Promise = global.Promise;

db.on('error', console.error);
db.once('open', () => {console.log('Hi mongodb')});

app.use(cookie_parser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(session({
//     secret: configure.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     signed: true
// }));
app.set('trust proxy', true);

const sessionConfig = {
    secret: configure.SECRET,
    resave: false,
    saveUninitialized: false,
    signed: true
};

if(configure.NODE_ENV === 'production') {
    const MemcachedStore = connect_memcached(session);
    sessionConfig.store = new MemcachedStore({
        hosts : [configure.MEMCACHE_URL]
    });
}
app.use(session(sessionConfig));

//OAuth2
app.use(passport.initialize());
app.use(passport.session());
app.use(oauth2.router);


//routes api
app.use('/api', api);

//index 라우팅
app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

//
app.use('/', express.static(path.join(__dirname, './../public')));

app.use((req,res) => {
    res.status(404).send('NOT FOUND');
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err);
    // If our routes specified a specific response, then send that. Otherwise,
    // send a generic message so as not to leak anything.
    res.status(500).send(err.response || 'Something broke!');
});

io.on('connection', (socket) => {
    console.log('he is coming');
    socket.on('disconnect', () => {
        console.log('he is gone');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log('I\'m waiting for you :) PORT :', port);
    console.log(configure.NODE_ENV, configure.OAUTH2_CALLBACK);
});
























