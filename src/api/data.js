import axios from '@/libs/api.request'
import qs from 'qs'
export const axiosFunc = (url,type,params,flag) => {
  //请求的参数不一样；
  if(type == 'post'){
     if(flag==true){
      return axios.request({
        url: url,
        method: type,
        data:qs.stringify(params)
      })
     }else{
      return axios.request({
        url: url,
        method: type,
        data:qs.stringify(params)
      })
     }
  }else{
      return axios.request({
          url: url,
          method: type,
          params:params
      })
  }
}
