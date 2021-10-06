/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// local constants
const sourcePath = path.resolve(__dirname, '../..', 'src');

module.exports = () => ({
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', 'scss'],
    alias: { 'beautiful-react-diagrams': sourcePath },
  },
  devServer: {
    contentBase: sourcePath,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
