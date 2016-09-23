'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            dist: [
                '*.js',
                'models/*.js',
                'www/private/js/src/*.js'
            ]
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'www/private/js/src/',
                    src: ['*.js'],
                    dest: 'www/private/js/dist/'
                }]
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'www/public/js/map.min.js': [
                        'www/private/js/dist/leaflet.responsive.js',
                        'www/private/js/dist/pkmn.js',
                        'www/private/js/dist/pkmn.icons.js',
                        'www/private/js/dist/store.js',
                        'www/private/js/dist/utils.js',
                        'www/private/js/dist/map.controls.js',
                        'www/private/js/dist/map.js'
                    ]
                }
            }
        },

        ejs: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'www/private/css/src/',
                    src: ['*.css'],
                    dest: 'www/private/css/dist/'
                }]
            }
        },

        cssmin: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'www/public/css/map.min.css': [
                        'www/private/css/dist/icons.css',
                        'www/private/css/dist/map.css'
                    ]
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerMultiTask('ejs', 'Build everything using config files.', function () {
        const config = require('config').get('www');
        const ejs = require('ejs');

        this.files.forEach(function (f) {
            let src = f.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file ' + (filepath) + ' not found.');
                    return false;
                }
                return true;
            });

            if (src.length === 0) {
                grunt.log.warn('Destination ' + (f.dest) + ' not written because src files were empty.');
                return;
            }

            let result = '';

            src.forEach(function (filepath) {
                let content = grunt.file.read(filepath);

                result += ejs.render(content, { config: config });
            });

            grunt.file.write(f.dest, result);
        });
    });

    // Default task.
    grunt.registerTask('default', ['eslint']);
    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('build', ['babel', 'uglify', 'ejs', 'cssmin']);
};
