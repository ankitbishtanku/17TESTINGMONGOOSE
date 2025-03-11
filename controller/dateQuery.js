const DateQuery = require('../models/dateQuery')
const dateQuery = require('../dateQuery.json')
const logger = require('../utility/logger')

module.exports = {
	/**
	 * @description - This function adds a new date query entry to the database.
	 * @param {Object} req - The request object containing the body with name and dateOfBirth.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the entry already exists, it returns a 400 status with a message indicating duplicate data.
	 *  - If the entry is successfully created, it returns a 201 status with the newly created entry.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	addDateQuery: async (req, res, next) => {
		try {
			let { name, dateOfBirth } = req.body
			let existDateQuery = await DateQuery.findOne({ name, dateOfBirth })
			if (existDateQuery) {
				return res.status(400).json({
					success: false,
					message: "allready exist data",
					result: null
				})
			} else {
				let newDateQuery = await DateQuery.create({ name, dateOfBirth })
				if (!newDateQuery) {
					return res.status(400).json({
						success: false,
						message: "something went wrong",
						result: null
					})
				} else {
					return res.status(201).json({
						success: true,
						message: "successfully created",
						result: newDateQuery
					})
				}
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
	 * @description - This function adds multiple date query entries to the database.
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the entries are successfully created, it returns a 200 status with the newly created entries.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	bulkCreateDateQuery: async (req, res, next) => {
		try {
			let data = dateQuery.map(item => {
				return item;
			})

			let resp = await DateQuery.insertMany(data);
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
	 * @description - This function fetches the data from the database.
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object used to send back the appropriate HTTP response.
	 * @param {Function} next - The middleware function to pass control to the next middleware.
	 * @returns {Object} - Returns a JSON response indicating success or failure of the operation.
	 *  - If the data is successfully fetched, it returns a 200 status with the data.
	 *  - If an error occurs, it returns a 400 status with an error message.
	 */
	getData: async (req, res, next) => {
		try {
			// let allData = await DateQuery.aggregate([{$sort: {dateOfBirth: 1}}, {$project : {_id: 0, name: 1, dateOfBirth: 1}}])
			// let allData = await DateQuery.aggregate([{$project: {dateOfBirth: {$dateToParts: {date : "$dateOfBirth"}}}}])
			// let allData = await DateQuery.aggregate([{$project: {name: 1, dateOfBirth: {$dateToParts: {date : "$dateOfBirth"}}}}, {$group: {_id: "$dateOfBirth.year", remDoc: {$push: "$$ROOT"}, count: {$sum: 1}}}, {$sort: {_id: 1 }}])
			// let allData = await DateQuery.aggregate([{$project: {name: 1, year: {$year: "$dateOfBirth"}, month: {$month: "$dateOfBirth"}, day: {$dayOfMonth: "$dateOfBirth"}}}, {$sort: {year: 1, month: 1, day: 1}}])
			// let allData = await DateQuery.aggregate([{$project: {name: 1, dateOfBirth: 1, _id: 0}},{$group: {_id: {year: {$year: "$dateOfBirth"}, month: {$month: "$dateOfBirth"}}, remDoc: {$push: "$$ROOT"}, count: {$sum: 1}}}, {$sort: {"_id.year": 1, "_id.month": 1}}])
			let allData = await DateQuery.aggregate([{ $group: { _id: { year: { $year: "$dateOfBirth" }, month: { $month: "$dateOfBirth" } }, count: { $sum: 1 } } }, { $sort: { "_id.year": 1, "_id.month": 1 } }])

			console.table(allData)
			if (allData.length === 0) {
				return res.status(400).json({
					success: false,
					message: "something went wrong",
					result: null
				})
			} else {
				return res.status(200).json({
					success: true,
					message: 'successfully get data',
					result: allData
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