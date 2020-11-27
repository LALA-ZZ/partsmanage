import Cookie from 'vue-cookies'

export default {
    state: {
      token: '',//保存从服务器段获得的token
    },



    mutations: {
      setToken(state,val){//将从服务器段获得的token保存在state和cookie中
        state.token = val;
        Cookie.set('token',val);
      },
      clearToken(state){// 清除token
        state.token = '';
        Cookie.remove('token');
      },
      getToken(state){//在刷新页面的时候，token会丢失，所有要从cookie中重新获取token
        state.token = Cookie.get('token')
      }

    },



    actions: {}
}