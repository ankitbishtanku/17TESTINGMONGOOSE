const { createLogger, format, transports } = require('winston')
const path = require('path')

module.exports = createLogger({
	level: 'info',
	format: format.combine(format.timestamp(), format.json(), format.errors()),
	transports: [
		new transports.Console(),
		new transports.File({ filename: path.join(__dirname + 'logs' + 'app.json') })
	]
});