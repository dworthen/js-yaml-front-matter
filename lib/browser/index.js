;(function(jsYaml) {

  jsYaml.parse = function (text, name) {
    name = name || '__content';
    var re = /^(-{3}(?:\n|\r)([\w\W]+?)-{3})?([\w\W]*)*/
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
    return jsYaml.parse(context, name);
  };

}(window.jsyaml));
