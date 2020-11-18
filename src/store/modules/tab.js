export default {
    state: {
        isCollapse: false,//是否将左边的菜单折叠
        currentMenu: null,//当前点击的菜单
        menu: [],
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ]
    },
    mutations: {
        //获取菜单
        selectMenu(state, value) {
            if (value.name !== 'home'){
                //将点击的菜单传给当前的菜单（面包屑）
                state.currentMenu = value;
                //将点击的菜单添加给标签页(处理重复的标签）
                const result = state.tabsList.findIndex(item => item.name === value.name)
                result === -1 ? state.tabsList.push(value) : '';
            }else {
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