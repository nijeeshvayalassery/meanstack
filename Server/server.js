var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();    

router.route('/user').post(function(req, res) {

    var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/UserReg');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	  // yay!
	});
	/*var kittySchema = mongoose.Schema({
	    name: String
	});
	var Kitten = mongoose.model('Kitten', kittySchema);
	var silence = new Kitten({ name: 'Syam' });*/
	var Bear     = require('./model');
	var UserIns=new Bear();
	for(var attr in req.body){
		UserIns[attr]=req.body[attr];
	}

	//UserIns.firstname=req.body.firstname;
	console.log(req.body.firstname)
	UserIns.save(function (err, data) {
		if(err){
			res.json({ 
  				'success':false
  			});
		}else{
	  		res.json({ 
	  			'success': true,
	  			'id':data._id
	  		});
		}
	});
}).get(function(req,res){
	res.json({ message: 'Got a Get' });
})

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);