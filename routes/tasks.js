const { Task, validate } = require('../models/task');
const { User } = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');


const router = express.Router();


router.post('/', [auth, role], async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user1 = await User.findById(req.body.userId);
    if (!user1) return res.status(400).send('invalid id for user');

    let user2 = await User.findById(req.body.adminId);
    if (!user2) return res.status(400).send('invalid id for admin/manager')
    

    const task = new Task({

        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        assignedTo: {
            _id: user1._id,
            name: user1.name,
            email: user1.email

        },
        createdBy: {
            _id: user2._id,
            name: user2.name,
            email: user2.email
        },

        
        
    });

    await task.save();

    res.send(task);

});



router.get('/', [auth, role], async (req, res) => {
    
    const tasks = await Task.find();

    res.send(tasks);
});

router.get('/:id', async (req, res) => {
    
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('The task with the given ID was not found.');
    
    res.send(task);
});

router.put('/:id', async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = await Task.findByIdAndUpdate({ _id: req.params.id },
        {
            $set: {
                status: req.body.status,
                progress: req.body.progress
            }
        },

        { new: true }
    );

    await task.save();

    res.send(task);
});

router.delete('/:id', [auth, role], async (req, res) => {
    
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send('not found');

    res.send(task);
})

module.exports = router;