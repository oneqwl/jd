/**
 * Created by Administrator on 2017/6/5.
 */
var app = angular.module("app");
//自定义value服务，我们要知道豆瓣的api（这个api是常量不会改变，所以使用value服务）
app.value("baseUrl","https://api.douban.com/v2/movie/");
app.value("apiKey","0b2bdeda43b5688921839c8ecb20399b");