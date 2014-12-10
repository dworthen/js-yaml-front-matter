var jsYaml = require('js-yaml')
  , path = require('path')
  , fs = require('fs')

jsYaml.parse = function (text, name) {
  name = name || '__content';
  var re = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/
    , results = re.exec(text)
    , conf = {}
    , yamlOrJson;

  if((yamlOrJson = results[2])) {
    if(yamlOrJson.charAt(0) === '{') {
      conf = JSON.parse(yamlOrJson);
    } else {
      conf = jsYaml.load(yamlOrJson);
    }
  }

  conf[name] = results[3] ? results[3] : '';

  return conf;
};

jsYaml.loadFront = function (context, name) {
  var contents;
  if(fs.existsSync(context)) {
    contents = fs.readFileSync(context, 'utf8');
    if (contents instanceof Error) return contents;
    return jsYaml.parse(contents, name);
  } else if (Buffer.isBuffer(context)) {
    return jsYaml.parse(context.toString(), name);
  } else {
    return jsYaml.parse(context, name);
  }
  return false;
};

module.exports = jsYaml;
