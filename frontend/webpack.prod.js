'use strict';

const Merge = require('webpack-merge');
const ModuleConcatenationPlugin = require('webpack').optimize.ModuleConcatenationPlugin;
const CommonConfig = require('./webpack.common.js');

module.exports = function() {
	return Merge(CommonConfig, {
		output: {
			path: __dirname + '/dist/',
			filename: '[name].[hash].js',
			sourceMapFilename: '[name].[hash].map',
		},
		plugins: [
			new ModuleConcatenationPlugin(),
		],
	});
};
