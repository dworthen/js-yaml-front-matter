var jsYaml = require('js-yaml');

function parse(text, options, loadSafe) {
    let contentKeyName = options && options.contentKeyName ? options.contentKeyName : '__content';
    let re = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/
        , results = re.exec(text)
        , conf = {}
        , yamlOrJson;

    if ((yamlOrJson = results[2])) {
        if (yamlOrJson.charAt(0) === '{') {
            conf = JSON.parse(yamlOrJson);
        } else {
            if(loadSafe) {
                conf = jsYaml.safeLoad(yamlOrJson, options);
            } else {
                conf = jsYaml.load(yamlOrJson, options); 
            }
        }
    }

    conf[contentKeyName] = results[3] || '';

    return conf;
};

export function loadFront (content, options) {
    return parse(content, options, false);
};

export function safeLoadFront (content, options) {
    return parse(content, options, true)
}
