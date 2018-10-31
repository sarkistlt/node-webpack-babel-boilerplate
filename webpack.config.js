const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const babelrc = require('./.babelrc');

const { NODE_ENV = 'development' } = process.env;
const isDev = NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: [path.resolve(__dirname, './src/index.js')],
  },
  output: {
    path: path.resolve(__dirname, './build/'),
    filename: '[name].js',
  },
  mode: isDev ? 'development' : 'production',
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
  },
  watch: isDev,
  watchOptions: {
    aggregateTimeout: 100,
  },
  devtool: 'source-map',
  optimization: {
    // minimize: false, // <---- disables uglify
    minimizer: [new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true,
      },
      sourceMap: true,
    })],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelrc,
          },
        ],
      },
    ],
  },
};
