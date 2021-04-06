

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
  },
  
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8080',
    proxy: {  //配置跨域
    '/api': {
      target: 'http://192.168.50.219:8080/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
      changOrigin: true,  //允许跨域
      pathRewrite: {
        /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
          实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
         */
        '^/api': '' 
      }
    },
  }
},


}



