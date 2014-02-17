# Yaml Front Matter

parses yaml at the top of a file, plus the file content into an object literal.

## Example

This 

    ---
    name: Derek Worthen
    age: young
    contact: 
     email: email@domain.com
     address: some location
    pets: 
     - cat
     - dog
     - bat
    match: !!js/regexp /pattern/gim
    run: !!js/function function() { }
    ---
    Some Other content
    
becomes

    { name: 'Derek Worthen',
      age: 'young',
      contact: { email: 'email@domain.com', address: 'some location' },
      pets: [ 'cat', 'dog', 'bat' ],
      match: /pattern/gim,
      run: [Function],
      __content: 'Some Other Content' }

May also use JSON

    ---
    {
    "name": "Derek Worthen",
    "age": "young",
    "anArray": ["one","two"],
    "subObj":{"field1": "one"}
    }
    ---
      
## Install with npm

    $ npm install yaml-front-matter -g
    # or locally
    $ npm install yaml-front-matter
    
## Command Line

    Usage: js-yaml-front.js [options] <file>
    # If installed locally you may have to run 
    # node_modules/yaml-front-matter/js-yaml-front.js [options] <file>

    Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -c, --content [name]  set the property name for the files contents [__content]
    
## JS-YAML - 3.0.1

Yaml front matter is an extension of the [js-yaml](https://github.com/nodeca/js-yaml) module. Simply put, yaml front matter supports the same api as js-yaml (with some extras) so pay [js-yaml](https://github.com/nodeca/js-yaml) page a visit. You can directly access js-yaml in the command line by running `$ js-yaml` (note this will run the actual js-yaml parser and will not be able to parse input intended for yaml-front-matter).

## API - v2.2.0

### loadFront(string|buffer|file, [contentKey])

    var yamlFront = require('yaml-front-matter')
      , input = '---\npost: title one\n';
        input += 'anArray:\n - one\n - two\n';
        input += 'subObject:\n prop1: cool\n prop2: two';
        input += '\nreg: !!js/regexp /pattern/gim';
        input += '\nfun: !!js/function function() {  }---\n';
        input += 'content\nmore';
        
    var results = yamlFront.loadFront(input);
    console.log(results);
    
the above will produce the following in the console.

    { post: 'title one',
      anArray: [ 'one', 'two' ],
      subObject: { obj1: 'cool', obj2: 'two' },
      reg: /pattern/gim,
      fun: [Function],
      __content: '\ncontent\nmore' }

The front matter is optional:

    // somefile.ext
    Hello World!

    // another location
    var frontMatter = require('yaml-front-matter')
      , results = frontMatter.loadFront('somefile.ext', 'myContent');

Will produce

    { myContent: "Hello World!" }

Content all together is optional

    frontMatter.loadFront('');
    // will produce {__content: ''}    

__NOTE:__ This behavior differs from previos versions as previous versions returned `undefined` when the input did not contain yaml front matter.
      
__NOTE:__ The --- are required to denote the start and end of front matter. There must also be a newline after each ---.

## Changelog v2.1.0

- Uses js-yaml v2.1.0
- Now supports parsing JSON front matter.
- The --- must have a newline after them.
- Front matter is optional.

## TODO

- Browser testing

## Tests

To run the tests first install the development dependencies:

    $ npm install --dev
    
Then run

    make test
    # may have to run 
    # sudo chmod +x ./node_modules/mocha/bin/mocha
    # before running make test
    
## License

### 

Copyright (c) 2012 Derek Worthen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
