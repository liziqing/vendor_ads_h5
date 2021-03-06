/**
 * Created by Jenson on 2017/5/8.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'swiper'], function (wx, env, baseWx, util, $, swiper) {

    $(function () {
        var mobile = "";
        var mobileParam = util.queryString('m');

        console.log(localStorage);
        if (localStorage.mobile) {
            mobile = localStorage.mobile;
        }

        // 初始化swiper
        var swiper = new Swiper('.swiper-container', {
            grabCursor: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true
        });

        if (mobileParam) {
            getImageList(mobileParam);
            $('body').css({'background': 'url("../img/bg_album.png")','background-size': '100% 100%'});
            $('.slogan, .swiper-button-prev, .swiper-button-next, .share-btn').hide();
            $('.swiper-container').css('margin', '3rem auto 1.3rem');
            $('.return-btn').text("我也要参加");
        } else {
            getImageList(mobile);
        }

        var shareNum = !mobile ? mobileParam : mobile;

        // 获取图片列表
        function getImageList(mobile) {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/image-list?type=1&mobile=' + mobile,
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {
                        for (var i = 0; i < data.data.list.length; i++) {
                            var newSlide = swiper.createSlide('<img src="'+ data.data.list[i] +'" class="photo">');
                            newSlide.append();
                        }
                    }
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
            shareUrl: 'http://kangshifu.qnmami.com/album.html?m=' + shareNum,
            shareImg: 'http://kangshifu.qnmami.com/img/slogan.png',
            shareDes: '就想分你一点我的活力美照，拉帮结派晒活力～'
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