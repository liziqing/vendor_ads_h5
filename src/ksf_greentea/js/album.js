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
        } else {
            getImageList(mobile);
        }


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