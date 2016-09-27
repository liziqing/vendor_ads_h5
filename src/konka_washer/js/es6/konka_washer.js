$(() => {
    //页码标注，用于swiper跳转，引用分页id (可能animation需拆分为可滑动三页，动画时间？ 可直接修改页码)
    let SCREEN_SWIPER_INDEX = {
        'loading': 0, //loading && 引言
        'animation': 1,  //三个gif动画 && 1元纵享
        'main': 2,  //活动主页
        'info': 3,  //点击产品图片后的信息页
        'try_form': 4,  //试用表单
        'pay_success': 5,  //支付成功后的回调页面
    };
    let modalRules;  //规则浮层
    let modalPay;   //支付浮层
    let modalAddress;  //地址浮层

    //初始化容器screenSwiper
    let screenSwiper = new Swiper('#screen', {
        effect: 'fade',
        fade: {
            crossFade: true,
        },
        noSwiping: true,
        noSwipingClass: 'no-swiping',
    });

    //初始化music
    let audioDom = document.querySelector('#music');
    let audioBtn = $('#music_btn');
    let audioSwitch = () => {
        if(audioDom.paused){
            audioDom.play();
            audioBtn.addClass("rotate");
        }else{
            audioDom.pause();
            audioBtn.removeClass("rotate");
        }
    }
    audioBtn.on('tap', function () {
        audioSwitch();
    });

    //初始化infoSwiper
    let infoSwiper = new Swiper('#info-swiper', {
        effect: 'fade',
        fade: {
            crossFade: true,
        },
        loop: true,
        nextButton: '#info .swiper-button-next',
        prevButton: '#info .swiper-button-prev',
    });

    //一元购函数（提取表单信息->获取订单id->调用wxpay函数）
    let submitOrder = () => {

    }

    //资源载入完成后的回调
    Pace.on('done', () => {
        console.info('pace done');

        modalRules = new jBox('Modal', {
            width: '100%',
            content: $('#rules_overlay'),
            closeButton: false,
            onOpen: function () {
                let _this = this;
                $('#rules_overlay').on('click', () => {
                    _this.close();
                });
            },
        });

        modalPay = new jBox('Modal', {
            width: '100%',
            content: $('#pay_overlay'),
            closeButton: false,
            onOpen: function () {
                let _this = this;
                $('#pay_overlay .pay-overlay-close-btn').unbind('click').on('click', () => {
                    _this.close();
                });
                $('#pay_overlay .pay-overlay-submit-btn').unbind('click').on('click', () => {
                    submitOrder();
                });
            },
        });

        modalAddress = new jBox('Modal', {
            width: '100%',
            content: $('#address_overlay'),
            closeButton: false,
            onOpen: function () {
                let _this = this;
                $('#address_overlay').unbind('click').on('click', () => {
                    _this.close();
                });
            },
        });

        //loading页动画效果
        $('#loading .loading-overlay').fadeOut();
        $('#loading .loaded-overlay').fadeIn();

    });



    /***
     * loading
     * */
    $('#loading .loaded-btn').on('click', () => {
        screenSwiper.slideTo(SCREEN_SWIPER_INDEX.animation);
    });







    /***
     * animation
     * */
    $('#animation').on('click', () => {
        screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
        $('#percent_box').css('width','70%');
        $('#rules_btn').fadeIn();
        modalRules.open();
    });








    /***
     * main
     * */
    $('#rules_btn').on('tap', () => {
        modalRules.open();
    });

    $('#main .buy-btn').on('click', () => {
        modalPay.open();
    });

    $('#main .try-btn').on('click', () => {
        screenSwiper.slideTo(SCREEN_SWIPER_INDEX.try_form);
    });

    $('#main .main-info').on('click', () => {
        screenSwiper.slideTo(SCREEN_SWIPER_INDEX.info);
    });

    $('#pay_overlay .check-radio').on('tap', function () {
        if($(this).hasClass('check-radio-sex')){
            if(!$(this).hasClass('active')){
                $('.check-radio-sex').removeClass('active');
                $(this).addClass('active');
            }
        }else if($(this).hasClass('check-radio-baby')){
            if(!$(this).hasClass('active')){
                $('.check-radio-baby').removeClass('active');
                $(this).addClass('active');
            }
        }
    });







    /***
     * info
     * */
    $('#info .back-btn').on('click', () => {
        screenSwiper.slidePrev();
    });

    $('#info .address-btn').on('click', () => {
        modalAddress.open();
    });






    /***
     * try_form
     * */
    $('#try_form .check-radio').on('tap', function () {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });




    //开发
    setTimeout(() => {
        audioDom.pause();
        screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
        $('#percent_box').css('width','70%');
        modalPay.open();
    },1000)

});
