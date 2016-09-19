/**
 * Created by martin on 16/9/8.
 */
define(function(require){

    const wx = require('wx');
    const env = require('base/env');
    const util = require('base/util');
    const baseWx = require('base/wx');
    const template = require('template');
    const $ = require('jquery');
    const swiper = require('swiper');
        

    $(function () {

        //初始化容器
        let mySwiper = new Swiper('#screen', {
            effect: 'fade',
            noSwiping: true,
            noSwipingClass: 'no-swiping',
        });



        /***
         * loading
         * */
        //云层动画

        //loading结束 首屏文字动画
        Pace.on('done', () => {
            $('.loaded-out').fadeOut();
            $('.loaded-in').fadeIn();

            //开发
            mySwiper.slideTo(2);
        });

        $("#loading .loading-text").on('click', () => {
            mySwiper.slideTo(1);
        });




        /***
         * main
         * */
        $("#main .same-btn").on('click', () => {
            mySwiper.slideTo(2);
        });

        $("#main .film-btn").on('click', () => {

        });

        $("#main .talk-btn").on('click', () => {

        });




        /***
         * menu
         * */
        $("#menu .back-btn").on('click', () => {
            mySwiper.slideTo(1);
        });

        $("#menu .category-item").on('click', function () {
            let thisIndex = $(this).index();

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
        var categorySwiper2 = () => {
            //选择相应模板渲染

            
            //categorySwiper
            let categorySwiper = new Swiper('#category-swiper', {
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',

            });

        }

        let isShareFading = false;

        $("#category .back-btn").on('click', () => {
            mySwiper.slideTo(2);
        });

        $("#category .share-btn").on('click', () => {
            if(!isShareFading){
                $(".share-overlay").css({'opacity': '0','display':'block'});
                $(".share-overlay").addClass("fadeIn animated-500");
                setTimeout(() => {
                    $(".share-overlay").css({'opacity': '1','display':'block'});
                    $(".share-overlay").removeClass("fadeIn animated-500");
                    isShareFading = true;
                }, 750);
            }
        });

        $("#category .share-overlay").on('click', () => {
            if(isShareFading){
                $(".share-overlay").addClass("fadeOut animated-500");
                setTimeout(() => {
                    $(".share-overlay").css({'display':'none','opacity': '1'});
                    $(".share-overlay").removeClass("fadeOut animated-500");
                    isShareFading = false;
                }, 750);
            }
        });

    });

});
