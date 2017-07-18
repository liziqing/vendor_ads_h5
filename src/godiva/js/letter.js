/**
 * Created by Jenson on 2017/7/17.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery'], function (wx, env, baseWx, util, $) {
    $(function () {
        var letterId = util.queryString('letterid');
        var $confirm = $('#confirm');
        var $submit = $('#submit');

        // 判断letterId
        if (letterId) {
            $('#title').text("【一封寄给你的心意】");
            $('.confirm-btn').hide();
            $('.write-btn').show();
            $('#letter').attr('readonly', 'readonly');
        }

        // 确定按钮点击事件
        $confirm.click(function () {
            var letter = $('#letter').val().trim();
            if (!letter) {
                util.alerty('信的内容不能为空');
                return;
            }
            $('.info-box').fadeIn();
        });

        // 关闭信息填写
        $('.info-box-close').click(function () {
            $('.info-box').fadeOut();
        });

        // 提交按钮点击事件
        $submit.click(function () {
            var letter = $('#letter').val().trim();
            var name = $('#fullname').val().trim();
            var tel = $('#telephone').val().trim();

            if (!name) {
                util.alerty('姓名不能为空');
                return;
            }

            if (util.isMobile(tel)) {
                $('.weui_mask').show();
            }
        });

        $('.weui_mask').click(function () {
            $(this).hide();
        });

        $('.product').click(function () {
            $('.page3').hide();
            $('.page4').show();
        });

        $('.back-btn').click(function () {
            $('.page4').hide();
            $('.page3').show();
        });
    });
});