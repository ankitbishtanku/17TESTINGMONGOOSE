const Schema = require('mongoose').Schema;
const {messageDb} = require('../dbConnection/index')

const moviesSchema = new Schema({
    title : {
        type : String,
        // index : true,
    },
    plot : {
        type : String,
    },
    genres : {
        type : [String],
    },
    runtime: {
        type : Number,
    },
    cast : {
        type : [String],
    },
    num_mflix_comments : {
        type : String,
    },
    fullplot : {
        type : String,
    },
    countries : {
        type : [String],
    },
    directors : {
        type : [String],
    }, 
    rated : {
        type : String,
    }
}, {timestamps : true});

moviesSchema.index({
    "title" : 1,
});


module.exports = Movies = messageDb.model('Movies', moviesSchema)