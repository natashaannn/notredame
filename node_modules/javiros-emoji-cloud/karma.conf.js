// Karma configuration
// Generated on Mon Jan 29 2018 11:59:02 GMT+0000 (GMT)

module.exports = function(config) {
  path = require('path');
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/jqcloud2/dist/jqcloud.min.js',
      'src/*.js',
      'test/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'test/*.spec.js': ['coverage']
    },


    coverageReporter: {
        dir: './coverage',
              reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' },
                { type: function() {
                          var shieldBadgeReporter = require('istanbul-reporter-shield-badge')
                          var istanbul = require('istanbul')
                          istanbul.Report.register(shieldBadgeReporter)
                          return 'shield-badge'
                        }(),
                  subdir: '.',
                  coverageType: 'statements',
                  range: [75, 90],
                  subject: 'Code Coverage', 
                  readmeFilename: 'README.md',
                  readmeDir: path.resolve(__dirname, '') // i.e. if karma.conf.js is located in test/unit from the root folder of your project
                }
              ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    plugins: ['karma-chrome-launcher', 'karma-mocha', 'karma-chai', 'karma-coverage'],


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
