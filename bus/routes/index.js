var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser')
 
var app = express()

app.use(cookieParser())
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Log In' });
});

//app.get('/', function(req, res, next) {
//	res.send(req.cookies.name);
//});

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

app.post('/login',function(req, res){
     res.cookie( 'name', req.param.user)
     	.send('Cookie is set');
});

router.get('/logout', function(req, res, next) {
	res.render('logout', { title: 'Log Out' });
});


module.exports = router;


