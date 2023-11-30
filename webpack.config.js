const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./assets/img", to: "assets/img" }]
    })
  ],
  devServer: {
    static: [{ directory: path.resolve(__dirname, "dist") }, { directory: path.resolve(__dirname) }],
    compress: true,
    port: 8080
  },
  resolve: {
    modules: ["node_modules"]
  },
  performance: {
    hints: false
  }
}
