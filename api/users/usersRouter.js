const router = require("express").Router();
const Users = require("./usersModel");
const { checkUsernameExists, validateRoleName } = require('./usersMiddleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs/dist/bcrypt");

router.post("/signup", (req, res, next) => {
  let { username, password, role } = req.body;
  role === 'owner' ? role = '1' : role = '2'
  const hash = bcrypt.hashSync(password, 8)
  Users.add({ username, password: hash, role })
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(next)
});

router.get("/login", checkUsernameExists, (req, res, next) => {
  if(bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = generateToken(req.user)
    res.json({
      message: `${req.user.username} is back!`,
      token,
    });
  } else {
    next({ status:401, message: 'Invalid Credentials'})
  }
});

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

module.exports = router;