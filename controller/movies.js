const Movies = require('../models/movies')
const movies = require('../movies3.json')
const logger = require('../utility/logger')

module.exports = {
	bulkCreateMovies : async (req, res, next) => {
		try{
			let data=movies.map(item=> {
	            delete item._id
	            return item;
	        })

            let resp=await Movies.insertMany(data);
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
	getMovies: async(req, res, next)=> {
		try{
			let countries = req.body.countries
			let movies = await Movies.aggregate([{$match: {
				countries : countries
			}}])
			if(!movies){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			}else{
				return res.status(200).json({
					success: true,
					message: "successfully saved data",
					result: movies
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
	getProject: async(req, res, next) => {
		try{
			let getData = await Movies.aggregate([{$project: {title: 1, plot: 1, runtime: 1, rated: 1, _id: 0, 
				runtime: {
					$cond : {
						if : {$gt : ["$runtime", 10]},
						then : "$runtime",
						else : "$$REMOVE"
					}
			}}}])
			if(!getData){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			}else{
				return res.status(200).json({
					success: true,
					message: "successfully saved data",
					result: getData
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
	manager: async(req, res, next) => {
		try{
			let { search, sortBy, start} = req.body
			console.log(req.body.userData)
			let searchBy = {
				$or: [
	           		{title: {$regex: '.*' + search + '.*', $options:'i'}},
	           		{countries: {$regex: '.*' + search + '.*', $options:'i'}}
	           	]
			}
			let startObj = {}
			startObj.skip = (start-1)*10 || (1-1)*10
			// let getData = await Movies.find(searchBy, limitObj).sort(sortBy)
			
			let piping = [
           	{$match: searchBy},
           	{$sort: sortBy},
			{$limit: 10},
			{$skip: startObj.skip},
           	{$project: {_id: 0, title: 1, plot: 1, runtime: 1, rated: 1, countries: 1, cast: 1}}
           ]
           let getData = await Movies.aggregate(piping)
           let dataLength = await Movies.find(searchBy).countDocuments()
            if(getData.length ===0){
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
            }else{
            	return res.status(200).json({
            		success: true,
            		message: "successfully get data",
            		result: getData, dataLength
            	})
            }
		}
		catch(error){
			console.log(error)
			logger.error({
				error: error.stack,
				modelName: "Movies"
			})
			return res.status(400).json({
				success: false,
				message: "something went wrong",
				result: null
			})
		}
	}
}