const router = require('express').Router();
const Items = require('./itemsModel');
const { restricted } = require('./itemsMiddleware');

router.get('/', (req, res, next) => {
  Items.find()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
});

router.post('/new-item', restricted, (req, res, next) => {});

module.exports = router;
