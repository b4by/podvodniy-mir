const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const isDev = process.env.NOVE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const cssLoaders = (prep) => {
  
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          path: 'postcss.config.js'
        }
      }
    }
  ]

  if (prep) {
    loaders.push(prep)
  }
  
  return loaders
}

module.exports = {
  mode: process.env.NOVE_ENV || 'development',
  entry: './src/index.js',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  optimization: optimization(),
  plugins: [
    new HtmlWebpackExternalsPlugin({ // optional plugin: inject cdn
      externals: [
        {
            module: 'jquery',
            entry: 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
        }
      ],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'source',
                attribute: 'src',
                type: 'src'
              },
              {
                tag: 'link',
                attribute: 'href',
                type: 'src',
              }
            ]
          },
          minimize: {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[path][name].[hash].[ext]'
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
    ]
  },
  devServer: {
    port: 4200,
    hot: isDev
  }
}