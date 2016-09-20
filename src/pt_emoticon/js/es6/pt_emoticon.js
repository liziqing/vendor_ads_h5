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

    let emoticonSwiper = new Swiper('#emoticon-swiper', {
        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        slidesPerView: 2,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        direction:'vertical',
        spaceBetween: 1,
        onTouchStart: function(swiper,even){
            $('.act-pic').hide();
        }
    });

    let video = new WxMoment.Video({
        vid: "p0021ehy1js",
        pic: "https://wximg.qq.com/tmt/_demo/wxmoment/img/video-thumb.jpg", //设置视频默认缩略图
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
        }, 700);

        //开发
        // mySwiper.slideTo(5);
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
        mySwiper.slideTo(4);
    });

    $("#main .talk-btn").on('click', () => {
        mySwiper.slideTo(5);
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

    let isCategoryShareFading = false;

    $("#category .back-btn").on('click', () => {
        mySwiper.slideTo(2);
    });

    $("#category .share-btn").on('click', () => {
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

    $("#category .share-overlay").on('click', () => {
        if(isCategoryShareFading){
            $("#category .share-overlay").addClass("fadeOutOri animated-500");
            setTimeout(() => {
                $("#category .share-overlay").css({'display':'none','opacity': '1'});
                $("#category .share-overlay").removeClass("fadeOutOri animated-500");
                isCategoryShareFading = false;
            }, 750);
        }
    });



    /***
     * video
     * */
    $("#video .close_btn").on('click', () => {
        video.getPlayer().pause();
        mySwiper.slideTo(1);
    });





    /***
     * emoticon
     * */
    let timer = null;
    let $item = $('#emoticon .item');

    let itemWidth = $item.width() - 1;
    $item.css('line-height',$item.height()/2 + 'px');
    $('.act-pic').width(itemWidth).height(itemWidth).css({'line-height':itemWidth + 'px'});

    $('.close-video').click(function(ev){
        video.getPlayer().pause();
        $('.video-page').addClass('hide');
        clearTimeout(timer);
        timer = setTimeout(function(){
            $('.video-page').hide();
        },200)
    });


    $item.click(function(ev){
        var _thisLeft = $(this).offset().left;
        var _thisTop = $(this).offset().top;
        $('.act-pic').show().css({'left':_thisLeft - 1,'top':_thisTop - itemWidth - 8 + 'px'}).addClass('artMove').find('img').attr('src','img/wechatfeeds/' + $(this).attr('data-index') + '.gif').css({'max-width':0.8*itemWidth + 'px','max-height':0.8*itemWidth + 'px','vertical-align':'middle'});

        ev.stopPropagation();
    });

    $('#emoticon').click(function(){
        $('.act-pic').hide();
    });

    $('#emoticon .back-btn').on('click', () => {
        mySwiper.slideTo(1);
    });



        let isEmoticonShareFading = false;

    $("#emoticon .share-btn").on('click', () => {
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

    $("#emoticon .share-overlay").on('click', () => {
        if(isEmoticonShareFading){
            $("#emoticon .share-overlay").addClass("fadeOutOri animated-500");
            setTimeout(() => {
                $("#emoticon .share-overlay").css({'display':'none','opacity': '1'});
                $("#emoticon .share-overlay").removeClass("fadeOutOri animated-500");
                isEmoticonShareFading = false;
            }, 750);
        }
    });


    /***
     * shareAction
     * */
    // let ptShareConfig = {
    //     init: function (callback) {
    //         this.getAccessToken(callback);
    //     },
    //     getAccessToken: function (callback) {
    //         let _this = this;
    //         $.ajax({
    //             url: "http://ptcartoon.preciousplatinum.com.cn/CheckAll.ashx",
    //             type: "get",
    //             data: {
    //                 actiontype: 'AT',
    //             },
    //             dataType: "jsonp",
    //             jsonpCallback: 'atCallback',
    //             success : (data) => {
    //                 _this.getJsapiTicket(data.result, callback);
    //             },
    //             error: () => {
    //                 alert('请求失败');
    //             }
    //         });
    //     },
    //     getJsapiTicket: function (PTAT, callback) {
    //         let _this = this;
    //         $.ajax({
    //             url: "http://ptcartoon.preciousplatinum.com.cn/CheckAll.ashx",
    //             type: "get",
    //             data: {
    //                 actiontype: 'JT',
    //                 PTAT: PTAT,
    //             },
    //             dataType: "jsonp",
    //             jsonpCallback: 'jsTicketCallback',
    //             success : (data) => {
    //                 //Jsapi_Ticket 有效期7200秒
    //                 _this.calculateSignature(data.result, callback);
    //             },
    //             error: () => {
    //                 alert('请求失败');
    //             }
    //         });
    //     },
    //     getRandomString: function (len) {
    //     len = len || 32;
    //         let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    //         let maxPos = $chars.length;
    //         let pwd = '';
    //         for (let i = 0; i < len; i++) {
    //             pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    //         }
    //         return pwd;
    //     },
    //     getTimeStamp: function () {
    //         let tempTimeStamp = parseInt(new Date().getTime()/1000);
    //         return tempTimeStamp;
    //     },
    //     calculateSignature: function (jsapi_ticket, callback) {
    //         let JsapiTicket = jsapi_ticket;
    //         let noncestr = this.getRandomString(16);
    //         let timestamp = this.getTimeStamp();
    //         let thisUrl = window.location.href.split("#")[0];
    //         let resultStr = 'jsapi_ticket=' + JsapiTicket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' +thisUrl;
    //         let signature = hex_sha1(resultStr);
    //         let configData = {
    //             timestamp: timestamp,
    //             noncestr: noncestr,
    //             signature: signature,
    //         }
    //         callback(configData);
    //     },
    // }
    //
    // ptShareConfig.init(function(data){
    //     wx.config({
    //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: '', // 必填，公众号的唯一标识
    //         timestamp: data.timestamp, // 必填，生成签名的时间戳
    //         nonceStr: data.noncestr, // 必填，生成签名的随机串
    //         signature: data.signature,// 必填，签名，见附录1
    //         jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     });
    // });

});

