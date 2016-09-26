/**
* Created by martin on 16/9/8.
*/

$(function () {
    let userStop = false;
    let firstTime = true;
    new WxMoment.OrientationTip();
    let videoFirstShow = true;
    

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
        onSlideChangeStart: function () {
            $('.act-pic').hide();
            $("#emoticon .swiper-slide-next").css('pointer-events', 'auto');
        }
    });


    let screenWidth = screen.width;

    let video = new tvp.VideoInfo();
    video.setVid("p0021ehy1js");
    let player =new tvp.Player();
    player.create({
        width:screenWidth,
        height:screenWidth*(9/16),
        video:video,
        isHtml5ControlAlwaysShow: true,
        modId:"WxMomentVideo",
        autoplay: false,
        isContinuePlay: false,
        onplaying: function () {
            if(firstTime){
                _smq.push(['custom','监测代码','loading后播放视频']);
            }else{
                _smq.push(['custom','监测代码','主菜单播放视频']);
            }

        },
        onfullscreen: function (isfull) {
            if(firstTime){
                _smq.push(['custom','监测代码','loading全屏播放视频']);
            }else{
                _smq.push(['custom','监测代码','主菜单全屏播放视频']);
            }
        }
    });



    /***
     * loading
     * */
    //云层动画

    //loading结束 首屏文字动画
    Pace.on('done', () => {

        _smq.push(['custom','监测代码','自动触发的PV代码']);
        $('.loaded-out').css('opacity', '0');
        
        // $('.loaded-out').addClass('fadeOutOri animated-500');
        $('.loaded-in').css({'display':'inline-block','opacity': '0'});
        $('.loaded-in').addClass('fadeInOri animated-500');

        setTimeout(() => {
            $('.loaded-out').removeClass('fromRight animated-90000 animated-60000');
            $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'none');

            let slideTo = (index = 4) => {
                mySwiper.slideTo(index);
                setShareInfo(1);

                player.play();

                // $("#music_btn").removeClass("rotate");
                // $("#music_btn").hide();
                // if(!audioDom.paused){
                //     audioDom.pause();
                // }
            }

            timer = setTimeout(() => {
                slideTo();
            },5000);

            $("#loading .loading-overlay").on('click', () => {
                _smq.push(['custom','监测代码','跳过']);
                slideTo();
                clearTimeout(timer);
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
    $("#main .same-btn").on('click', () => {
        _smq.push(['custom','监测代码','杰娜铂金同款']);
        mySwiper.slideTo(2);
        setShareInfo(0);
    });

    $("#main .film-btn").on('click', () => {
        _smq.push(['custom','监测代码','杰娜承诺大片']);
        mySwiper.slideTo(4);
        setShareInfo(1);

        $("#music_btn").removeClass("rotate");
        $("#music_btn").hide();
        if(!audioDom.paused){
            audioDom.pause();
        }
    });

    $("#main .talk-btn").on('click', () => {
        _smq.push(['custom','监测代码','杰娜铂金爱语']);
        mySwiper.slideTo(5);
        setShareInfo(2);

        $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'auto');
    });




    /***
     * menu
     * */
    $("#menu .back-btn").on('click', () => {
        _smq.push(['custom','监测代码','返回主菜单']);
        mySwiper.slideTo(1);
        setShareInfo(3);
    });

    $("#menu .category-item").on('click', function () {

        let thisIndex = $(this).index();
        createCategorySwiper(thisIndex);

        setTimeout(() => {
            mySwiper.slideTo(3);
            setShareInfo(0);
        }, 300)
    });




    /***
     * category
     * */
    var categorySwiper;

    let categoryInit = () => {
        let isCategoryShareFading = false;

        $("#category .back-btn").on('click', () => {
            _smq.push(['custom','监测代码','返回主菜单']);
            mySwiper.slideTo(2);
            setShareInfo(3);
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

        $("#category .menu-container li").on('click', function () {
            if(!$(this).hasClass('active')){
                var tempData = $(this).attr('data-menu');

                $("#category .menu-container li").removeClass('active');
                $(this).addClass('active');

                var tempIndex = $("#category .swiper-slide[data-signal=" + tempData + "]").index();
                categorySwiper.slideTo(tempIndex);
            }
        });


        $("#category .category-page-1 .back-btn").on('click', function() {
            _smq.push(['custom','监测代码','钟情一生系列返回主菜单按钮']);
        });
        $("#category .category-page-2 .back-btn").on('click', function() {
            _smq.push(['custom','监测代码','爱之心语系列吊坠返回主菜单按钮']);
        });
        $("#category .category-page-3 .back-btn").on('click', function() {
            _smq.push(['custom','监测代码','爱的守护系列返回主菜单按钮']);
        });
        $("#category .category-page-1 .menu-container li").on('click', function(){
            if($(this).hasClass('jiezhi')){
                _smq.push(['custom','监测代码','钟情一生系列戒指按钮']);
            }else if($(this).hasClass('erhuan')){
                _smq.push(['custom','监测代码','钟情一生系列耳环按钮']);
            }else if($(this).hasClass('diaozhui')){
                _smq.push(['custom','监测代码','钟情一生系列吊坠按钮']);
            }else if($(this).hasClass('shoulian')){

            }
        });
        $("#category .category-page-2 .menu-container li").on('click', function(){
            if($(this).hasClass('jiezhi')){
                _smq.push(['custom','监测代码','爱之心语系列戒指按钮']);
            }else if($(this).hasClass('erhuan')){
                _smq.push(['custom','监测代码','爱之心语系列耳环按钮']);
            }else if($(this).hasClass('diaozhui')){
                _smq.push(['custom','监测代码','爱之心语系列吊坠按钮']);
            }else if($(this).hasClass('shoulian')){
                _smq.push(['custom','监测代码','爱之心语系列吊坠手链按钮']);
            }
        });
        $("#category .category-page-3 .menu-container li").on('click', function(){
            if($(this).hasClass('jiezhi')){
                _smq.push(['custom','监测代码','爱的守护系列戒指按钮']);
            }else if($(this).hasClass('erhuan')){
                _smq.push(['custom','监测代码','爱的守护系列耳环按钮']);
            }else if($(this).hasClass('diaozhui')){
                _smq.push(['custom','监测代码','爱的守护系列吊坠按钮']);
            }else if($(this).hasClass('shoulian')){
                _smq.push(['custom','监测代码','爱的守护系列手链按钮']);
            }
        });
    }


    var createCategorySwiper = (thisIndex) => {
        //选择相应模板渲染

        switch (thisIndex) {
            case 0:
                var categoryHtml = template('category-page-1', {});
                _smq.push(['custom','监测代码','钟情一生系列']);
                break;
            case 1:
                var categoryHtml = template('category-page-2', {});
                _smq.push(['custom','监测代码','爱之心语系列']);
                break;
            case 2:
                var categoryHtml = template('category-page-3', {});
                _smq.push(['custom','监测代码','爱的守护系列']);
                break;
        }
        document.getElementById('category-container').innerHTML = categoryHtml;

        categoryInit();

        //categorySwiper
        categorySwiper = new Swiper('#category-swiper', {
                effect: 'fade',
                fade: {
                    crossFade: true,
                },
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
    $("#video .close_btn").on('click', () => {

        if(firstTime){
            _smq.push(['custom','监测代码','loading后关闭视频']);
            firstTime = false;
        }else{
            _smq.push(['custom','监测代码','主菜单关闭视频']);
        }

        player.pause();
        mySwiper.slideTo(1);
        setShareInfo(3);

        $("#music_btn").show();

        if(!userStop){
            $('#music_btn').show();
            document.getElementById('music').play();
            $('#music_btn').addClass('rotate');
        }else{
            $('#music_btn').show();
            document.getElementById('music').pause();
            $('#music_btn').removeClass('rotate');
        }
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

    var $item = $('#emoticon-swiper .item');
    var timer = null;
    var $actPic = $('.act-pic');
    var itemWidth = $item.width() - 1;
    $item.css('line-height',$item.height()/2 + 'px');
    $actPic.width(itemWidth).height(itemWidth);

    $.each($item,function(i,value){
        var mc = new Hammer(value);
        mc.on('press',function(ev){
            var _this = ev.target;

                var _thisLeft = $(_this).offset().left;
                var _thisTop = $(_this).offset().top;

                $actPic.hide();
                $actPic.find('img').attr('src','');

                $actPic.find('img').attr('src','img/wechatfeeds/' + $(_this).attr('data-index') + '.gif')
                    .css({'max-width':0.8*itemWidth + 'px','max-height':0.8*itemWidth + 'px','vertical-align':'middle'});

                $actPic.css({'left':_thisLeft - 1,'top':_thisTop - itemWidth - 8 + 'px','line-height':itemWidth + 'px'})
                    .show();

        });
    })

    var dc = new Hammer(document.getElementById('emoticon'));
    dc.on('tap', function(){
        $('#emoticon .act-pic').hide();
    });


    $('#emoticon .back-btn').on('click', () => {
        _smq.push(['custom','监测代码','返回主菜单']);
        mySwiper.slideTo(1);
        setShareInfo(3);
        $('.act-pic').hide();
        $("#emoticon .swiper-slide-active, #emoticon .swiper-slide-next").css('pointer-events', 'none');
    });



    let isEmoticonShareFading = false;

    $("#emoticon .wx_emoticon_download").on('click', () => {
        //微信表情包下载
        _smq.push(['custom','监测代码','微信一键下载']);

        if(isWeiXin()){
            window.location.href = 'http://w.url.cn/s/ApTbo7O#wechat_redirect';
        }else{
            if(!isEmoticonShareFading){
                $("#emoticon .wechat-down-fade").css({'opacity': '0','display':'block'});
                $("#emoticon .wechat-down-fade.download-img").addClass("fadeInOri animated-500");
                $("#emoticon .wechat-down-fade.download-overlay").addClass("fadeInOri70 animated-500");
                setTimeout(() => {
                    $("#emoticon .wechat-down-fade.download-img").css({'opacity': '1','display':'block'});
                    $("#emoticon .wechat-down-fade.download-overlay").css({'opacity': '0.7','display':'block'});
                    $("#emoticon .wechat-down-fade").removeClass("fadeInOri fadeInOri70 animated-500");
                    isEmoticonShareFading = true;
                }, 750);
            }
        }
    });

    $("#emoticon .qq_emoticon_download").on('click', () => {
        //qq表情包下载
        _smq.push(['custom','监测代码','QQ一键下载']);
       window.location.href = 'http://gxh.vip.qq.com/club/themes/mobile/bq/html/detail.html?_bid=102&id=11722&_wv=1793';
    });

    $("#emoticon .wechat-down-fade").on('click', () => {
        if(isEmoticonShareFading){
            $("#emoticon .wechat-down-fade.download-img").addClass("fadeOutOri animated-500");
            $("#emoticon .wechat-down-fade.download-overlay").addClass("fadeOutOri70 animated-500");
            setTimeout(() => {
                $("#emoticon .wechat-down-fade").css({'display':'none','opacity': '1'});
                $("#emoticon .wechat-down-fade").removeClass("fadeOutOri fadeOutOri70 animated-500");
                isEmoticonShareFading = false;
            }, 750);
        }
    });




    /***
     * music
     * */
     var audioDom = document.querySelector('#music');
     var audioSwitch = function (audioBtn) {
        if(audioDom.paused){
            audioDom.play();
            $(audioBtn).addClass("rotate");
        }else{
            audioDom.pause();
            $(audioBtn).removeClass("rotate");
        }
     }

     $("#music_btn").on('click', function () {

         if(userStop){
             userStop = false;
         }else{
             userStop = true;
         }
         audioSwitch(this);
     });


    
    
    
    /***
     * shareAction
     * */

    let shareData = {
        shareFeedsTile: '结婚5年，是什么让他们一直娜么快乐？',
        shareTitle: '铂金见证永不褪色的承诺',
        shareUrl: window.location.href,
        shareImg: 'http://pt-jn.preciousplatinum.com.cn/img/wechatfeeds/share.jpg',
        shareDes: '结婚5年，是什么让他们一直娜么快乐？',
    }

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
                title: shareData.shareFeedsTile, // 分享标题
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

    var setShareInfo = (index) => {
        var setShareData = [{
            feedsTitle: '张杰谢娜铂金同款首饰，让铂金见证永不褪色的承诺！',
            title: '铂金见证永不褪色的承诺',
            des: '即刻拥有张杰谢娜同款铂金首饰！'
        }, {
            feedsTitle: '张杰谢娜结婚五周年铂金承诺大片唯美上线！',
            title: '铂金见证永不褪色的承诺',
            des: '张杰谢娜结婚五周年铂金承诺大片唯美上线！'
        }, {
            feedsTitle: '杰娜铂金爱语表情包，一秒捕捉幸福瞬间，一般人我不发给TA哦！',
            title: '铂金见证永不褪色的承诺',
            des: '杰娜铂金爱语表情包，一秒捕捉幸福瞬间，一般人我不发给TA哦！'
        }, {
            feedsTitle: '结婚5年，是什么让他们一直娜么快乐？',
            title: '铂金见证永不褪色的承诺',
            des: '结婚5年，是什么让他们一直娜么快乐？'
        }];
        // 0产品  1视频  2表情包  3基本

        wx.onMenuShareTimeline({
            title: setShareData[index].feedsTitle, // 分享标题
            link: window.location.href, // 分享链接
            imgUrl: 'http://pt-jn.preciousplatinum.com.cn/img/wechatfeeds/share.jpg',
            success: function success() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: setShareData[index].title, // 分享标题
            link: window.location.href,
            desc: setShareData[index].des,
            imgUrl: 'http://pt-jn.preciousplatinum.com.cn/img/wechatfeeds/share.jpg',
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function success() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
            }
        });
    };






    /***
     * KGshareAction
     * */
    if(window.KgMobileCall && KgMobileCall.isInClient()){

        var client_share = {
            "shareName" : shareData.shareTile,
            "hash" : "",
            "listID" : "",
            "type" : 3,
            "shareData" : {
                "linkUrl" : encodeURIComponent(shareData.shareUrl),
                "picUrl" : shareData.shareImg,
                "content": shareData.shareDes,
                "title" : shareData.shareTile
            },
            "suid" : "",
            "slid" : "",
            "imgUrl" : shareData.shareImg,
            "filename" : "",
            "duration": 0
        };
        KgMobileCall.share(client_share);
    }

});


