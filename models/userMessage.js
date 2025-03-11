const Schema = require('mongoose').Schema;
const {messageDb} = require('../dbConnection/index')
const user = require('./user')
const career = require('./career')

const messageSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: user
	},
	career_id: [{
		type: Schema.Types.ObjectId,
		ref: career
	}],
	messages: {
		type: ['String']
	}
}, { timestamps: true })

module.exports = Message = messageDb.model('Message', messageSchema)