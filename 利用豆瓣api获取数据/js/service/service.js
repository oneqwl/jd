/**
 * Created by Administrator on 2017/6/5.
 */
var app = angular.module("app");
//由于是从豆瓣获取数据，那么就涉及到了跨域，而angular跨域豆瓣去除不掉“.”所以使用src跨域
app.service("xmgHttp",["$window", function ($window) {
    this.jsonp = function (url,params,fn) {
        //1.在本地声明一个方法
        //1.1随机生成一个方法名称
        var callbackName = 'callback'+ Math.random().toString().slice(2)
        //alert(callbackName)
        //1.2动态添加一个方法，就要操作dom节点所以要注入一个$window服务来操作dom
        $window[callbackName] = function (res) {
            fn(res)
            $window.document.body.removeChild(newScript)
            //2.3.请求成功时，删除script标签。
        }

        //2.通过script src  请求数据
        //2.1动态创建一个script标签。
        var newScript = $window.document.createElement("script")
        //2.2.1 把对象参数转成字符串
        var queryStr = "";
        for(var key in params){
            queryStr += key + "=" + params[key]+"&"
        }
        //console.log(queryStr);
        //2.2拼接src的url.    Url + para + callback=生成方法名称。
        var src = url + "?"+queryStr+"callback="+callbackName
        console.log(src);
        newScript.src = src;
        // 2.3添加到dom节点当中
        $window.document.body.appendChild(newScript)
    }
}])