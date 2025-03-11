const Schema = require('mongoose').Schema;
const {messageDb} = require('../dbConnection/index')

const dateQuerySchema = new Schema({
	name: {
		type: 'string'
	},
	dateOfBirth: {
		type: 'Date',
		required: true
	},
	isDeleted: {
		type: 'boolean',
		default: false
	}
}, {
	timestamps: true,
	collection: 'dateQuery'
})

module.exports = DateQuery = messageDb.model('DateQuery', dateQuerySchema)