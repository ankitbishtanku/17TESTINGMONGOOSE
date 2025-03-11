const jwt = require('jsonwebtoken');
const secret = require('../secret/urls').secretKey;
const logger = require('./logger')

module.exports = {
	createJwt: async(data) => {
		try{
			let expires = '24h'
			let token = await jwt.sign(data, secret, {
				expiresIn: expires
			})
			return token
			
		}catch(error){
			logger.error({
  				level: 'info',
  				message: error.stack,
			});
		}
	},
	verifyToken: async(data) => {
		try{
			let resp = {}
			let verifyData = await jwt.verify(data, secret, (err, decoded)=> {
				if(err){
					resp.success = false,
					resp.result = err
				}
				resp.success = true,
				resp.result = decoded
			})
			return resp
		}catch(error){
			logger.error({
  				level: 'info',
  				message: error.stack,
			});
		}
	}
}

