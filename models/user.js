const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },

    email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },

    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        required : true
    }
});

userSchema.methods.generateAuthToken = function () {
    
    const token = jwt.sign({ _id: this._id , role : this.role}, config.get('jwtPrivateKey'));
    return token;

}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(1024),
        email: Joi.string().required().email().max(255),
        password: Joi.string().required().min(5).max(1024),
        role : Joi.string().required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;


