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

async function add({ username, password, role }) { // done for you
  let created_user_id
  await db.transaction(async trx => {
    let role_id_to_use
    const [role_name] = await trx('roles').where('role', role)
    if (role_name) {
      role_id_to_use = role.role_id
    } else {
        // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
        // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
      const [role_id] = await trx('roles').insert({ role: role })
      role_id_to_use = role_id
    }
    const [user_id] = await trx('users').insert({ username, password, role_id: role_id_to_use })
    created_user_id = user_id
  })
  return findById(created_user_id)
}

module.exports = {
  add,
  find,
  findById,
};
