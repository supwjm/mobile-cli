const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const merge = require('webpack-merge');
const path = require('path');
const root = path.resolve(__dirname,'../');
const buildPath = path.resolve(root,"./build");
const src = path.join(root, 'src');
const theme = require('../theme.js');

function resolve (dir) {
  let sPath = path.join(__dirname, '..', dir);
  return sPath;
}

const commonConfig = {
  context: root,
  entry: {
    vendors: ["react", "react-dom", "react-router", "react-redux", "js-cookie"],
    app: ["babel-polyfill",root + '/src/main.js']
  },
  output: {
    publicPath:"/",
    path: buildPath
  },
  //配置别名之后，按需加载插件的 Loadable.preloadAll似乎没执行
  // resolve: {
  //   extensions: ['.js', '.json'],
  //   alias: {
  //     'COMPONENT': resolve('src/components'),
  //   }
  // },
  module: {
    rules: [
          {
            test: /\.scss|css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 2,
                      modules: false //是否启动启动css模块
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      config: {
                        path: root+'/webpack/postcss.config.js'  // 这个得在项目根目录创建此文件
                      }
                    }
                  },
                  'sass-loader'
                ]
            })
          },
          {
              test: /\.less$/,
              use: [
                  'style-loader',
                  'css-loader',
                  {loader: 'less-loader', options: {modifyVars: theme()}},
              ],
              include: /node_modules/
          },
          {
            test:/\.(png|svg|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 3000
                }
              },{
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 65
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75
                  }
                }
              }
            ]
          },
          {
              test: /(\.jsx|\.js)$/,
              use: {
                  loader: "babel-loader",
                  options: {
                      presets: [
                        "env", "react"
                      ],
                      plugins: [
                        "react-loadable/babel",
                        "syntax-dynamic-import",
                        ["import", {"libraryName": "antd-mobile", "style": true}]
                      ]
                  }
              },
              exclude: /node_modules/
          }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles-[contenthash].css",{allChunks:true}),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors'}),
    new webpack.optimize.CommonsChunkPlugin({name: 'runtime'}),
    new ReactLoadablePlugin({
      filename: './loadable/react-loadable.json',
    }),
    new HtmlWebpackPlugin({template: './src/template/template.html'})
  ]
};

const cleanConfig = {
  plugins: [
    new CleanWebpackPlugin(["build"],root)
  ]
};


const buildConfig = {
  output:{
    filename:'[name].[chunkhash].js',//热加载的时候需用hash,用chunkhash会报错
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({warnings: false, minimize: true, sourceMap: false})
  ]
};

const developmentConfig = {
  entry: {
    vendors: ["webpack-hot-middleware/client"],
  },
  output:{
    filename:'[name].[hash].js',//热加载的时候需用hash,用chunkhash会报错
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('local')//定义的这个环境变量在客户端的时候会用到
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()//可以保证出错时页面不阻塞，且会在编译结束后报错
  ]
};

function mergeConfig() {
  let common = commonConfig;
  common = merge(commonConfig,cleanConfig);

  switch ( process.env.NODE_ENV ) {
    case 'local':
      return merge(
        developmentConfig,
        common
      );
      break;
    case 'dev':
    case 'stg':
    case 'production':
    default:
      console.log("【代码压缩】");
      return merge(
        common,
        buildConfig
      );
  }
}

const config = mergeConfig();

module.exports = config;
