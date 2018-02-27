var should = require('should');

describe('js-yaml-front', function() {

  var jsYaml = require('../')
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

  describe('loadFront', function() {
    it('should load a string with optional yaml or json at the beginning and return an object', function() {
      results = jsYaml.loadFront(testStr);
      test();
      results = jsYaml.loadFront(testJsonStr);
      testJson();
      results = jsYaml.loadFront('Hello World');
      results.should.have.property('__content', 'Hello World');
    });
  }); // End describe loadFront

});// End describe js-yaml-front
