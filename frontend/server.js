// Gets called when running npm start

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: true // Without logging
}).listen(4000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at http://localhost:4000/');
});
