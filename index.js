const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const user = require('./routes/users');
const auth = require('./routes/auth');
const task = require('./routes/tasks');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);




const app = express();
app.use(express.json());
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/tasks', task);


if (!config.get('jwtPrivateKey')) {
    
    console.error('FATAL ERROR : jwt not defined');
    process.exit(1);
}



mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err.message));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

