$(function () {
    var bgm = document.getElementById('audio'); // 背景音乐
    var timer;
    audioAutoPlay(bgm);


    $('#fullpage').fullpage({
        verticalCentered: true,
        css3: true,
        navigation: false,
        navigationPosition: 'right',
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex === 5) {
                $('.scroll-img img').animate({marginTop: '-870px'}, 11000);
            } else {
                $('.scroll-img img').css('margin-top', '0');
            }

            if (nextIndex === 9) {
                $('.img9-1').fadeOut(6000);
                $('.arrow').hide();
                timer = setTimeout(function () {
                    $('.img9-2').fadeIn(2000);
                }, 6000);
            } else {
                clearTimeout(timer);
                $('.img9-1').show(400);
                $('.img9-2').hide();
                $('.arrow').show();
            }

            animate(2, 'fadeInLeft');
            animate(3, 'fadeInRight');
            animate(4, 'fadeInLeft');
            animate(6, 'fadeIn');
            animate(7, 'zoomIn');
            animate(8, 'fadeInRight');

            function animate(index, action) {
                if (nextIndex === index) {
                    $('.img' + index).addClass('animated ' + action);
                } else {
                    $('.img' + index).removeClass('animated ' + action);
                }
            }
        },
    });


    // 背景音乐
    function audioAutoPlay(audio) {
        audio.play();
        if (util.isWeiXin()) {
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
        }
        // document.addEventListener('touchstart', function () {
        //     audio.play();
        // }, false);

    }

    $(".mute").click(function (e) {
        e.stopPropagation();
        if (bgm.paused) {
            bgm.play();
            $(".mute").attr('src', './img/play.png');
        } else {
            bgm.pause();
            $(".mute").attr('src', './img/mute.png');
        }
    });


    // 微信分享
    $.ajax({
        type: 'GET',
        url: 'http://api.vendor.qnmami.com/weixin/sig?alias=ohui',
        data: {
            url: encodeURIComponent(window.location.href),
            format: 'jsonp'
        },
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            var timestamp = data.data.timestamp;
            var nonceStr = data.data.nonceStr;
            var signature = data.data.signature;

            wx.config({
                debug: false,
                appId: 'wxc9e38adf6b9814cd',
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });

            wx.ready(function () {
                //config信息验证后会执行ready方法
                //所有接口调用都必须在config接口获得结果之后
                //config是一个客户端的异步操作
                //所以如果需要在页面加载时就调用相关接口
                //则须把相关接口放在ready函数中调用来确保正确执行
                //对于用户触发时才调用的接口
                //则可以直接调用
                //不需要放在ready函数中

                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: '欧蕙20年 为你带来惊喜改变', //分享标题
                    link: window.location.href, //分享链接
                    imgUrl: 'http://h5.vendor.qnmami.com/ohui/img/share.jpg', //分享图标
                    success: function () {
                        //用户确认分享后执行的回调函数

                    },
                    cancel: function () {
                        //用户取消分享后执行的回调函数

                    }
                });

                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: '欧蕙20年 为你带来惊喜改变', //分享标题
                    desc: '开启植物邂逅科学的护肤之旅', //分享描述
                    link: window.location.href, //分享链接
                    imgUrl: 'http://h5.vendor.qnmami.com/ohui/img/share.jpg', //分享图标
                    type: '', //分享类型,music、video或link，不填默认为link
                    dataUrl: '', //如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        //用户确认分享后执行的回调函数

                    },
                    cancel: function () {
                        //用户取消分享后执行的回调函数

                    }
                });
            });
        }
    });


});