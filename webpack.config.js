var path = require("path");

module.exports = function(env) {
  const isBrowser = env && env.browser;
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, isBrowser ? "docs/js" : "dist"),
      filename: "yamlFront.js",
      library: "yamlFront",
      libraryTarget: "umd",
      globalObject: "this"
    },
    externals: {
      "js-yaml": {
        commonjs: "js-yaml",
        commonjs2: "js-yaml",
        root: "jsyaml"
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] }
        }
      ]
    }
  };
};
