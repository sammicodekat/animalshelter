// LOAD ENV VARIABLES
require('dotenv').config();

// SET SERVER PORT
const PORT = process.env.PORT || 8080;

// REQUIRES
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

// APP DECLARATION
const app = express();
const compiler = webpack(webpackConfig)

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

// ROUTES
app.use('/api', require('./routes/api'));

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'));
});
// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
