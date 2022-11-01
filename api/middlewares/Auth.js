const jwt = require('jsonwebtoken')
const Constant = require('../common/constant')

function verifyUser (req, res, next) {

    if (req.headers && req.headers.authorization) {
        const authHeader = req.headers['authorization'];
        const tokenUser = authHeader.split(' ')[1];
        if(!tokenUser) {
            res.json(Constant.TOKEN_EXPIRED)
        }
        jwt.verify(tokenUser, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        //   console.log(err, data)
          if(err) {
            res.json(Constant.PERMISSION_DENIED)
          }
          res.verifyData = data;
          next();
        })
    }
    else {
        res.json(Constant.USER_MISSING_PARAMETER)
    }
}

module.exports = {
    verifyUser
}