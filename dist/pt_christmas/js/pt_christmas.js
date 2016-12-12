'use strict';

/**
 * Created by martin on 16/11/21.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'hammer', 'velocity'], function (wx, env, baseWx, util, $, Hammer, Velocity) {

    $(function () {

        var head = void 0;
        var nickname = void 0;
        var openid = void 0;

        var myDate = new Date();
        var hour = myDate.getHours();
        var minute = myDate.getMinutes();
        var mouth = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var week = myDate.getDay();
        var weekArr = ['日', '一', '二', '三', '四', '五', '六'];

        var hot = document.getElementById('hot_area');
        var swipe = document.getElementById('swipe_hint');
        var $hot = $(hot);
        var $swipe = $(swipe);
        var manager = new Hammer.Manager(hot);
        var Pan = new Hammer.Pan();
        var deltaX = 0;
        var deltaY = 0;
        var swiperDone = false;

        var timer = void 0;
        var animateAble = true;
        var chatIndex = 0;
        var chatLength = $(".chat-list li").length;

        var endLock = false;

        var shareData = {
            shareUrl: 'shareUrl',
            shareImg: 'shareImg',
            shareFeedsTile: 'shareFeedsTile',
            shareTile: 'shareTile',
            shareDes: 'shareDes'
        };

        var audioIndexArray = [12, 17, 20, 26, 28, 36, 39, 42];

        if (!util.isWeiXin()) {}

        init();

        /**
         第一页
         */

        /**
         滑动解锁页时间显示
         */

        /**
         滑动解锁事件
         */
        manager.add(Pan);
        manager.on('panmove', function (e) {
            $('#swipe_hint,#hot_area').removeClass('original');
            var dX = deltaX + e.deltaX;
            var dY = deltaY + e.deltaY;
            //console.log(dX);
            if (dX > 0 && dX < 240) {
                $.Velocity.hook($hot, 'translateX', dX + 'px');
                $.Velocity.hook($swipe, 'translateX', dX + 'px');
            } else if (dX >= 260) {
                $.Velocity.hook($hot, 'translateX', '700px');
                $.Velocity.hook($swipe, 'translateX', '700px');
                swiperDone = true;
                $("#lock_audio")[0].play();
            }
        });
        manager.on('panend', function (e) {
            if (!swiperDone) {
                $("#swipe_hint").addClass("original");
                $("#hot_area").addClass("original");
            } else {
                changeScreen();
            }
        });

        //获取微信用户名和头像
        function init() {
            $('.hour-and-minute').html(zfill(hour) + ':' + zfill(minute));
            $('.mouth-and-day').html(zfill(mouth) + '月' + zfill(day) + '日');
            $('.week').html('星期' + weekArr[week]);

            if (env.debug == 1 || !util.isWeiXin()) {
                head = './img/user-head-null.png';

                nickname = 'test';

                openid = 'o6Njdwyc_Lk1cKeeGuB9Lgo9Bib8';

                $('.invitation-desc').text('\“张杰\”邀请\“' + nickname + '\”加入了群聊');
                $('.user-replay .right img').attr('src', head);
                $('.greetings').text('Hello @' + nickname + '，你终于来了。');
                $('.pt-greetings').text('@' + nickname + '，你好~今天有机会和   @张杰 @娜娜 一起聊聊他们的圣诞趣事哦～');
                $('.xn-greetings').text('@' + nickname + '你好捧场哦。');

                $('body').show();
                $("#message_audio")[0].play();
            } else {
                baseWx.initUserInfo(env.appid, 'pt_christmas', function (data) {

                    head = data.headimgurl;

                    nickname = data.nickname;

                    openid = data.openid;

                    $('.invitation-desc').text('\“张杰\”邀请\“' + nickname + '\”加入了群聊');
                    $('.user-replay .right img').attr('src', head);
                    $('.greetings').text('Hello @' + nickname + '，你终于来了。');
                    $('.pt-greetings').text('@' + nickname + '，你好~今天有机会和   @张杰 @娜娜 一起聊聊他们的圣诞趣事哦～');
                    $('.xn-greetings').text('@' + nickname + '你好捧场哦。');

                    $('body').show();
                    $("#message_audio")[0].play();
                });

                baseWx.initWxJs(env.appid, 'pt_christmas', ['onMenuShareTimeline', 'onMenuShareAppMessage'], function () {
                    var shareTimeline = {};
                    shareTimeline.title = '张杰&谢娜邀你加入群聊...';
                    shareTimeline.imgUrl = 'http://ptxmas.net-show.cn/img/share.jpg';
                    shareTimeline.shareUrl = 'http://ptxmas.net-show.cn/index.html';

                    var shareAppMessage = {};
                    shareAppMessage.title = '张杰&谢娜邀你加入群聊..';
                    shareAppMessage.desc = '张杰谢娜的圣诞趣事，你听过吗？';
                    shareAppMessage.imgUrl = 'http://ptxmas.net-show.cn/img/share.jpg';
                    shareAppMessage.shareUrl = 'http://ptxmas.net-show.cn/index.html';

                    wx.onMenuShareTimeline({
                        title: shareTimeline.title, // 分享标题
                        link: shareTimeline.shareUrl, // 分享链接
                        imgUrl: shareTimeline.imgUrl, // 分享图标
                        success: function success() {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function cancel() {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: shareAppMessage.title, // 分享标题
                        link: shareAppMessage.shareUrl, // 分享链接
                        desc: shareAppMessage.desc,
                        imgUrl: shareAppMessage.imgUrl, // 分享图标
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
            }
        }

        //时间补零
        function zfill(num) {
            var s = "000000000" + num;
            return s.substr(s.length - 2);
        }

        /**
         第二页
         */

        $('#all_list').on('click', function () {
            clearInterval(timer);
            $(".chat-list li").show();
            $(".chat-list li:last-child").addClass('active');

            $('#all_list').remove();
            scrollChatEnd();
            setTimeout(function () {
                window.location.href = './ending_origin.html';
            }, 3000);
        });

        //第一页解锁后，第二页聊天开始
        function changeScreen() {
            // $('title').text('张杰谢娜的圣诞专访（4）');
            $('#lock_screen').fadeOut();
            $('#container').fadeIn();

            setTimeout(function () {
                displayChat();
                timer = setInterval(displayChat, 1700);
            }, 1000);
        }

        function displayChat() {
            if (animateAble && chatIndex < chatLength) {
                $(".chat-list li").eq(chatIndex).addClass("active").siblings().removeClass("active");
                $(".chat-list li").eq(chatIndex).show();
                scrollChat();
                $("#wechat_message_audio")[0].play();
                chatIndex++;

                if ($.inArray(chatIndex, audioIndexArray) >= 0) {
                    animateAble = false;
                    setTimeout(function () {
                        animateAble = true;
                    }, 2000);
                }

                if (chatIndex == chatLength) {
                    $('#all_list').hide();

                    clearInterval(timer);

                    setTimeout(function () {
                        window.location.href = './ending_origin.html';
                    }, 3000);
                }
            }
        }

        function scrollChat() {
            var height = $(".chat-list")[0].scrollHeight;
            $(".chat-list").animate({ scrollTop: height }, 600);
        }

        function scrollChatEnd() {
            var height = $(".chat-list")[0].scrollHeight;
            $(".chat-list").animate({ scrollTop: height }, 300);
        }

        //视频结束
        function videoEnded() {
            if (!endLock) {
                endLock = true;
                setTimeout(function () {
                    endLock = false;
                }, 500);
                setTimeout(function () {
                    animateAble = true;
                    displayChat();
                    timer = setInterval(displayChat, 1700);
                }, 1000);
            }
        }

        /**
         视频
         */

        //视频点击播放
        $(".zj-video1-btn").click(function () {
            animateAble = false;
            $(this).find('.hand').hide();
            clearInterval(timer);
            $("#zj-video1")[0].play();
            $("#zj-video1")[0].webkitRequestFullScreen();
        });
        $(".xn-video1-btn").click(function () {
            animateAble = false;
            $(this).find('.hand').hide();
            clearInterval(timer);
            $("#xn-video1")[0].play();
            $("#xn-video1")[0].webkitRequestFullScreen();
        });
        $(".xn-video2-btn").click(function () {
            animateAble = false;
            $(this).find('.hand').hide();
            clearInterval(timer);
            $("#xn-video2")[0].play();
            $("#xn-video2")[0].webkitRequestFullScreen();
        });
        $(".zj-video2-btn").click(function () {
            animateAble = false;
            $(this).find('.hand').hide();
            clearInterval(timer);
            $("#zj-video2")[0].play();
            $("#zj-video2")[0].webkitRequestFullScreen();
        });
        $(".xn-video3-btn").click(function () {
            animateAble = false;
            $(this).find('.hand').hide();
            clearInterval(timer);
            $("#xn-video3")[0].play();
            $("#xn-video3")[0].webkitRequestFullScreen();
        });
        $(".zj-video3-btn").click(function () {
            animateAble = false;
            $(this).find('.hand').hide();
            clearInterval(timer);
            $("#zj-video3")[0].play();
            $("#zj-video3")[0].webkitRequestFullScreen();
        });

        //视频暂停or结束
        //张杰视频1
        $("#zj-video1").bind("ended", function () {
            videoEnded();
        });
        $("#zj-video1").bind("pause", function () {
            videoEnded();
        });
        //谢娜视频1
        $("#xn-video1").bind("ended", function () {
            videoEnded();
        });
        $("#xn-video1").bind("pause", function () {
            videoEnded();
        });
        //谢娜视频2
        $("#xn-video2").bind("ended", function () {
            videoEnded();
        });
        $("#xn-video2").bind("pause", function () {
            videoEnded();
        });
        //张杰视频2
        $("#zj-video2").bind("ended", function () {
            videoEnded();
        });
        $("#zj-video2").bind("pause", function () {
            videoEnded();
        });
        //谢娜视频3
        $("#xn-video3").bind("ended", function () {
            videoEnded();
        });
        $("#xn-video3").bind("pause", function () {
            videoEnded();
        });
        //张杰视频3
        $("#zj-video3").bind("ended", function () {
            videoEnded();
        });
        $("#zj-video3").bind("pause", function () {
            videoEnded();
        });

        /**
         语音
         */

        //谢娜语音13s
        $(".yuyin-image-13s").click(function () {
            animateAble = false;
            clearInterval(timer);
            $("#audio13")[0].play();

            var _this = this;
            $(_this).addClass('active');
            setTimeout(function () {
                $(_this).removeClass('active');
            }, 9000);
        });

        //张杰语音14s
        $(".yuyin-image-14s").click(function () {
            animateAble = false;
            clearInterval(timer);
            $("#audio14")[0].play();

            var _this = this;
            $(_this).addClass('active');
            setTimeout(function () {
                $(_this).removeClass('active');
            }, 3000);
        });

        //语音结束or暂停
        $("#audio13").bind("ended", function () {
            videoEnded();
        });
        $("#audio13").bind("pause", function () {
            videoEnded();
        });

        $("#audio14").bind("ended", function () {
            videoEnded();
        });
        $("#audio14").bind("pause", function () {
            videoEnded();
        });
    });
});