const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide title for task'],
    },
    completed: {
        type: Boolean,
        default: false
    },
})

// TaskSchema.index({title:'text'});


module.exports = mongoose.model('Tasks', TaskSchema)