/**
 * Created by Administrator on 2017/6/5.
 */

(function (angualr) {
    //   https://api.douban.com/v2/movie/in_theaters    正在热映
    //v2/movie/coming_soon      即将上映
    ///v2/movie/top250          top250
    //创建模块
    var app = angular.module("app",["ngRoute"]);
    //创建控制器
    app.controller("xmgController",["$scope", function ($scope) {
        $scope.title = "豆瓣电影排行榜"

    }])












    /*
     //跨域！！！！！
     function gxq(arg) {
     //1.在本地声明一个方法
     //1.1随机生成一个方法名称
     //1.2.动态添加一个方法
     }

     //2.通过script src  请求数据
     //2.1动态创建一个script标签。
     //2.2拼接src的url.    Url + para + callback=生成方法名称。
     //2.3添加到dom节点当中
     //2.3.请求成功时，删除script标签。
     <script src="https://api.douban.com/v2/book/1220562?callback=gxq"></script>
     */


})(angular)