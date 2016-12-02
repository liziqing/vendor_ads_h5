/**
 * Created by martin on 16/11/21.
 */
define(['wx','base/env', 'base/wx', 'base/util','jquery', 'hammer', 'velocity'], function(wx,env,baseWx,util,$, Hammer, Velocity) {
        $(() => {


            let head;
            let nickname;
            let openid;


            let myDate=new Date();
            let hour=myDate.getHours();
            let minute=myDate.getMinutes();
            let mouth=myDate.getMonth()+1;
            let day=myDate.getDate();
            let week=myDate.getDay();
            let weekArr=['日','一','二','三','四','五','六'];


            let hot = document.getElementById('hot_area');
            let swipe = document.getElementById('swipe_hint');
            let $hot = $(hot);
            let $swipe = $(swipe);
            let manager = new Hammer.Manager(hot);
            let Pan = new Hammer.Pan();
            let deltaX = 0;
            let deltaY = 0;
            let swiperDone = false;



            let timer;
            let animateAble = true;
            let chatIndex = 0;
            let chatLength = $(".chat-list li").length;

            let endLock = false;

            pullUserInfo();



            /**
             第一页
             */



            /**
             滑动解锁页时间显示
             */
            $('.hour-and-minute').html(zfill(hour)+':'+zfill(minute));
            $('.mouth-and-day').html(zfill(mouth)+'月'+zfill(day)+'日');
            $('.week').html('星期'+weekArr[week]);

            /**
             滑动解锁事件
             */
            manager.add(Pan);
            $("#message_audio")[0].play();
            manager.on('panmove', function(e) {
                $('#swipe_hint,#hot_area').removeClass('original');
                var dX = deltaX + (e.deltaX);
                var dY = deltaY + (e.deltaY);
                //console.log(dX);
                if(dX > 0 && dX < 240){
                    $.Velocity.hook($hot, 'translateX', dX + 'px');
                    $.Velocity.hook($swipe, 'translateX', dX + 'px');
                }else if(dX >= 260){
                    $.Velocity.hook($hot, 'translateX', '700px');
                    $.Velocity.hook($swipe, 'translateX', '700px');
                    swiperDone = true;
                    $("#lock_audio")[0].play();
                }
            });
            manager.on('panend', function(e) {
                if(!swiperDone){
                    $("#swipe_hint").addClass("original");
                    $("#hot_area").addClass("original");
                }else{
                    changeScreen();
                }
            });

            //获取微信用户名和头像
            function  pullUserInfo(){
                if(env.debug == 1)
                {
                    //head = './img/xiena-head.jpg';//  ？缺少默认头像

                    nickname = 'test';

                    openid = 'o6Njdwyc_Lk1cKeeGuB9Lgo9Bib8';

                    $('.invitation-desc').text('\“张杰\”\“谢娜\”邀请\“'+nickname+'\”加入了群聊');
                    $('.user-replay .right img').attr('src',head);
                    $('.greetings').text('Hello @'+nickname+'，你终于来了。');

                }else{
                    baseWx.initUserInfo(env.appid, function(data){

                        head = data.headimgurl;

                        nickname = data.nickname;

                        openid = data.openid;

                        $('.invitation-desc').text('\“张杰\”\“谢娜\”邀请\“'+nickname+'\”加入了群聊');
                        $('.user-replay .right img').attr('src',head);
                        $('.greetings').text('Hello @'+nickname+'，你终于来了。');
                    });
                }
            }
            //时间补零
            function zfill(num) {
                var s = "000000000" + num;
                return s.substr(s.length-2);
            }




            /**
             第二页
             */


            //第一页解锁后，第二页聊天开始
            function changeScreen(){
                $('#lock_screen').fadeOut();
                $('#container').fadeIn();

                setTimeout(() => {
                    displayChat();
                    timer = setInterval(displayChat,3000);
                },1000);
            }




            function displayChat(){
                if(animateAble && (chatIndex < chatLength)){
                    $(".chat-list li").eq(chatIndex).addClass("active").siblings().removeClass("active");
                    $(".chat-list li").eq(chatIndex).show();
                    scrollChat();
                    chatIndex++;
                    if(chatIndex == chatLength){
                        clearInterval(timer);
                    }
                }
            }
            function scrollChat(){
                var height = $(".chat-list")[0].scrollHeight;
                $(".chat-list").animate({scrollTop:height},800);
            }



            //视频结束
            function videoEnded(){
                if(!endLock){
                    endLock = true;
                    setTimeout(function () {
                        endLock = false;
                    },500);
                    setTimeout(function(){
                        animateAble = true;
                        displayChat();
                        timer = setInterval(displayChat,3000);
                    },500)
                }
            }


            /**
             视频
             */


            //视频点击播放
            $(".zj-video1-btn").click(function(){
                animateAble = false;
                clearInterval(timer);
                $("#zj-video1")[0].play();
                $("#zj-video1")[0].webkitRequestFullScreen();
            });
            $(".xn-video1-btn").click(function(){
                animateAble = false;
                clearInterval(timer);
                $("#zj-video1")[0].play();
                $("#zj-video1")[0].webkitRequestFullScreen();
            });
            $(".xn-video2-btn").click(function(){
                animateAble = false;
                clearInterval(timer);
                $("#zj-video1")[0].play();
                $("#zj-video1")[0].webkitRequestFullScreen();
            });
            $(".zj-video2-btn").click(function(){
                animateAble = false;
                clearInterval(timer);
                $("#zj-video1")[0].play();
                $("#zj-video1")[0].webkitRequestFullScreen();
            });
            $(".xn-video3-btn").click(function(){
                animateAble = false;
                clearInterval(timer);
                $("#zj-video1")[0].play();
                $("#zj-video1")[0].webkitRequestFullScreen();
            });
            $(".zj-video3-btn").click(function(){
                animateAble = false;
                clearInterval(timer);
                $("#zj-video1")[0].play();
                $("#zj-video1")[0].webkitRequestFullScreen();
            });




            //视频暂停or结束
            //张杰视频1
            $("#zj-video1").bind("ended", function() {
                videoEnded();
            });
            $("#zj-video1").bind("pause", function() {
                videoEnded();
            });
            ////谢娜视频1
            //$("#xn-video1").bind("ended", function() {
            //    videoEnded();
            //});
            //$("#xn-video1").bind("pause", function() {
            //    videoEnded();
            //});
            ////谢娜视频2
            //$("#xn-video2").bind("ended", function() {
            //    videoEnded();
            //});
            //$("#xn-video2").bind("pause", function() {
            //    videoEnded();
            //});
            ////张杰视频2
            //$("#zj-video2").bind("ended", function() {
            //    videoEnded();
            //});
            //$("#zj-video2").bind("pause", function() {
            //    videoEnded();
            //});
            ////谢娜视频3
            //$("#xn-video3").bind("ended", function() {
            //    videoEnded();
            //});
            //$("#xn-video3").bind("pause", function() {
            //    videoEnded();
            //});
            ////张杰视频3
            //$("#zj-video3").bind("ended", function() {
            //    videoEnded();
            //});
            //$("#zj-video3").bind("pause", function() {
            //    videoEnded();
            //});




            /**
             语音
             */

            //点击播放

            //谢娜语音13s
            $(".yuyin-image-13s").click(function(){
                animateAble = false;
                clearInterval(timer);
                $("#audio13")[0].play();
            });
            //张杰语音14s
            $(".yuyin-image-14s").click(function(){
                animateAble = false;
                clearInterval(timer);
                $("#audio13")[0].play();
            });


            //语音结束or暂停
            $("#audio13").bind("ended", function() {
                videoEnded();
            });
            $("#audio13").bind("pause", function() {
                videoEnded();
            });

            //$("#audio14").bind("ended", function() {
            //    videoEnded();
            //});
            //$("#audio14").bind("pause", function() {
            //    videoEnded();
            //});









        });


    });
