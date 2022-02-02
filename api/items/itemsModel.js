// WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
// AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
const db = require('../data/db-config');

function find() {
  return db('items')
    .join('categories', 'items.item_id', 'categories.category_id')
    .select('item_name', 'item_description', 'item_price', 'category');
}

// Category filter
function findBy(filter) {
  return db('users')
    .join('roles', 'users.role_id', 'roles.role_id')
    .select('user_id', 'username', 'password', 'role')
    .where(filter);
}

function findById(user_id) { // eslint-disable-line
  return db('users')
    .join('roles', 'users.role_id', 'roles.role_id')
    .select('user_id', 'username', 'role')
    .where('users.user_id', user_id)
    .first();
}

function add({
  item_name,
  item_description,
  item_price,
  category_id,
  market_id,
}) {
  return db('items').insert(
    { item_name, item_description, item_price, category_id, market_id }, // eslint-disable-line
    ['item_name', 'item_description', 'item_price', 'category_id', 'market_id']
  );
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
