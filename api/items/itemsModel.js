// WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
// AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
const db = require('../data/db-config');

function find() {
  return db('users')
    .leftJoin('roles', 'users.role_id', 'role.role_id')
    .select('user_id', 'username', 'role');
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

async function add({ username, password, role }) {
  return db('users').insert({ username, password, role_id: role }, [
    'username',
    'role_id',
  ]);
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
