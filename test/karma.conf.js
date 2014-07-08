// Karma configuration

module.exports = function(config) {
    'use strict';

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',

        // frameworks to use
        frameworks: ['mocha', 'chai', 'browserify', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            // test specs
            'test/*.js'
        ],

        preprocessors: {
            'tap-tempo.js' : ['coverage'],
            'test/*.js' : ['browserify']
        },

        reporters: ['progress', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // start these browsers
        browsers: ['PhantomJS'],

        client: {
            mocha: {
                ui: 'tdd'
            }
        },

        coverageReporter : {
            type : 'html',
            dir : 'coverage/'
        },

        browserify : {
            debug : true
        }
    });
};
