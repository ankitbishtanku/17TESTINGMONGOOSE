const user = require('../models/user')
const logger = require('../utility/logger')
const token = require('../utility/token')
const compressedData = require('../utility/compressedData')

module.exports = {
	userLogin: async (req, res, next) => {
		try {
			let { name, mobileNo } = req.body
			let isExist = await user.findOne({ name, mobileNo })
			if (!isExist) {
				return res.status(400).json({
					success: false,
					message: "user not found",
					result: null
				})
			} else {
				let data = await token.createJwt({
					forUser: true,
					data: isExist
				})
				console.log(data, "token")
				console.log(compressedData.getStringSizeInKB(data), "token in kb")
				let compressed = await compressedData.compressData2(data)
				return res.status(200).json({
					success: true,
					message: "token created successfully",
					result: compressed.toString('base64')
				})
			}
		} catch (error) {
			logger.error({
				level: 'info',
				message: error.stack
			});

			return res.status(400).json({
				success: false,
				message: "something went wrong",
				result: Date.now()
			})
		}
	}
}