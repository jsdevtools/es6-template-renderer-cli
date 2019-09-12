require('./helper');

var renderHelper = require('./render-helper');

var tests = renderHelper.getTests();

describe('etr.render', function() {
  beforeEach(function() {
    //etr.clearCache();
  });

  tests.forEach(function(test) {
    it('knows how to render ' + test.name, function() {
      const output = etr(test);
      output.should.equal(test.expect);
    });
  });
});
