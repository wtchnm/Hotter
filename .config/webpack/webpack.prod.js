/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const path = require('path');
const os = require('os');
const CSSNano = require('cssnano');
const PostCSSPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const DartSass = require('sass');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const ThreadLoader = require('thread-loader');

ThreadLoader.warmup(
	{
		workers: os.cpus().length - 1,
	},
	['babel-loader', 'sass-loader']
);

module.exports = {
	mode: 'production',
	target: 'web',
	stats: 'errors-only',
	entry: path.resolve('src', 'index.tsx'),
	output: {
		path: path.resolve('dist'),
		filename: 'js/[name].[chunkhash].js',
	},
	resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] },
	optimization: {
		minimizer: [
			new TerserWebpackPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					ecma: 5,
				},
			}),
		],
		splitChunks: {
			cacheGroups: {
				runtimeChunk: 'single',
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true,
				},
			},
		},
	},
	devtool: 'source-map',
	plugins: [
		new WebpackBar(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve('assets/template.html'),
		}),
		new MiniCssExtractPlugin({
			filename: path.join('css', '[name].[chunkhash].css'),
		}),
		new webpack.HashedModuleIdsPlugin(),
		new HardSourceWebpackPlugin({
			info: {
				mode: 'none',
				level: 'error',
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				include: path.resolve('src'),
				use: [
					{
						loader: 'thread-loader',
						options: {
							workers: os.cpus().length - 1,
						},
					},
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							babelrc: false,
							presets: [
								'@babel/preset-typescript',
								'@babel/preset-react',
								[
									'@babel/preset-env',
									{
										targets: 'defaults',
										useBuiltIns: 'usage',
										corejs: { version: 3, proposals: true },
									},
								],
							],
							plugins: [
								'@babel/plugin-transform-react-constant-elements',
								'@babel/plugin-transform-runtime',
								'@babel/plugin-transform-react-inline-elements',
							],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				include: path.resolve('node_modules', 'normalize'),
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [CSSNano()],
						},
					},
				],
			},
			{
				test: /\.scss$/i,
				include: path.resolve('src'),
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: path.join('..', '..', path.sep),
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								PostCSSPresetEnv({
									browsers: 'defaults',
								}),
								CSSNano(),
							],
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: DartSass,
							sourceMap: true,
						},
					},
				],
			},
		],
	},
};
