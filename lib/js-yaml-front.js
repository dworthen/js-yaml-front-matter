var jsYaml = require('js-yaml'),
    path = require('path'),
    fs = require('fs');

jsYaml.parse = function (text, separator, name) {
  separator = separator || '-{3}';
  name = name || '__content';
  var re = new RegExp('^(' + separator + '(?:\\n|\\r)([\\w\\W]+?)(?:\\n|\\r)' + separator + ')?([\\w\\W]*)*'),
      results = re.exec(text),
      conf = {},
      yamlOrJson;

  if ((yamlOrJson = results[2])) {
    if (yamlOrJson.charAt(0) === '{') {
      conf = JSON.parse(yamlOrJson);
    } else {
      conf = jsYaml.load(yamlOrJson);
    }
  }

  conf[name] = results[3] ? results[3] : '';

  return conf;
};

jsYaml.loadFront = function (context, separator, name) {
  var contents;
  if (fs.existsSync(context)) {
    contents = fs.readFileSync(context, 'utf8');
    if (contents instanceof Error) return contents;
    return jsYaml.parse(contents, separator, name);
  } else if (Buffer.isBuffer(context)) {
    return jsYaml.parse(context.toString(), separator, name);
  } else {
    return jsYaml.parse(context, separator, name);
  }
  return false;
};

module.exports = jsYaml;
