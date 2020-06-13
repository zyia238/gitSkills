window.onload = function () {
    //控制小a的变量
    var num = 0;
    //控制小圆圈的变量
    var circles = 0;
    var timer = null;
    //创建图片下方的小圆圈
    var ul = document.querySelector('ul');
    var lis = ul.querySelectorAll('li');
    var ol = document.querySelector('ol');
    //给每个小圆圈添加自定义属性index，生成小圆圈并添加到下方的ol中
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        var newLi = document.createElement('li');
        ol.appendChild(newLi);
    }
    //点击哪个小圆圈就跳转到哪张图片
    var ol_lis = ol.querySelectorAll('li');
    ol_lis[0].className = 'current';
    //步长为每张图片的宽度，旨在提供动画函数 target 参数的数值，公式为 index * step
    var step = document.querySelector('img').offsetWidth;
    for (var i = 0; i < ol_lis.length; i++) {
        ol_lis[i].setAttribute('index', i);
        ol_lis[i].onclick = function () {
            var index = this.getAttribute('index');
            circles = index;
            circle();
            slide(ul, -circles * step);
        }
    }
    //给小a绑定点击事件
    var left_a = document.querySelectorAll('a')[0];
    var right_a = document.querySelectorAll('a')[1];
    //实现原理的核心就是将第一张图片放到ul的最后面
    ul.appendChild(lis[0].cloneNode(true));
    var newLis = document.querySelectorAll('ul li').length;
    right_a.onclick = function () {
        //当前图片走的克隆的图片上时
        if (num == newLis - 1) {
            num = 0;
            ul.style.left = '0px';
            num++;
            slide(ul, -num * step);
        } else {
            num++;
            slide(ul, -num * step);
        }
        // *******************
        // 设置与控制小a的参数相独立的专门控制小圆圈的变量，使小圆圈样式的变化不受num变量影响
        // *******************

        circles++;
        if (circles == newLis - 1) {
            circles = 0;
        }
        circle();
    }
    // 继续为左箭头绑定事件处理函数
    left_a.onclick = function () {
        if (num == 0) {
            num = newLis - 2;
            ul.style.left = -(newLis - 1) * step + 'px';
            slide(ul, -num * step);
        } else {
            num--;
            slide(ul, -num * step);

        }
        circles--;
        if (circles < 0) {
            circles = newLis - 2;
        }
        circle();
    }
    //封装简单的动画函数，只能左右移动，且主要接受三个参数.
    function slide(obj, target, callback) {
        clearInterval(timer);
        timer = setInterval(function () {
            var initX = obj.offsetLeft;
            var step = target - initX > 0 ? Math.ceil((target - initX) / 10) : Math.floor((target - initX) / 10);
            if (initX != target) {
                obj.style.left = initX + step + 'px';
            } else {
                clearInterval(timer);
                callback && callback();
            }
        }, 15)
    }
    //格式化小圆圈样式
    function circle() {
        for (var i = 0; i < ol_lis.length; i++) {
            ol_lis[i].className = '';
        }
        ol_lis[circles].className = 'current';
    }

    //轮播图自动播放功能简单实现,核心原理为在固定时长下手动触发点击右侧小a
    var timer2 = null;
    clearInterval(timer2);
    var timer2 = setInterval(function () {
        right_a.click();
    }, 2000);

    var div = document.querySelector('div.focus');
    div.addEventListener('mouseenter', function () {
        clearInterval(timer2);
    });

    div.addEventListener('mouseleave', function () {
        timer2 = setInterval(function () {
            right_a.click();
        }, 2000)
    })

}