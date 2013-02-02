// Sample Testacular configuration file, that contain pretty much all the available options
// It's used for running client tests on Travis (http://travis-ci.org/#!/vojtajina/testacular)
// Most of the options can be overriden by cli arguments (see testacular --help)

// base path, that will be used to resolve files and exclude
basePath = '../..'

// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  "mocha/src/utils.js",
  "mocha/src/conf.js",
  "mocha/src/data.js",
  "mocha/src/info.js",
  "mocha/src/urls.js",
  "mocha/src/xhr.js",
  "mocha/src/storage.js",
  "mocha/test/*"
];

// list of files to exclude
exclude = [];

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots' || 'progress'
reporter = 'progress';

// web server port
port = 9876;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
//browsers = ["Chrome", "Firefox"];
browsers = ["Chrome"];

// Auto run tests on start (when browsers are captured) and exit
singleRun = false;
