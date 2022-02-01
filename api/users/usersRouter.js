const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const Users = require('./usersModel');
const { checkUsernameExists } = require('./usersMiddleware');
const { JWT_SECRET } = require('../secrets'); // use this secret!

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role: user.role,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

router.post('/signup', (req, res, next) => {
  let { username, password, role } = req.body;
  role === 'owner' ? (role = '1') : (role = '2'); // eslint-disable-line
  const hash = bcrypt.hashSync(password, 8);
  Users.add({ username, password: hash, role })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.post('/login', checkUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = generateToken(req.user);
    res.json({
      message: `${req.user.username} is back!`,
      token,
    });
  } else {
    next({ status: 401, message: 'Invalid Credentials' });
  }
});

module.exports = router;
