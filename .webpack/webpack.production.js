const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * @param {{ analyze: boolean }} environment */
module.exports = (environment) => ({
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve("dist"),
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("public/index.html"),
    }),
    new workboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      navigateFallback: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[id].[contenthash].css",
    }),
    environment &&
      environment.analyze &&
      new BundleAnalyzerPlugin({
        analyzerHost: "localhost",
      }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: path.resolve("src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                [
                  "@babel/preset-typescript",
                  {
                    allExtensions: true,
                    isTSX: true,
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    useBuiltIns: true,
                  },
                ],
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
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
                ["@babel/plugin-transform-runtime", { corejs: 3 }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        include: path.resolve("src"),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["tailwindcss", "autoprefixer", "cssnano"],
              },
            },
          },
        ],
      },
    ],
  },
});
