/**
 * Created by Jenson on 2017/5/4.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'swiper', 'imgLoadCatch', 'fullpage', 'jScrollPane'], function (wx, env, baseWx, util, $, swiper) {

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
        var random = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        // 跑进度
        var onprogress = function () {
            // 随机时间
            var timeout = random(10, 30);

            setTimeout(function () {
                // 如果页面加载完毕，则直接进度到 100%
                if (window.loaded) {
                    $progress.css('width', '100%');
                    $('.percent-num').text('100%');
                    return;
                }

                // 随机进度
                progress += random(1, 5);

                // 随机进度不能超过 98%，以免页面还没加载完毕，进度已经 100% 了
                if (progress > 98) {
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
        setTimeout(function () {
            $('.loading-screen').fadeOut();
        }, 1000);
        var mobile = "";
        var score = 0;
        var isPlay = false;
        var actorAudio = new Audio();
        var bgm = document.getElementById('bgMusic');
        audioAutoPlay(bgm);

        console.log(localStorage);
        if (localStorage.mobile) {
            mobile = localStorage.mobile;
        }
        if (localStorage.actor) {
            // window.location.href = "#page3"; // 如果已选过角色 直接跳转page3
            if (localStorage.actor == 1) {
                $('.actor-img').show().attr('src', './img/lyf_cartoon.png');
                $('.voice').show();
                $('.logo-72').hide();
            } else if (localStorage.actor == 2) {
                $('.actor-img').show().attr('src', './img/wl_cartoon.png');
                $('.voice').show();
                $('.logo-72').show();
            } else {
                $('.actor-img').hide();
                $('.voice').hide();
            }
        } else {
            $('.actor-img').hide();
            $('.voice').hide();
            $('.logo-72').hide();
        }

        $('.scroll-pane').jScrollPane({
            showArrows: false,
            verticalGutter: -16
        });

        // fullpage初始化，其中1、2页不可滑动，3、4页可互相滑动
        $('#main').fullpage({
            anchors: ['', '', 'page3', ''],
            // animateAnchor: false,
            afterLoad: function (anchorLink, index) {
                if (index == 3) {
                    $.fn.fullpage.setAllowScrolling(true);
                }
                if (index == 4) {
                    $.fn.fullpage.setAllowScrolling(true);
                }
            },
            onLeave: function (index, nextIndex, direction) {
                if (index == 3 && direction == 'up') {
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
            $('.actor-img').show().attr('src', './img/lyf_cartoon.png');
            $('.voice').show();
            $('.logo-72').hide();
            if (!isPlay) {
                actorAudio.setAttribute('src', './media/lyf.mp3');
                actorAudio.play(); //播放
                isPlay = true;
                checkPlay();
                actorAudio.addEventListener('ended', function () {
                    isPlay = false;
                    checkPlay();
                });
            }
        });

        // page2 吴磊
        $('.avatar-wl, .avatar-wl-cartoon').click(function () {
            $.fn.fullpage.moveSectionDown();
            localStorage.setItem("actor", 2);
            $('.actor-img').show().attr('src', './img/wl_cartoon.png');
            $('.voice').show();
            $('.logo-72').show();
            if (!isPlay) {
                actorAudio.setAttribute('src', './media/wl.mp3');
                actorAudio.play(); //播放
                isPlay = true;
                $('.voice').addClass('play');
                actorAudio.addEventListener('ended', function () {
                    isPlay = false;
                    $('.voice').removeClass('play');
                });
            }
        });

        $('.voice').click(function () {
            switch (localStorage.actor) {
                case "1":
                    if (!isPlay) {
                        $('.voice').addClass('play');
                        actorAudio.setAttribute('src', './media/lyf.mp3');
                        actorAudio.play(); //播放
                        isPlay = true;
                        actorAudio.addEventListener('ended', function () {
                            isPlay = false;
                            $('.voice').removeClass('play');
                        });
                    } else {
                        $('.voice').removeClass('play');
                        actorAudio.pause();
                        isPlay = false;
                    }
                    break;
                case "2":
                    if (!isPlay) {
                        $('.voice').addClass('play');
                        actorAudio.setAttribute('src', './media/wl.mp3');
                        actorAudio.play(); //播放
                        isPlay = true;
                        actorAudio.addEventListener('ended', function () {
                            isPlay = false;
                            $('.voice').removeClass('play');
                        });
                    } else {
                        $('.voice').removeClass('play');
                        actorAudio.pause();
                        isPlay = false;
                    }
                    break;
            }

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
        // setActorPosition();

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

        function checkPlay() {
            if (isPlay) {
                $('.voice').addClass('play');
            } else {
                $('.voice').removeClass('play');
            }
        }

        /*
            背景音乐相关
         */
        // 设置自动播放。微信中可自动播放，Safari中触发touch事件后播放
        function audioAutoPlay(audio) {
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
            document.addEventListener('touchstart', function () {
                audio.play();
            }, false);
            audio.volume = 0.2; // 手机无效，只能通过音量按键设置音量
        }

        $(".bgm-btn").click(function () {
            if (bgm.paused) {
                bgm.play();
                $(".bgm-btn").removeClass("pause").addClass("play");
            } else {
                bgm.pause();
                $(".bgm-btn").removeClass("play").addClass("pause");
            }
        });

        // 微信分享
        var shareData = {
            shareTitle: '【康师傅绿茶健康活力派】',
            shareUrl: 'http://kangshifu.qnmami.com',
            shareImg: 'http://kangshifu.qnmami.com/img/slogan.png',
            shareDes: '快一起来参加【#康师傅绿茶健康活力派#活力时刻】，赢李易峰x吴磊见面会门票~'
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