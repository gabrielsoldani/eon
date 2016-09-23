'use strict';

const async = require('async');
const express = require('express');
const router = express.Router();

const db = require('../../database')('www');
const Pokemon = require('../../models/Pokemon')(db);
const Pokestop = require('../../models/Pokestop')(db);
const Gym = require('../../models/Gym')(db);
const ScannedLocation = require('../../models/ScannedLocation')(db);

router.get('/', function(req, res, next) {
	let s = parseFloat(req.query.s || req.query.swLat);
	let w = parseFloat(req.query.w || req.query.swLng);
	let n = parseFloat(req.query.n || req.query.neLat);
	let e = parseFloat(req.query.e || req.query.neLng);
	
	if (isNaN(s) || isNaN(w) || isNaN(n) || isNaN(e)) {
		let err = new Error();
		err.status = 400;
		next(err);
		return;
	}
	
	async.parallel([
		async.ensureAsync(function (callback) {
			if (req.query.pokemon == 'true') {
				Pokemon.getActive_Web(s, w, n, e, function (err, rows, fields) {
					callback(err, rows);
				});
			}
			else {
				callback(null, []);
			}
		}),
		async.ensureAsync(function (callback) {
			if (req.query.pokestops == 'lured') {
				Pokestop.getLured_Web(s, w, n, e, function (err, rows, fields) {
					callback(err, rows);
				});
			}
			else if (req.query.pokestops == 'true') {
				Pokestop.get_Web(s, w, n, e, function (err, rows, fields) {
					callback(err, rows);
				});
			}
			else {
				callback(null, []);
			}
		}),
		async.ensureAsync(function (callback) {
			if (req.query.gyms == 'true') {
				Gym.get_Web(s, w, n, e, function (err, rows, fields) {
					callback(err, rows);
				});
			}
			else {
				callback(null, []);
			}
		}),
		async.ensureAsync(function (callback) {
			if (req.query.scanned_locations == 'true') {
				ScannedLocation.get_Web(s, w, n, e, function (err, rows, fields) {
					callback(err, rows);
				});
			}
			else {
				callback(null, []);
			}
		})
	],
	function (err, results) {
		if (err) {
			throw err;
		}
		
		res.json({
			pokemon: results[0],
			pokestops: results[1],
			gyms: results[2],
			scanned_locations: results[3]
		});
	});
});

module.exports = router;
