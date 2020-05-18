/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CSSNano = require('cssnano');
const TailwindPostCSSPlugin = require('tailwindcss');
const PostCSSPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (env) => ({
	mode: 'production',
	target: 'web',
	devtool: 'source-map',
	stats: { preset: 'errors-warnings' },
	entry: path.resolve('src/index.tsx'),
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve('dist'),
	},
	resolve: { extensions: ['.tsx', '.ts', '.js'] },
	cache: {
		type: 'filesystem',
	},
	optimization: {
		moduleIds: 'deterministic',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		(!env || env.analyze) && new WebpackBar(),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{ from: 'public' }],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve('public/index.html'),
		}),
		new workboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
			cleanupOutdatedCaches: true,
			navigateFallback: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[name].[id].[contenthash].css',
		}),
		env &&
			env.analyze &&
			new BundleAnalyzerPlugin({
				analyzerHost: 'localhost',
			}),
	].filter(Boolean),
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
									},
								],
								[
									'@babel/preset-env',
									{
										useBuiltIns: 'usage',
										bugfixes: true,
										loose: true,
										corejs: {
											version: 3,
											proposals: true,
										},
									},
								],
							],
							plugins: [
								[
									'@babel/plugin-transform-runtime',
									{ corejs: 3 },
								],
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
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								new TailwindPostCSSPlugin(),
								new PostCSSPresetEnv(),
								new CSSNano(),
							],
						},
					},
				],
			},
		],
	},
});
