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
    
## JS-YAML 

Yaml front matter is an extension of the [js-yaml](https://github.com/nodeca/js-yaml) module. Simply put, yaml front matter supports the same api as js-yaml (with some extras) so pay the [js-yaml](https://github.com/nodeca/js-yaml) page a little visit. One can access js-yaml in the command line by running `$ js-yaml` (note this will run the actual js-yaml parser and will not be able to parse input intended for yaml-front-matter).

## API - v1.0.3

### loadFront(string|buffer|file, [contentKey])

    var yamlFront = require('yaml-front-matter')
      , input = '---\npost: title one\n';
        input += 'anArray:\n - one\n - two\n';
        input += 'subObject:\n prop1: cool\n prop2: two';
        input += '\nreg: !!js/regexp /pattern/gim';
        input += '\nfun: !!js/function function() {  }---\n';
        input += 'content\nmore';
        
    var results = yamlFront.loadFront(input);
    if (results) 
      console.log(results);
    else
      // provided text does not contain yaml.

    
the above will produce the following in the console.

    { post: 'title one',
      anArray: [ 'one', 'two' ],
      subObject: { obj1: 'cool', obj2: 'two' },
      reg: /pattern/gim,
      fun: [Function],
      __content: '\ncontent\nmore' }

The above method returns `undefined` if the provided text does not contain yaml. 
      
Note that the two instances of ---, one at the beginning of input and the other denoting the end of the yaml section, is a requirement for for yaml-front-matter. Any content after the second --- is optional and for this reason, yaml-front-matter can parse any input js-yaml can as long as the input is marked with --- at the beginning and the end.

All of the content after the second --- is grouped under the '__content' key. This behavor can be changed in the command line by passing in an argument to the -c flag. Or

    var yamlFront = require('yaml-front-matter')
      , input = '---\ntitle: Title\n';
        input += '---\n';
        input += 'content\nmore';
        
    console.log(yamlFront.loadFront(input, 'extras'));
    
will produce

    { title: Title,
      extras: '\ncontent\nmore' }

## Tests

To run the tests first install the development dependencies:

    $ npm install --dev
    
Then run

    make test
    
## License

### 

Copyright (c) 2012 Derek Worthen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.