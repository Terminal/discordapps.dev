'use strict';

const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');

const CommonConfig = require('./webpack.common.js');

module.exports = function() {
	return Merge(CommonConfig, {
		output: {
			path: __dirname + '/dist/',
			filename: 'bundle.js',
			sourceMapFilename: 'bundle.map',
		},
		devServer: {
			contentBase: '/dist/',
			port: 3000,
			overlay: true,
			historyApiFallback: true,
			noInfo: true,
			hot: true,
		},
		plugins:  [
			new webpack.HotModuleReplacementPlugin(),
			new DashboardPlugin(),
		],
	});
};