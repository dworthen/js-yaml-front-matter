var path = require('path');

module.exports = function(env) {
    const isBrowser = env && env.browser;
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, isBrowser ? 'dist/browser' : 'dist/commonjs'),
            filename: 'yamlFront.js',
            library: 'yamlFront',
            libraryTarget: isBrowser ? 'var' : 'commonjs2'
        },
        externals: {
            'js-yaml': {
                commonjs: 'js-yaml',
                commonjs2: 'js-yaml',
                root: 'jsyaml'
            }
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: { presets: ['env'] }}
            ]
        }
    };
}