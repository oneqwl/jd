/**
 * Created by Administrator on 2017/6/6.
 */
angular.module("app").directive("sel", ["$location",function ($location) {
    return{
        restrict:"A",
        link: function ($scope,ele,attr) {
            //console.log(ele);
            //监听锚点的变化
            $scope.$location = $location;
            //console.log($scope.$location.url());
            $scope.$watch("$location.url()", function (newV,oldV) {
                //获取a标签的属性值
                var href = ele.find("a").attr("href").slice(2);
                //console.log(href);
                //判断切换的锚点与当前的地址属否相同
                if(href == newV){
                    ele.parent().children().removeClass(attr.sel);
                    ele.addClass(attr.sel);
                }
            })
        }
    }
}])