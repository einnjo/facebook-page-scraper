'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('candidates', function (t) {
        t.increments().primary();
        t.string('name').notNull();
        t.string('facebookPage').notNull();
        t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
        t.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('candidates');
};
