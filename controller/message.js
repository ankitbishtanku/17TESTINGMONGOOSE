const Message = require('../models/userMessage.js');
const logger = require('../utility/logger')

module.exports = {
	/**
	 * @description - This function is used to create a new message object.
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object.
	 * @param {Function} next - The middleware function.
	 * @returns {Object} - The newly created message object.
	 */
	createMessage: async (req, res, next) => {
		try {
			let { user_id, messages, career_id } = req.body
			let newMessage = await Message.create({ user_id, messages, career_id })
			if (!newMessage) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(201).json({
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
	},
	/**
	 * @description - This function retrieves a message object by its id.
	 * @param {Object} req - The request object, containing the URL parameters.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating the success or failure of the operation.
	 *  - If the message is successfully retrieved, it returns a 200 status with the message data.
	 *  - If no message is found, it returns a 400 status with an error message.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	getMessages: async (req, res, next) => {
		try {
			let { id } = req.params
			// let userMessage = await Message.findOne({_id : id}).populate(['user_id', 'career_id']).lean()
			let userMessage = await Message.findOne({ _id: id }).select('-_id -createdAt -updatedAt -__v -isDeleted').populate([
				{
					path: 'user_id',
					select: '-_id -createdAt -updatedAt -__v -isDeleted',
					strictPopulate: false
				},
				{
					path: 'career_id',
					select: '-_id -createdAt -updatedAt -__v',
					// match: {lastCompanyName: {$ne : 'BharatAreo'}},
					strictPopulate: false
				}
			]).lean()
			if (!userMessage) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully get data",
					result: userMessage
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
	 * @description - This function updates a message object by its id.
	 * @param {Object} req - The request object, containing the URL parameters.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating the success or failure of the operation.
	 *  - If the message is successfully updated, it returns a 200 status with the updated message data.
	 *  - If no message is found, it returns a 400 status with an error message.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	updateMessages: async (req, res, next) => {
		try {
			let { id } = req.params;
			let { user_id, experience, jobTitle, lastCompanyName } = req.body
			let newMessage = await Message.findOneUpdate({ _id: id }, { user_id, experience, jobTitle, lastCompanyName }, {
				new: true,
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