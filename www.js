#!/usr/bin/env node
'use strict';

const cluster = require('cluster');
const config = require('config').get('www');
const logger = require('./logger');

if (cluster.isMaster) {
    let numWorkers;
    let cpuCount = require('os').cpus().length;

    if (config.has('num_workers')) {
        numWorkers = config.get('num_workers');
    }
    else {
        numWorkers = require('os').cpus().length;
    }

    if (numWorkers > cpuCount) {
        logger.warn('Spawning %d workers on a %d-core machine is not recommended', numWorkers, cpuCount);
    }

    logger.info('Starting %d workers ...', numWorkers);

    for (let i = 0; i < numWorkers; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', function (worker) {
        logger.error('Worker %d died, spawning a new one ...', worker.id);
        cluster.fork();
    });
}
else {
    let app = require('./www/app');

    let host = config.get('host');
    let port = config.get('port');

    app.listen(port, host, null, function () {
        logger.info('Worker %d listening on %s on port %d ...', cluster.worker.id, host, port);
    });
}
