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
                    'tap-tempo.min.js' : 'tap-tempo.js'
                }
            }
        },
        jshint : {
            options : {
                jshintrc : '.jshintrc'
            },
            src : ['tap-tempo.js'],
            grunt : ['Gruntfile.js']
        },
        watch : {
            src : {
                files : ['tap-tempo.js'],
                tasks : ['jshint:src', 'uglify']
            },
            grunt : {
                files : ['Gruntfile.js'],
                tasks : ['jshint:src']
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'uglify']);

    grunt.registerTask('dev', ['watch']);

};
