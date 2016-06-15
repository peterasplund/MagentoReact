var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/client.js',
    './src/styles/base.scss'
  ],
  output: {
    path: require("path").resolve("./dist"), 
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel', // this can be a list of loaders separated by "!". It chains right to left
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules!sass',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      }
    ]
  }
}
