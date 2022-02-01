const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets'); // use this secret!
const Users = require('./usersModel');

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

const only = (role) => (req, res, next) => {
  if (role === req.decodedToken.role_name) {
    next();
  } else {
    next({ status: 403, message: 'This is not for you' });
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const [user] = await Users.findBy({ username: req.body.username });
    if (!user) {
      next({ status: 401, message: 'Invalid credentials' });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  restricted,
  checkUsernameExists,
  only,
};
