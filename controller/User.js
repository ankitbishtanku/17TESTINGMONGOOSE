const User = require('../models/user');

module.exports = {
	createUser: async(req, res, next) => {
		try{
			let {name, mobileNo} = req.body;
			console.log(req.body)
			let newUser = await User.create({name, mobileNo})
			if(!newUser){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			}else{
				return res.status(201).json({
					success: true,
					message: "successfully created",
					result: newUser
				})
			}
		}catch(error){
			console.error(error.message)
		}
	},
	getUser: async(req, res, next) => {
		try{
			let {_id} = req.params

			let user = await User.findOne({_id}).lean()
			if(!user){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result : null
				})
			}else{
				return res.status(200).json({
					success: true,
					message: "successfully get data",
					result: user
				})
			}
		}catch(error){
			console.error(error.message)
		}
	},
	addFileld: async(req, res, next) => {
		try{
			let {name} = req.params

			let user = await User.aggregate([{$project: { _id: 0, name: 1,
				mobileNo: {
					countryCode: {$substr: ["$mobileNo", 0, 3]},
					actualNo: {$substr: ["$mobileNo", 3, 13]}
				}
			}}])
			console.log(user)
			if(!user){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result : null
				})
			}else{
				return res.status(200).json({
					success: true,
					message: "successfully get data",
					result: user
				})
			}
		}catch(error){
			console.log(error)
			return res.status(400).json({
				success: false,
				message: "something went wrong",
				result : null
			})
		}
	}
}