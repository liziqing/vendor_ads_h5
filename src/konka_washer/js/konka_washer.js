'use strict';

$(function () {
    //页码标注，用于swiper跳转，引用分页id (可能animation需拆分为可滑动三页，动画时间？ 可直接修改页码)
    var SCREEN_SWIPER_INDEX = {
        'loading': 0, //loading && 引言
        'animation': 1, //三个gif动画 && 1元纵享
        'main': 2, //活动主页
        'info': 3, //点击产品图片后的信息页
        'try_form': 4, //试用表单
        'pay_success': 5 };
    var modalRules = void 0;
    var modalPay = void 0;
    var modalAddress = void 0;

    //初始化容器screenSwiper
    var screenSwiper = new Swiper('#screen', {
        effect: 'fade',
        fade: {
            crossFade: true
        },
        noSwiping: true,
        noSwipingClass: 'no-swiping'
    });

    //初始化music
    var audioDom = document.querySelector('#music');
    var audioBtn = $('#music_btn');
    var audioSwitch = function audioSwitch() {
        if (audioDom.paused) {
            audioDom.play();
            audioBtn.addClass("rotate");
        } else {
            audioDom.pause();
            audioBtn.removeClass("rotate");
        }
    };
    audioBtn.on('tap', function () {
        audioSwitch();
    });

    //初始化infoSwiper
    var infoSwiper = new Swiper('#info-swiper', {
        effect: 'fade',
        fade: {
            crossFade: true
        },
        nextButton: '#info-swiper .swiper-button-next',
        prevButton: '#info-swiper .swiper-button-prev'
    });

    //资源载入完成后的回调
    Pace.on('done', function () {
        console.info('pace done');

        modalRules = new jBox('Modal', {
            width: '100%',
            content: $('#rules_overlay'),
            closeButton: false,
            onOpen: function onOpen() {
                var _this = this;
                $('#rules_overlay').on('click', function () {
                    _this.close();
                });
            }
        });

        modalPay = new jBox('Modal', {
            width: '100%',
            content: $('#pay_overlay'),
            closeButton: false
        });

        modalAddress = new jBox('Modal', {
            width: '100%',
            content: $('#address_overlay'),
            closeButton: false,
            onOpen: function onOpen() {
                var _this = this;
                $('#address_overlay').unbind('click').on('click', function () {
                    _this.close();
                });
            }
        });

        //loading页动画效果
        $('#loading .loading-overlay').fadeOut();
        $('#loading .loaded-overlay').fadeIn();
    });

    /***
     * loading
     * */
    $('#loading .loaded-btn').on('click', function () {
        screenSwiper.slideTo(SCREEN_SWIPER_INDEX.animation);
    });

    /***
     * animation
     * */
    $('#animation').on('click', function () {
        screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
        $('#rules_btn').fadeIn();
        modalRules.open();
    });

    /***
     * main
     * */
    $('#rules_btn').on('tap', function () {
        modalRules.open();
    });

    //开发
    audioDom.pause();
    screenSwiper.slideTo(SCREEN_SWIPER_INDEX.try_form);
});