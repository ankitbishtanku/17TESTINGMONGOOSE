const mongoose = require('mongoose');
const dbURL = require('../secret/urls').mongoURL1;
const logger = require('../utility/logger')

/**
 * Create a connection to the message database
 *
 * @return {mongoose.Connection} The connection to the message database
 */
function messageDb() {
	try {
		let message = mongoose.createConnection(dbURL).on('connected', () => {
			console.log('messageDb connected', message.readyState)
		})

		return message
	} catch (error) {
		console.error(error.message)
		logger.error({
			level: 'info',
			message: error.stack
		});
	}
}

module.exports = messageDb()