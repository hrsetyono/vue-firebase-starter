const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');

module.exports = {
  entry: [
    './src/main.js',
  ],
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { indentedSyntax: true }
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
        use: 'url-loader?limit=100'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: [ 'public/assets/*.css' ],
      injectCss: true,
    }, {
      reload: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};