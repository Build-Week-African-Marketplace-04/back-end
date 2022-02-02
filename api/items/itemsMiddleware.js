const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets'); // use this secret!
const Users = require('../users/usersModel');

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: 'Token required' });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({ status: 401, message: 'Token invalid' });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};

module.exports = {
  restricted,
};
