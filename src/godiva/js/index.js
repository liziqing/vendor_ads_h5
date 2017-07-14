/**
 * Created by Jenson on 2017/7/13.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery'], function (wx, env, baseWx, util, $) {
    var basePath = "";
    var loader = new WxMoment.Loader();
    //声明资源文件列表
    var fileList = ['img/logo.png', 'img/mute.png', 'img/play.png', 'img/bg.png', 'img/bg_end.png', 'img/bg_letter.png', 'img/letter.png', 'img/submit.png', 'img/share.png', 'img/bird.gif'];
    for (var i = 0; i < fileList.length; i++) {
        loader.addImage(basePath + fileList[i]);
    }
    //进度监听
    loader.addProgressListener(function (e) {
        var percent = Math.round((e.completedCount / e.totalCount) * 100);
        $('.loading-bar-active').css('width', percent + '%');
        $('.percent-num').text(percent + "%");
        console.log("当前加载了", percent, "%");
    });
    //加载完成
    loader.addCompletionListener(function () {
        setTimeout(function () { $('.loading-screen').fadeOut(); }, 500);
    });
    //启动加载
    loader.start();

    // 下一页
    function showNext(page) {
        page.hide();
        page.next().show();
    }

    $(function () {
        var video = document.getElementById("video");
        var $play = $('#play');
        var $confirm = $('#confirm');
        var $submit = $('#submit');
        new WxMoment.OrientationTip();

        // 播放视频
        $play.click(function () {
            $('.wrapper').show();
            video.play();
            // $(this).hide();
        });

        // 播放结束时触发
        video.addEventListener('ended', function (e) {
            // util.alerty("已播放完成");
            showNext($('.page1'));
        });

        $('.mute').click(function () {
            util.alerty("mute");
            video.volume = 0;
        });

        $('.next-btn').click(function () {
            showNext($('.page2'));
        });

        $confirm.click(function () {
            $('.weui_mask').show();
        });

        $submit.click(function () {
            $('.info-box').hide();
            $('.share').show();
        });
    });
});