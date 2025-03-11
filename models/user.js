const mongoose = require('mongoose')
const {userDb} = require('../dbConnection/index')
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type : 'string'
	},
	mobileNo: {
		type: 'string'
	},
	isDeleted : {
		type : 'boolean',
		default : false
	}
}, { 
	timestamps: true,
	collection: 'User'
 });

module.exports = User = userDb.model('User', userSchema)