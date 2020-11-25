

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
    // config.module.rules.delete("svg");
    // config.module
    //     .rule('svg-smart')
    //     .test(/\.svg$/)
    //     .include
    //     .add('src/icons')
    //     .end()
    //     .use('svg-sprite-loader')
    //     .loader('svg-sprite-loader')
    //     .options({
    //         symbolId: '[name]'
    //     })

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
}

//     chainWebpack(config) {
// // 配置 svg-sprite-loader
//     config.module
//       .rule('svg')
//       .exclude.add(resolve('src/icons'))
//       .end()
//     config.module
//       .rule('icons')
//       .test(/\.svg$/)
//       .include.add(resolve('src/icons'))
//       .end()
//       .use('svg-sprite-loader')
//       .loader('svg-sprite-loader')
//       .options({
//         symbolId: 'icon-[name]'
//       })
//       .end()
//   }
  // chainWebpack(config) {
  //   // 已有配置排除掉svg
  //   config.module.rule("svg")
  //       .exclude.add(resolve('src/icons'));
  //   //配置svg
  //   config.module.rule('icons')
  //       .test(/\.svg$/)
  //       .include.add(resolve('src/icons')).end()
  //       .use('svg-sprite-loader')
  //           .loader('svg-sprite-loader')
  //           .options({symbolId: 'icon-[name]'})
  // }


  // configureWebpack: {
  //   // provide the app's title in webpack's name field, so that
  //   // it can be accessed in index.html to inject the correct title.
  //   resolve: {
  //     alias: {//路径别名配置
  //       '@': resolve('src'),
  //       'assets': resolve('@/assets'),
  //       'common': resolve('@/common'),
  //       'components': resolve('@/components'),
  //       'network': resolve('@/network'),
  //       'views': resolve('@/views'),
  //     }
  //   }
  // },
 
  
    // // 已有配置排除掉svg
    // config.module.rule("svg")
    //     .exclude.add(resolve('src/icons'));
    // //配置svg
    // config.module.rule('icons')
    //     .test(/\.svg$/)
    //     .include.add(resolve('src/icons')).end()
    //     .use('svg-sprite-loader')
    //         .loader('svg-sprite-loader')
    //         .options({symbolId: 'icon-[name]'})

  
  


}



