var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Log In' });
});

router.get('/login', function(req, res, next) {
	res.redirect('/');
});

router.post('/login', function(req, res, next) {
	var user = req.param('user');
	var pswd = req.param('pswd');
	if (user === "n" && pswd === "10")  {
		console.log("Username: " + user + "\nPassword: " + pswd);
		//console.log(req);
		//console.log(res);
		res.render('anotherpage', { title: 'Welcome' });
	}
	else {
		res.redirect('/');
	}
});

router.get('/logout', function(req, res, next) {
	res.render('index', { title: 'Log Out' });
});

module.exports = router;


