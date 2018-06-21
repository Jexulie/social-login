var express = require('express');
var passport = require('passport');
var router = express.Router();

require('../config/passport-google')(passport);
require('../config/passport-twitter')(passport);

/* Twitter Auth */
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/redirect', 
            passport.authenticate('twitter', { failureRedirect: '/' }), 
            function(req, res, next) {
    res.render('pages/profile', {title: 'Profile', user: req.user, isTwitter: false, isFacebook:false})
});

/* Google Auth */
router.get('/google', passport.authenticate('google' , { scope:['profile']}));

router.get('/google/redirect', passport.authenticate('google',  { failureRedirect: '/' }), function(req, res, next){
    res.render('pages/profile', {title: 'Profile', user: req.user, isTwitter: false, isFacebook:false})
});

module.exports = router;