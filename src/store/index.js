import Vue from 'vue'
import Vuex from 'vuex'


import tab from "./modules/tab";

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

//1.安装插件
Vue.use(Vuex)
//2.创建对象
const state = {

}

const store = new Vuex.Store({
    state,
    //mutation不能做异步操作
    actions,
    getters,
    mutations,
    modules: {
        tab,
    }
})
//3.导出
export  default store
