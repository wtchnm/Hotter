/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: ['react-hot-loader/patch', path.resolve('src/index.tsx')],
	target: 'web',
	devtool: 'cheap-module-source-map',
	plugins: [
		new HtmlWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		compress: true,
		contentBase: path.resolve('assets'),
		watchContentBase: true,
		port: 49049,
		historyApiFallback: true,
		hot: true,
		open: true,
		stats: 'errors-only',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				include: path.resolve('src'),
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							babelrc: false,
							presets: [
								[
									'@babel/preset-typescript',
									{
										allExtensions: true,
										isTSX: true,
									},
								],
								[
									'@babel/preset-react',
									{
										useBuiltIns: true,
										development: true,
									},
								],
							],
							plugins: ['react-hot-loader/babel'],
						},
					},
				],
			},
			{
				test: /normalize.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.css$/i,
				include: path.resolve('src'),
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
