'use strict';

/**
 * Created by martin on 16/11/21.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'hammer', 'velocity'], function (wx, env, baseWx, util, $, Hammer, Velocity) {

    $(function () {

        var debug = env.debug;

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
        var audioTimeArray = [14, 9, 9, 19, 16, 18, 7, 3];

        var audioIdArray = ['shortout_01', 'shortout_02', 'audio13', 'shortout_03', 'shortout_04', 'shortout_05', 'shortout_06', 'audio14'];

        var playingAudio = false;

        init();

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

        $('#swipe_hint,#hot_area').on('touchend', function () {
            $("#lock_audio")[0].play();
        });

        //获取微信用户名和头像
        function init() {
            $('.hour-and-minute').html(zfill(hour) + ':' + zfill(minute));
            $('.mouth-and-day').html(zfill(mouth) + '月' + zfill(day) + '日');
            $('.week').html('星期' + weekArr[week]);

            if (debug == 1 || !util.isWeiXin()) {
                head = './img/user-head-null.png';

                nickname = 'test';

                openid = 'o6Njdwyc_Lk1cKeeGuB9Lgo9Bib8';

                $('.invitation-desc').text('张杰&谢娜邀请' + nickname + '加入了群聊…');
                $('.user-replay .right img').attr('src', head);
                $('.greetings').text('Hello @' + nickname + '，你终于来了。');
                $('.pt-greetings').text('@' + nickname + '，你好~今天有机会和   @张杰 @娜娜 一起聊聊他们的圣诞趣事哦～');
                $('.xn-greetings').text('@' + nickname + '你好捧场哦。');

                $('body').show();
                // $("#message_audio")[0].play();

                baseWx.initWxJs(env.appid, 'pt_christmas', ['onMenuShareTimeline', 'onMenuShareAppMessage'], function () {
                    $("#message_audio")[0].play();
                });
            } else {
                baseWx.initUserInfo(env.appid, 'pt_christmas', function (data) {

                    head = data.headimgurl;

                    nickname = data.nickname;

                    openid = data.openid;

                    $('.invitation-desc').text('张杰&谢娜邀请' + nickname + '加入了群聊…');
                    $('.user-replay .right img').attr('src', head);
                    $('.greetings').text('Hello @' + nickname + '，你终于来了。');
                    $('.pt-greetings').text('@' + nickname + '，你好~今天有机会和   @张杰 @娜娜 一起聊聊他们的圣诞趣事哦～');
                    $('.xn-greetings').text('@' + nickname + '你好捧场哦。');

                    $('body').show();
                });

                baseWx.initWxJs(env.appid, 'pt_christmas', ['onMenuShareTimeline', 'onMenuShareAppMessage'], function () {
                    $("#message_audio")[0].play();

                    var shareTimeline = {};
                    shareTimeline.title = '张杰&谢娜邀请你加入群聊...';
                    shareTimeline.imgUrl = 'http://ptxmas.net-show.cn/img/share.jpg';
                    shareTimeline.shareUrl = 'http://clickc.admaster.com.cn/c/a79677,b1456056,c2,i0,m101,8a2,8b2,h';

                    var shareAppMessage = {};
                    shareAppMessage.title = '张杰&谢娜邀请你加入群聊..';
                    shareAppMessage.desc = '张杰谢娜的圣诞趣事，你听过吗？';
                    shareAppMessage.imgUrl = 'http://ptxmas.net-show.cn/img/share.jpg';
                    shareAppMessage.shareUrl = 'http://clickc.admaster.com.cn/c/a79677,b1456056,c2,i0,m101,8a2,8b2,h';

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

        //第一页解锁后，第二页聊天开始
        function changeScreen() {
            _smq.push(['custom', '锁屏页面', '点击“划动解锁”']);

            $('#lock_screen').fadeOut();
            $('#container').fadeIn();

            if (debug) {
                // animateAble = false;
                // chatIndex = chatLength;
                // displayAllChat();
                setTimeout(function () {
                    displayChat();
                    timer = setInterval(displayChat, 1700);
                }, 1000);
            } else {
                setTimeout(function () {
                    displayChat();
                    timer = setInterval(displayChat, 1700);
                }, 1000);
            }
        }

        function displayChat() {
            if (animateAble && chatIndex < chatLength) {
                var $this = $(".chat-list li").eq(chatIndex);
                $(".chat-list li").eq(chatIndex).addClass("active").siblings().removeClass("active");
                $(".chat-list li").eq(chatIndex).show();
                scrollChat();
                chatIndex++;

                var audioSourceIndex = $.inArray(chatIndex, audioIndexArray);
                if (audioSourceIndex >= 0) {
                    animateAble = false;

                    // setTimeout(function () {
                    //     animateAble = true;
                    // }, 2000);
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

        function displayAllChat() {
            clearInterval(timer);
            $(".chat-list li").show();
            $(".chat-list li:last-child").addClass('active');

            scrollChatEnd();
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
         语音
         */

        //谢娜语音 9s
        $(".yuyin-image-13s").click(function () {
            _smq.push(['custom', '群聊页面', '点击“收听语音3”']);
            if (!playingAudio) {
                playingAudio = true;
                animateAble = false;
                clearInterval(timer);
                $("#audio13")[0].play();

                var _this = this;
                $(_this).addClass('active');
                setTimeout(function () {
                    $(_this).removeClass('active');
                    playingAudio = false;
                    videoEnded();
                }, 9000);
            }
        });

        //张杰语音 3s
        $(".yuyin-image-14s").click(function () {
            _smq.push(['custom', '群聊页面', '点击“收听语音8”']);
            if (!playingAudio) {
                playingAudio = true;
                animateAble = false;
                clearInterval(timer);
                $("#audio14")[0].play();

                var _this = this;
                $(_this).addClass('active');
                setTimeout(function () {
                    $(_this).removeClass('active');
                    playingAudio = false;
                    videoEnded();
                }, 3000);
            }
        });

        //shortout_01 14s
        $(".shortout_01").click(function () {
            _smq.push(['custom', '群聊页面', '点击“收听语音1”']);
            if (!playingAudio) {
                playingAudio = true;
                animateAble = false;
                clearInterval(timer);
                $("#shortout_01")[0].play();

                var _this = this;
                $(_this).addClass('active');
                setTimeout(function () {
                    $(_this).removeClass('active');
                    playingAudio = false;
                    videoEnded();
                }, 14000);
            }
        });

        //shortout_02 9s
        $(".shortout_02").click(function () {
            _smq.push(['custom', '群聊页面', '点击“收听语音2”']);
            if (!playingAudio) {
                playingAudio = true;
                animateAble = false;
                clearInterval(timer);
                $("#shortout_02")[0].play();

                var _this = this;
                $(_this).addClass('active');
                setTimeout(function () {
                    $(_this).removeClass('active');
                    playingAudio = false;
                    videoEnded();
                }, 9000);
            }
        });

        //shortout_03 19s
        $(".shortout_03").click(function () {
            _smq.push(['custom', '群聊页面', '点击“收听语音4”']);
            if (!playingAudio) {
                playingAudio = true;
                animateAble = false;
                clearInterval(timer);
                $("#shortout_03")[0].play();

                var _this = this;
                $(_this).addClass('active');
                setTimeout(function () {
                    $(_this).removeClass('active');
                    playingAudio = false;
                    videoEnded();
                }, 19000);
            }
        });

        //shortout_04 16s
        $(".shortout_04").click(function () {
            _smq.push(['custom', '群聊页面', '点击“收听语音5”']);
            if (!playingAudio) {
                playingAudio = true;
                animateAble = false;
                clearInterval(timer);
                $("#shortout_04")[0].play();

                var _this = this;
                $(_this).addClass('active');
                setTimeout(function () {
                    $(_this).removeClass('active');
                    playingAudio = false;
                    videoEnded();
                }, 16000);
            }
        });

        //shortout_05 18s
        $(".shortout_05").click(function () {
            _smq.push(['custom', '群聊页面', '点击“收听语音6”']);
            if (!playingAudio) {
                playingAudio = true;
                animateAble = false;
                clearInterval(timer);
                $("#shortout_05")[0].play();

                var _this = this;
                $(_this).addClass('active');
                setTimeout(function () {
                    $(_this).removeClass('active');
                    playingAudio = false;
                    videoEnded();
                }, 18000);
            }
        });

        //shortout_06 7s
        $(".shortout_06").click(function () {
            _smq.push(['custom', '群聊页面', '点击“收听语音7”']);
            if (!playingAudio) {
                playingAudio = true;
                animateAble = false;
                clearInterval(timer);
                $("#shortout_06")[0].play();

                var _this = this;
                $(_this).addClass('active');
                setTimeout(function () {
                    $(_this).removeClass('active');
                    playingAudio = false;
                    videoEnded();
                }, 7000);
            }
        });

        $('.yuyin').on('click', function () {
            $(this).removeClass('origin');
        });
    });
});