'use strict';

define(['wx', 'base/env', 'base/wechat/wx_pay', 'base/wechat/wx', 'base/util', 'jquery', 'swiper', 'jbox'], function (wx, env, wxPay, baseWx, util, $, swiper, jbox) {

    $(function () {

        var randomNum = parseInt(Math.random() * 100);

        $('#preload').append('<img src="img/animation/title.gif?r=' + randomNum + '" />' + '<img src="img/animation/title_coin.png?r=' + randomNum + '" />' + '<img src="img/animation/money.gif?r=' + randomNum + '" />' + '<img src="img/animation/title.gif?r=' + randomNum + '" />' + '<img src="img/animation/danxin.gif?r=' + randomNum + '" />' + '<img src="img/animation/kunrao.gif?r=' + randomNum + '" />' + '<img src="img/animation/laolei.gif?r=' + randomNum + '" />' + '<img src="img/animation/title_money.gif?r=' + randomNum + '" />' +
        //'<img src="img/animation/danxin_icon.gif?r='+randomNum+'" />'+
        //'<img src="img/animation/danxin_bubble.gif?r='+randomNum+'" />'+
        //'<img src="img/animation/kunrao_icon.gif?r='+randomNum+'" />'+
        //'<img src="img/animation/kunrao_bubble.gif?r='+randomNum+'" />'+
        //'<img src="img/animation/laolei_icon.gif?r='+randomNum+'" />'+
        //'<img src="img/animation/laolei_bubble.gif?r='+randomNum+'" />' +
        '');

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
                    } else {
                        util.alerty(data.message);
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
                        $('#main #percent_pop').text(tempPercent + '%');

                        var myDate = new Date();
                        var tempDay = myDate.getDate();
                        var tempMonth = myDate.getMonth() + 1;
                        var tempResult = '';
                        if (tempMonth < 10) {
                            var restDay = 30 - tempDay + 1;
                            tempResult = restDay + 7 + '天';
                        } else {
                            var _restDay = 8 - tempDay;
                            if (_restDay > 0) {
                                tempResult = _restDay + '天';
                            } else {
                                tempResult = '已结束';
                            }
                        }
                        $('#main .main-text-time').text(tempResult);
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

        //一元购函数（提取表单信息->获取订单id->调用wxpay函数）
        var submitOrder = function submitOrder() {
            var params = {
                'name': $('#pay_overlay .name').val(),
                'age': $('#pay_overlay .age').val(),
                'phone': $('#pay_overlay .tel').val(),
                'address': $('#pay_overlay .address').val(),
                'gender': parseInt($('#pay_overlay .check-radio-sex.active').attr("data-radio")),
                'baby': parseInt($('#pay_overlay .check-radio-baby.active').attr("data-radio"))
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
                    } else {
                        util.alerty(data.message);
                    }
                }
            });
        };

        var loaded = false;

        var loadedFunction = function loadedFunction() {
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
                        _hmt.push(['_trackEvent', '参与', '点击', '立即支付']);
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
        };

        setTimeout(function () {
            if (!loaded) {

                loaded = true;

                Pace.stop();

                loadedFunction();
            }
        }, 5000);

        //资源载入完成后的回调
        Pace.on('done', function () {
            if (!loaded) {
                console.info('pace done');

                loadedFunction();
            }
        });

        /***
         * loading
         * */
        $('#loading .loaded-btn').on('click', function () {
            _hmt.push(['_trackEvent', '引言', '点击', '为什么']);
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.animation);
        });

        /***
         * loading
         * */
        $('#loading .loaded-btn').on('click', function () {
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.animation);
            animationPage();
        });

        /***
         * animation
         * */
        //
        //$('#animation').on('click', () => {
        //    screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
        //
        //    setTimeout(() => {
        //        $('#rules_btn').fadeIn();
        //        modalRules.open();
        //        $('#animation').empty();
        //    },300);
        //
        //});
        var animation_timer1 = null;
        var animation_timer2 = null;
        var animation_timer3 = null;
        var $topImg = $('.top-img-wrapper img');
        var $gifWord1 = $('.gifword1');
        var $gifWord2 = $('.gifword2');
        var $animationIcon = $('.animation-icon');
        //let $animationIcon = $('.animation-icon');
        var $animation = $('#animation');
        var $firstWords = $('.first-words');
        var $secondWords = $('.second-words');
        var $animationStar = $('.animation-star');
        var $animationDes = $('.animation-des');
        var $wordsWrapper = $('.words-wrapper');
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        var breakTime = 0;
        var clickAble = false;
        var $columLeft = $('.column_left');

        var animationPageTime = 8000;

        function animationPage() {

            //animation_timer1 = setTimeout(() => {
            //    $topImg.show().attr('src','img/animation/danxin.gif?r='+randomNum+'');
            //
            //    clearTimeout(animation_timer1);
            //    animation_timer1 = setTimeout(() => {
            //        fadeOutImg();
            //        clearTimeout(animation_timer1);
            //        animation_timer1 = setTimeout(() => {
            //            $topImg.show().attr('src','img/animation/kunrao.gif?r='+randomNum+'');
            //            clearTimeout(animation_timer1);
            //            animation_timer1 = setTimeout(() => {
            //                fadeOutImg();
            //                clearTimeout(animation_timer1);
            //                animation_timer1 = setTimeout(() => {
            //                    $topImg.show().attr('src','img/animation/laolei.gif?r='+randomNum+'');
            //                    clearTimeout(animation_timer1);
            //                    animation_timer1 = setTimeout(() => {
            //                        fadeOutImg();
            //                        $('.more-than').fadeOut();
            //                        $('.yiyuan-cover').show().attr('src','img/animation/title_money.gif?r='+randomNum+'');
            //                        clearTimeout(animation_timer1);
            //                        animation_timer1 = setTimeout(() => {
            //                            $('.yiyuan-cover').hide();
            //                            $('.yiyuan-top').css('top',screenWidth*0.15).show().attr('src','img/animation/title.gif');
            //                            $('.yiyuan-title').css('top',screenWidth*0.96).show().attr('src','img/animation/title_coin.png');
            //                            $('.yiyuan-coin').css('top',screenWidth*1.0175).show().attr('src','img/animation/money.gif');
            //                        },10000);
            //                    },8400);
            //                    wrapperTimeout('xiao','sa');
            //                    columnTimeout3();
            //                },500);
            //            },8600);
            //            wrapperTimeout('bao','hu');
            //            columnTimeout2();
            //        },500);
            //    },8800);
            //    wrapperTimeout('fang','xin');
            //    columnTimeout1();
            //    $('.more-than').fadeIn();
            //},100);
            animationPage1();
            animation_timer2 = setTimeout(function () {
                animationClick();
            }, animationPageTime);

            function animationPage1() {
                columnMove1();
                $topImg.show().attr('src', 'img/animation/danxin.gif?r=' + randomNum + '');
                wrapperTimeout('fang', 'xin');
                $('.more-than').fadeIn();
                setTimeout(function () {
                    clickAble = true;
                }, 3000);
            }

            function animationPage2() {
                $topImg.show().attr('src', 'img/animation/kunrao.gif?r=' + randomNum + '');
                wrapperTimeout('bao', 'hu');
                setTimeout(function () {
                    clickAble = true;
                }, 3000);
            }

            function animationPage3() {
                $topImg.show().attr('src', 'img/animation/laolei.gif?r=' + randomNum + '');
                wrapperTimeout('xiao', 'sa');
                setTimeout(function () {
                    clickAble = true;
                }, 3000);
            }

            function animationPage4() {
                fadeOutImg();
                columnMove4();
                $('.yiyuan-cover').show().attr('src', 'img/animation/title_money.gif?r=' + randomNum + '');
                clearTimeout(animation_timer1);
                animation_timer1 = setTimeout(function () {
                    $('.yiyuan-cover').hide();
                    $('.yiyuan-top').css('top', screenWidth * 0.15).show().attr('src', 'img/animation/title.gif');
                    $('.yiyuan-title').css('top', screenWidth * 0.96).show().attr('src', 'img/animation/title_coin.png');
                    $('.yiyuan-coin').css('top', screenWidth * 1.0175).show().attr('src', 'img/animation/money.gif');
                }, 5000);
            }

            $animation.on('click', function () {

                animationClick();
            });

            function animationClick() {
                if (clickAble && $columLeft.hasClass('bounceInDown1')) {
                    clickAble = false;
                    fadeOutImg();
                    columnMove2();
                    setTimeout(function () {
                        animationPage2();
                    }, 500);

                    animation_timer3 = setTimeout(function () {
                        animationClick();
                    }, animationPageTime);
                } else if (clickAble && $columLeft.hasClass('bounceInDown6')) {
                    clickAble = false;
                    fadeOutImg();
                    columnMove3();
                    setTimeout(function () {
                        animationPage3();
                    }, 500);

                    var animation_timer4 = setTimeout(function () {
                        animationClick();
                    }, animationPageTime);
                } else if (clickAble && $columLeft.hasClass('bounceInDown9')) {
                    clickAble = false;
                    fadeOutImg();
                    columnMove4();

                    setTimeout(function () {
                        animationPage4();
                    }, 1200);
                }
            }
        }

        function wrapperTimeout(f, s) {
            clearTimeout(animation_timer2);
            animation_timer2 = setTimeout(function () {
                $firstWords.fadeIn().attr('src', 'img/animation/word_' + f + '.png');
                $secondWords.delay('400').fadeIn().attr('src', 'img/animation/word_' + s + '.png');
                $animationStar.delay('1500').fadeIn().attr('src', 'img/animation/star_' + f + s + '.gif');
                $animationDes.delay('1500').fadeIn().attr('src', 'img/animation/title_' + f + s + '.png');
            }, 700);
        }

        function columnMove1() {
            $('.column_left').addClass('bounceInDown1');
            $('.column_right').addClass('bounceInDown3');
            $('.column_fine').addClass('bounceInDown4');
            $('.column_double1').addClass('bounceInDown3');
            $('.column_double2').addClass('bounceInDown3');
            $('.column_circle1').addClass('bounceInDown5');
            $('.column_circle2').addClass('bounceInDown2');
        }
        function columnMove2() {
            $('.column_left').removeClass('bounceInDown1').addClass('bounceInDown6');
            $('.column_right').removeClass('bounceInDown3').addClass('bounceInDown7');
            $('.column_fine').removeClass('bounceInDown4').addClass('bounceInDown7');
            $('.column_double1').removeClass('bounceInDown3').addClass('bounceInDown7');
            $('.column_double2').removeClass('bounceInDown3').addClass('bounceInDown7');
            $('.column_circle1').removeClass('bounceInDown5').addClass('bounceInDown8');
            $('.column_circle2').removeClass('bounceInDown2').addClass('bounceInDown6');
        }
        function columnMove3() {
            $('.column_left').removeClass('bounceInDown6').addClass('bounceInDown9');
            $('.column_right').removeClass('bounceInDown7').addClass('bounceInDown9');
            $('.column_fine').removeClass('bounceInDown7').addClass('bounceInDown9');
            $('.column_double1').removeClass('bounceInDown7').addClass('bounceInDown9');
            $('.column_double2').removeClass('bounceInDown7').addClass('bounceInDown9');
            $('.column_circle1').removeClass('bounceInDown8').addClass('bounceInDown10');
            $('.column_circle2').removeClass('bounceInDown6').addClass('bounceInDown9');
        }
        function columnMove4() {
            $('.column_left').removeClass('bounceInDown9').addClass('bounceInDown11');
            $('.column_right').removeClass('bounceInDown9').addClass('bounceInDown12');
            $('.column_fine').removeClass('bounceInDown9').addClass('bounceInDown13');
            $('.column_double1').removeClass('bounceInDown9').addClass('bounceInDown12');
            $('.column_double2').removeClass('bounceInDown9').addClass('bounceInDown12');
            $('.column_circle1').removeClass('bounceInDown10').addClass('bounceInDown14');
            $('.column_circle2').removeClass('bounceInDown9').addClass('bounceInDown11');

            clearTimeout(animation_timer3);
            $('.more-than').fadeOut();
            animation_timer3 = setTimeout(function () {
                $('.column-wrapper').hide();
            }, 1000);
        }

        function fadeOutImg() {
            $topImg.fadeOut();
            $firstWords.fadeOut();
            $secondWords.fadeOut();
            $animationStar.fadeOut();
            $animationDes.fadeOut();
        }

        $('.column-wrapper').show();

        $('#animation .yiyuan-coin').on('click', function () {
            _hmt.push(['_trackEvent', 'GIF', '点击', '一元gif']);
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
            $('#rules_btn').fadeIn();
            modalRules.open();
        });

        /***
         * main
         * */
        campaignDetail();

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

        $('#rules_btn').on('click', function () {
            modalRules.open();
        });

        $('#main .buy-btn').on('click', function () {
            _hmt.push(['_trackEvent', '参与', '点击', '参与一元购']);
            modalPay.open();
        });

        $('#main .try-btn').on('click', function () {
            _hmt.push(['_trackEvent', '参与', '点击', '申请免费试用']);
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.try_form);
        });

        $('#main .left-info-btn').on('click', function () {
            infoSwiper.slideTo(1);
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.info);
        });
        $('#main .center-info-btn').on('click', function () {
            infoSwiper.slideTo(2);
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.info);
        });
        $('#main .right-info-btn,.main-clickme-btn').on('click', function () {
            infoSwiper.slideTo(0);
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
            _hmt.push(['_trackEvent', '产品', '点击', '返回']);
            screenSwiper.slidePrev();
        });

        $('#info .address-btn').on('click', function () {
            _hmt.push(['_trackEvent', '产品', '点击', '购买地址']);
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
            _hmt.push(['_trackEvent', '参与', '点击', '提交申请']);
            createTryApply();
        });

        $('#try_form .try-form-back-btn').on('click', function () {
            _hmt.push(['_trackEvent', '产品', '点击', '返回']);
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
        });

        $('#try_form').css('width', document.body.clientWidth);
        $('#try_form').css('height', document.body.clientHeight);

        var resized = false;
        if (navigator.userAgent.toLowerCase().indexOf('and') > -1) {

            $('#try_form input,textarea').css('left', '20%');

            window.addEventListener("resize", function () {
                if (!resized) {
                    resized = true;
                    window.setTimeout(function () {
                        $('#try_form').css('margin-top', '-' + screenHeight / 2 + 'px');
                        $('#icon-bar').css('margin-top', '-' + screenHeight / 2 + 'px');
                    }, 0);
                } else {
                    resized = false;
                    window.setTimeout(function () {
                        $('#try_form').css('margin-top', 0);
                        $('#icon-bar').css('margin-top', 0);
                    }, 0);
                }
            });
        }

        /***
         * pay_success
         * */
        $('#pay_success .complete-btn').on('click', function () {
            _hmt.push(['_trackEvent', '参与', '点击', '付款完成']);
            $('#pay_succcess_overlay').fadeIn();
        });

        /***
         * overlay
         * */
        $('#pay_succcess_overlay').on('click', function () {
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
            $('#pay_succcess_overlay').fadeOut();
        });

        $('#try_complete_overlay').on('click', function () {
            screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
            $('#try_complete_overlay').fadeOut();
        });

        /***
         * share
         * */
        var shareData = {
            shareFeedsTitle: '国庆特惠！一元钱即有机会赢取免费康佳Kmini洗衣机！快来碰碰你的好运气！',
            shareTitle: '爱无止净、钜惠国庆，长假无忧、纵享时光',
            shareUrl: window.location.href,
            shareImg: 'http://kangjiaguoqing.qnmami.com/img/share.jpeg',
            shareDes: '一元钱可以做什么？”康佳国庆特惠一元惊喜好礼等你来拿！'
        };

        baseWx.initWxJs('wxf19834fcc10552b0', ['onMenuShareTimeline', 'onMenuShareAppMessage'], function () {
            wx.onMenuShareTimeline({
                title: shareData.shareFeedsTitle, // 分享标题
                link: shareData.shareUrl, // 分享链接
                imgUrl: shareData.shareImg,
                success: function success() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function cancel() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: shareData.shareTitle, // 分享标题
                link: shareData.shareUrl,
                desc: shareData.shareDes,
                imgUrl: shareData.shareImg,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function success() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function cancel() {
                    // 用户取消分享后执行的回调函数
                }
            });
        });

        wxPay.config({
            appId: 'wxf19834fcc10552b0',
            editAddr: false,
            queryChargeUrl: 'http://' + env.domain + '/shop/order/query',
            success: pay_success,
            fail: pay_fail,
            callback: function callback() {
                // alert('初始化');
            }
        });

        // 开发
        // setTimeout(() => {
        //     audioDom.pause();
        //     screenSwiper.slideTo(SCREEN_SWIPER_INDEX.main);
        // }, 200)
    });
});