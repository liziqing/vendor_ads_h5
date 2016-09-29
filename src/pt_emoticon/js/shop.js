/**
 * Created by Administrator on 2016/9/27.
 */
$(function () {

    $.initProv("#pro", "#city", "请查询", "请查询");

    if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
        FastClick.attach(document.body);
    }
    $(window).on('scroll.elasticity', function (e) {
        e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
        e.preventDefault();
    });
    defheight = $(window).height() + "px";
    $("select").css("font-size", $(window).width() * 0.032 + "px");
    $("#result>ul>li").css("font-size", $(window).width() * 0.028 + "px");
    $("#result>ul>li:first-child").css("font-size", $(window).width() * 0.035 + "px");
    $("#result>ul>li:last-child").css("font-size", $(window).width() * 0.026 + "px");
    $('#result').niceScroll({
        cursorcolor: "#adadad", //#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: $(window).width() * 0.02, //像素光标的宽度
        cursorborder: 0, // 	游标边框css定义
        cursorborderradius: 0, //以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });
    $("select").focus(function () {
        $("html").css({
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": defheight
        });
    });

    function cityInfo(){
        $.ajax({
            type:"GET",
            url:"json/shop.json",
            json:"callback",
            data:{
                format: 'jsonp'
            },
            dataType: 'json',
            success:function(data){
                $('#searchbtn').on('click',function(){
                    var pro=$('#pro option:selected').text();//选中的省份
                    var city=$('#city option:selected').text();//选中的城市
                    var shopArr=[];
                    $(data).each(function(i,value){
                        if(value.province == pro&&value.city==city){
                            shopArr.push({store:value.store,address:value.address,tel:value.tel})
                        }
                    });
                    var shopData = {
                        data: shopArr
                    };
                    var shopHtml = template('shopTemplate', shopData);
                    document.getElementById('result').innerHTML = shopHtml;
                    $('.nullResult').hide();
                })
            }
        })
    }
    cityInfo();


    var shareData = {
        shareFeedsTile: '结婚5年，是什么让他们一直娜么快乐？',
        shareTitle: '铂金见证永不褪色的承诺',
        shareUrl: window.location.href,
        shareImg: 'http://pt-jn.preciousplatinum.com.cn/img/wechatfeeds/share.jpg',
        shareDes: '结婚5年，是什么让他们一直娜么快乐？'
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

});