const { User } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');


const router = express.Router();

router.post('/', async (req, res) => {
    
    const { error } = validates(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid emails or password');

    const validPassword = await bcrypt.compare( req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password');

    const token = user.generateAuthToken();

    res.send(token);
});



function validates(req) {

    const schema = Joi.object({
        email: Joi.string().required().email().max(255),
        password: Joi.string().required().min(5).max(1024)
    });

    return schema.validate(req);
}

module.exports = router;