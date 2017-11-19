function ajax(json) {
  //获取ajax参数
  let url = json.url || "",
      type = (json.type || "get").toLowerCase(),
      data = json.data || "",
      contentType = json.contentType || "",
      dataType = json.dataType,
      async = json.async == undefined ? true : json.async,
      before = json.before || function() {};


  function setData() {
    let str = '';
    for(pro in data) {
      str += pro + "=" + data[pro] + "&";
    }
    str = str.substring(0,str.length -1 );
    if(type === "get"){
      url += "?" + str;
    }else {
      data = url;
    }
  }

  function jsonp(callback) {
    if (typeof data == 'string') {
      callback = data;
      data = {};
    }
    var hasParams = url.indexOf('?');
    url += hasParams ? '&' : '?' + 'callback=' + callback;
    var params = '';
    for (var i in data) {
      params += '&' + i + '=' + data[i];
    }
    url += params;

    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.querySelector('head').appendChild(script);
  }

  return new Promise((resolve, reject) => {
    if(dataType === "jsonp") {
      jsonp(resolve);
    }else {
      let xhr = new XMLHttpRequest();
      setData();
      xhr.open(type,url,async);
      if(type === 'post') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
      }
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            resolve(xhr.responseText);
          }else{
            reject(xhr.status,xhr.statussText);
            console.log("fail");
          }
        }
      }
      xhr.send(type === "get" ? null : data);
    }
  })
}
