module.exports = {
  configureWebpack: {
    resolve: {
      //路径别名配置
      alias: {
        '@': '/src',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
