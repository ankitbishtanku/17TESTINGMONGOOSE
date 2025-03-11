const jwt = require('jsonwebtoken');
const secret = require('../secret/urls').secretKey;
const logger = require('./logger')

module.exports = {
	/**
	 * Creates a jwt token from the given data
	 * @param {Object} data the data to be encrypted into the token
	 * @returns {String} the jwt token
	 * @throws {Error} if there is an error generating the token
	 */
	createJwt: async (data) => {
		try {
			let expires = '24h'
			let token = await jwt.sign(data, secret, {
				expiresIn: expires
			})
			return token

		} catch (error) {
			logger.error({
				level: 'info',
				message: error.stack,
			});
		}
	},
	/**
	 * Verifies a jwt token and returns the decrypted data
	 * @param {String} data the jwt token to be verified
	 * @returns {Object} the decrypted data
	 * @throws {Error} if there is an error verifying the token
	 */
	verifyToken: async (data) => {
		try {
			let resp = {}
			let verifyData = await jwt.verify(data, secret, (err, decoded) => {
				if (err) {
					resp.success = false,
					resp.result = err
				}
				resp.success = true,
				resp.result = decoded
			})
			return resp
		} catch (error) {
			logger.error({
				level: 'info',
				message: error.stack,
			});
		}
	}
}

