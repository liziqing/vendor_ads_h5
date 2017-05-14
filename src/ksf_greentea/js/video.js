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
            $('.weui_mask').fadeIn();
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
                    if (data.code == 0) {

                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        });


        $('.share-btn').click(function () {
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

    });
});