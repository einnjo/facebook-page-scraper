'use strict';

var config = require('src/config');

module.exports = {
    development: config.development.db,
    production: config.production.db
};
