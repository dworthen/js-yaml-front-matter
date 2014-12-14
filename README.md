# Yaml Front Matter - v3.2.3

parses yaml or json at the front of a file. Places the parsed content plus the rest of the file's content into an object literal.

- Works in the browser as of 3.0.0. [Online Demo](http://js-yaml-example.derekworthen.com).
- Note that since this module is merely a wrapper for [js-yaml](https://github.com/nodeca/js-yaml) please see the readme for js-yaml about browser support.

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

## Install with [Component](https://github.com/component/component)

    $ component install dworthen/js-yaml-front-matter

May also grab the `build.js` script from this repo. View the [online demo](http://js-yaml-example.derekworthen.com).

## Command Line

    Usage: js-yaml-front.js [options] <file>
    # If installed locally you may have to run
    # node_modules/yaml-front-matter/js-yaml-front.js [options] <file>

    Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -c, --content [name]  set the property name for the files contents [__content]

## JS-YAML

Yaml front matter is a wrapper to [js-yaml](https://github.com/nodeca/js-yaml). Therefore yaml front matter supports the same api as js-yaml plus a more so pay [js-yaml](https://github.com/nodeca/js-yaml) a visit. You can directly access js-yaml in the command line by running `$ js-yaml` (note this will run the actual js-yaml parser and will not be able to parse input intended for yaml-front-matter).

## Browser

```html
<script src="js-yaml-for-browser.js"></script><!-- Rquires JS-YAML --->
<script src="build.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script>
  // loading and setting up js-yaml-front-matter
  var jsFront = require('js-yaml-front-matter');
  jsFront(jsyaml);

  // parse front matter with jsyaml.loadFront(String);
</script>
```

View index.html for a full example. To run the example:

```js
$ npm install --dev
$ npm start
```

Then load `localhost:3000` in a web browser.

### Requirements

- The [js-yaml](https://github.com/nodeca/js-yaml) browser script.

## API

### loadFront(string|buffer|file, [contentKey])

    var yamlFront = require('yaml-front-matter')
      , input = '---\npost: title one\n';
        input += 'anArray:\n - one\n - two\n';
        input += 'subObject:\n prop1: cool\n prop2: two';
        input += '\nreg: !!js/regexp /pattern/gim';
        input += '\nfun: !!js/function function() {  }\n---\n';
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

__NOTE:__ The --- are required to denote the start and end of front matter. There must be a newline after the opening --- and a newline preceding the closing ---.

## Changelog

- Now supports parsing JSON front matter.
- A newline must come after the opening --- and precede the closing ---.
- Front matter is optional.

## TODO

-

## Tests

To run the tests first install the development dependencies:

    $ npm install --dev

Then run

    $ npm test
    # may have to run
    # sudo chmod +x ./node_modules/mocha/bin/mocha
    # before running make test

## License

###

Copyright (c) 2012 Derek Worthen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
