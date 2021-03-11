import Cookie from 'vue-cookies'

export default {
    state: {
        isCollapse: false,//是否将左边的菜单折叠
        currentMenu: null,//当前点击的菜单
        bread:null,
        menu: [],//存储动态菜单
        // breadList:[],//存储面包屑
        tabsList: [
            {
                path: '/welcome',
                name: 'welcome',
                label: '首页',
                icon: 'home'
            }
        ]
    },
    mutations: {
        setMenu(state,val){//设置动态菜单（根据权限）
          state.menu = val;
          console.log(val + 'ahhahahah ')
          sessionStorage.setItem('menu',JSON.stringify(val))
          Cookie.set('menu',JSON.stringify(val));//JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
          // console.log(val,'vuex')
          console.log(sessionStorage.getItem('menu'))
          console.log(Cookie.get('menu') + ' setMenu')
        },

        clearMenu(state){//登录人员退出之后需要清除cookie
          state.menu = [];
          Cookie.remove('menu')
        },
        
        addMenu(state , router){//添加动态的路由
          console.log(Cookie.get('menu')+' addMenu')
          // if(!Cookie.get('menu')){
          //   return
          // }
          if(!sessionStorage.getItem('menu')){
            return
          }
          
          // let menu =JSON.parse(Cookie.get('menu')) ;//首先获取cookie中菜单
          // if(!menu){
          //   return
          // }

          // let menu =JSON.parse(Cookie.get('menu')) ;//首先获取cookie中菜单
          let menu =JSON.parse( sessionStorage.getItem('menu'))
          state.menu = menu
          let currentMenu = [
            {
              path: '/', 
              component: () => import(`@/views/Main`),
              children: [] 
            }
          ];
          menu.forEach(item =>{
            if(item.children){
              item.children =item.children.map(item => {
                item.component = () => import(`@/views/${item.url}`)//url表示是组件的位置 
                return item
              });
              currentMenu[0].children.push(...item.children)//3个点表示children 子路由需要展开
            }else{
              item.component = () => import(`@/views/${item.url}`);
              currentMenu[0].children.push(item);
            }
          })
          console.log(currentMenu,'cur')
          router.addRoutes(currentMenu)//添加动态路由
        },
        //获取当前的页面
        selectMenu(state,value ) {
          
            if (value.name !== 'welcome'){
              // console.log(value)
                //将点击的菜单传给当前的菜单（面包屑）
                // state.bread = value1
                // console.log(state.bread)
                state.currentMenu = value;
                //将点击的菜单添加给标签页(处理重复的标签）
                const result = state.tabsList.findIndex(item => item.name === value.name)
                result === -1 ? state.tabsList.push(value) : '';
            }else {
                // state.bread = null
                state.currentMenu = null;
            }
            // value.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = value);
        },
        //关闭标签页
        closeTabs(state, value){
            //根据tablist索引来删除标签
            const result = state.tabsList.findIndex(item => item.name === value.name);
            state.tabsList.splice(result,1);
            
        },
        //收缩左边的菜单栏，默认是不展开
        collapseMenu(state){
            state.isCollapse = !state.isCollapse;
        }
    },
    actions: {}
}