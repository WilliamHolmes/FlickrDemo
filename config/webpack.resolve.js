const path = require('path');

module.exports = {
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      _js: path.resolve(__dirname, '../src/js'),

      _img: path.resolve(__dirname, '../src/img'),

      _sass: path.resolve(__dirname, '../src/sass')
    },
    extensions: ['.js', '.jsx']
  }
};
