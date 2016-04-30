var path = require('path')
var webpack = require('webpack')
var publicPath = 'http://localhost:4001/'
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var env = process.env.MIX_ENV || 'dev'
var prod = env === 'prod'

var entry = './web/static/js/index.js'
var hot = 'webpack-hot-middleware/client?path=' +
publicPath + '__webpack_hmr'

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD: prod,
    __DEV: env === 'dev'
  })
]
if (prod) {
  plugins.push(new ExtractTextPlugin("css/app.css"))
}


if (env === 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

var cssLoader = {
  test:   /\.scss$/,
  loader: "style-loader!css-loader!sass-loader!postcss-loader"
}
if (prod) {
  cssLoader.loader = ExtractTextPlugin.extract("css-loader!sass-loader!postcss-loader")
}


module.exports = {
  devtool: prod ? null : 'cheap-module-eval-source-map',
  entry: prod ? entry : [hot, entry],
  output: {
    path: path.resolve(__dirname) + '/priv/static',
    filename: 'js/index.bundle.js',
    publicPath: publicPath
  },
  plugins: plugins,
  resolve: {
    alias: {
      phoenix_html:
      __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
      phoenix:
      __dirname + "/deps/phoenix/web/static/js/phoenix.js"
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      cssLoader,
    ]
  },
  postcss: function () {
    return [require('postcss-cssnext')]
  },
}
