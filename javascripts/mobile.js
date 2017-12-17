(function (doc, win) {
        var docEl = doc.documentElement, //获取根节点
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () { //定义函数
                var clientWidth = docEl.clientWidth; //获取屏幕宽度
                if (!clientWidth) return; //如果获取不到屏幕宽度就返回
                if(clientWidth>= 750){
                    docEl.style.fontSize = '100px';//如果说屏幕宽度大于640px,就把rem设置为100px
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'; //
                }
                console.log(docEl.style.fontSize);
            };
            console.log(docEl.clientWidth);

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);


    