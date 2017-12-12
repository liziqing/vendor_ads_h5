/**
 * Created by Jenson on 2017/9/7.
 */
var util = Object();

var _alertyP1 = '<div class="i_dialog" style="font-size:20px;opacity: 1;-webkit-transition: opacity 0.8s linear;transition: opacity 0.8s linear;-webkit-box-orient: vertical;-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;-webkit-box-pack: center;-webkit-justify-content: center;-ms-flex-pack: center;justify-content: center;-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;position: absolute;top: 40%;left: 0;text-align: center;z-index: 99999;padding: 0 22%;"><div class="pop-loading-cnt" style="background-color: rgba(0,0,0,0.7);color: #000000;-webkit-border-radius: 4px;border-radius: 4px;overflow: hidden;-webkit-box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);color: #FFFFFF;">'
    + '<div style="padding: 20px 10px;">';

var _alertyP2 = '</div></div></div>';

util.alerty = function (data) {
    util.closeAlerty();

    var s = _alertyP1 + data + _alertyP2;
    $('body').prepend(s);

    setTimeout(function () {
        jQuery('.i_dialog').fadeOut();
    }, 600);
}

util.openAlerty = function () {
    util.closeAlerty();

    var s = _alertyP1 + data + _alertyP2;
    $('body').prepend(s);
}

util.closeAlerty = function () {
    $('.i_dialog').remove();
}

util.isMobile = function (mobile) {
    var pattern = /^[1][3456789]\d{9}$/;
    if (mobile == '' || !pattern.test(mobile)) {
        return false;
    } else {
        return true;
    }
}

util.isWeiXin = function () {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

util.queryString = function(query)
{
    var search = window.location.search + '';
    if (search.charAt(0) != '?')
    {
        return undefined;
    }
    else {
        search = search.replace('?', '').split('&');
        for (var i = 0; i < search.length; i++)
        {
            if (search[i].split('=')[0] == query) {
                return decodeURI(search[i].split('=')[1]);
            }
        }
        return undefined;
    }
};

