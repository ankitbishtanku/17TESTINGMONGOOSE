const joi = require('joi')
const schema = require('../validation/career')
const logger = require('../utility/logger')

/**
 * Middleware function to validate request payload using a specified Joi schema.
 * @param {string} validator - The key of the schema to be used for validation.
 * @returns {Function} - An asynchronous middleware function.
 * The middleware validates the request body against the specified schema.
 * If validation fails, it responds with a 400 status and the error message.
 * If validation succeeds, it updates the request body with validated values
 * and passes control to the next middleware.
 */
const payload = function (validator) {
	return async (req, res, next) => {
		try {
			const { error, value } = await schema[validator].validate(req.body, {
				allowUnknown: true,
			});

			if (error) {
				return res.status(400).json({
					success: false,
					message: error.message,
					result: null
				})
			}
			req.body = value
			next()
		} catch (error) {
			logger.error({
				level: 'info',
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

module.exports = { payload }