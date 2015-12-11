var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],

    // // karma only needs to know about the test bundle
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.bundle.js'
    ],

    frameworks: [ 'chai', 'mocha' ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-osx-reporter'
    ],

    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots', 'osx' ],

    singleRun: false,

    // webpack config object
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            exclude: /node_modules/,
            loader: 'babel',
            test: /\.js?$/,
            query: {
              presets: ['es2015', 'stage-0'],
            }
          },
          {
            exclude: /node_modules/,
            loader: 'babel',
            test: /\.jsx?$/
          }
        ],
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin()
      ]
    },

    // webpackServer: {
    //   noInfo: true,
    // }

  });
};