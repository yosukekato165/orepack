const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // プリセットを指定することで、ES2020 を ES5 に変換
              '@babel/preset-env',
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browsers: ['last 2 versions']
              },
              plugins: [
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg|webp)$/,
        // 画像を埋め込まず任意のフォルダに保存する
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      minify: false
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/images",
          to: "./images/"
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '65-80'
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 1,
        colors: 256
      },
      svgo: {
      },
      plugins: [
        ImageminMozjpeg({
          quality: 80,
          progressive: true
        })
      ]
    })
  ]
};
