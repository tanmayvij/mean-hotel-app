var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	level : {
    	type : Number,
    	required : true,
    	min : 1,
    	max : 5
  	},
  	userid : {
    	type : String,
    	required : true,
    	unique: true
  	},
	name : {
    	type : String,
    	required : true
  	},
  	email : {
    	type : String,
    	required : true,
    	unique: true
  	},
  	phone : {
    	type : String,
    	required : true,
    	unique: true
  	},
  	date : {
   		 type : Date,
   		 "default" : Date.now
  	},
  	password : {
    	type : String,
    	required : true
  	}
});
mongoose.model('User', userSchema, 'users');
