import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import "webpack-dev-server";

const config: webpack.Configuration = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index.tsx",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("public/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    compress: true,
    contentBase: path.resolve("public"),
    watchContentBase: true,
    port: 49049,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
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
              babelrc: false,
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
                    development: true,
                  },
                ],
              ],
              plugins: [
                "react-refresh/babel",
                [
                  "module-resolver",
                  {
                    extensions: [".js", ".ts", ".tsx"],
                    root: ["./src"],
                  },
                ],
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
          "style-loader",
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
                plugins: ["@tailwindcss/jit"],
              },
            },
          },
        ],
      },
    ],
  },
};

export default config;
