/**
 * Created by Administrator on 2017/6/5.
 */
var app =  angular.module("app");
//自定义控制器，用来控制详情页面的数据。
app.controller("DetailController",["$scope","$routeParams","baseUrl","xmgHttp", function ($scope,$routeParams,baseUrl,xmgHttp) {
    //alert($routeParams.id);
    var url = baseUrl+ 'subject/'+$routeParams.id;
    console.log(url);
    xmgHttp.jsonp(url,null, function (res) {
        console.log(res);
        $scope.data = res;
        $scope.$apply();
    })


}])