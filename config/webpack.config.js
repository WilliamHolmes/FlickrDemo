const autoPrefixer = require('autoprefixer');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');


const { devServer: developmentServer } = require('./webpack.devserver.dev');
const { devServer: productionServer } = require('./webpack.devserver.prod');
const { resolve } = require('./webpack.resolve');

const mode = (process.env.MODE || 'development'); // 'production' | 'development' | 'none'
const isDevMode = (mode === 'development');

const devServer = isDevMode ? developmentServer : productionServer;
const devtool = isDevMode ? 'source-map' : '';

module.exports = {
  devServer,
  devtool,
  entry: ['@babel/polyfill', path.resolve('src')],
  mode,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        'eslint-loader'
      ]
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoPrefixer({
                browsers: 'last 3 versions'
              })
            ]
          }
        },
        'sass-loader'
      ]
    }, {
      test: /\.(png|gif)$/,
      use: 'url-loader?mimetype=image/png',
      exclude: /node_modules/
    }, {
      test: /\.svg$/,
      loader: 'svg-react-loader'
    }]
  },
  output: {
    filename: isDevMode ? 'bundle.[hash].js' : 'bundle.[chunkhash].js',
    chunkFilename: isDevMode ? '[name].[hash].js' : '[name].[chunkhash].js'
  },
  plugins: [
    new Dotenv({
      path: __dirname + '../.env',
      systemvars: true,
      silent: true
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? '[name].css' : '[name].[chunkhash].css',
      chunkFilename: isDevMode ? '[id].css' : '[id].[chunkhash].css'
    }),
    new StyleLintPlugin({
      configFile: path.resolve('.sass-lint.json'),
      context: path.resolve('src/sass')
    })
  ],
  resolve,
  stats: 'verbose'
};
