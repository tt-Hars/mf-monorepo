const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        budgT: 'budgT@http://localhost:3001/remoteEntry.js',
        splittR: 'splittR@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        '@reduxjs/toolkit': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
