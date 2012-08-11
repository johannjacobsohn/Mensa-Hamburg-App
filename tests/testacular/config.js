// Sample Testacular configuration file, that contain pretty much all the available options
// It's used for running client tests on Travis (http://travis-ci.org/#!/vojtajina/testacular)
// Most of the options can be overriden by cli arguments (see testacular --help)



// base path, that will be used to resolve files and exclude
basePath = '../..'

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  "tests/jasmine/sinon-server-1.4.2.js",
  "tests/jasmine/src/utils.js",
  "tests/jasmine/src/conf.js",
  "tests/jasmine/src/data.js",
  "tests/jasmine/src/info.js",
  "tests/jasmine/src/storage.js",
  "tests/jasmine/src/urls.js",
  "tests/jasmine/src/xhr.js",
  "tests/jasmine/spec/*",
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
browsers = ["Chrome", "PhantomJS"];
//browsers = ["Chrome"];

// Auto run tests on start (when browsers are captured) and exit
singleRun = false;
