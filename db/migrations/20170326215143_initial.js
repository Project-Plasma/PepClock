exports.up = function(knex, promise){
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function(table){
      table.increments('id').unsigned().primary();
      table.string('first', 100).notNullable();
      table.string('last', 100).nullable();
      table.string('password', 100).notNullable();
      table.string('display', 100).nullable();
      table.string('email', 100).notNullable();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTableIfNotExists('auths', function(table){
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).notNullable();
      table.string('password', 100).notNullable();
      table.string('salt', 100).notNullable();
      table.integer('profile_id').references('id').inTable('profiles').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('events', function(table){
      table.increments('id').unsigned().primary();
      table.string('title', 50).notNullable();
      table.integer('creator_id').references('id').inTable('profiles');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('contributors', function(table){
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('id').inTable('profiles');
      table.integer('event_id').references('id').inTable('events');
      table.string('role', 25).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('recipients', function(table){
      table.increments('id').unsigned().primary();
      table.string('first_name', 50).notNullable();
      table.string('last_name', 50).nullable();
      table.string('email', 50).notNullable();
      table.string('phone', 15).nullable();
      table.integer('event_id').references('id').inTable('events');
    }),

    knex.schema.createTableIfNotExists('invitations', function(table){
      table.increments('id').unsigned().primary();
      table.string('email', 50).notNullable();
      table.string('rsvp', 10).notNullable();
      table.integer('event_id').references('id').inTable('events');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('contributions', function(table){
      table.increments('id').unsigned().primary();
      table.string('text', 200).notNullable();
      table.string('type', 200).notNullable();
      table.string('media_url', 200).nullable();
      table.integer('contributor_id').references('id').inTable('contributors');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('contributors'),
    knex.schema.dropTable('recipients'),
    knex.schema.dropTable('invitations'),
    knex.schema.dropTable('contributions')
  ]);
};
