
const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema } = require('./user');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    priority: {
        type: String,
        required: true,
        enum: ['high', 'medium', 'low'],
        

    },

    status: {
        type: String,
        required: true,
        enum: ['to-do', 'in-progress', 'completed'],
        default: 'to-do'
    },
    assignedTo: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                min: 3,
                max: 1024
            },
        
            email: {
                type: String,
                required: true,
                max: 255
            },
        }),
        
        required : true
    },
    createdBy: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                min: 3,
                max: 1024
            },
        
            email: {
                type: String,
                required: true,

                max: 255
            },
        }),
        
        required : true
    },
    dueDate: {
        type: Date
    }



});

const Task = mongoose.model('Task', taskSchema);


function validateTask(task) {
    
    const schema = Joi.object({

        title: Joi.string().required().min(3).max(1024),
        description: Joi.string().required().min(5).max(1024),
        priority: Joi.string().required(),
        status: Joi.string().required(),
        userId: Joi.objectId().required(),
        adminId : Joi.objectId().required()
    })

    return schema.validate(task);
}


exports.Task = Task;
exports.validate = validateTask;