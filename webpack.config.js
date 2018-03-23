const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'app': './src/main.ts',
    'polyfills': './src/polyfills.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ts|js)$/,
        loaders: [
          'angular-router-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
            polyfills: {
                test: /polyfills.ts/,
                name: "polyfills",
                chunks: "initial",
                enforce: true
            }
        }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'app.component.html',
      template: 'src/app/app.component.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'test.component.html',
      template: 'src/app/test/test.component.html'
    }),
    new webpack.ContextReplacementPlugin(
      // if you have anymore problems tweet me at @gdi2290
      // The (\\|\/) piece accounts for path separators for Windows and MacOS
      /(.+)?angular(\\|\/)core(.+)?/,
      './src', // location of your src
      {} // a map of your routes
    )
  ]
};
