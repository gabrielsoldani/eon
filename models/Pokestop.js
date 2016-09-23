'use strict';

let Pokestop = function (db) {
    this.db = db;
};

Pokestop.prototype.createTable = function (callback) {
    this.db.schema.createTableIfNotExists('pokestop', function (table) {
        table.string('pokestop_id', 50).primary();
        table.boolean('enabled')
        table.double('latitude');
        table.double('longitude');
        table.dateTime('last_modified').index();
        table.dateTime('lure_expiration').nullable().index();
        table.string('active_fort_modifier', 50).nullable();

        table.index(['latitude', 'longitude']);
    }).asCallback(callback);
};

Pokestop.prototype.get = function (s, w, n, e, callback) {
    this.db
        .select()
        .from('pokestop')
        .whereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

Pokestop.prototype.get_Web = function (s, w, n, e, callback) {
    this.db
        .select('latitude', 'longitude', 'lure_expiration')
        .from('pokestop')
        .whereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

Pokestop.prototype.getLured = function (s, w, n, e, callback) {
    this.db
        .select()
        .from('pokestop')
        .where('lure_expiration', '>', new Date())
        .andWhereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

Pokestop.prototype.getLured_Web = function (s, w, n, e, callback) {
    this.db
        .select('latitude', 'longitude', 'lure_expiration')
        .from('pokestop')
        .where('lure_expiration', '>', new Date())
        .andWhereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

module.exports = function (db) {
    return new Pokestop(db);
};
