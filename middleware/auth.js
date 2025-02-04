const jwt = require('jsonwebtoken');
const config = require('config');
const c = require('config');

function auth(req, res, next) {
    
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('invalid jwt token access denied');

    try {

        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded
        next();
        
    }

    catch {
        res.status(400).send('galat data');
    }
}


module.exports = auth;


