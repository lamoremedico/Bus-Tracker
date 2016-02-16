var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser')
 
var app = express()

app.use(cookieParser())
 
app.get('/cookie',function(req, res){
     res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
});

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
	if (user === "namore" && pswd === "200192")  {
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
	res.render('logout', { title: 'Log Out' });
});


module.exports = router;


