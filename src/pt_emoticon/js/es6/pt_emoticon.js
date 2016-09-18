/**
 * Created by martin on 16/9/8.
 */

$(function () {

    //初始化容器
    let mySwiper = new Swiper('#screen', {
        effect: 'fade',
        noSwiping: true,
        noSwipingClass: 'no-swiping',
    });

    //跳转处理
    // let swiperSlideTo = target => {
    //     var targetIndex = target + 1;
    //     $(".swiper-slide").css('opacity', '0');
    //     $(".swiper-slide-active, .swiper-slide:nth-child(" + targetIndex +")").css('opacity', '1');
    //
    //     mySwiper.slideTo(target);
    // }

    //loading结束 首屏浮出文字
    Pace.on('done', () => {
        $('.loaded-out').fadeOut();
        $('.loaded-in').fadeIn();

        //开发
        mySwiper.slideTo(4);
    });


    /***
     * loading
     * */
    $(".loading-text").on('click', () => {
        mySwiper.slideTo(1);
    });




    /***
     * main
     * */
    $(".same-btn").on('click', () => {
        mySwiper.slideTo(4);
    });
    $(".film-btn").on('click', () => {

    });
    $(".talk-btn").on('click', () => {

    });
    
});