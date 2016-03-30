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
	res.render('buserror', { title: 'Bus Maintenance' });
});

//To page for bus driver to send in location
router.get('/driver', function(req, res) {
	if (req.cookies.name != null) {
  	res.render('busdriver', {title: 'Sending Bus Location'});
  }
  	else {
	res.redirect('/');
   }
});

//To page tracking Bus #27
router.get('/bus27', function(req, res, next) {

//Initially going to be the parser for the kml file

/*var fs = require('fs'),
	xml2js = require('xml2js');
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/../data/Bus27route.kml.xml', function(err, data) {
	parser.parseString(data, function(err, result) {
		console.log(result);
		console.log('Done');
	});

});
*/
	res.render('bus27', { title: 'Bus #27 Tracking' });
});



module.exports = router;


