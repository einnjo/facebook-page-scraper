'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('candidates').del(),

    // Inserts seed entries
    knex('candidates').insert({name: 'Fernando Elizondo', facebookPage: 'felizondob'}),
    knex('candidates').insert({name: 'Ivonne Alvarez', facebookPage: 'ivonnealvarezgarcia'}),
    knex('candidates').insert({name: 'Jaime Rodriguez', facebookPage: 'jaimerodriguezelbronco'}),
    knex('candidates').insert({name: 'Felipe Cantu', facebookPage: 'felipedejesuscantu'})
  );
};
