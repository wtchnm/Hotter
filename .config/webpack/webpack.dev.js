/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve('src/index.tsx'),
	target: 'web',
	devtool: 'cheap-module-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('public/index.html'),
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
	],
	devServer: {
		compress: true,
		contentBase: path.resolve('public'),
		watchContentBase: true,
		port: 49049,
		historyApiFallback: true,
		hot: true,
		open: true,
		stats: 'errors-only',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
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
							plugins: [
								'react-refresh/babel',
								[
									'@babel/plugin-proposal-class-properties',
									{ loose: true },
								],
							],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				include: path.resolve('src'),
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve('.config')
							}
						},
					},
				],
			},
		],
	},
};
