const path = require('path');

module.exports = {
  devServer: {
    compress: true,
    contentBase: path.resolve('./dist'),
    filename: 'bundle.[chunkhash].js',
    host: '0.0.0.0',
    hot: false,
    inline: false,
    lazy: true,
    overlay: false,
    watchContentBase: false
  }
};
