/**
 * Created by Administrator on 2017/6/5.
 */
//自定义控制器，用来控制主页面的数据。
var app = angular.module("app");
app.controller("MovieController",["$scope","$routeParams","baseUrl","apiKey","xmgHttp", function ($scope,$routeParams,baseUrl,apiKey,xmgHttp) {
    //console.log($routeParams.type);
    //console.log(baseUrl);
    $scope.isLoading = true
    var url = baseUrl + $routeParams.type;
    //1.4定义当前的页面 ,和条目数。
    $scope.curPage = 1;
    $scope.count = 5;
    $scope.loadData = function (start) {
    //在请求豆瓣数据的时候，要求传入参数start， count（意思是从什么位置开始取这个数据，一共取多少条数据）
    var params = {
        start:start,
        count:5,
        apiKey:apiKey
    }
    //xmgHttp服务是下面自定义的，这里我们需要注入服务，然后就可以使用了（把这里面的参数传入到下面的服务里，下面的服务运行好了返回到这里显示结果。）(回调函数)
    xmgHttp.jsonp(url,params, function (res) {
        //console.log(res);
        $scope.data = res               //请求到了数据
        //console.log($scope.data);
        $scope.isLoading = false
        //获取总共的条目数，除以每页有多少条目，得到总共的页数。（绑定到页面上）
        $scope.totalPage = Math.ceil($scope.data.total / $scope.count);
        $scope.$apply()
    })
}


    /********************************************************************************/


    //3.1封装完以后，从哪开始的条目是变化的，所以要传入参数。
    //在刚进页面的时候，直接加载第一页的条目，所以调用loadData传入参数0
    $scope.loadData(0);
    //4.在刚进页面的时候，隐藏上一页。
    $scope.isHidePre = false;
    $scope.isHideNext = true;


    //实现翻页功能
    //1.翻页功能
   $scope.page = function (type) {
       //1.1点击的时候传入type，判断点击的是上一页还是下一页
       if(type == true){
           $scope.curPage--;
           //1.2上一页
       }else{
           $scope.curPage++;
           //1.3下一页
       }
       //2.当翻页的时候，确定翻到的页面的条目信息从哪开始。
       var start = ($scope.curPage - 1) * $scope.count;
       console.log(start);
       //4.
        $scope.isHidePre = $scope.curPage == 1 ? false : true;
        $scope.isHideNext = $scope.curPage == 9 ? false : true;
       //3.获取数据,由于获取数据就需要再写一遍请求数据的代码，所以我们把这段代码封装起来。
       $scope.loadData(start);
   }






}])