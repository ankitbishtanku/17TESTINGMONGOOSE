const Movies = require('../models/movies')
const movies = require('../movies3.json')
const logger = require('../utility/logger')

module.exports = {
	/**
	 * @description - This function adds multiple movie entries to the database.
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the entries are successfully created, it returns a 200 status with the newly created entries.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	bulkCreateMovies: async (req, res, next) => {
		try {
			let data = movies.map(item => {
				delete item._id
				return item;
			})

			let resp = await Movies.insertMany(data);
			if (!resp) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully saved data",
					result: resp
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
	 * @description - This function gets all the movies from the database based on given countries in the request body.
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the data is successfully retrieved, it returns a 200 status with the data.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	getMovies: async (req, res, next) => {
		try {
			let countries = req.body.countries
			let movies = await Movies.aggregate([{
				$match: {
					countries: countries
				}
			}])
			if (!movies) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully saved data",
					result: movies
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
	 * @description - This function retrieves a list of movies from the database, projecting specific fields.
	 * It filters out movies with a runtime of 10 or less.
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the data is successfully retrieved, it returns a 200 status with the data.
	 *  - If an error occurs or no data is found, it returns a 400 status with an error message.
	 */
	getProject: async (req, res, next) => {
		try {
			let getData = await Movies.aggregate([{
				$project: {
					title: 1, plot: 1, runtime: 1, rated: 1, _id: 0,
					runtime: {
						$cond: {
							if: { $gt: ["$runtime", 10] },
							then: "$runtime",
							else: "$$REMOVE"
						}
					}
				}
			}])
			if (!getData) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully saved data",
					result: getData
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
	 * @description - This function retrieves a list of movies from the database based on search criteria.
	 * It supports searching by title or countries, sorting, and pagination.
	 * @param {Object} req - The request object containing search, sortBy, and start parameters in the body.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the data is successfully retrieved, it returns a 200 status with the data and its length.
	 *  - If an error occurs or no data is found, it returns a 400 status with an error message.
	 */
	manager: async (req, res, next) => {
		try {
			let { search, sortBy, start } = req.body
			let searchBy = {
				$or: [
					{ title: { $regex: '.*' + search + '.*', $options: 'i' } },
					{ countries: { $regex: '.*' + search + '.*', $options: 'i' } }
				]
			}
			let startObj = {}
			startObj.skip = (start - 1) * 10 || (1 - 1) * 10
			// let getData = await Movies.find(searchBy, limitObj).sort(sortBy)

			let piping = [
				{ $match: searchBy },
				{ $sort: sortBy },
				{ $limit: 10 },
				{ $skip: startObj.skip },
				{ $project: { _id: 0, title: 1, plot: 1, runtime: 1, rated: 1, countries: 1, cast: 1 } }
			]
			let getData = await Movies.aggregate(piping)
			let dataLength = await Movies.find(searchBy).countDocuments()
			if (getData.length === 0) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: "successfully get data",
					result: getData, dataLength
				})
			}
		}
		catch (error) {
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