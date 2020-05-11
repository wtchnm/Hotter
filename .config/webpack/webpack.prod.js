/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const path = require('path');
const CSSNano = require('cssnano');
const PostCSSImport = require('postcss-import');
const PostCSSPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (env) => ({
	mode: 'production',
	target: 'web',
	devtool: 'source-map',
	stats: { preset: 'errors-only' },
	entry: path.resolve('src/index.tsx'),
	output: {
		filename: 'js/[name].[chunkhash].js',
		ecmaVersion: 5,
	},
	resolve: { extensions: ['.tsx', '.ts', '.js'] },
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
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
	plugins: [
		(!env || env.analyze) && new WebpackBar(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin(),
		new workboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
			cleanupOutdatedCaches: true,
			navigateFallback: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash].css',
		}),
		env && env.analyze && new BundleAnalyzerPlugin(),
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
								'@babel/preset-react',
								[
									'@babel/preset-env',
									{
										targets: 'defaults',
										useBuiltIns: 'usage',
										corejs: {
											version: 3,
											proposals: true,
										},
									},
								],
							],
							plugins: ['@babel/plugin-transform-runtime'],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				include: [
					path.resolve('node_modules', 'normalize'),
					path.resolve('src'),
				],
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								PostCSSImport(),
								PostCSSPresetEnv(),
								CSSNano(),
							],
						},
					},
				],
			},
		],
	},
});
