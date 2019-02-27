const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".svg"]
  },
  module: {
    rules: [
      { test: /\.svg$/, loader: "file-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: "./kanjivg/kanji",
        to: "kanji"
      }
    ])
  ]
};