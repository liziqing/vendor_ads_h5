/**
 * Created by Jenson on 2017/7/17.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'inobounce'], function (wx, env, baseWx, util, $) {
    $(function () {
        var HEIGHT = $('body').height();
        // 修复安卓弹出输入法时页面高度压缩导致变形
        $(window).resize(function() {
            $('body').height(HEIGHT);
            $('#letter').css('line-height', HEIGHT/100*4.4 + 'px');
        });

        var letterId = util.queryString('letterid');
        var $confirm = $('#confirm');
        var $submit = $('#submit');
        var bgm = document.getElementById('audio');
        audioAutoPlay(bgm);

        // 判断letterId
        if (letterId) {
            $('#title').text("【一封寄给你的心意】");
            $('.confirm-btn').hide();
            $('.write-btn').show();
            $('#letter').attr('readonly', 'readonly');
            $('#to').attr('readonly', 'readonly');
            $('#from').attr('readonly', 'readonly');
        }

        // 确定按钮点击事件
        $confirm.click(function () {
            var letter = $('#letter').val().trim();
            var to = $('#to').val().trim();
            var from = $('#from').val().trim();
            if (!letter) {
                util.alerty('信的内容不能为空');
                return;
            }
            if (!to) {
                util.alerty('请填写收信人');
                return;
            }

            if (!from) {
                util.alerty('请填写寄信人');
                return;
            }
            $('.info-box').fadeIn();
        });

        // 关闭信息填写
        $('.info-box-close').click(function () {
            $('.info-box').fadeOut();
        });

        // 提交按钮点击事件
        $submit.click(function () {
            var letter = $('#letter').val().trim();
            var name = $('#fullname').val().trim();
            var tel = $('#telephone').val().trim();
            var to = $('#to').val().trim();
            var from = $('#from').val().trim();

            if (!name) {
                util.alerty('姓名不能为空');
                return;
            }

            if (util.isMobile(tel)) {
                // TODO: 添加网络请求

                $('.share-mask').show();
            }
        });

        $('.product').click(function () {
            $('.page3').hide();
            $('.page4').show();
        });

        $('.back-btn').click(function () {
            $('.page4').hide();
            $('.page3').show();
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