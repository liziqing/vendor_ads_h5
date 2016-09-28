'use strict';

define(['wx', 'base/env', 'base/wechat/wx_pay', 'base/util', 'jquery', 'swiper', 'jbox'], function (wx, env, wxPay, util, $, swiper, jbox) {

    $(function () {

        //页码标注，用于swiper跳转，引用分页id (可能animation需拆分为可滑动三页，动画时间？ 可直接修改页码)
        var SCREEN_SWIPER_INDEX = {
            'loading': 0, //loading && 引言
            'animation': 1, //三个gif动画 && 1元纵享
            'main': 2, //活动主页
            'info': 3, //点击产品图片后的信息页
            'try_form': 4, //试用表单
            'pay_success': 5 };
        var TRY_REASON_LIST = ['婴儿衣物，内衣内裤手洗麻烦；', '普通机洗、手洗不能除菌；', '混合洗不健康；'];
        var modalRules = void 0; //规则浮层
        var modalPay = void 0; //支付浮层
        var modalAddress = void 0; //地址浮层

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
        $('#music_btn').on('click', function () {
            audioSwitch();
        });

        //初始化infoSwiper
        var infoSwiper = new Swiper('#info-swiper', {
            effect: 'fade',
            fade: {
                crossFade: true
            },
            loop: true,
            nextButton: '#info .swiper-button-next',
            prevButton: '#info .swiper-button-prev'
        });

        //获取订单信息
        var orderDetail = function orderDetail(chargeId) {
            util.ajax({
                url: "http://" + env.domain + "/shop/order/detail",
                type: "get",
                data: { format: 'jsonp', 'charge_id': chargeId },
                dataType: "jsonp",
                success: function success(data) {
                    if (data.code == 0) {
                        $('#pay_success #create_time').text(data.data.create_time);
                        $('#pay_success #charge_name').text(data.data.charge_name);
                        $('#pay_success #pay_channel').text(data.data.pay_channel);
                        $('#pay_success #owner').text(data.data.owner);
                        $('#pay_success #order_no').text(data.data.order_no);
                        $('#pay_success #charge_id').text(data.data.charge_id);
                    }
                }
            });
        };

        //获取活动信息
        var campaignDetail = function campaignDetail() {
            util.ajax({
                url: "http://" + env.domain + "/shop/order/statistics",
                type: "get",
                data: { format: 'jsonp' },
                dataType: "jsonp",
                success: function success(data) {
                    var tempCount = data.data.count;
                    if (tempCount <= 5000) {
                        var tempPercent = parseInt((0.2 + tempCount / 5000 * 0.6) * 100);
                        $('#percent_box').css('width', tempPercent + '%');
                        $('#main .main-text-percent').text(tempPercent + '%');
                    }
                }
            });
        };

        //初始化微信支付

        var pay_success = function pay_success(data) {
            modalPay.close();

            var chargeId = data.data.id;
            orderDetail(chargeId);

            setTimeout(function () {
                screenSwiper.slideTo(SCREEN_SWIPER_INDEX.pay_success);
            }, 500);
        };

        var pay_fail = function pay_fail() {};

        wxPay.config({
            appId: 'wxf19834fcc10552b0',
            editAddr: false,
            queryChargeUrl: 'http://' + env.domain + '/shop/order/query',
            success: pay_success,
            fail: pay_fail,
            callback: function callback() {
                alert('初始化');
            }
        });

        //一元购函数（提取表单信息->获取订单id->调用wxpay函数）
        var submitOrder = function submitOrder() {
            var params = {
                'name': $('#pay_overlay .name').val(),
                'age': $('#pay_overlay .age').val(),
                'phone': $('#pay_overlay .tel').val(),
                'address': $('#pay_overlay .address').val(),
                'gender': $('#pay_overlay .check-radio-sex.active').hasClass('sex-female') ? '女' : '男',
                'baby': $('#pay_overlay .check-radio-baby.active').hasClass('baby-yes') ? '有' : '无'
            };
            var url = 'http://' + env.domain + '/shop/order/create';

            wxPay.pay(params, url);
        };

        //使用函数
        var createTryApply = function createTryApply() {
            var tryReason = '';
            $('#try_form .check-radio').each(function (i, value) {
                if ($(this).hasClass('active')) {
                    tryReason = tryReason + TRY_REASON_LIST[i];
                }
            });
            var params = {
                'format': 'jsonp',
                'name': $('#try_form .name').val(),
                'age': $('#try_form .age').val(),
                'phone': $('#try_form .tel').val(),
                'address': $('#try_form .address').val(),
                'reason': tryReason + $('#try_form .other-reason').val()
            };

            util.ajax({
                url: "http://" + env.domain + "/shop/try/create",
                type: "get",
                data: params,
                dataType: "jsonp",
                success: function success(data) {
                    if (data.code == 0) {
                        $('#try_complete_overlay').fadeIn();
                    }
                }
            });
        };

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
                closeButton: false,
                onOpen: function onOpen() {
                    var _this = this;
                    $('#pay_overlay .pay-overlay-close-btn').unbind('click').on('click', function () {
                        _this.close();
                    });
                    $('#pay_overlay .pay-overlay-submit-btn').unbind('click').on('click', function () {
                        submitOrder();
                    });
                }
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
        campaignDetail();

        $('#rules_btn').on('click', function () {
            modalRules.open();
        });

        $('#main .buy-btn').on('click', function () {
            modalPay.open();
        });

        $('#main .try-btn').on('click', function () {
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.try_form);
        });

        $('#main .main-info-btn').on('click', function () {
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.info);
        });

        $('#pay_overlay .check-radio').on('click', function () {
            if ($(this).hasClass('check-radio-sex')) {
                if (!$(this).hasClass('active')) {
                    $('.check-radio-sex').removeClass('active');
                    $(this).addClass('active');
                }
            } else if ($(this).hasClass('check-radio-baby')) {
                if (!$(this).hasClass('active')) {
                    $('.check-radio-baby').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });

        /***
         * info
         * */
        $('#info .back-btn').on('click', function () {
            screenSwiper.slidePrev();
        });

        $('#info .address-btn').on('click', function () {
            modalAddress.open();
        });

        /***
         * try_form
         * */
        $('#try_form .check-radio').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });

        $('#try_form .try-form-submit-btn').on('click', function () {
            createTryApply();
        });

        /***
         * pay_success
         * */
        $('#pay_success .complete-btn').on('click', function () {
            $('#pay_succcess_overlay').fadeIn();
        });

        /***
         * overlay
         * */
        $('#pay_succcess_overlay').on('click', function () {
            $(this).fadeOut();
        });

        $('#try_complete_overlay').on('click', function () {
            $(this).fadeOut();
        });

        //开发
        // setTimeout(() => {
        //     audioDom.pause();
        //     screenSwiper.slideTo(SCREEN_SWIPER_INDEX.pay_success);
        // }, 1000)
    });
});