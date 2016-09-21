/**
 * Created by nxy on 16/9/18.
 */

$(function(){


    new WxMoment.OrientationTip();

    var $item = $('.item');


    $.each($('.pics'),function(i,value){
        setTimeout(function(){
            jQuery(value).fadeIn();
        },1300*i);
    });
    setTimeout(function(){
        $('.expression').addClass('show');
        jQuery('.logo-first').fadeOut();
        jQuery('.video-mask').addClass('hide');

        jQuery('.pics').fadeOut();

    },8500);

    var timer = null;

    var $actPic = $('.act-pic');

    var itemWidth = $item.width() - 1;
    $item.css('line-height',$item.height()/2 + 'px');
    $actPic.width(itemWidth).height(itemWidth);

    //var $myHammer = document.getElementById('myHammer');
    $.each($item,function(i,value){
        var mc = new Hammer(value);
        mc.on('press',function(ev){
            var _this = ev.target;
            //if($(_this).attr('data-count') == '0'){

                $(document).unbind('tap');

                var _thisLeft = $(_this).offset().left;
                var _thisTop = $(_this).offset().top;

                $actPic.hide();
                $actPic.find('img').attr('src','');

                $actPic.find('img').attr('src','img/wechatfeeds/' + $(_this).attr('data-index') + '.gif')
                    .css({'max-width':0.8*itemWidth + 'px','max-height':0.8*itemWidth + 'px','vertical-align':'middle'});

                $actPic.css({'left':_thisLeft - 1,'top':_thisTop - itemWidth - 8 + 'px','line-height':itemWidth + 'px'})
                    .show();

                //$(_this).attr('data-count','1');


                //setTimeout(function(){
                //
                //    $(document).on('tap', function(){
                //        alert(111)
                //        $('.act-pic').hide();
                //    })
                //},5000);

            //}else if($(_this).attr('data-count') == '1'){
            //    $actPic.hide();
            //    $actPic.find('img').attr('src','');
            //    $(_this).attr('data-count','0');
            //
            //}
            //$(_this).siblings().attr('data-count','0');
            //$(_this).parent().siblings().find('.item').attr('data-count','0')
        });
    })
    //mc.on('press',function(){
    //    $('#myHammer').css('background','blue')
    //})

    $('.close-video').click(function(ev){

        jQuery('.expression').addClass('show');

        video.getPlayer().pause();
        jQuery('.video-page').fadeOut();

    });

    var srWidth = screen.width;
    $('#WxMomentVideo').width(srWidth).height(srWidth*(9/16)).show();
    $('.video-mask').css({'left':'0','top':srWidth*(9/16) - 1}).show();


    var mc = new Hammer(document);
    mc.on('tap', function(){

        $('.act-pic').hide();
    });


    $('.jn-download').click(function(){
        window.location.href = './index.html'
    });


    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        slidesPerView: 2,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        direction:'vertical',
        spaceBetween: 1,
        onSlideChangeStart: function () {
            $('.act-pic').hide();
        }
        //onTouchMove: function(swiper){
        //    $('.act-pic').hide();
        //}
    });


    var video = new WxMoment.Video({
        //vid: "a0016gys8ct",
        vid: "p0021ehy1js",
        pic: "img/wechatfeeds/cover.jpg",
        oninited: function () {
            //console.log(0)
            //播放器在视频载入完毕触发


        },
        onplaying: function () {
            //console.log(1);
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




    ptShareConfig.init(function (data) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx9a8bd58d910b0460', // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [
                'onMenuShareTimeline', 'onMenuShareAppMessage'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function(){
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
