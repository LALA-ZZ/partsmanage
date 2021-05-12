

// 项目开发阶段需要用到的Babel插件
const prodPlugins=[]
if(process.env.NODE_ENV === 'production'){
  prodPlugins.push('transform-remove-console')
}


module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    
    // 发布产品时的插件数组，只在发布阶段移除所有的console
    ...prodPlugins,
    // 'transform-remove-console',
    '@babel/plugin-syntax-dynamic-import',
  ],
  
}
