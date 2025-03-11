const mongoose =  require('mongoose');
const dbURL = require('../secret/urls').mongoURL1;

	function messageDb() {
		try{
			let message = mongoose.createConnection(dbURL).on('connected', () => {
				console.log('messageDb connected', message.readyState)
			})

			return message
		}catch(error){
			console.error(error.message)
		}
	}

module.exports = messageDb()