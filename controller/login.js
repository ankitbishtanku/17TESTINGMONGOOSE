const user = require('../models/user')
const logger = require('../utility/logger')
const token = require('../utility/token')
const compressedData = require('../utility/compressedData')

module.exports = {
	/**
	 * @description - This function is used to login a user.
	 * It will check if the user exists or not in the database.
	 * If the user exists it will create a jwt token and return it to the user.
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the user is successfully logged in, it returns a 200 status with the jwt token.
	 *  - If the user is not found, it returns a 400 status with an appropriate error message.
	 *  - If an error occurs, it returns a 400 status with an appropriate error message.
	 */
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
				// console.log(data, "token")
				// console.log(compressedData.getStringSizeInKB(data), "token in kb")
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