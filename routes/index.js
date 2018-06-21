var express = require('express');
var router = express.Router();

var isLogged = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect('/');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Main Page' , user: req.user});
});
/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('pages/about', {title: 'About', user: req.user});
});
/* GET logout */
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/')
});
/* GET profile page. */
router.get('/profile', isLogged, function(req, res, next) {
  res.render('pages/profile', {title: 'Profile', user: req.user, isTwitter: false, isFacebook:false});
});

module.exports = router;
