var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
	var user = req.param('user');
	var pswd = req.param('pswd');
	if (user === "n" && pswd === "10")  {
		res.render('anotherpage', { title: 'Welcome' });
	}
	else {
		res.redirect('/');
	}
});

module.exports = router;


