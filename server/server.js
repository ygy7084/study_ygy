/**
 * Created by 1nept on 2017-01-12.
 */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import passport_local from 'passport-local';
import session from 'express-session';
import cookie_parser from 'cookie-parser';

import crypto from 'crypto';

//Auth
let Strategy = passport_local.Strategy;

//express 초기화
const app = express();

//db초기화
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {console.log('mongodb connected')});
mongoose.connect('mongodb://localhost/ygy');
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    title: String,
    content: String,
    time: Date,
    username: String
});
const schema_account = new mongoose.Schema({
    username:String,
    password:String,
    salt:String,
});
let Post = mongoose.model('post',schema);
let Account = mongoose.model('account', schema_account);

passport.use(new Strategy(
    function(username, password, cb) {
        Account.find({username:username},(err,data) => {
            data = data[0];
            if(err) return cb(err);
            if(!data) return cb(null, false);
            if(crypto.createHash('sha512').update(password+data.salt).digest('hex')!==data.password) return cb(null, false);

            return cb(null, data);
        })
    })
);

passport.serializeUser(function(data, cb) {
    cb(null, data.username);
});

passport.deserializeUser(function(username, cb) {
    Account.find({username:username}, function(err, user2) {
        if(err) return cb(err);
        cb(null, user2[0].username);
    })
});


//index 라우팅
app.use('/', express.static(path.join(__dirname, './../public')));


//post 위한 설정

app.use(cookie_parser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('trust proxy', 1);





//글 목록 초기화
app.get('/getList', (req,res) => {
    Post.find({}, (err, data) => {
        res.send(data);
    });
});

//글 상세보기
app.get('/get/:id', (req,res) => {
    Post.find({_id:req.params.id}, (err, data) => {
        if(data == undefined) {
            data = {
                username:'error',
                title:'error',
                content:'error'
            }
        }
        res.send(data[0]);
    });
});

//글 저장
app.post('/save',(req,res) => {
    let post = new Post({
        title : req.body.title,
        content : req.body.content,
        time : new Date(),
        username : req.body.username
    });
    post.save((err,data) => {
        if(err) throw err;
        return res.send(data);
    });
});

app.post('/account/delete', (req,res) => {
    Account.remove({username:req.body.username}, (err) => {
        if(err) throw err;
        else {
            req.logout();
            res.send();
        }
    })
});

app.post('/modify', (req,res) => {
    Post.update({_id:req.body._id},{$set: {title:req.body.title,content:req.body.content}},(err) => {
        if(err) throw err;
        else
            res.send(req.body);
    });
});
app.post('/delete', (req,res) => {
    Post.remove({_id:req.body._id},(err) => {
        if(err) throw err;
        else
            res.send(req.body);
    })
});

app.post('/signup', (req,res) => {
    let salt = Math.round((new Date().valueOf() * Math.random()))+"";
    let encrypted_password = crypto.createHash('sha512').update(req.body.password+salt).digest('hex');

    let account = new Account({
        username : req.body.username,
        password : encrypted_password,
        salt : salt
    });
    Account.find({'username':account.username},(err,data) => {
        if(err) throw err;
        if(data.length != 0) {
            res.send('같은 아이디가 있습니다.');
        } else {
            account.save(err => {
                if(err) throw err;
                return res.send('success');
            })
        }
    });
});

app.post('/login', (req,res,next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err || !user) {
            return res.send('에러가 있습니다');
        } else {
            req.login(user,(err) => {
                if(err)
                    return next(err);
                else
                    return res.send('success');
            })
        }
    })(req,res,next);
});

app.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

app.get('/auth', (req,res) => {
    res.send(req.user);
});


app.listen(3000,function(){console.log('Server');});
























