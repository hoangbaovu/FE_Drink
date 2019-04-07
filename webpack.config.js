const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Is the current build a development build
const IS_DEV = process.env.NODE_ENV === "dev";

const dirNode = "node_modules";
const dirApp = path.join(__dirname, "app");
const dirAssets = path.join(__dirname, "assets");

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    vendor: ["lodash"],
    bundle: path.join(dirApp, "index")
  },
  resolve: {
    modules: [dirNode, dirApp, dirAssets]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: path.join("assets", "styles", "styles.css")
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "views", "index.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "product-detail.html",
      template: path.join(__dirname, "views", "product-detail.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "product-luvi.html",
      template: path.join(__dirname, "views", "product-luvi.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "product-list.html",
      template: path.join(__dirname, "views", "product-list.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "cart.html",
      template: path.join(__dirname, "views", "cart.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "introduction.html",
      template: path.join(__dirname, "views", "introduction.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "blog.html",
      template: path.join(__dirname, "views", "blog.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "blog-detail.html",
      template: path.join(__dirname, "views", "blog-detail.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "login.html",
      template: path.join(__dirname, "views", "login.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "register.html",
      template: path.join(__dirname, "views", "register.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "order.html",
      template: path.join(__dirname, "views", "order.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: path.join(__dirname, "views", "contact.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "delivery-address.html",
      template: path.join(__dirname, "views", "delivery-address.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "payment.html",
      template: path.join(__dirname, "views", "payment.pug")
    }),

    new HtmlWebpackPlugin({
      filename: "404.html",
      template: path.join(__dirname, "views", "404.pug")
    })
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },

      {
        test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: "url-loader?limit=100000"
      },

      // Pug

      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: { pretty: true }
          }
        ]
      },

      // STYLES
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: IS_DEV
            }
          }
        ]
      },

      // CSS / SASS
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: IS_DEV
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirAssets]
            }
          }
        ]
      },

      // IMAGES
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  }
};
