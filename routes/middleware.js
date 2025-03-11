const joi = require('joi')
const schema = require('../validation/career');

const payload = function (validator) {
	return async(req, res, next) => {
		try{
			const { error, value } = await schema[validator].validate(req.body, {
                allowUnknown: true,
            });

			if(error){
				return res.status(400).json({
					success: false,
					message: error.message,
					result: null
				})
			}
			req.body = value
			next()
		}catch(error){
			console.log(error)
			return res.status(400).json({
				success: false,
				message: "something went wrong",
				result: null
			})
		}
	}
}

module.exports = {payload}