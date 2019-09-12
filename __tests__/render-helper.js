var fs = require('fs');
var path = require('path');

var _files = path.join(__dirname, '_files');

function getContents(testName, ext) {
  try {
    return fs.readFileSync(path.join(_files, testName + '.' + ext), 'utf8');
  } catch (ex) {
    return null;
  }
}

// You can put the name of a specific test to run in the TEST environment
// variable (e.g. TEST=backslashes mocha test/render-test.js)
var testToRun = process.env.TEST;

var testNames;
if (testToRun) {
  testNames = testToRun.split(',');
} else {
  testNames = fs
    .readdirSync(_files)
    .filter(function(file) {
      return /\.js$/.test(file);
    })
    .map(function(file) {
      return path.basename(file).replace(/\.js$/, '');
    });
}

function getTest(testName) {
  return {
    name: testName,
    data: path.join(_files, testName + '.js'),
    templates: [path.join(testName + '.etr')],
    baseDir: './__tests__/_files',
    extension: '.out',
    expect: getContents(testName, 'txt'),
  };
}

exports.getTests = function getTests() {
  return testNames.map(getTest);
};
