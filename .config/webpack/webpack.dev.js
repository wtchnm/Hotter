/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TailwindPostCSSPlugin = require('tailwindcss');

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
								'react-hot-loader/babel',
								[
									'@babel/plugin-proposal-class-properties',
									{ loose: true },
								],
								[
									'@babel/plugin-proposal-optional-chaining',
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
							plugins: [TailwindPostCSSPlugin],
						},
					},
				],
			},
		],
	},
};
