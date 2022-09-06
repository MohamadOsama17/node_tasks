let mongoose = require('mongoose');


const connectDB = () => {
    return mongoose.connect('mongodb://localhost:27017/TasksDB');
}

module.exports = connectDB;