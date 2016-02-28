var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser')
 
var app = express()

app.use(cookieParser())
 

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Current Cookie = " + req.cookies.name)
  if (req.cookies.name != null) {
  	res.render('anotherpage', {title: 'Welcome'});
  	}
  	else {
  res.render('index', { title: 'Log In' });
     }
});

// GET Login page but if no cookies redirect to home page
router.get('/login', function(req, res, next) {
	if (req.cookies.name != null) {
  	res.render('anotherpage', {title: 'Welcome'});
  }
  	else {
	res.redirect('/');
   }
});

//If login info is valid - send to next page
router.post('/login', function(req, res, next) {
	var user = req.param('user');
	var pswd = req.param('pswd');
	if (user === "namore" && pswd === "200192")  {
		console.log("Username: " + user + "\nPassword: " + pswd);
		res.cookie( 'name', user, { expires: new Date(Date.now() + 900000)})
		console.log("Cookie = " + user);
		res.render('anotherpage', { title: 'Welcome' });
	}
	else {
		res.redirect('/');
	}
});

router.get('/logout', function(req, res, next) {
	res.clearCookie('name')
	res.render('logout', { title: 'Log Out' });
});

//Bus's being configured
router.get('/buserror', function(req, res, next) {
	res.render('buserror', { title: 'Bus Maintenence' });
});


module.exports = router;


