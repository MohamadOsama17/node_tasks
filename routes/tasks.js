const express = require('express')
const tasksRouter = express.Router()

const {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask,
    getCompletedTasks,
    searchForTask,
} = require('../controllers/tasks')

tasksRouter.route('/').get(getAllTasks).post(createTask)
tasksRouter.route('/completedTasks').get(getCompletedTasks)
tasksRouter.route('/search').get(searchForTask)
tasksRouter.route('/:id').put(updateTask).delete(deleteTask).get(getTaskById)


module.exports = tasksRouter;


// Get all tasks (GET)
// localhost:3000/api/v1/tasks

// Get single task by id (GET)
// localhost:3000/api/v1/tasks/:id

// Create task (POST)
// localhost:3000/api/v1/tasks

// Update task (PUT)
// localhost:3000/api/v1/tasks/:id

// Delete task (DELETE)
// localhost:3000/api/v1/tasks/:id