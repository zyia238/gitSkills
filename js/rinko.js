window.onload = function () {
    var timer = null;
    //创建图片下方的小圆圈
    var ul = document.querySelector('ul');
    var lis = ul.querySelectorAll('li');
    var ol = document.querySelector('ol');
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        var newLi = document.createElement('li');
        ol.appendChild(newLi);
    }
    //点击哪个小圆圈就跳转到哪张图片
    var ol_lis = ol.querySelectorAll('li');
    ol_lis[0].className = 'current';
    var step = document.querySelector('img').offsetWidth;
    for (var i = 0; i < ol_lis.length; i++) {
        ol_lis[i].setAttribute('index', i);
        ol_lis[i].onclick = function () {
            var index = this.getAttribute('index');
            for (var i = 0; i < ol_lis.length; i++) {
                ol_lis[i].className = '';
            }
            this.className = 'current';
            slide(ul, -index * step);
        }
    }
    //给小a绑定点击事件
    var left_a = document.querySelectorAll('a')[0];
    var right_a = document.querySelectorAll('a')[1];
    ul.appendChild(lis[0].cloneNode(true));
    var newLis = document.querySelectorAll('ul li').length;
    var num = 0;
    right_a.onclick = function () {
        num++;
        if (num < newLis) {
            slide(ul, -num * step);
        } else {
            num = 0;
            ul.style.left = -num++ * step + 'px';
            slide(ul, -num * step);
        }
    }
    left_a.onclick = function () {
        num--;
        if (num < 0) {
            num = newLis -2;
            ul.style.left = -(newLis -1) * step + 'px';
            console.log(ul.style.left)
            slide(ul, -num * step);
        } else {
            slide(ul, -num * step);
        }
    }
    
    function slide(obj, target, callback){ 
        clearInterval(timer);
        timer = setInterval(function(){
            var initX = obj.offsetLeft;
            var step = target - initX > 0?  Math.ceil((target - initX)/10) : Math.floor((target - initX)/10);
            if(initX != target){
                obj.style.left = initX + step + 'px';
            }else{
                clearInterval(timer);
                callback && callback();
            }
        },15)
    }

}

