const tasksModel = require('../models/Task')

const {validateObjectId} = require('../utils')


const getAllTasks = async (req, res) => {
    try {
        const tasks = await tasksModel.find({});
        res.status(200).json({tasks});
    } catch (error) {
        console.log(error)
        res.status(500).json(sendGeneralErrorResponse(e))
    }
}

const getTaskById = async (req, res) => {
    try {
        const {id: taskId} = req.params;
        console.log(taskId)
        if (validateObjectId(taskId)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            const task = await tasksModel.findById(taskId.toString());
            if (!task) {
                return res.status(404).json(noFoundTaskErrorResponse(taskId));
            } else {
                res.status(200).json({task})
            }
        } else {
            return res.status(404).json(noFoundTaskErrorResponse(taskId));
        }
    } catch
        (error) {
        console.log(error)
        res.status(500).json(sendGeneralErrorResponse(error));
    }
}

const updateTask = async (req, res) => {
    // res.send('update task')
    try {
        const {id: taskId} = req.params;
        if (validateObjectId(taskId)) {
            const task = await tasksModel.findById(taskId);
            if (!task) {
                res.status(404).json(noFoundTaskErrorResponse(taskId))
            } else {
                const body = req.body;
                let {title, completed} = body;
                if (!title) {
                    return res.status(400).json({
                        message: 'please add title'
                    });
                } else {
                    task.title = title;
                }
                if (!completed) {
                    completed = false;
                }
                task.completed = completed;
                await task.save();
                res.status(200).json({task})
            }
        } else {
            res.status(404).json(noFoundTaskErrorResponse(taskId))
        }

    } catch (e) {
        console.log(e)
        res.status(500).json(sendGeneralErrorResponse(e))
    }
}

const createTask = async (req, res) => {
    try {
        const body = req.body;
        const createdTask = await tasksModel.create(body)
        res.status(201).json({createdTask})
    } catch (e) {
        console.log(e)
        res.status(500).json(sendGeneralErrorResponse(e));
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id: taskId} = req.params;
        if (validateObjectId(taskId)) {
            const task = await tasksModel.findById(taskId);
            if (!task) {
                res.status(404).json(noFoundTaskErrorResponse(taskId))
            } else {
                const deleteResult = await task.deleteOne();
                console.log(deleteResult)
                res.send(deleteResult)
            }
        } else {
            res.status(404).json(noFoundTaskErrorResponse(taskId))
        }
    } catch (e) {
        res.status(500).json(sendGeneralErrorResponse(e))
    }
}

const searchForTask = async (req, res) => {
    try {
        const searchWord = req.query.title;
        if (!searchWord) {
            return res.status(400).json({message:'please enter task title to search'})
        } else {
            const tasks = await tasksModel.find({$text: {$search: searchWord}})
            res.json({tasks})
        }
    } catch (e) {
        res.status(500).json(sendGeneralErrorResponse(e))
    }
}

const getCompletedTasks = async (req, res) => {
    const completedTasks = await tasksModel.find({'completed': true});
    res.status(200).json({completedTasks})
}

const noFoundTaskErrorResponse = id => {
    return {message: `no task founded with id :${id}`}
}

const sendGeneralErrorResponse = error => {
    return {message: error};
}

module.exports = {
    getAllTasks,
    getTaskById,
    updateTask,
    createTask,
    deleteTask,
    getCompletedTasks,
    searchForTask,
}