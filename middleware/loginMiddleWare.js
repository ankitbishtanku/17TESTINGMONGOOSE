const jwt = require('jsonwebtoken')
const user = require('../models/user')
const logger = require('../utility/logger')
const token = require('../utility/token')
const http = require('http')
const compressedData = require('../utility/compressedData')
const { Buffer } = require('buffer')

module.exports = {
	/**
	 * @description - Middleware to authenticate a user based on a compressed JWT token.
	 * It extracts the token from request headers or query parameters, decompresses it,
	 * and verifies the token. If the token is valid, it retrieves the user from the database
	 * and attaches the user data to the request object for further use.
	 * @param {Object} req - The request object containing headers and query parameters.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating failure if the token is invalid
	 * or an error occurs.
	 *  - If the token is valid, it calls the next middleware.
	 *  - If an error occurs or the token is invalid, it returns a 400 status with an error message.
	 */
	userLoginMiddleware: async (req, res, next) => {
		try {
			let compressed = req.headers.authkey ? req.headers.authkey : req.query.authkey || req.headers.authorization.split(" ")[1]
			// console.log(compressed, "data")
			// console.log(compressedData.getStringSizeInKB(compressed))
			let bufferForm = Buffer.from(compressed, 'base64')
			let decompressToken = await compressedData.decompressData(bufferForm)
			let verify = await token.verifyToken(decompressToken)
			if (verify.success === true) {
				let User = await user.findOne({ _id: verify.result._id })
					if (!user) {
						return res.status(400).json({
							success: false,
							message: "something went wrong",
							result: null
						})
					}
					req.body.userData = verify
					next()
			}else {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			}

		} catch (error) {
			logger.error({
				level: 'error',
				message: error.stack
			});

			return res.status(400).json({
				success: false,
				message: "something went wrong",
				result: null
			})
		}
	}
}
