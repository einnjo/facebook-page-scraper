'use strict';

var request = require('superagent');
var Promise = require('bluebird');
var later = require('later');
var config = require('src/config')[process.env.ENVIRONMENT || 'development'];
var logger = require('src/logger');

var knex = require('knex')(config.db);

var schedule = later.parse.text('every 1 hours');

var time = later.setInterval(logPageLikes, schedule);
logger.info('hola');
function logPageLikes() {
    knex('candidates')
        .pluck('facebookPage')
        .then(function (facebookPages) {
            return Promise.all(facebookPages.map(function (facebookPage) {
                return getAndSavePageLikes(facebookPage);
            }))
        })
        .then(function () {
            var savedDate = new Date().toString();
            logger.info('OK ' + savedDate);
        })
        .catch(function (err) {
            logger.error(err.message);
        });
}

function getAndSavePageLikes(page) {
    return getPageLikes(page)
        .then(function (likes) {
            return savePageLikes(page, likes);
        });
}

function savePageLikes(page, count) {
    return knex('candidates')
        .where('facebookPage', page).first('id')
        .then(function (candidate) {
            return knex('pageLikes')
                .insert({count: count, sampledAt: new Date(), candidateId: candidate.id});
        });
}

function getPageLikes(page) {
    return new Promise(function (resolve, reject) {
        request
            .get('https://graph.facebook.com/v2.3/' + page)
            .set('Accept', 'application/json')
            .query({
                access_token: config.facebook.id + '|' + config.facebook.secret
            })
            .end(function (err, res) {
                if (err) {
                    return reject(err);
                }

                resolve(res.body.likes);
            });
    });
}
