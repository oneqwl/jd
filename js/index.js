/**
 * Created by Administrator on 2017/6/15.
 */
$(document).ready(function () {
    var sub = $('#sub');
    //声明变量，不赋值，那么这个变量就是undefined
    var activeRow;  //选中的行
    var activeMenu;  //选中的行对应的二级菜单

    var timer;  //setTimeout返回的计时器的变量名称

    //4.1声明一个变量，用来标识当前鼠标是否在子菜单里面。
    var mouseInSub = false;
    sub.on('mouseenter', function (e) {
        mouseInSub = true;
    }).on('mouseLeave', function (e) {
        mouseInSub = false;
    })
    //定义一个数组
    var mouseTrack = [];
    //5.1添加鼠标的坐标到数组中
    var moveHandler = function (e) {
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        })
        //保存的位置信息只需要当前的位置和上一个位置
        if(mouseTrack.length > 3){
            mouseTrack.shift()
        }
    }

    $('#test')
    //1.当鼠标移入test标签包含的内容上的时候，清除类none
        .on('mouseenter', function (e) {
            sub.removeClass('none')
            //5.绑定事件，当鼠标移动的时候，添加鼠标的坐标到数组中
             $(document).bind('mousemove',moveHandler)
        })
        //2.当鼠标离开test标签包含的内容上的时候，给二级菜单添加类none
        .on('mouseleave', function (e) {
            sub.addClass('none')
            //console.log(activeRow);
            //2.1此时根据下面的activeRow = $(e.target)，activeRow已经有值，就是鼠标移入的li，所以当鼠标移出li的时候清除类active
            if(activeRow){
                activeRow.removeClass('active')
                activeRow = null;
            }
            //2.2activeMenu的值根据下面activeMenu = $('#' + activeRow.data('id'));获取到二级菜单的id，这个id和一级菜单上的id对应。也就是说当鼠标移入到某个li的时候，就会获取这个li的id，以此来对应二级菜单的id来进行隐藏/显示二级菜单的操作。
            if(activeMenu){
                activeMenu.addClass('none');
                activeMenu = null;
            }
            //5.2解绑鼠标移动事件
            $(document).unbind('mousemove',moveHandler);
        })
        //3.鼠标移入到以及菜单的li中
        .on('mouseenter','li', function (e) {
            //alert(!activeRow)
            //3.1当鼠标移入某个li的时候，activeRow还没有值，所以!activeRow为true。
            if(!activeRow){
                //获取到事件触发的元素
                //console.log($(e.target));
                activeRow = $(e.target).addClass('active');

                //当鼠标移入li上的时候获取当前li的id
                //console.log(activeRow.data('id'));
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
                return;
            }
            //4.当mouseenter频繁触发的时候我们只希望执行最后一次
            //如果mouseenter事件触发的时候，计时器还没有执行，我们就清空计数器
            if(timer){
                clearTimeout(timer)
            }

            //5.3 从数组中拿到当前的坐标和上一次的坐标
            var currMousePos = mouseTrack[mouseTrack.length - 1]
            var leftCorner = mouseTrack[mouseTrack.length - 2]
            var delay = needDelay(sub,leftCorner,currMousePos)//三角形区域
            if(delay){ //如果在三角形内，需要延迟
                //事件触发的时候，我们设置一个缓冲期
                timer = setTimeout(function () {
                    //4.2判断，如果鼠标在子菜单里面，不处理，立刻返回。
                    if(mouseInSub){
                        mouseInSub = false;
                        return;
                    }
                    activeRow.removeClass('active');
                    activeMenu.addClass('none');

                    activeRow = $(e.target).addClass('active');
                    activeMenu = $('#' + activeRow.data('id'));
                    activeMenu.removeClass('none');
                    timer = null;
                },300)
            }else{
                var prevActiveRow = activeRow
                var prevActiveMenu = activeMenu

                activeRow = $(e.target)
                activeMenu = $('#'+ activeRow.data('id'))

                prevActiveRow.removeClass('active');
                prevActiveMenu.addClass('none')//上一次二级菜单隐藏
                activeRow.addClass('active')
                activeMenu.removeClass('none')//上一次二级菜单显示

            }
        })
})

//简单来说，this就是指向当前事件所绑定的元素，而e.target指向事件执行时鼠标所点击区域的那个元素。容易搞不懂的地方是，初学者会认为当前事件所绑定的元素不就是鼠标所点击的那个元素嘛，这时候就要看看时间绑定的元素内部有没有子元素了，如果有子元素的话e.target指向这个子元素，如果没有，e.target和this都指向事件所绑定的元素。