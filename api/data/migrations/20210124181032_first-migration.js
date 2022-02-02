exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (roles) => {
      roles.increments('role_id');
      roles.string('role').notNullable().unique();
    })
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username').notNullable().unique();
      users.string('password').notNullable();
      users
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    })
    .createTable('categories', (category) => {
      category.increments('category_id');
      category.string('category').notNullable().unique();
    })
    .createTable('markets', (category) => {
      category.increments('market_id');
      category.string('market').notNullable().unique();
    })
    .createTable('items', (item) => {
      item.increments('item_id');
      item.string('item_name').notNullable();
      item.string('item_description');
      item.decimal('item_price').notNullable();
      item
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('category_id')
        .inTable('categories')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
      item
        .integer('market_id')
        .unsigned()
        .notNullable()
        .references('market_id')
        .inTable('markets')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('items');
  await knex.schema.dropTableIfExists('markets');
  await knex.schema.dropTableIfExists('categories');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('roles');
};
