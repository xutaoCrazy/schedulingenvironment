import axios from '@/libs/api.request'
import qs from 'qs'
export const axiosFunc = (url, type, params, flag) => {
  //请求的参数不一样；
  if (type == 'post') {
    if (flag == true) {
      return axios.request({
        url: url,
        method: type,
        data: qs.stringify(params)
      })
    } else {
      return axios.request({
        url: url,
        method: type,
        data: qs.stringify(params)
      })
    }
  } else {
    return axios.request({
      url: url,
      method: type,
      async: false,
      params: params
    })
  }
}
export const promiseShifts = (url, type, params, flag) => {
  //请求的参数不一样；
  let data = new Promise((resolve, reject) => {
    let save = axiosFunc(url, type, params, flag);
    resolve(save);
  });
  return data;
}
