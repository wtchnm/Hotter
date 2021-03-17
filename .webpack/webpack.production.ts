import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import workboxPlugin from "workbox-webpack-plugin";

const config: (environment: { analyze: boolean }) => webpack.Configuration = (
  environment
) => ({
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve("dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
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
  ].filter(Boolean) as webpack.Configuration["plugins"],
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
                    runtime: "automatic",
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
                [
                  "module-resolver",
                  {
                    extensions: [".js", ".ts", ".tsx"],
                    root: ["./src"],
                  },
                ],
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
                plugins: ["@tailwindcss/jit", "autoprefixer", "cssnano"],
              },
            },
          },
        ],
      },
    ],
  },
});

export default config;
