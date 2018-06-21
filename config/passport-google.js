var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
var keys = require('./keys');
var User = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    User.findById({_id: id}).then(user => done(null,user))
});

module.exports = function(passport){
    return passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    }, function(accessToken, refreshToken, profile, done){
        User.findOne({id: profile.id})
            .then(curUser => {
                if(curUser){
                    done(null, curUser)
                }else{
                    new User({id: profile.id, name:profile.displayName, avatar: profile._json.image.url})
                        .save()
                        .then(newUser => done(null, newUser))
                        .catch(err => done(err, null))
                }
            })
            .catch(err => done(err, null))
    }));
}