const express = require('express');
const router = require('./routes/index')
const logger = require('./utility/logger')
const morgan = require('morgan')
const app = express();
const port = 3111;

app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms :remote-user'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'AnkitBishtAPI');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    next();
});

app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});
app.use('/test', router);



app.listen(port, () => {
	console.log(`server is running at port ${port}`)
})
