const db = require('../data/db-config');

function find() {
  return db('users')
  .leftJoin('roles', 'users.role_id', 'role.role_id')
  .select('user_id', 'username', 'role')
}

function findById(user_id) {
    return db('users')
    .join('roles', 'users.role_id', 'roles.role_id')
    .select('user_id', 'username', 'role')
    .where('users.user_id', user_id).first()
}

async function add({ username, password, role }) {
  return db('users').insert({ username, password, role_id: role }, ['username', 'role_id'])
}

module.exports = {
  add,
  find,
  findById,
};
