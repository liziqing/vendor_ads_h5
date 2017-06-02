/**
 * Created by Jenson on 2017/5/9.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'swiper'], function (wx, env, baseWx, util, $, swiper) {

    $(function () {
        var mobile = "";

        console.log(localStorage);
        if (localStorage.mobile) {
            mobile = localStorage.mobile;
        }

        var video = document.getElementById("video");

        $('#play').click(function () {
            _hmt.push(['_trackEvent', 'play-btn', 'click']);
            stm_clicki('send', 'event', '播放', 'click');
            video.play();
            $(this).hide();
        });

        // 检测播放暂停
        video.addEventListener('timeupdate', function (e) {
            if (video.paused) {
                // util.alerty("已暂停");
                $('#play').show();
            }
            // console.log(video.currentTime) // 当前播放的进度
        });

        // 播放结束时触发
        video.addEventListener('ended', function (e) {
            util.alerty("已播放完成，恭喜获得12活力值");
            console.log(localStorage);
            if (!mobile) {
                $('.mask').hide();
                $('.tel-mask').fadeIn();
            } else {
                haveWatch(mobile);
                $('.mask').hide();
                $('.weui_mask').fadeIn();
            }
        });

        $('#submit').click(function () {
            _hmt.push(['_trackEvent', 'confirm-mobile-btn', 'click']);
            var mobile = $('#telephone').val().trim();
            if (util.isMobile(mobile)) {
                localStorage.setItem("mobile", mobile);
                haveWatch(mobile);
                $('.mask').hide();
                $('.weui_mask').fadeIn();
            }
        });

        function haveWatch(mobile) {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/have-watch?mobile=' + mobile,
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {

                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        $('.share-btn').click(function () {
            _hmt.push(['_trackEvent', 'share-btn', 'click']);
            $('.weui_mask').fadeIn();
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/have-share?mobile=' + mobile,
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {

                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        });

        $('.weui_mask').click(function () {
            $(this).fadeOut();
        });

        var shareData = {
            shareTitle: '【康师傅绿茶健康活力派】',
            shareUrl: 'http://kangshifu.qnmami.com',
            shareImg: 'http://kangshifu.qnmami.com/img/slogan.png',
            shareDes: '李易峰x吴磊最新TVC，健（la）康（bang）活（jie）力（pai）看这里！'
        };

        baseWx.initWxJs('wx8e56a8ebb0688ab9', 'pt_christmas', ['onMenuShareTimeline', 'onMenuShareAppMessage'], function () {
            wx.onMenuShareTimeline({
                title: shareData.shareTitle, // 分享标题
                link: shareData.shareUrl, // 分享链接
                imgUrl: shareData.shareImg,
                success: function success() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function cancel() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: shareData.shareTitle, // 分享标题
                link: shareData.shareUrl,
                desc: shareData.shareDes,
                imgUrl: shareData.shareImg,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function success() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function cancel() {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    });
});