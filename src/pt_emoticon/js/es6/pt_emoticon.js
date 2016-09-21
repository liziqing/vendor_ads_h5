/**
* Created by martin on 16/9/8.
*/

$(function () {

    //非手机端提示(可能需要替换为跳转pc端页面)
    new WxMoment.OrientationTip();

    //初始化容器
    let mySwiper = new Swiper('#screen', {
        effect: 'fade',
        fade: {
            crossFade: true,
        },
        noSwiping: true,
        noSwipingClass: 'no-swiping',
    });

    let emoticonSwiper = new Swiper('#emoticon-swiper', {
        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        slidesPerView: 2,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        direction:'vertical',
        spaceBetween: 1,
        onTouchStart: function(swiper,even){
            $('#emoticon .act-pic').hide();
        },
        onSlideChangeStart: function () {
            $("#emoticon .swiper-slide-next").css('pointer-events', 'auto');
        }
    });

    let video = new WxMoment.Video({
        vid: "p0021ehy1js",
        pic: "./img/video/video_img.jpg", //设置视频默认缩略图
        isHtml5ControlAlwaysShow: true,
        oninited: function () {
            //播放器在视频载入完毕触发
        },
        onplaying: function () {
            //播放器真正开始播放视频第一帧画面时
        },
        onpause: function () {
            //播放器触发暂停时，目前只针对HTML5播放器有效
        },
        onresume: function () {
            //暂停后继续播放时触发
        },
        onallended: function () {
            //播放器播放完毕时
        },
        onfullscreen: function (isfull) {
            //onfullscreen(isfull) 播放器触发全屏/非全屏时，参数isfull表示当前是否是全屏
        }
    });

    let screenWidth = screen.width;
    $('#WxMomentVideo').width(screenWidth).height(screenWidth*(9/16));



    /***
     * loading
     * */
    //云层动画

    //loading结束 首屏文字动画
    Pace.on('done', () => {
        $('.loaded-out').css('opacity', '0');
        
        // $('.loaded-out').addClass('fadeOutOri animated-500');
        $('.loaded-in').css({'display':'inline-block','opacity': '0'});
        $('.loaded-in').addClass('fadeInOri animated-500');
        setTimeout(() => {
            $('.loaded-out').removeClass('fromRight animated-90000 animated-60000');

            $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'none');
            
            $("#loading .loading-overlay").on('tap', () => {
                mySwiper.slideTo(1);
            });

        }, 600);

        //开发
        // mySwiper.slideTo(5);
    });





    /***
     * main
     * */
    $("#main .same-btn").on('tap', () => {
        mySwiper.slideTo(2);
    });

    $("#main .film-btn").on('tap', () => {
        mySwiper.slideTo(4);
    });

    $("#main .talk-btn").on('tap', () => {
        mySwiper.slideTo(5);

        $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'auto');
    });




    /***
     * menu
     * */
    $("#menu .back-btn").on('tap', () => {
        mySwiper.slideTo(1);
    });

    $("#menu .category-item").on('tap', function () {

        let thisIndex = $(this).index();
        createCategorySwiper(thisIndex);

        setTimeout(() => {
            mySwiper.slideTo(3);
        }, 300)
    });




    /***
     * category
     * */
    var categorySwiper;

    let categoryInit = () => {
        let isCategoryShareFading = false;

        $("#category .back-btn").on('tap', () => {
            mySwiper.slideTo(2);
        });

        $("#category .share-btn").on('tap', () => {
            if(!isCategoryShareFading){
                $("#category .share-overlay").css({'opacity': '0','display':'block'});
                $("#category .share-overlay").addClass("fadeInOri animated-500");
                setTimeout(() => {
                    $("#category .share-overlay").css({'opacity': '1','display':'block'});
                    $("#category .share-overlay").removeClass("fadeInOri animated-500");
                    isCategoryShareFading = true;
                }, 750);
            }
        });

        $("#category .share-overlay").on('tap', () => {
            if(isCategoryShareFading){
                $("#category .share-overlay").addClass("fadeOutOri animated-500");
                setTimeout(() => {
                    $("#category .share-overlay").css({'display':'none','opacity': '1'});
                    $("#category .share-overlay").removeClass("fadeOutOri animated-500");
                    isCategoryShareFading = false;
                }, 750);
            }
        });

        $("#category .menu-container li").on('tap', function () {
            if(!$(this).hasClass('active')){
                var tempData = $(this).attr('data-menu');

                $("#category .menu-container li").removeClass('active');
                $(this).addClass('active');

                var tempIndex = $("#category .swiper-slide[data-signal=" + tempData + "]").index();
                categorySwiper.slideTo(tempIndex);
            }
        });
    }


    var createCategorySwiper = (thisIndex) => {
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
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
            onSlideChangeStart: function () {
                let tempActiveMenu = $("#category .swiper-slide-active").attr("data-menu");
                let tempMenu = $("#category .menu-container li.active").attr("data-menu");
                if(tempActiveMenu != tempMenu){
                    $("#category .menu-container li.active").removeClass("active");
                    $("#category .menu-container li[data-menu=" + tempActiveMenu + "]").addClass("active");
                }
            },
        });

    }






    /***
     * video
     * */
    $("#video .close_btn").on('tap', () => {
        video.getPlayer().pause();
        mySwiper.slideTo(1);
    });





    /***
     * emoticon
     * */

    let isWeiXin = () => {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    if(!isWeiXin()){
        $('#emoticon .wx-download').hide();
        $('#emoticon .other-download').show();
    }


    let timer = null;
    let $item = $('#emoticon .item');

    let itemWidth = $item.width() - 1;
    $item.css('line-height',$item.height()/2 + 'px');
    $('.act-pic').width(itemWidth).height(itemWidth).css({'line-height':itemWidth + 'px'});

    $item.click(function(ev){
        var _thisLeft = $(this).offset().left;
        var _thisTop = $(this).offset().top;
        $('.act-pic').show().css({'left':_thisLeft - 1,'top':_thisTop - itemWidth - 8 + 'px'}).addClass('artMove').find('img').attr('src','img/wechatfeeds/' + $(this).attr('data-index') + '.gif').css({'max-width':0.8*itemWidth + 'px','max-height':0.8*itemWidth + 'px','vertical-align':'middle'});

        ev.stopPropagation();
    });

    $('#emoticon').on('click', function(){
        $('.act-pic').hide();
    });

    $('#emoticon .back-btn').on('tap', () => {
        mySwiper.slideTo(1);
        $('.act-pic').hide();
        $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'none');
    });



    let isEmoticonShareFading = false;

    $("#emoticon .share-btn").on('tap', () => {
        if(!isEmoticonShareFading){
            $("#emoticon .share-overlay").css({'opacity': '0','display':'block'});
            $("#emoticon .share-overlay").addClass("fadeInOri animated-500");
            setTimeout(() => {
                $("#emoticon .share-overlay").css({'opacity': '1','display':'block'});
                $("#emoticon .share-overlay").removeClass("fadeInOri animated-500");
                isEmoticonShareFading = true;
            }, 750);
        }
    });

    $("#emoticon .share-overlay").on('tap', () => {
        if(isEmoticonShareFading){
            $("#emoticon .share-overlay").addClass("fadeOutOri animated-500");
            setTimeout(() => {
                $("#emoticon .share-overlay").css({'display':'none','opacity': '1'});
                $("#emoticon .share-overlay").removeClass("fadeOutOri animated-500");
                isEmoticonShareFading = false;
            }, 750);
        }
    });

    $("#emoticon .wx_emoticon_download").on('tap', () => {
        //微信表情包下载
    });

    $("#emoticon .qq_emoticon_download").on('tap', () => {
        //qq表情包下载
    });

    
    
    
    
    
    /***
     * shareAction
     * */
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
                title: '结婚五周年，是什么让他们一直娜么快乐？',// 分享标题
                link: window.location.href, // 分享链接
                imgUrl: 'http://' + window.location.origin + '/img/wechatfeeds/share.jpg', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: '结婚五周年，是什么让他们一直娜么快乐？', // 分享标题
                link: window.location.href, // 分享链接
                desc: '结婚五周年，是什么让他们一直娜么快乐？',
                imgUrl: 'http://' + window.location.origin + '/img/wechatfeeds/share.jpg',
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });

    });

});

