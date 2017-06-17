/**
 * Created by Administrator on 2017/6/5.
 */
var app = angular.module("app");
//配置路由
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/movie/:type",{
        templateUrl:"list_tpl.html",
        controller:"MovieController"                       //主页面路由
    }).when("/detail/:id",{
        templateUrl:"movie_detail_tpl.html",
        controller:"DetailController"                   //详情页面路由
    }).otherwise({
        redirectTo:'/movie/in_theaters'
    });
}])