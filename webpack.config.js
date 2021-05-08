const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "dota",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modules: ["src", "node_modules"],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
};
