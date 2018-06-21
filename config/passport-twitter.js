var TwitterStrategy = require('passport-twitter').Strategy;
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
    return passport.use(new TwitterStrategy({
        consumerKey: keys.twitter.consumerKey,
        consumerSecret: keys.twitter.consumerSecret,
        callbackURL: "/auth/twitter/redirect"
    }, function(token, tokenSecret, profile, done){
        console.log(profile)
        User.findOne({id: profile.id})
            .then(curUser => {
                if(curUser){
                    done(null, curUser)
                }else{
                    new User({id: profile.id, name:profile.displayName, avatar: profile._json.profile_image_url})
                        .save()
                        .then(newUser => done(null, newUser))
                        .catch(err => done(err, null))
                }
            })
            .catch(err => done(err, null))
    }));
}
