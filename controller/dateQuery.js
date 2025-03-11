const DateQuery = require('../models/dateQuery')
const dateQuery = require('../dateQuery.json')

module.exports = {
	addDateQuery: async(req, res, next)=>{
		try{
			let {name, dateOfBirth} = req.body
			let existDateQuery = await DateQuery.findOne({name, dateOfBirth})
			if(existDateQuery){
				return res.status(400).json({
					success: false,
					message: "allready exist data",
					result: null
				})
			}else{
				let newDateQuery = await DateQuery.create({name, dateOfBirth})
				if(!newDateQuery){
					return res.status(400).json({
						success: false,
						message: "something went wrong",
						result: null
					})
				}else{
					return res.status(201).json({
						success: true,
						message: "successfully created",
						result: newDateQuery
					})
				}
			}
		}catch(error){
			console.log(error)
			return res.status(400).json({
				success: false,
				message: "something went wrong",
				result: null
			})
		}
	},
	bulkCreateDateQuery: async(req, res, next) => {
		try{
			let data=dateQuery.map(item=> {
	            return item;
	        })

            let resp=await DateQuery.insertMany(data);
            if(!resp){
            	return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
            }else{
            	return res.status(200).json({
					success: true,
					message: "successfully saved data",
					result: resp
				})
            }
		}catch(error){
			console.log(error)
			return res.status(400).json({
				success: false,
				message: "something went wrong",
				result: null
			})
		}
	},
	getData: async(req, res, next) => {
		try{
			// let allData = await DateQuery.aggregate([{$sort: {dateOfBirth: 1}}, {$project : {_id: 0, name: 1, dateOfBirth: 1}}])
			// let allData = await DateQuery.aggregate([{$project: {dateOfBirth: {$dateToParts: {date : "$dateOfBirth"}}}}])
			// let allData = await DateQuery.aggregate([{$project: {name: 1, dateOfBirth: {$dateToParts: {date : "$dateOfBirth"}}}}, {$group: {_id: "$dateOfBirth.year", remDoc: {$push: "$$ROOT"}, count: {$sum: 1}}}, {$sort: {_id: 1 }}])
			// let allData = await DateQuery.aggregate([{$project: {name: 1, year: {$year: "$dateOfBirth"}, month: {$month: "$dateOfBirth"}, day: {$dayOfMonth: "$dateOfBirth"}}}, {$sort: {year: 1, month: 1, day: 1}}])
			// let allData = await DateQuery.aggregate([{$project: {name: 1, dateOfBirth: 1, _id: 0}},{$group: {_id: {year: {$year: "$dateOfBirth"}, month: {$month: "$dateOfBirth"}}, remDoc: {$push: "$$ROOT"}, count: {$sum: 1}}}, {$sort: {"_id.year": 1, "_id.month": 1}}])
			let allData = await DateQuery.aggregate([{$group: {_id: {year: {$year: "$dateOfBirth"}, month: {$month: "$dateOfBirth"}}, count: {$sum: 1}}}, {$sort: {"_id.year": 1, "_id.month": 1}}])

			console.table(allData)
			if(allData.length === 0){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			}else{
				return res.status(200).json({
					success: true,
					message: 'successfully get data',
					result : allData
				})
			}
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