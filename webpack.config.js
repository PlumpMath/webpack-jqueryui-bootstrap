var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function _path(p) {
  return path.join(__dirname, p);
}

module.exports = {
  context: path.join(__dirname, 'src'),

  entry: [ './entry.js', './entry.less' ],

  resolve: {
    alias: {
      'jquery': _path('node_modules/jquery/dist/jquery'),
      'jquery-ui': _path('node_modules/jquery-ui/ui/widgets'),
      'jquery-ui-css': _path('node_modules/jquery-ui/themes/base'),
      'bootstrap': _path('node_modules/bootstrap/dist'),
    },
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
      query: {
        presets: ['es2015', 'stage-0'],
        passPerPreset: true,
      },
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: "style!css",
    }, {
      test: /\.less$/,
      loader: "style!css!autoprefixer!less",
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
      loader: 'url?limit=100000@name=[name][ext]'
    }]
  },

	plugins: ([
		// Avoid publishing files when compilation failed:
		new webpack.NoErrorsPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

		// Aggressively remove duplicate modules:
		new webpack.optimize.DedupePlugin()
	]).concat(process.env.WEBPACK_ENV==='dev' ? [] : [
		new webpack.optimize.OccurenceOrderPlugin(),

		// minify the JS bundle
		new webpack.optimize.UglifyJsPlugin({
			output: { comments: false },
			exclude: [ /\.min\.js$/gi ]		// skip pre-minified libs
		})
  ]),

  cache: true,
  debug: true,

  // Pretty terminal output
	stats: { colors: true },

	// Generate external sourcemaps for the JS & CSS bundles
  devtool: 'source-map',
}