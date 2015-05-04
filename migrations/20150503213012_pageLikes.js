'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('pageLikes', function (t) {
        t.increments().primary();
        t.integer('count').notNull();
        t.dateTime('sampledAt').notNull();
        t.integer('candidateId').unsigned().references('id').inTable('candidates');
        t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
        t.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pageLikes');
};
