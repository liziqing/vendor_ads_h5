$(document).ready(function(){
    resizeIframe();
    $(window).resize(resizeIframe);

    $("#download").click(function(e){
        _smq.push(['custom', '监测代码', '点击下载电脑版QQ表情包']);
    })
})

function resizeIframe(){
    var vwh = $(".videoWapper").innerHeight();
    $(".videoWapper iframe").height(vwh);
}
