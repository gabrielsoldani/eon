'use strict';

let async = require('async');

let Versions = function (db) {
    this.db = db;
};

Versions.prototype.createTable = function (callback) {
    async.series([
        function (cb) {
            this.db.schema.createTableIfNotExists('versions', function (table) {
                table.string('key').primary();
                table.integer('val');
            }).asCallback(cb);
        }.bind(this),
        function (cb) {
            this.db('versions').insert({
                key: 'schema_version',
                val: 7
            }).asCallback(cb);
        }.bind(this)
    ], callback);
};

Versions.prototype.get = function (key, callback) {
    this.db
        .select()
        .from('versions')
        .where('key', key)
        .asCallback(callback);
};

Versions.prototype.getSchemaVersion = function (callback) {
    this.get('schema_version', function (err, rows) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, rows.val);
    });
}

module.exports = function (db) {
    return new Versions(db);
};
