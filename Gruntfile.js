module.exports = function (grunt) {
    'use strict';

    var banner = [
            '/**',
            ' * <%= pkg.name %> <%= pkg.version %>',
            ' * (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>',
            ' * <%= pkg.name %> is freely distributable under the MIT license.',
            ' */\n'
        ].join('\n');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify : {
            options : {
                banner : banner
            },
            dist : {
                files : {
                    'tap-tempo.min.js' : 'tap-tempo.min.js'
                }
            }
        },
        browserify : {
            dist : {
                options : {
                    bundleOptions : {
                        standalone : 'TapTempo'
                    }
                },
                src : 'tap-tempo.js',
                dest : 'tap-tempo.min.js'
            }
        },
        jshint : {
            options : {
                jshintrc : '.jshintrc'
            },
            src : ['tap-tempo.js'],
            test : ['test/*.js'],
            grunt : ['Gruntfile.js']
        },
        watch : {
            src : {
                files : ['tap-tempo.js'],
                tasks : ['jshint:src', 'karma:watch:run', 'browserify', 'uglify']
            },
            grunt : {
                files : ['Gruntfile.js'],
                tasks : ['jshint:src']
            },
            test : {
                files : 'test/*.js',
                tasks : ['jshint:test', 'karma:watch:run']
            }
        },
        karma : {
            options : {
                configFile : 'test/karma.conf.js'
            },
            watch : {
                background : true
            },
            continuous : {
                singleRun : true
            }
        }
    });

    grunt.registerTask('test', ['jshint', 'karma:continuous', 'browserify', 'uglify']);

    grunt.registerTask('default', ['test']);

    grunt.registerTask('dev', ['karma:watch', 'watch']);

};
