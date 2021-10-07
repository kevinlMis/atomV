"use strict";
const path = require("path");
const time = new Date().getTime();
const name = "atomV";
const resolve = dir => {
  return path.join(__dirname, dir);
};

const port = process.env.port || "8081";
module.exports = {
  transpileDependencies: ['element-ui'],
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    host: "127.0.0.1",
    open: true,
    https: false,
    proxy: {
      '/dev-api/': {
        target: 'http://10.220.113.110:8080',
        changeOrigin: true,
        pathRewrite: {
          '/tpridmp/': '/',
          '/home_page/': '/'
        }
      }
    },
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    output: {
      filename: `static/js/[name]-[hash].js?time=${time}`,
      chunkFilename: `static/js/[name]-[hash].js?time=${time}`
    },
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config =>
        config.devtool("cheap-source-map")
      );

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [{
          // `runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/
        }])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
  // css: {
  //   loaderOptions: {
  //     css: {},
  //     postcss: {
  //       plugins: [
  //         require("postcss-px2rem")({
  //           // 以设计稿750为例， 750 / 10 = 75 /12
  //           remUnit: 12
  //         })
  //       ]
  //     }
  //   }
  // }
};
