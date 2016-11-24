'use strict';

/**
 * Created by martin on 16/11/21.
 */
define(['jquery', 'hammer', 'velocity'], function ($, Hammer, Velocity) {
    $(function () {

        //第一页
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

        //滑动解锁页时间显示
        $('.hour-and-minute').html(zfill(hour) + ':' + zfill(minute));
        $('.mouth-and-day').html(zfill(mouth) + '月' + zfill(day) + '日');
        $('.week').html('星期' + weekArr[week]);

        //滑动解锁事件
        manager.add(Pan);
        $("#message_audio")[0].play();
        manager.on('panmove', function (e) {
            $('#swipe_hint,#hot_area').removeClass('original');
            var dX = deltaX + e.deltaX;
            var dY = deltaY + e.deltaY;
            console.log(dX);
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

        function zfill(num) {
            var s = "000000000" + num;
            return s.substr(s.length - 2);
        }

        //第二页


        var timer = void 0;
        var animateAble = true;
        var chatIndex = 0;
        var chatLength = $(".chat-list li").length;

        function changeScreen() {
            $('#lock_screen').fadeOut();
            $('#container').fadeIn();

            setTimeout(function () {
                displayChat();
                timer = setInterval(displayChat, 1000);
            }, 1000);
        }

        function displayChat() {
            if (animateAble && chatIndex < chatLength) {
                $(".chat-list li").eq(chatIndex).addClass("active").siblings().removeClass("active");
                $(".chat-list li").eq(chatIndex).show();
                scrollChat();
                chatIndex++;
                if (chatIndex == chatLength) {
                    clearInterval(timer);
                }
            }
        }

        function scrollChat() {
            var height = $(".chat-list")[0].scrollHeight;
            $(".chat-list").animate({ scrollTop: height }, 800);
        }
        //视频结束
        function videoEnded() {
            setTimeout(function () {
                animateAble = true;
                displayChat();
                timer = setInterval(displayChat, 4000);
            }, 500);
        }

        $(".yuyin-image").click(function () {
            animateAble = false;
            clearInterval(timer);
        });
    });
});