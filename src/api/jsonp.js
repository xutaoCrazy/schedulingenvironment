export const Ajax = (params) => {
  params = params || {};
  params.data = params.data || {};
  var _json = jsonp(params);
}

const jsonp = (params) => {
  var callbackName = params.jsonp; // 回调函数名
  var head = document.getElementsByTagName("head")[0];
  params.data["callback"] = callbackName;
  var data = formatParams(params.data);
  var script = document.createElement("script");
  head.appendChild(script);
  // 创建jsonp函数，成功后自动让success函数调用，在自动删除
  window[callbackName] = function (json) {
    // 设置回调，获取后台数据后才执行
    head.removeChild(script);
    clearTimeout(script.timer);
    window[callbackName] = null;
    params.success && params.success(json);
  };
  script.src = params.url + "?" + data; // 设置src的时候才开始向后台请求数据
  if (params.time) {
    // 限定时间
    script.timer = setTimeout(function () {
      window[callbackName] = null;
      head.removeChild(script);
      params.error &&
        params.error({
          message: "超时"
        });
    }, params.time);
  }
}
export const formatParams = (data) => {
  // 使用 encodeURIComponent 对 URI的某部分编码
  var arr = [];
  for (var key in data) {
    arr.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    );
  }
  // 添加随机数，防止缓存
  arr.push("v=" + random());
  return arr.join("&");
}

export const random = () => {
  return Math.floor(Math.random() * 10000 + 500);
}

export const setHeaders = (xhr, headers) => {
  for (var key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
}

export const checkPermission = (centerurl, data, url) => {
  let p = new Promise((resolve, reject) => {
    Ajax({
      url: centerurl + "/cloud/sysUser/" + url,
      headers: {
        "Content-Type": "application/json"
      },
      data: data,
      jsonp: "getUser",
      time: 2000,
      success(resp) {
        if (resp) {
          resolve(resp)
        }
      },
      error(status) {
        console.log(`some error status = ${status.msg}`);
      }
    });
  })
  return p
}
