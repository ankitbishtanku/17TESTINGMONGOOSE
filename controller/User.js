const User = require('../models/user');
const logger = require('../utility/logger')

module.exports = {
	/**
	 * @description - This function creates a new user object.
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the user is successfully created, it returns a 201 status with the newly created user object.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	createUser: async (req, res, next) => {
		try {
			let { name, mobileNo } = req.body;
			console.log(req.body)
			let newUser = await User.create({ name, mobileNo })
			if (!newUser) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(201).json({
					success: true,
					message: "successfully created",
					result: newUser
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
	},
	/**
	 * @description - This function retrieves a user object by its id.
	 * @param {Object} req - The request object, containing the URL parameters.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating the success or failure of the operation.
	 *  - If the user is successfully retrieved, it returns a 200 status with the user object.
	 *  - If no user is found, it returns a 400 status with an error message.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	getUser: async (req, res, next) => {
		try {
			let { _id } = req.params

			let user = await User.findOne({ _id }).lean()
			if (!user) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully get data",
					result: user
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
	},
	/**
	 * @description - This function adds a new field to the existing user data and returns the updated data.
	 * @param {Object} req - The request object containing the URL parameters.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the data is successfully retrieved, it returns a 200 status with the updated data.
	 *  - If no data is found, it returns a 400 status with an error message.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	addFileld: async (req, res, next) => {
		try {
			let { name } = req.params

			let user = await User.aggregate([{
				$project: {
					_id: 0, name: 1,
					mobileNo: {
						countryCode: { $substr: ["$mobileNo", 0, 3] },
						actualNo: { $substr: ["$mobileNo", 3, 13] }
					}
				}
			}])
			if (!user) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully get data",
					result: user
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