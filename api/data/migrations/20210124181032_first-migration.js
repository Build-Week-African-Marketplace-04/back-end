exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (roles) => {
      roles.increments('role_id')
      roles.string('role').notNullable().unique()
    })
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username').notNullable().unique()
      users.string('password').notNullable()
      users.integer('role_id')
      .unsigned()
      .notNullable()
      .defaultTo('user')
      .references('role_id')
      .inTable('roles')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
    })
    
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('roles')
}
