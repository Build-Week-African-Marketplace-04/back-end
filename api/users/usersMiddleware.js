const { JWT_SECRET } = require("../secrets"); // use this secret!
const Users = require('./usersModel')
const jwt = require('jsonwebtoken')

const restricted = (req, res, next) => {
const token = req.headers.authorization
if (!token) {
  return next({ status: 401, message: 'Token required' })
}
jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
  if (err) {
    next({ status: 401, message: 'Token invalid' })
  } else {
    req.decodedToken = decodedToken
    next()
  }
})
}

const only = role_name => (req, res, next) => {
    if (role_name === req.decodedToken.role_name) {
      next()
    } else {
      next({ status: 403, message: "This is not for you" })
    }
}


const checkUsernameExists = async (req, res, next) => {
    try {
      const [user] = await Users.findBy({ username: req.body.username})
      if (!user) {
        next({ status: 401, message: 'Invalid credentials' })
      } else {
        req.user = user
        next()
      }
     } catch (err) {
      next(err)
     }
}


const validateRoleName = (req, res, next) => {
    if (!req.body.role || !req.body.role.trim()) {
      req.role = 'user'
      next()
    } else if(req.body.role.trim().length > 32) {
      next({ status: 422, message: "Role name can not be longer than 32 chars" })
    } else {
      req.role = req.body.role.trim()
      next()
    }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}