const Message = require('../models/userMessage.js');

module.exports = {
	createMessage: async(req, res, next) => {
		try{
			let {user_id, messages, career_id} = req.body
			console.log(req.body)
			let newMessage = await Message.create({user_id, messages, career_id})
			if(!newMessage){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			}else{
				return res.status(201).json({
					success: true,
					message: "successfully created",
					result: newMessage
				})
			}
		}catch(error){
			console.log(error)
		}
	},
	getMessages : async(req, res, next)=> {
		try{
			let {id} = req.params
			// let userMessage = await Message.findOne({_id : id}).populate(['user_id', 'career_id']).lean()
			let userMessage = await Message.findOne({_id : id}).select('-_id -createdAt -updatedAt -__v -isDeleted').populate([
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
			console.log(userMessage)
			if(!userMessage){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			}else{
				return res.status(200).json({
					success: true,
					message: "successfully get data",
					result: userMessage
				})
			}
		}catch(error){
			console.log(error)
		}
	},
	updateMessages: async(req, res, next) =>{
		try{
			let {id} = req.params;
			let {user_id, experience, jobTitle, lastCompanyName} = req.body
			// let newMessage = await Message.updateOne({_id: id}, {
			// 		$push : {career_id : req.body.career_id}
			// })
			let newMessage = await Message.findOneUpdate({_id: id}, {user_id, experience, jobTitle, lastCompanyName}, {
				new: true,
				upsert: true
			})
			if(!newMessage){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			}else{
				return res.status(200).json({
					success: true,
					message: "successfully created",
					result: newMessage
				})
			}
		}catch(error){
			console.log(error)
		}
	}
}