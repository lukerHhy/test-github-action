const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const Timestamp = new Date().getTime();

const isDev = process.env.NODE_ENV === "development";
module.exports = {
  productionSourceMap: false,
  css: {
    // sourceMap: !isDev
    sourceMap: false,
    extract: true,
  },
  // 部署应用包时的基本 URL
  // publicPath: isDev ? "/" : process.env.VUE_APP_ASSET_PATH,
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    config.plugin("html").tap((args) => {
      // 设置页面标题的icon
      args[0].favicon = path.join(
        __dirname,
        `./src/current_project/favicon.ico`
      );
      return args;
    });
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    config.resolve.alias.set("@assets", resolve(`src/current_project`))
      .set('@agent', resolve(`src/views/new_agent`))
    if (!isDev) {
      // let miniCssExtractPlugin = new MiniCssExtractPlugin({
      //   filename: 'assets/[name].[hash:8].css',
      //   chunkFilename: 'assets/[name].[hash:8].css'
      // })
      // config.plugin('extract-css').use(miniCssExtractPlugin).end()
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
          // `runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/
        }])
        .end()
      config
        .optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            vantUI: {
              name: 'chunk-vantUI', // split vantUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
            },
            Echart: {
              name: 'chunk-echart', // split vantUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?echarts(.*)/ // in order to adapt to cnpm
            },
            Swiper: {
              name: 'chunk-swiper', // split vantUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?swiper(.*)/ // in order to adapt to cnpm
            },
            Zrender: {
              name: 'chunk-zrender', // split vantUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?zrender(.*)/ // in order to adapt to cnpm
            },
            I18n: {
              name: 'chunk-i18n', // split vantUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]public[\\/]_?i18n(.*)/ // in order to adapt to cnpm
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
      config.optimization.runtimeChunk('single')
      config.optimization.minimize(true)
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          test: /\.js$|\.html$|.\css$|\.otf$|\.ttf/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }))
      // config.module.rule('images')
      //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({ bypassOnDebug: true })
    }
    // 需要安装 style-resources-loader 与stylus一致
    const oneOfsMap = config.module.rule("less").oneOfs.store;
    oneOfsMap.forEach((item) => {
      path.resolve(__dirname, `reference.less`),
          path.resolve(__dirname, `reference.less`),
          item
        .use("style-resources-loader")
        .loader("style-resources-loader")
        .options({
          // 需要插入的文件路径数组
          patterns: [
            path.resolve(__dirname, `src/current_project/styles/common.less`),
            path.resolve(__dirname, `src/assets/new_agent.less`),
            // path.resolve(__dirname, `reference.less`),
          ],
        })
        .end();
    });
  },
  configureWebpack: {
    plugins: !isDev ? [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"],
          },
        },
      }),
    ] : [],
  },
};
