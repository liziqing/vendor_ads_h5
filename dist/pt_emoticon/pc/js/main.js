$(document).ready(function(){
    resizeIframe();
    $(window).resize(resizeIframe);
})

function resizeIframe(){
    var vwh = $(".videoWapper").innerHeight();
    $(".videoWapper iframe").height(vwh);
}
