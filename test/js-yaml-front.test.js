var should = require('should');

describe('js-yaml-front', function() {

  var jsYaml = require('../lib/js-yaml-front')
    , fs = require('fs')
    , results
    , testStr = '---\npost: title one\nanArray:\n - one\n - two\nsubObject:\n obj1: cool\n obj2: two';
      testStr += '\nreg: !!js/regexp /pattern/gim';
      testStr += '\nfun: !!js/function function() {  }\n---\ncontent\nmore';

  var testJsonStr = '---\n{"post": "title one",\n"anArray": ["one","two"],\n"subObject":\n';
      testJsonStr += '{"obj1": "cool", "obj2": "two"}}\n---\ncontent\nmore';

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
      results.subObject.should.have.property('obj2');
      results.should.have.property('reg');
      results.reg.should.be.an.instanceOf(RegExp);
      results.should.have.property('fun');
      results.fun.should.be.a('function');
  };

  var testJson = function() {
      results.should.have.property('post', 'title one');
      results.should.have.property('anArray');
      results.anArray.should.include('one');
      results.anArray.should.include('two');
      results.should.have.property('subObject');
      results.subObject.should.have.property('obj1', 'cool');
      results.subObject.should.have.property('obj2', 'two');
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
    it('should return an object with just __content', function () {
      results = jsYaml.parse('Hello World');
      results.should.have.property('__content', 'Hello World');
    });
  });

  describe('Parsing Json', function() {
    it('should parse JSON at the start of the file', function() {
      results = jsYaml.parse(testJsonStr);
      testJson();
    });
  });

  describe('loadFront with JSON', function() {
    it('should load a string|buffer|file and return an object', function() {
      var buf = new Buffer(testStr);

      fs.writeFileSync('test/fixtures/testFile.html', testJsonStr);
      results = jsYaml.loadFront('test/fixtures/testFile.html');
      testJson();
      results = jsYaml.loadFront(buf);
      testJson();
      results = jsYaml.loadFront(testStr);
      testJson();
    });
  }); // End describe loadFront

  describe('extra dashes', function() {
    it('should handle three (or more) dashes within the content', function() {
       results = jsYaml.loadFront('test/fixtures/testExtraDashes.html');
       test();
    });
  });

});// End describe js-yaml-front
