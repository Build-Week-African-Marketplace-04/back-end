const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const Users = require('../users/usersModel');
const { restricted, only } = require('./itemsMiddleware');
const { JWT_SECRET } = require('../secrets'); // use this secret!

router.get('/', restricted, (req, res, next) => {});

router.post('/new-item', restricted, (req, res, next) => {});

module.exports = router;
