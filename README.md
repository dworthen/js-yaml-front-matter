# Yaml Front Matter

Parses yaml or json at the front of a file. Places the parsed content plus the rest of the file's content into an object literal.

- Works in the browser as of 3.0.0. [Online Demo](http://js-yaml-example.derekworthen.com).

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

## Running Browser Example

```shell
$ npm install gulp -g && npm install --dev && npm start
```

Then visit `localhost:3000`.

## Install with npm

```shell
$ npm install yaml-front-matter
```

Use the `-g` flag if you plan on using the command line tool.

```shell
$ npm install yaml-front-matter -g
```
    
## Browser

Include one of the client files from `dist/`. 

```html
<script src="js-yaml-front-client.min.js"></script>
<script>
  // parse front matter with jsyaml.loadFront(String);
</script>
```

## Building Client Script

Outputs client files in `dist/`.

```shell
$ npm install gulp -g && npm install --dev && gulp build
```

## Command Line

    Usage: js-yaml-front.js [options] <file>

    Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -c, --content [name]  set the property name for the files contents [__content]

## JS-YAML

Yaml front matter is a wrapper to [js-yaml](https://github.com/nodeca/js-yaml). Therefore yaml front 
matter supports the same api as js-yaml plus a more so pay [js-yaml](https://github.com/nodeca/js-yaml) a visit. 
You can directly access js-yaml in the command line by running `$ js-yaml` (note this will run the actual js-yaml 
parser and will not be able to parse input intended for yaml-front-matter).

## API

### loadFront(string|buffer|file, [contentKey])

```JavaScript
var yamlFront = require('yaml-front-matter')
  , input = '---\npost: title one\n';
    input += 'anArray:\n - one\n - two\n';
    input += 'subObject:\n prop1: cool\n prop2: two';
    input += '\nreg: !!js/regexp /pattern/gim';
    input += '\nfun: !!js/function function() {  }\n---\n';
    input += 'content\nmore';

var results = yamlFront.loadFront(input);
console.log(results);
```

the above will produce the following in the console.

```shell
{ post: 'title one',
  anArray: [ 'one', 'two' ],
  subObject: { obj1: 'cool', obj2: 'two' },
  reg: /pattern/gim,
  fun: [Function],
  __content: '\ncontent\nmore' }
```

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
    // will produce { __content: '' }

__NOTE:__ This behavior differs from previos versions as previous versions returned `undefined` when the input did not contain yaml front matter.

__NOTE:__ The --- are required to denote the start and end of front matter. There must be a newline after the opening --- and a newline preceding the closing ---.

## Changelog

- Now supports parsing JSON front matter.
- A newline must come after the opening --- and precede the closing ---.
- Front matter is optional.
- Browser API 

## TODO

-

## Tests

Then run

```shell
$ npm install --dev && npm install mocha -g && npm test
```
