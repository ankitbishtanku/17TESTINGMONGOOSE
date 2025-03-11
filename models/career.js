const mongoose = require('mongoose')
const {userDb} = require('../dbConnection/index')
const Schema = mongoose.Schema;

const careerSchema = new Schema({
	user_id : {
		type: Schema.Types.ObjectId,
		ref : 'User'
	},
	experience : {
		type: 'number'
	},
	jobTitle: {
		type: 'string'
	},
	lastCompanyName: {
		type: 'string'
	}
}, { 
	timestamps: true,
	collection: 'Career'
})

module.exports = Career = userDb.model('Career', careerSchema)