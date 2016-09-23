'use strict';

var Pokemon = function (db) {
    this.db = db;
};

Pokemon.prototype.createTable = function (callback) {
    this.db.schema.createTableIfNotExists('pokemon', function (table) {
        table.string('encounter_id', 50).primary();
        table.string('spawnpoint_id').index();
        table.integer('pokemon_id').index();
        table.double('latitude');
        table.double('longitude');
        table.dateTime('disappear_time').index();

        table.index(['latitude', 'longitude']);
    }).asCallback(callback);
};

Pokemon.prototype.getActive = function (s, w, n, e, callback) {
    this.db
        .select()
        .from('pokemon')
        .where('disappear_time', '>', new Date())
        .andWhereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

Pokemon.prototype.getActive_Web = function (s, w, n, e, callback) {
    this.db
        .select('encounter_id', 'pokemon_id', 'latitude', 'longitude', 'disappear_time')
        .from('pokemon')
        .where('disappear_time', '>', new Date())
        .andWhereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

module.exports = function (db) {
    return new Pokemon(db);
};
