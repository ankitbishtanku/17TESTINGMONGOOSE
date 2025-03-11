const joi = require('joi')

module.exports = {
	career: joi.object({
		jobTitle: joi.string().required().messages({
			"jobTitle.string": "jobTitle is string",
			"jobTitle.required": "jobTitle is required"
		}),
		user_id: joi.string().required().messages({
			"user_id.string": "id is string",
			"user_id.required": "id is required"
		})

	})
}