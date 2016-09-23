'use strict';

let ScannedLocation = function (db) {
    this.db = db;
};

ScannedLocation.prototype.createTable = function (callback) {
    this.db.schema.createTableIfNotExists('scannedlocation', function (table) {
        table.double('latitude');
        table.double('longitude');
        table.dateTime('last_modified').index();

        table.primary(['latitude', 'longitude']);
    }).asCallback(callback);
};

ScannedLocation.prototype.get = function (s, w, n, e, callback) {
    this.db
        .select()
        .from('scannedlocation')
        .whereBetween('latitude', [s, n])
        .andWhereBetween('longitude', [w, e])
        .asCallback(callback);
};

ScannedLocation.prototype.get_Web = ScannedLocation.prototype.get;

module.exports = function (db) {
    return new ScannedLocation(db);
};
