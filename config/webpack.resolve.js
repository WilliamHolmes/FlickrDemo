const path = require('path');

module.exports = {
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      _components: path.resolve(__dirname, '../src/js/components'),
      _constants: path.resolve(__dirname, '../src/js/constants'),
      _context: path.resolve(__dirname, '../src/js/context'),
      _img: path.resolve(__dirname, '../src/img'),
      _js: path.resolve(__dirname, '../src/js'),
      _sass: path.resolve(__dirname, '../src/sass')
    },
    extensions: ['.js', '.jsx']
  }
};
