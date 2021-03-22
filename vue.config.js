module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: false, // 不校验代码格式

  devServer: {
    host: '0.0.0.0',
    public: '192.168.1.21',
    port: '',
    disableHostCheck: true,
    proxy: {
      '/athena': {
        target: 'http://x.wego168.com/',
        changeOrigin: true,
        pathRewrite: {
          '/athena': 'athena'
        }
      },
      '/wghjy': {
        target: 'http://x.wego168.com/',
        changeOrigin: true,
        pathRewrite: {
          '/wghjy': 'wghjy'
        }
      },
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ]
      }
    }
  }
}