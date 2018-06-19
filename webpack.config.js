const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    library: "veroprosentti",
    libraryTarget: "umd",
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    globalObject: "this"
  }
};
