module.exports = function (req, res, next) {
    
    if (req.user.role !== 'admin' && req.user.role !== 'manager')
        return res.status(403).send('access denied');

    next();
}


