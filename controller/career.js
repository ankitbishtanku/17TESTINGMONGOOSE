const Career = require('../models/career')
const logger = require('../utility/logger')


module.exports = {
	/**
	 * @description - This function is used to create a new career object
	 * @param {Object} req - The request object
	 * @param {Object} res - The response object
	 * @param {Function} next - The middleware function
	 * @returns {Object} - The newly created career object
	 */
	createCareer: async (req, res, next) => {
		try {
			let { user_id, experience, jobTitle, lastCompanyName } = req.body
			console.log(req.body)

			let newCareer = await Career.create({ user_id, experience, jobTitle, lastCompanyName })
			if (!newCareer) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(201).json({
					success: true,
					message: "successfully created",
					result: newCareer
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
	 * @description - This function is used to get a career object by id
	 * @param {Object} req - The request object
	 * @param {Object} res - The response object
	 * @param {Function} next - The middleware function
	 * @returns {Object} - The career object
	 */
	getCareer: async (req, res, next) => {
		try {
			let { id } = req.params;
			let findCareer = await Career.findOne({ _id: id }).populate('user_id').lean()
			if (!findCareer) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully created",
					result: findCareer
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
	 * @description - This function is used to update a career object by id
	 * @param {Object} req - The request object
	 * @param {Object} res - The response object
	 * @param {Function} next - The middleware function
	 * @returns {Object} - The updated career object
	 */
	updateCareer: async (req, res, next) => {
		try {
			let { id } = req.params;
			let { user_id, experience, jobTitle, lastCompanyName } = req.body
			// let newMessage = await Message.updateOne({_id: id}, {
			// 		$push : {career_id : req.body.career_id}
			// })
			let newMessage = await Career.findOneAndUpdate({ _id: id }, { user_id, experience, jobTitle, lastCompanyName }, {
				upsert: true
			})
			if (!newMessage) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully created",
					result: newMessage
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