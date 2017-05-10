/**
 * Created by Jenson on 2017/5/4.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'swiper', 'imgLoadCatch', 'fullpage'], function (wx, env, baseWx, util, $, swiper) {

    $(function () {
        var mobile = "";

        console.log(localStorage);
        if (localStorage.mobile) {
            mobile = localStorage.mobile;
            window.location.href = "#page3"
        }


        // 预加载图片
        $.imgLoadCatch({
            deep: 'all',
            step: function(percent) {
                // console.log(percent + '%');
                $('.loading-bar-active').css('width', percent + '%');
                $('.percent-num').text(percent + '%');
            },
            finish: function() {
                console.log('全部图片加载完成!');
                $('.loading-screen').fadeOut();
            }
        });

        $('#main').fullpage({
            anchors: ['', '', 'page3', 'page4'],
            afterLoad: function(anchorLink, index){
                if(index == 3){
                    $.fn.fullpage.setAllowScrolling(true);
                }
                if(index == 4){
                    $.fn.fullpage.setAllowScrolling(true);
                }
            },
            onLeave: function(index, nextIndex, direction) {
                if(index == 3 && direction =='up'){
                    return false;
                }
            },
        });
        $.fn.fullpage.setAllowScrolling(false);


        $('.start-btn, .avatar, .avatar-lyf-cartoon, .avatar-wl-cartoon').click(function () {
            $.fn.fullpage.moveSectionDown();
        });

        $('.rule-btn').click(function () {
            $('.mask').hide();
            $('.weui_mask').fadeIn();
            $('.rule-mask').fadeIn();
        });

        $('.close-btn').click(function () {
            $('.weui_mask').fadeOut();
            $('.mask').fadeIn();
        });

        getScore();

        // 获取活力值
        function getScore() {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/huo-li?mobile=' + mobile,
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {
                        $('#score').text(data.data.value);
                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        /***
         * 分享
         * */
        var shareData = {
            shareTitle: '康师傅绿茶',
            shareUrl: window.location.href,
            shareImg: 'http://kangjiaguoqing.qnmami.com/img/share.jpeg',
            shareDes: '康师傅绿茶！'
        };

        baseWx.initWxJs('wxf19834fcc10552b0', 'ksf_greentea', ['onMenuShareTimeline', 'onMenuShareAppMessage'], function () {
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