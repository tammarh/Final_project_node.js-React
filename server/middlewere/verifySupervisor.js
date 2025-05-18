const jwt = require('jsonwebtoken');


const verifySupervisor = (req, res, next) => {
    if(req.user && req.user.rolse && req.user.rolse ==='supervisor') {
        next();
    }   
    else{
        return res.status(401).json({ message: 'Authorization Supervisor' });
    }

}

module.exports = verifySupervisor;