'use strict';

/**
 * Created by martin on 16/9/8.
 */
define(function (require) {

    var wx = require('wx');
    var env = require('base/env');
    var util = require('base/util');
    var baseWx = require('base/wx');
    var template = require('template');
    var $ = require('jquery');
    var swiper = require('swiper');
    var WxMoment = require('WxMoment');

    $(function () {

        //初始化容器
        var mySwiper = new Swiper('#screen', {
            effect: 'fade',
            noSwiping: true,
            noSwipingClass: 'no-swiping'
        });

        var video = new WxMoment.Video({
            //请联系接口人确认视频清晰度已调至高清版本
            //如果要定制“播放按钮”的样式，请使用 CSS 覆盖 .tvp_overlay_play 和 .tvp_button_play 即可

            vid: "w0329uymzeq", //视频 vid 取自视频地址：http://v.qq.com/page/a/t/t/a0016gys8ct.html
            pic: "https://wximg.qq.com/tmt/_demo/wxmoment/img/video-thumb.jpg", //设置视频默认缩略图
            oninited: function oninited() {
                //播放器在视频载入完毕触发
            },
            onplaying: function onplaying() {
                //播放器真正开始播放视频第一帧画面时
            },
            onpause: function onpause() {
                //播放器触发暂停时，目前只针对HTML5播放器有效
            },
            onresume: function onresume() {
                //暂停后继续播放时触发
            },
            onallended: function onallended() {
                //播放器播放完毕时
            },
            onfullscreen: function onfullscreen(isfull) {
                //onfullscreen(isfull) 播放器触发全屏/非全屏时，参数isfull表示当前是否是全屏
            }
        });

        /***
         * loading
         * */
        //云层动画

        //loading结束 首屏文字动画
        Pace.on('done', function () {
            $('.loaded-out').fadeOut();
            $('.loaded-in').fadeIn();

            //开发
            // mySwiper.slideTo(4);
        });

        $("#loading .loading-text").on('click', function () {
            mySwiper.slideTo(1);
        });

        /***
         * main
         * */
        $("#main .same-btn").on('click', function () {
            mySwiper.slideTo(2);
        });

        $("#main .film-btn").on('click', function () {
            mySwiper.slideTo(4);
        });

        $("#main .talk-btn").on('click', function () {
            mySwiper.slideTo(5);
        });

        /***
         * menu
         * */
        $("#menu .back-btn").on('click', function () {
            mySwiper.slideTo(1);
        });

        $("#menu .category-item").on('click', function () {
            var thisIndex = $(this).index();

            switch (thisIndex) {
                case 0:
                    categorySwiper2();
                    break;
                case 1:
                    categorySwiper2();
                    break;
                case 2:
                    categorySwiper2();
                    break;
            }

            mySwiper.slideTo(3);
        });

        /***
         * category
         * */
        var categorySwiper2 = function categorySwiper2() {
            //选择相应模板渲染


            //categorySwiper
            var categorySwiper = new Swiper('#category-swiper', {
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next'

            });
        };

        var isShareFading = false;

        $("#category .back-btn").on('click', function () {
            mySwiper.slideTo(2);
        });

        $("#category .share-btn").on('click', function () {
            if (!isShareFading) {
                $(".share-overlay").css({ 'opacity': '0', 'display': 'block' });
                $(".share-overlay").addClass("fadeIn animated-500");
                setTimeout(function () {
                    $(".share-overlay").css({ 'opacity': '1', 'display': 'block' });
                    $(".share-overlay").removeClass("fadeIn animated-500");
                    isShareFading = true;
                }, 750);
            }
        });

        $("#category .share-overlay").on('click', function () {
            if (isShareFading) {
                $(".share-overlay").addClass("fadeOut animated-500");
                setTimeout(function () {
                    $(".share-overlay").css({ 'display': 'none', 'opacity': '1' });
                    $(".share-overlay").removeClass("fadeOut animated-500");
                    isShareFading = false;
                }, 750);
            }
        });
    });
});