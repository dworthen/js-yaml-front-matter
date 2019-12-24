var fs = require("fs");
var path = require("path");
var jsYaml = require("../dist/yamlFront");
var should = require("should");

describe("js-yaml-front", function() {
  var results = null;
  var testStr = null;
  var testStrWithExtraDashes = null;
  var testJsonStr = null;
  var testSafeYamlStr = null;

  var simpleYaml = fs.readFileSync(
    path.resolve(__dirname, "./fixtures/yaml.txt"),
    "utf8"
  );
  var yamlWithDashes = fs.readFileSync(
    path.resolve(__dirname, "./fixtures/yamlWithExtraDashes.txt"),
    "utf8"
  );
  var safeYaml = fs.readFileSync(
    path.resolve(__dirname, "./fixtures/safeYaml.txt"),
    "utf8"
  );

  var json = fs.readFileSync(
    path.resolve(__dirname, "./fixtures/json.txt"),
    "utf8"
  );

  //   var testJsonStr = '---\n{"post": "title one",\n"anArray": ["one","two"],\n"subObject":\n';
  //       testJsonStr += '{"obj1": "cool", "obj2": "two"}}\n---\ncontent\nmore';

  beforeEach(function() {
    results = null;
    testStr = simpleYaml;
    testStrWithExtraDashes = yamlWithDashes;
    testJsonStr = json;
    testSafeYamlStr = safeYaml;
  });

  function testSimpleYaml(key) {
    key = key || "__content";
    results.should.have.property("post", "title one");
    results.should.have.property("anArray");
    results.anArray.should.containEql("one");
    results.anArray.should.containEql("two");
    results.should.have.property("subObject");
    results.subObject.should.have.property("obj1", "cool");
    results.subObject.should.have.property("obj2", "two");
    results.should.have.property("reg");
    results.reg.should.be.an.instanceOf(RegExp);
    results.should.have.property("fun");
    results.fun.should.Function();
    results.should.have.property(key);
    results[key].should.match(/content\r?\nmore/);
  }

  function testYamlWithDashes(key) {
    key = key || "__content";
    results.subObject.should.have.property("obj2", "two ---");
    results.should.have.property(key);
    results[key].should.match(/content\r?\nmore/);
  }

  function testSafeYaml(key) {
    key = key || "__content";
    results.should.not.have.property("reg");
    results.should.not.have.property("fun");
    results.should.have.property(key);
    results[key].should.match(/content\r?\nmore/);
  }

  function testJson(key) {
    key = key || "__content";
    results.should.have.property("post", "title one");
    results.should.have.property("anArray");
    results.anArray.should.containEql("one");
    results.anArray.should.containEql("two");
    results.should.have.property("subObject");
    results.subObject.should.have.property("obj1", "cool");
    results.subObject.should.have.property("obj2", "two");
    results.should.have.property(key);
    results[key].should.match(/content\r?\nmore/);
  }

  describe("loadFront", function() {
    describe("loading yaml", function() {
      it("should support loading yaml-front-matter", function() {
        results = jsYaml.loadFront(testStr);
        testSimpleYaml();
      });
    });

    describe("loading yaml with arbitrary dashes", function() {
      it("should support loading yaml-front-matter with dashes", function() {
        results = jsYaml.loadFront(testStrWithExtraDashes);
        testYamlWithDashes();
      });
    });

    describe("loading json", function() {
      it("should support loading json-front-matter", function() {
        results = jsYaml.loadFront(testJsonStr);
        testJson();
      });
    });

    describe("loading without yaml", function() {
      it("should support loading files without yaml-front-matter", function() {
        results = jsYaml.loadFront("Hello World");
        results.should.have.property("__content", "Hello World");
      });
    });

    describe("loading empty string", function() {
      it("should support loading no content", function() {
        results = jsYaml.loadFront("");
        results.should.have.property("__content", "");
      });
    });

    describe("loading with options", function() {
      it("should support changing content key name through options object", function() {
        results = jsYaml.loadFront(testStr, { contentKeyName: "fileContents" });
        testSimpleYaml("fileContents");
      });
    });

    describe("loading with specifying content key name", function() {
      it("should support changing content key name with a string", function() {
        results = jsYaml.loadFront(testStr, "fileContents");
        testSimpleYaml("fileContents");
      });
    });
  }); // End describe loadFront

  describe("safeLoadFront", function() {
    describe("loading safe yaml", function() {
      it("should support loading yaml-front-matter without RegExp or functions", function() {
        results = jsYaml.safeLoadFront(testSafeYamlStr);
        testSafeYaml();
      });
    });

    describe("loading yaml", function() {
      it("should not support loading yaml-front-matter that contain RegExp or functions", function() {
        jsYaml.safeLoadFront.bind(this, testStr).should.throw();
      });
    });
  }); // End describe safeLoadFront
}); // End describe js-yaml-front
