const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development"; // 'production';
let target = "web";

module.exports = {
  mode: mode,
  target: target,

  output: {
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|mp4|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext][query]",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
        generator: {
          filename: "styles/[hash][ext][query]",
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  performance: {
    hints: false,
  },

  // devtool: 'source-map',

  devServer: {
    static: "./dist",
    hot: true,
  },
};
