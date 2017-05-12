/**
 * Created by Jenson on 2017/5/4.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'swiper', 'imgLoadCatch', 'fullpage'], function (wx, env, baseWx, util, $, swiper) {

    // 预加载图片
    // $.imgLoadCatch({
    //     deep: 'all',
    //     step: function(percent) {
    //         // console.log(percent + '%');
    //         $('.loading-bar-active').css('width', percent + '%');
    //         $('.percent-num').text(percent + '%');
    //     },
    //     finish: function() {
    //         console.log('全部图片加载完成!');
    //         $('.loading-screen').fadeOut();
    //     }
    // });

    (function () {
        // 获取进度条 div
        var $progress = $('.loading-bar-active');

        // 初始进度，1%
        var progress = 1;

        // 生成随机数
        var random = function(min, max){
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        // 跑进度
        var onprogress = function () {
            // 随机时间
            var timeout = random(10, 30);

            setTimeout(function () {
                // 如果页面加载完毕，则直接进度到 100%
                if(window.loaded){
                    $progress.css('width', '100%');
                    $('.percent-num').text('100%');
                    return;
                }

                // 随机进度
                progress += random(1, 5);

                // 随机进度不能超过 98%，以免页面还没加载完毕，进度已经 100% 了
                if(progress > 98){
                    progress = 98;
                }

                $progress.css('width', progress + '%');
                $('.percent-num').text(progress + '%');
                onprogress();
            }, timeout);
        };

        // 开始跑进度
        onprogress();

    })();

    $(function () {
        window.loaded = true;
        $('.loading-screen').fadeOut();
        var mobile = "";
        var score = 0;
        var isPlay = false;
        var actorAudio = new Audio();

        console.log(localStorage);
        if (localStorage.mobile) {
            mobile = localStorage.mobile;
        }
        if (localStorage.actor) {
            window.location.href = "#page3"; // 如果已选过角色 直接跳转page3
            if (localStorage.actor == 1) {
                $('.actor-img').show().attr('src', './img/lyf_cartoon.png')
            } else if (localStorage.actor == 2) {
                $('.actor-img').show().attr('src', './img/wl_cartoon.png')
            } else {
                $('.actor-img').hide();
            }
        } else {
            $('.actor-img').hide();
        }


        // fullpage初始化，其中1、2页不可滑动，3、4页可互相滑动
        $('#main').fullpage({
            anchors: ['', '', 'page3', ''],
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


        // page1 开始button
        $('.start-btn').click(function () {
            $.fn.fullpage.moveSectionDown();
        });

        // page2 李易峰
        $('.avatar-lyf, .avatar-lyf-cartoon').click(function () {
            $.fn.fullpage.moveSectionDown();
            localStorage.setItem("actor", 1);
            if(!isPlay) {
                actorAudio.setAttribute('src', './media/lyf.mp3');
                actorAudio.play(); //播放
                isPlay = true;
            }
            $('.actor-img').show().attr('src', './img/lyf_cartoon.png')
        });

        // page2 吴磊
        $('.avatar-wl, .avatar-wl-cartoon').click(function () {
            $.fn.fullpage.moveSectionDown();
            localStorage.setItem("actor", 2);
            if(!isPlay) {
                actorAudio.setAttribute('src', './media/wl.mp3');
                actorAudio.play(); //播放
                isPlay = true;
            }
            $('.actor-img').show().attr('src', './img/wl_cartoon.png')
        });

        // 活动规则button
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
                        score = data.data.value;
                        $('.score-num').text(score);
                        setActorPosition();
                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        // 根据活力值改变人物位置
        function setActorPosition() {
            if (score >= 0 && score < 36) {
                $('.fourth-screen .actor-img-content').addClass('actor-img-content-0');
                $('.third-screen .actor-img-content').addClass('actor-img-content-none');
            } else if (score >= 36 && score < 72) {
                $('.third-screen .actor-img-content').addClass('actor-img-content-36');
                $('.fourth-screen .actor-img-content').addClass('actor-img-content-none');
            } else if (score >= 72) {
                $('.third-screen .actor-img-content').addClass('actor-img-content-72');
                $('.fourth-screen .actor-img-content').addClass('actor-img-content-none');

            }
        }

        // 微信分享
        var shareData = {
            shareTitle: '康师傅绿茶',
            shareUrl: window.location.href,
            shareImg: 'http://kangshifu.qnmami.com/img/logo.png',
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