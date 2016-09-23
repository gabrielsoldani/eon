'use strict';

const logger = require('./logger');
const config = require('config');

let _db = {};

module.exports = function (key) {
    if (key in _db) {
        return _db[key];
    }

    let subconfig = config.get(key);
    let db;
    if (subconfig.get('database.engine') === 'mysql') {
        db = _db[key] = require('knex')({
            client: 'mysql',
            connection: {
                host: subconfig.get('database.host'),
                port: subconfig.get('database.port'),
                user: subconfig.get('database.user'),
                password: subconfig.get('database.password'),
                database: subconfig.get('database.database')
            },
            pool: {
                min: 0,
                max: subconfig.get('database.max_connections')
            }
        });
    }
    else if (['maria', 'mariadb'].indexOf(subconfig.get('database.engine')) >= 0) {
        db = _db[key] = require('knex')({
            client: 'maria',
            connection: {
                host: subconfig.get('database.host'),
                port: subconfig.get('database.port'),
                user: subconfig.get('database.user'),
                password: subconfig.get('database.password'),
                database: subconfig.get('database.database')
            },
            pool: {
                min: 0,
                max: subconfig.get('database.max_connections')
            }
        });
    }
    else if (['sqlite', 'sqlite3'].indexOf(subconfig.get('database.engine')) >= 0) {
        db = _db[key] = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: subconfig.get('database.filename')
            }
        });
    }
    else {
        logger.error(`Unsupported database engine ${subconfig.get('database.engine')}, defaulting to transient memory ...`);

        db = _db[key] = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: ':memory:'
            }
        });
    }

    const models = require('./models')(db);
    for (const name in models) {
        logger.info(`Creating table for model ${name} ...`);
        models[name].createTable();
    }

    return db;
};
