import axios from 'axios'
// import { config } from 'vue/types/umd'



// 1.创建axios实例
const instance = axios.create({
    timeout: 3000
})
// 2.请求拦截(比如发发送请求之前，给它的请求头加入一个token值传给后端，这样就不用给每个加token值了)
instance.interceptors.request.use(config =>{
  
  // console.log(config)
  //为请求头对象添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
},err =>{
    console.log(err)
})

// 3.添加响应拦截
instance.interceptors.response.use(response =>{
    let res = {};//根据状态码做判断
    res.status = response.status;
    res.data = response.data;
    return res
},err => {
    console.log(err)
})

export default instance