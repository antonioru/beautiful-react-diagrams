/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// local constants
const sourcePath = path.resolve(__dirname, '../..', 'src');

module.exports = () => ({
  entry: [
    `${sourcePath}/theme/index.scss`,
    `${sourcePath}/index.js`,
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'beautiful-react-diagrams.dev.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss'],
    alias: { 'beautiful-react-diagrams': sourcePath },
  },
  devServer: {
    open: true,
    hot: false,
    liveReload: true,
    watchContentBase: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'beautiful-react-diagrams.dev.css' }),
  ],
});
