var should = require('should');

describe('js-yaml-front', function() {

  var jsYaml = require('../lib/js-yaml-front')
    , fs = require('fs')
    , results
    , testStr = '---post: title one\nanArray:\n - one\n - two\nsubObject:\n obj1: cool\n obj2: two';
      testStr += '\nreg: !!js/regexp /pattern/gim';
      testStr += '\nfun: !!js/function function() {  }---\ncontent\nmore';
      
      beforeEach(function() {
        results = null;
      });
      
  var test = function() {
      results.should.have.property('post', 'title one');
      results.should.have.property('anArray');
      results.anArray.should.include('one');
      results.anArray.should.include('two');
      results.should.have.property('subObject');
      results.subObject.should.have.property('obj1', 'cool');
      results.subObject.should.have.property('obj2', 'two');
      results.should.have.property('reg');
      results.reg.should.be.an.instanceOf(RegExp);
      results.should.have.property('fun');
      results.fun.should.be.a('function');
  };

  describe('parse', function() {
    it('should parse yaml at the front of a file', function() {
      results = jsYaml.parse(testStr);
      test();
    });
  }); // End describe parse
  
  describe('loadFront', function() {
    it('should load a string|buffer|file and return an object', function() {
      var buf = new Buffer(testStr);
      
      fs.writeFileSync('test/fixtures/testFile.html', testStr);
      results = jsYaml.loadFront('test/fixtures/testFile.html');
      test();
      results = jsYaml.loadFront(buf);
      test();
      results = jsYaml.loadFront(testStr);
      test();
    });
  }); // End describe loadFront

  describe('incorrect parse', function () {
    it('should return undefined', function () {
      results = jsYaml.parse('Hello World');
      should.not.exist(results);
    });
  });

}); // End describe js-yaml-front