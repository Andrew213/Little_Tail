process.env.NODE_ENV = 'development';

import createDbAndConnect from '../db/db.js';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import configFactory from '../config/webpack.config.js';
// const test = require('../db/db.ts');
// const path = require('path');
// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');

createDbAndConnect();
const compiler = webpack(configFactory);

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const devServer = new WebpackDevServer(compiler, {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
});

devServer.listen(DEFAULT_PORT, HOST, err => {
    if (err) {
        return console.log(err);
    }
});
