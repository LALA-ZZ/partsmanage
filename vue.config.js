

const path = require('path')
function resolve (dir){
  return path.join(__dirname,dir)
}


module.exports = {
  configureWebpack: {
    resolve: {
      //路径别名配置
      alias: {
        '@': resolve('src'),
        // 'assets': resolve('@/assets'),
        // 'common': resolve('@/common'),
        // 'components': resolve('@/components'),
        // 'network': resolve('@/network'),
        // 'views': resolve('@/views'),
      }
    }
  },
  chainWebpack: (config) => {

    //配置 svg-sprite-loader
    // 第一步：让其他svg loader不要对src/icons进行操作
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg'))
      .end()
    // 第二步：使用svg-sprite-loader 对 src/icons下的svg进行操作
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      //定义规则 使用时 <svg class="icon"> <use xlink:href="#icon-svg文件名"></use>  </svg>
      .options({
        symbolId: 'icon-[name]'
      })
      .end()


      // 发布模式
      config.when(process.env.NODE_ENV === 'production', config =>{
        config.entry('app').clear().add('./src/main-prod.js')
        config.set('externals',{
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex:'Vuex',
          axios: 'axios',
          echarts:'echarts',
          // nprogress: 'NProgress',
          'element-ui':'element-ui',
          xlsx: 'xlsx',
          jspdf:'jspdf',
          html2canvas: 'html2canvas'
          })
      })

      // 开发模式
      config.when(process.env.NODE_ENV === 'development', config =>{
        config.entry('app').clear().add('./src/main-dev.js')
      })
  }


}



