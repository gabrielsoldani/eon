#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const forever = require('forever');

const args = (function () {
    let cmdLine = process.argv.slice(2);

    let args = {};
    for (let i = 0; i < cmdLine.length; i++) {
        args[cmdLine[i]] = 1;
    }

    return args;
})();

const createFileIfNotExists = function (filename) {
    let f = fs.openSync(filename, 'a');
    fs.closeSync(f);
};

const start = function () {
    let which = args;

    if ('www' in args) {
        which['www'] = 1;
    }
    // all
    else {
        which['www'] = 1;
    }

    if ('www' in which) {
        console.info('start www ...');
        createFileIfNotExists('./out.log');
        createFileIfNotExists('./err.log');

        forever.startDaemon('www.js', {
            silent: false,
            killTree: true,
            // watch: true,
            env: { 'NODE_ENV': 'production' },
            outFile: './out.log',
            errFile: './err.log'
        });

        console.info('start www finished');
    }
}

const stop = function () {
    if ('www' in args) {
        console.info('stop www ...');
        forever.stop('www.js');
        console.info('stop www finished');
    }
    else {
        console.info('stop all ...');
        forever.stopAll();
        console.info('stop all finished');
    }

    return 0;
}

const restart = function () {
    if ('www' in args) {
        console.info('restart www ...');
        forever.restart('www.js');
        console.info('restart www finished');
    }
    else {
        console.info('restart all ...');
        forever.restartAll();
        console.info('restart all finished');
    }

    return 0;
}

let status = 0;

if ('stop' in args) {
    status !== 0 || (status = stop());
}
if ('start' in args) {
    status !== 0 || (status = start());
}
if ('restart' in args) {
    status !== 0 || (status = restart());
}

process.exit(status);
