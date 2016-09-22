'use strict';

/**
* Created by martin on 16/9/8.
*/

$(function () {

    //非手机端提示(可能需要替换为跳转pc端页面)
    var isMobile = {
        Android: function Android() {
            return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 ? true : false;
        },
        BlackBerry: function BlackBerry() {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function iOS() {
            return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? true : false;
        },
        Windows: function Windows() {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        any: function any() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows();
        }
    };

    if (!isMobile.any()) {
        window.location.href = './pc/index.html';
    }

    new WxMoment.OrientationTip();

    //初始化容器
    var mySwiper = new Swiper('#screen', {
        effect: 'fade',
        fade: {
            crossFade: true
        },
        noSwiping: true,
        noSwipingClass: 'no-swiping'
    });

    var emoticonSwiper = new Swiper('#emoticon-swiper', {
        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        slidesPerView: 2,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        direction: 'vertical',
        spaceBetween: 1,
        onSlideChangeStart: function onSlideChangeStart() {
            $('.act-pic').hide();
            $("#emoticon .swiper-slide-next").css('pointer-events', 'auto');
        }
    });

    var video = new WxMoment.Video({
        vid: "p0021ehy1js",
        pic: "./img/video/video_img.jpg", //设置视频默认缩略图
        isHtml5ControlAlwaysShow: true,
        autoplay: true,
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

    var screenWidth = screen.width;
    $('#WxMomentVideo').width(screenWidth).height(screenWidth * (9 / 16));

    /***
     * loading
     * */
    //云层动画

    //loading结束 首屏文字动画
    Pace.on('done', function () {
        $('.loaded-out').css('opacity', '0');

        // $('.loaded-out').addClass('fadeOutOri animated-500');
        $('.loaded-in').css({ 'display': 'inline-block', 'opacity': '0' });
        $('.loaded-in').addClass('fadeInOri animated-500');
        setTimeout(function () {
            $('.loaded-out').removeClass('fromRight animated-90000 animated-60000');

            $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'none');

            $("#loading .loading-overlay").on('click', function () {
                mySwiper.slideTo(4);

                if (!audioDom.paused) {
                    $("#music_btn").removeClass("rotate");
                    $("#music_btn").hide();
                    audioDom.pause();
                }
            });
        }, 600);

        //开发
        //        mySwiper.slideTo(5);
        //        $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'auto');
        //        $("#music_btn").removeClass("rotate");
        //        document.querySelector('#music').pause();
    });

    /***
     * main
     * */
    $("#main .same-btn").on('click', function () {
        mySwiper.slideTo(2);
    });

    $("#main .film-btn").on('click', function () {
        mySwiper.slideTo(4);

        $("#music_btn").removeClass("rotate");
        $("#music_btn").hide();
        if (!audioDom.paused) {
            audioDom.pause();
        }
    });

    $("#main .talk-btn").on('click', function () {
        mySwiper.slideTo(5);

        $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'auto');
    });

    /***
     * menu
     * */
    $("#menu .back-btn").on('click', function () {
        mySwiper.slideTo(1);
    });

    $("#menu .category-item").on('click', function () {

        var thisIndex = $(this).index();
        createCategorySwiper(thisIndex);

        setTimeout(function () {
            mySwiper.slideTo(3);
        }, 300);
    });

    /***
     * category
     * */
    var categorySwiper;

    var categoryInit = function categoryInit() {
        var isCategoryShareFading = false;

        $("#category .back-btn").on('click', function () {
            mySwiper.slideTo(2);
        });

        $("#category .share-btn").on('click', function () {
            if (!isCategoryShareFading) {
                $("#category .share-overlay").css({ 'opacity': '0', 'display': 'block' });
                $("#category .share-overlay").addClass("fadeInOri animated-500");
                setTimeout(function () {
                    $("#category .share-overlay").css({ 'opacity': '1', 'display': 'block' });
                    $("#category .share-overlay").removeClass("fadeInOri animated-500");
                    isCategoryShareFading = true;
                }, 750);
            }
        });

        $("#category .share-overlay").on('click', function () {
            if (isCategoryShareFading) {
                $("#category .share-overlay").addClass("fadeOutOri animated-500");
                setTimeout(function () {
                    $("#category .share-overlay").css({ 'display': 'none', 'opacity': '1' });
                    $("#category .share-overlay").removeClass("fadeOutOri animated-500");
                    isCategoryShareFading = false;
                }, 750);
            }
        });

        $("#category .menu-container li").on('click', function () {
            if (!$(this).hasClass('active')) {
                var tempData = $(this).attr('data-menu');

                $("#category .menu-container li").removeClass('active');
                $(this).addClass('active');

                var tempIndex = $("#category .swiper-slide[data-signal=" + tempData + "]").index();
                categorySwiper.slideTo(tempIndex);
            }
        });
    };

    var createCategorySwiper = function createCategorySwiper(thisIndex) {
        //选择相应模板渲染

        switch (thisIndex) {
            case 0:
                var categoryHtml = template('category-page-1', {});
                break;
            case 1:
                var categoryHtml = template('category-page-2', {});
                break;
            case 2:
                var categoryHtml = template('category-page-3', {});
                break;
        }
        document.getElementById('category-container').innerHTML = categoryHtml;

        categoryInit();

        //categorySwiper
        categorySwiper = new Swiper('#category-swiper', {
            effect: 'fade',
            fade: {
                crossFade: true
            },
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            onSlideChangeStart: function onSlideChangeStart() {
                var tempActiveMenu = $("#category .swiper-slide-active").attr("data-menu");
                var tempMenu = $("#category .menu-container li.active").attr("data-menu");
                if (tempActiveMenu != tempMenu) {
                    $("#category .menu-container li.active").removeClass("active");
                    $("#category .menu-container li[data-menu=" + tempActiveMenu + "]").addClass("active");
                }
            }
        });
    };

    /***
     * video
     * */
    $("#video .close_btn").on('click', function () {
        video.getPlayer().pause();
        mySwiper.slideTo(1);

        $("#music_btn").show();
    });

    /***
     * emoticon
     * */

    var isWeiXin = function isWeiXin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    };

    if (!isWeiXin()) {
        $('#emoticon .wx-download').hide();
        $('#emoticon .other-download').show();
    }

    var $item = $('#emoticon-swiper .item');
    var timer = null;
    var $actPic = $('.act-pic');
    var itemWidth = $item.width() - 1;
    $item.css('line-height', $item.height() / 2 + 'px');
    $actPic.width(itemWidth).height(itemWidth);

    $.each($item, function (i, value) {
        var mc = new Hammer(value);
        mc.on('press', function (ev) {
            var _this = ev.target;

            var _thisLeft = $(_this).offset().left;
            var _thisTop = $(_this).offset().top;

            $actPic.hide();
            $actPic.find('img').attr('src', '');

            $actPic.find('img').attr('src', 'img/wechatfeeds/' + $(_this).attr('data-index') + '.gif').css({ 'max-width': 0.8 * itemWidth + 'px', 'max-height': 0.8 * itemWidth + 'px', 'vertical-align': 'middle' });

            $actPic.css({ 'left': _thisLeft - 1, 'top': _thisTop - itemWidth - 8 + 'px', 'line-height': itemWidth + 'px' }).show();
        });
    });

    var dc = new Hammer(document.getElementById('emoticon'));
    dc.on('tap', function () {
        $('#emoticon .act-pic').hide();
    });

    $('#emoticon .back-btn').on('click', function () {
        mySwiper.slideTo(1);
        $('.act-pic').hide();
        $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'none');
    });

    var isEmoticonShareFading = false;

    $("#emoticon .share-btn").on('click', function () {
        if (!isEmoticonShareFading) {
            $("#emoticon .share-overlay").css({ 'opacity': '0', 'display': 'block' });
            $("#emoticon .share-overlay").addClass("fadeInOri animated-500");
            setTimeout(function () {
                $("#emoticon .share-overlay").css({ 'opacity': '1', 'display': 'block' });
                $("#emoticon .share-overlay").removeClass("fadeInOri animated-500");
                isEmoticonShareFading = true;
            }, 750);
        }
    });

    $("#emoticon .share-overlay").on('click', function () {
        if (isEmoticonShareFading) {
            $("#emoticon .share-overlay").addClass("fadeOutOri animated-500");
            setTimeout(function () {
                $("#emoticon .share-overlay").css({ 'display': 'none', 'opacity': '1' });
                $("#emoticon .share-overlay").removeClass("fadeOutOri animated-500");
                isEmoticonShareFading = false;
            }, 750);
        }
    });

    $("#emoticon .wx_emoticon_download").on('click', function () {
        //微信表情包下载
    });

    $("#emoticon .qq_emoticon_download").on('click', function () {
        //qq表情包下载
    });

    /***
     * music
     * */
    var audioDom = document.querySelector('#music');
    var audioSwitch = function audioSwitch(audioBtn) {
        if (audioDom.paused) {
            audioDom.play();
            $(audioBtn).addClass("rotate");
        } else {
            audioDom.pause();
            $(audioBtn).removeClass("rotate");
        }
    };

    $("#music_btn").on('click', function () {
        audioSwitch(this);
    });

    /***
     * shareAction
     * */

    var shareData = {
        shareTile: '铂金见证永不褪色的承诺',
        shareUrl: window.location.href,
        shareImg: 'http://pt-jn.preciousplatinum.com.cn/img/wechatfeeds/share.jpg',
        shareDes: '铂金见证永不褪色的承诺'
    };

    ptShareConfig.init(function (data) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx9a8bd58d910b0460', // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: shareData.shareTile, // 分享标题
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
                title: shareData.shareTile, // 分享标题
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
    });

    /***
     * KGshareAction
     * */
    if (window.KgMobileCall && KgMobileCall.isInClient()) {

        var client_share = {
            "shareName": shareData.shareTile,
            "hash": "",
            "listID": "",
            "type": 3,
            "shareData": {
                "linkUrl": encodeURIComponent(shareData.shareUrl),
                "picUrl": shareData.shareImg,
                "content": shareData.shareDes,
                "title": shareData.shareTile
            },
            "suid": "",
            "slid": "",
            "imgUrl": shareData.shareImg,
            "filename": "",
            "duration": 0
        };
        LogStat({
            "p1": "活动运营",
            "p2": "2015酷狗白皮书",
            "name": "分享_" + globalParam.ch,
            "type": 1
        });
        KgMobileCall.share(client_share);
    }
});