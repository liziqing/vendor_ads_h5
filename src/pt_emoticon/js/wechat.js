/**
 * Created by nxy on 16/9/18.
 */

$(function(){

    var timer = null;
    var $item = $('.item');

    var itemWidth = $item.width() - 1;
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

    $(document).click(function(){
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
        onTouchStart: function(swiper,even){
            $('.act-pic').hide();
        }
    });


    var video = new WxMoment.Video({
        vid: "i00184ka7lw",
        pic: "img/wechatfeeds/cover.png",
        oninited: function () {
            //console.log(0)
            //播放器在视频载入完毕触发

            $('.expression').addClass('show');
        },
        onplaying: function () {
            //console.log(1);
            //播放器真正开始播放视频第一帧画面时
            $('.video-mask img').addClass('hide');
            $('.video-mask').addClass('hide');

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






});
