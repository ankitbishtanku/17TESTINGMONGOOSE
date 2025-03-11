const jwt = require('jsonwebtoken')
const user = require('../models/user')
const logger = require('../utility/logger')
const token = require('../utility/token')
const http = require('http')
const compressedData = require('../utility/compressedData')
const { Buffer } = require('buffer')

module.exports = {
	userLoginMiddleware: async (req, res, next) => {
		try {
			console.log(req.headers)
			let compressed = req.headers.authkey ? req.headers.authkey : req.query.authkey || req.headers.authorization.split(" ")[1]
			console.log(compressed, "data")
			console.log(compressedData.getStringSizeInKB(compressed))
			let bufferForm = Buffer.from(compressed, 'base64')
			let decompressToken = await compressedData.decompressData2(bufferForm)
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
					logger.info("successfully verify user")
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
