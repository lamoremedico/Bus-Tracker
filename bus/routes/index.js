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
router.get('/home', function(req, res, next) {
	if (req.cookies.name != null) {
  	res.render('anotherpage', {title: 'UA Bus Tracker Home'});
  }
  	else {
	res.redirect('/');
   }
});

//If login info is valid - send to next page
router.post('/home', function(req, res, next) {
	var user = req.param('user');
	var pswd = req.param('pswd');
	if (user === "namore" && pswd === "200192")  {
		console.log("Username: " + user + "\nPassword: " + pswd);
		res.cookie( 'name', user, { expires: new Date(Date.now() + 9000000)})
		console.log("Cookie = " + user);
		res.render('anotherpage', { title: 'UA Bus Tracker Home' });
	}
	else {
		res.redirect('/');
	}
});

router.get('/logout', function(req, res, next) {
	res.clearCookie('name')
	res.render('index', { title: 'Log In' });
});

//Bus's being configured
router.get('/feedback', function(req, res, next) {
	if (req.cookies.name != null) {
		res.render('feedback', { title: 'Feedback' });
	}
  	else {
		res.redirect('/');
   }
});

//To page for bus driver to send in location
router.get('/driverlogin', function(req, res) {
	if (req.cookies.name != null) {
  		res.render('busdriverlogin', {title: 'Bus Driver Login'});
  }
  	else {
		res.redirect('/');
   }
});

//To page tracking Bus #27
router.get('/bus22', function(req, res, next) {

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
	res.render('bus22', { title: 'Bus #22 Tracking' });
	//doesntwork  res.sendFile('/views/googlemap.html');
});

router.post('/driver', function(req, res, next) {
	var key = req.param('bus_key');
	if (key === "2222")  {
		console.log("Bus Key: " + key);
		res.cookie( 'name', key, { expires: new Date(Date.now() + 9000000)})
		console.log("Cookie = " + key);
		res.render('busdriver', {title: 'Sending Bus Location'});
	}
	
});



module.exports = router;


