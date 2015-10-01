var mongoose=require('mongoose');
var Schema=new mongoose.Schema({
	'firstname':String,
	'lastname':String,
	'email':String,
	'mobile':String
})
module.exports=mongoose.model('userDetails',Schema);