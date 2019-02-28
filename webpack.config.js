const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const LicenseInfoWebpackPlugin = require("license-info-webpack-plugin").default;

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist")
  },
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
    new LicenseInfoWebpackPlugin(),
    new CopyPlugin([
      {
        from: "./kanjivg/kanji",
        to: "kanji"
      }
    ])
  ]
};
