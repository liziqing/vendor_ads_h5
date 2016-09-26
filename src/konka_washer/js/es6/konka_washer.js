$(() => {
    //页码标注，用于swiper跳转，引用分页id (可能animation需拆分为可滑动三页，动画时间？ 可直接修改页码)
    let SCREEN_SWIPER_INDEX = {
        'loading': 0, //loading && 引言
        'animation': 1,  //三个gif动画 && 1元纵享
        'main': 2,  //活动主页
        'info': 3,  //点击产品图片后的信息页
        'try_form': 4,  //试用表单
        'pay_success': 5,  //支付成功后的回调页面
    }

    //初始化容器screenSwiper
    let screenSwiper = new Swiper('#screen', {
        effect: 'fade',
        fade: {
            crossFade: true,
        },
        noSwiping: true,
        noSwipingClass: 'no-swiping',
    });

    //初始化infoSwiper
    let infoSwiper = new Swiper('#info-swiper', {
        effect: 'fade',
        fade: {
            crossFade: true,
        },
    });

    //资源载入完成后的回调
    Pace.on('done', () => {
        console.info('pace done');
    });


    $("#screen>.swiper-wrapper>.swiper-slide").on('click', () => {
        screenSwiper.slideNext();
    });

});
