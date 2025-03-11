const mongoose =  require('mongoose');
const dbURL = require('../secret/urls').mongoURL;


function userDb() {
		try{
			let user = mongoose.createConnection(dbURL).on('connected', () => {
				console.log('userDb connected', user.readyState)
			});

			return user
		}catch(error){
			console.error(error)
		}
}

module.exports = userDb()