const mongoose = require('mongoose');
const dbURL = require('../secret/urls').mongoURL;
const logger = require('../utility/logger')

/**
 * Establishes a connection to the user database.
 *
 * @return {mongoose.Connection} The established connection to the user database.
 * Logs the connection status upon successful connection.
 * In case of an error, logs the error message and stack trace.
 */
function userDb() {
	try {
		let user = mongoose.createConnection(dbURL).on('connected', () => {
			console.log('userDb connected', user.readyState)
		});

		return user
	} catch (error) {
		console.error(error)
		logger.error({
			level: 'info',
			message: error.stack
		});
	}
}

module.exports = userDb()