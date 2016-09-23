'use strict';

const express = require('express');
const router = express.Router();
const config = require('config').get('www');

const Nominatim = new (require('node-nominatim2'))({
	useragent: 'Eevee <gabriel.soldani@gmail.com>',
	referer: 'https://eevee.com.br'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		analytics: config.get('analytics'),
		mapCenter: config.get('mapCenter'),
		mapViewBounds: config.get('mapViewBounds'),
        mapMaxBounds: config.get('mapMaxBounds'),
        tileServer: config.get('tileServer')
	});
});

router.get('/@:name', function(req, res, next) {
	// From https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
	if (req.params.name.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)) {
		let latitude;
		let longitude;
		{
			let split = req.params.name.split(',');
			latitude = parseFloat(split[0]);
			longitude = parseFloat(split[1]);
		}
		
		let zoom = 16;
		let precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
		
		res.redirect(`/#${zoom}/${latitude.toFixed(precision)}/${longitude.toFixed(precision)}`);
		return;
	}
	
	let viewbox = config.get('mapBounds');
	viewbox = [
		viewbox[0][1], // west = left
		viewbox[1][0], // north = top
		viewbox[1][1], // east = right
		viewbox[0][0]  // south = bottom
	];
	
	Nominatim.search({
		q: req.params.name,
		limit: 1,
		viewbox: viewbox.join(','),
		bounded: 1
	}, function (err, _, data) {
		if (!data || !data.length) {
			let err = new Error('Not Found');
			err.status = 404;
			next(err);
			return;
		}
		
		data = data[0];
			
		if (!data.lat || !data.lng && !data.boundingbox || data.boundingbox.length != 4) {
			let err = new Error('Not Found');
			err.status = 404;
			next(err);
			return;
		}
		
		let mapCenter = [
			parseFloat(data.lat),
			parseFloat(data.lon)
		];
		
		let mapBounds = [
			[parseFloat(data.boundingbox[0]), parseFloat(data.boundingbox[2])],
			[parseFloat(data.boundingbox[1]), parseFloat(data.boundingbox[3])]
		];
		
		res.render('index', {
			analytics: config.get('analytics'),
			mapCenter: mapCenter,
			mapBounds: mapBounds
		});
	});
});

module.exports = router;
