'use strict';

var Gym = function (db) {
    this.db = db;
};

Gym.prototype.createTable = function (callback) {
    this.db.schema.createTableIfNotExists('gym', function (table) {
        table.string('gym_id', 50).primary();
        table.integer('team_id');
        table.integer('guard_pokemon_id');
        table.integer('gym_points');
        table.boolean('enabled')
        table.double('latitude');
        table.double('longitude');
        table.dateTime('last_modified').index();
        table.dateTime('last_scanned');

        table.index(['latitude', 'longitude']);
    }).asCallback(callback);
};

Gym.prototype.get = function (s, w, n, e, callback) {
    this.db
        .select()
        .from('gym')
        .whereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

Gym.prototype.get_Web = function (s, w, n, e, callback) {
    this.db
        .select('team_id', 'gym_points', 'latitude', 'longitude')
        .from('gym')
        .whereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

module.exports = function (db) {
    return new Gym(db);
};

