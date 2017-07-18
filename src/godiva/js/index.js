/**
 * Created by Jenson on 2017/7/13.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'inobounce'], function (wx, env, baseWx, util, $) {
    var basePath = "";
    var loader = new WxMoment.Loader();
    //声明资源文件列表
    var fileList = ['img/logo.png', 'img/mute.png', 'img/play.png', 'img/bg.png', 'img/bg_end.png', 'img/bg_rule.png', 'img/btn.png', 'img/click.png', 'img/bird.gif', 'img/rules.png', './media/bgm.mp3'];
    for (var i = 0; i < fileList.length; i++) {
        loader.addImage(basePath + fileList[i]);
    }
    //进度监听
    loader.addProgressListener(function (e) {
        var percent = Math.round((e.completedCount / e.totalCount) * 100);
        $('.loading-bar-active').css('width', percent + '%');
        $('.percent-num').text(percent + "%");
        console.log("当前加载了", percent, "%");
    });
    //加载完成
    loader.addCompletionListener(function () {
        setTimeout(function () {
            $('.loading-screen').fadeOut();
            $('#play').addClass('animated slideInLeft');
        }, 500);
    });
    //启动加载
    loader.start();

    // 下一页
    function showNext(page) {
        page.hide();
        page.next().show();
    }

    $(function () {
        var video = document.getElementById("video");
        var bgm = document.getElementById('audio');
        var $play = $('#play');
        var $rule = $('#rule');
        new WxMoment.OrientationTip();
        audioAutoPlay(bgm);

        // 播放视频
        $play.click(function () {
            $('.wrapper').show();
            video.play();
            // $(this).hide();
        });

        // 播放结束时触发
        video.addEventListener('ended', function (e) {
            // util.alerty("已播放完成");
            showNext($('.page1'));
        });

        // 打开规则
        $rule.click(function () {
            $('.rule-mask').fadeIn();
        });

        // 关闭规则
        $('.rule-close').click(function () {
            $('.rule-mask').fadeOut();
        });

        /*
         背景音乐相关
         */
        function audioAutoPlay(audio) {
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
            // document.addEventListener('touchstart', function () {
            //     audio.play();
            // }, false);
        }

        $(".mute").click(function () {
            if (bgm.paused) {
                bgm.play();
                $(".mute").attr('src', './img/play.png');
            } else {
                bgm.pause();
                $(".mute").attr('src', './img/mute.png');
            }
        });

        // 微信分享
        var jt;
        //ajax获取js_api
        $.ajax({
            cache: true,
            type: "POST",
            url: "CheckAll.ashx?actiontype=GetJT&t=" + Math.random(),
            //data: $('#PowerForm').serialize(), // 你的formid
            async: false,
            error: function (request) {
                alert("网络服务出错，请稍后！");
            },
            success: function (data) {
                jt = data;
            }
        });
        var ts = String(Date.parse(new Date())).substring(0, 10);
        var ToSha = "jsapi_ticket=" + jt + "&noncestr=Godiva_" + ts + "&timestamp=" + ts + "&url=" + window.location.href;
        var sha = hex_sha1(ToSha);

        console.log(jt);

        wx.config({
            debug: false,
            appId: 'wx58fd670c5bde6fcd',
            timestamp: ts,
            nonceStr: 'Godiva_' + ts,
            signature: sha,
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
                title: 'Share Title', //分享标题
                link: 'http://weixin.net-show.cn/godiva_loveletter/index.html', //分享链接
                imgUrl: 'http://weixin.net-show.cn/godiva_loveletter/img/share.jpg', //分享图标
                success: function () {
                    //用户确认分享后执行的回调函数

                },
                cancel: function () {
                    //用户取消分享后执行的回调函数

                }
            });

            //分享给朋友
            wx.onMenuShareAppMessage({
                title: 'Share Title', //分享标题
                desc: 'Share Content', //分享描述
                link: 'http://weixin.net-show.cn/godiva_loveletter/index.html', //分享链接
                imgUrl: 'http://weixin.net-show.cn/godiva_loveletter/img/share.jpg', //分享图标
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

        wx.error(function (res) {
            //config信息验证失败会执行error函数
            //如签名过期导致验证失败
            //具体错误信息可以打开config的debug模式查看
            //也可以在返回的res参数中查看
            //对于SPA可以在这里更新签名
            //alert("error:"+res);
        });

    });
});