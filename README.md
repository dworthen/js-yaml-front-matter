# Yaml Front Matter

Parses yaml or json at the front of a string. Places the parsed content, plus the rest of the string content, into an object literal.

[Online Demo](https://dworthen.github.io/js-yaml-front-matter/).

#### Breaking Changes

This readme is for the 4.x branch which introduces breaking changes. View the [changelog](CHANGELOG.md) for more information.

[3.x readme](https://github.com/dworthen/js-yaml-front-matter/tree/v3.4.0)

## Example

This

```yaml
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
```

becomes

```js
{ 
    name: 'Derek Worthen',
    age: 'young',
    contact: { email: 'email@domain.com', address: 'some location' },
    pets: [ 'cat', 'dog', 'bat' ],
    match: /pattern/gim,
    run: [Function],
    __content: '\nSome Other Content' 
}
```

May also use JSON

```json
---
{
    "name": "Derek Worthen",
    "age": "young",
    "anArray": ["one","two"],
    "subObj":{"field1": "one"}
}
---
Some content
```

> __NOTE:__ The `---` are required to denote the start and end of front matter. There must be a newline after the opening `---` and a newline preceding the closing `---`.

## Install

#### npm

```shell
$ npm install yaml-front-matter@next
```

Use the `-g` flag if you plan on using the command line tool.

```shell
$ npm install yaml-front-matter -g
```
    
#### Browser

Include the client script from [dist/yamlFront.js](dist/yamlFront.js). The library will be exposed as a global, `yamlFront`. The client script for [js-yaml](https://github.com/nodeca/js-yaml) is also required. May need to load espirma for some use cases. See [js-yaml](https://github.com/nodeca/js-yaml) for more information.

```html
<script src="https://unpkg.com/js-yaml@3.10.0/dist/js-yaml.js"></script>
<script src="js-yaml-front-client.min.js"></script>
<script>
  // parse front matter with yamlFront.loadFront(String);
</script>
```

## Running the Browser Example

```shell
$ npm install --dev && npm start
```

Then visit `localhost:8080`.

## Building from source

Outputs client files in `dist/`.

```shell
$ npm install --dev && npm run build
```

## Running Tests

```shell
npm install --dev && npm test
```

## Command Line

```shell
Usage: yaml-front-matter [options] <yaml-front-matter content>

Options:

-h, --help            output usage information
-v, --version         output the version number
-c, --content [name]  set the property name for the files contents [__content]
--pretty              formats json output with spaces. 
```

> **Note** The cli uses `safeLoadFront` and therefore the cli cannot parse yaml containing regexps, functions or undefined values.

## JS-YAML

Yaml front matter wraps [js-yaml](https://github.com/nodeca/js-yaml) to support parsing yaml front-matter.

## API

### loadFront(string, [options])

```js
var yamlFront = require('yaml-front-matter')
  , input = [
        '---\npost: title one\n',
        'anArray:\n - one\n - two\n',
        'subObject:\n prop1: cool\n prop2: two',
        '\nreg: !!js/regexp /pattern/gim',
        '\nfun: !!js/function function() {  }\n---\n',
        'content\nmore'
    ].join('');

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

The front-matter is optional.

```
frontMatter.loadFront('Hello World');
```

Will produce

```js
{ __content: "Hello World!" }
```

Content all together is optional

```js
frontMatter.loadFront('');
// will produce { __content: '' }
```

### safeLoadFront(string, [options])

Same api as loadFront except it does not support regexps, functions and undefined. See [js-yaml](https://github.com/nodeca/js-yaml) for more information.

### Options

The options object supports the same options available to [js-yaml](https://github.com/nodeca/js-yaml) except adds support for an additional key.

- `options.contentKeyName`: Specify the object key where the remaining string content after parsing the yaml front-matter will be stored. defaults to `__content`.

```js
yamlFront.loadFront('Hello World', {
    contentKeyName: 'fileContents' 
});
// => { fileContents: "Hello World" }
```
