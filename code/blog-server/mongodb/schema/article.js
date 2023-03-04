const mongoose = require('mongoose');
const moment = require('moment');
const article = mongoose.model(
    'posts',
    new mongoose.Schema(
        {
            title: {
                type:String,
                required:true
            },
            id: Number,
            userId: Number,
            descr:{
                type:String,
                default: ''
            },
            body: {
                type:String,
                required:true
            },
            date: {
                type:String,
                default:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            },
        }
    )
)
module.exports = article