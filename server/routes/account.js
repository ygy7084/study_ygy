import express from 'express';
import Account from '../models/account';
import passport from 'passport';
import passport_local from 'passport-local';
import crypto from 'crypto';

const router = express.Router();

//Auth
let Strategy = passport_local.Strategy;

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

router.use(passport.initialize());
router.use(passport.session());

//Routes
router.get('/auth', (req,res) => {
    //If user is not stored in session, it will return undefined.
    if(!req.user) {
        return res.json({username:null});
    }
    else {
        let expire_time = 300000;// 5min
        req.session.cookie.expires = new Date(Date.now() + expire_time);
        req.session.cookie.maxAge = expire_time;
        // If user connect again within 5min from last connection,
        // the expiration time is renewed.
        return res.json({username: req.user});
    }
});

router.post('/login', (req,res,next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err || !user) {
            return res.status(401).json({
                error : 'LOGIN FAILED',
                code : 1
            });
        } else {
            req.login(user,(err) => {
                if(err) {
                    return res.status(401).json({
                        error : 'LOGIN FAILED',
                        code : 1
                    });
                }
                else
                    return res.json({success : true});
            })
        }
    })(req,res,next);
});

router.get('/logout', (req,res) => {

    try {
        req.logout();
        return res.json({success : true});
    } catch(error) {
        return res.json({
            success : false,
            error
        });
    }
});

router.post('/signup', (req,res) => {
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
            return res.json({success : false});
        } else {
            account.save(err => {
                if(err) throw err;
                return res.json({success : true});
            });
        }
    });
});
router.delete('/remove', (req,res) => {
    Account.remove({username:req.body.username}, (err) => {
        if(err) throw err;
        else {
            try {
                req.logout();
                return res.json({success:true});
            }catch(e) {
                console.log(e);
                return res.json({success:false});
            }
        }
    })
});

export default router;