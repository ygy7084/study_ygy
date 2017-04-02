'use strict';

import express from 'express';
import configure from '../configure';
import passport from 'passport';
import passport_google_oauth20 from 'passport-google-oauth20';

function extractProfile(profile) {
    let imageUrl = '';
    if(profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id : profile.id,
        displayName : profile.displayName,
        image : imageUrl
    };
}
let GoogleStrategy = passport_google_oauth20.Strategy;
passport.use(new GoogleStrategy({
        clientID : configure.OAUTH2_CLIENT_ID,
        clientSecret : configure.OAUTH2_CLIENT_SECRET,
        callbackURL : configure.OAUTH2_CALLBACK,
        accessType : 'offline'
    }, (accessToken, refreshToken, profile, cb) => {

        cb(null, extractProfile(profile));
    })
);
passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null ,obj);
});
// [END setup]

const router = express.Router();

// [START middleware]
function authRequired(req, res, next) {
    if (!req.user) {
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/auth/login');
    }
    next();
}
function addTemplateVariables(req, res, next) {
    res.locals.profile = req.user;
    res.locals.login = `/auth/login?return=${encodeURIComponent((req.originalUrl))}`;
    res.locals.logout = `/auth/logout?return=${encodeURIComponent((req.originalUrl))}`;
    next();
}
// [END middleware]

// [START authorize]
router.get('/auth/login',(req, res, next) => {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
    },
    passport.authenticate('google', { scope : ['email', 'profile'] })
);
router.get('/auth', (req,res) => {
    //If user is not stored in session, it will return undefined.
    if(!req.user) {
        return res.json({profile:null});
    }
    else {
        // If user connect again within 5min from last connection,
        // the expiration time is renewed.
        return res.json({profile: req.user});
    }
});

//[END authorize]

//[START callback]
router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req,res) => {
        const redirect = req.session.oauth2return || '/';
        delete req.session.oauth2return;
        res.redirect(redirect);
    }
);
//[END callback]

router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

export default {
    extractProfile : extractProfile,
    router : router,
    required : authRequired,
    template : addTemplateVariables
};

