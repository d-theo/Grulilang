const path = require('path');

module.exports = {
  entry: './ui/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'GruliCompiler'
  },
};