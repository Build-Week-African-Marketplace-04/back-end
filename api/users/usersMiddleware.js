const Users = require('./usersModel');

const checkUsernameFree = async (req, res, next) => {
  try {
    const [user] = await Users.findBy({ username: req.body.username });
    if (user) {
      next({ status: 401, message: 'Username taken' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
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
  checkUsernameExists,
  checkUsernameFree,
};
