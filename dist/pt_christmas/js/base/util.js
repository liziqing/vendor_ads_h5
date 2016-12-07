/**
 * Created by ianzhang on 15/11/17.
 */
define(['base/env','jquery'], function(env, $){

    //提示框ui
    var _alertxP1 = '<div class="i_dialog" style="opacity: 1;-webkit-transition: opacity 0.4s linear;transition: opacity 0.4s linear;-webkit-box-orient: vertical;-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;-webkit-box-pack: center;-webkit-justify-content: center;-ms-flex-pack: center;justify-content: center;-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;position: absolute;top: 40%;left: 0;text-align: center;z-index: 99999;padding: 0 22%;"><div class="pop-loading-cnt" style="background-color: rgba(0,0,0,0.5);padding-top: 15px;color: #000000;-webkit-border-radius: 4px;border-radius: 4px;overflow: hidden;-webkit-box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);color: #FFFFFF;">'
        +'<span style="display:inline-block;height:30px;width:30px;background:url(http://appmedia.qq.com/media/weiapp/image/loading_128.gif);-webkit-background-size: auto 100%;background-size:auto 100%;"></span>'
        +'<div style="padding: 20px 10px;">';
    //提示框ui
    var _alertxP2 = '</div></div></div>';

    var util = Object();

    /**
     * @method alertx
     * @param {string} data内容
     */
    util.alertx = function(data)
    {
        util.closeAlertx();

        var s = _alertxP1+data+_alertxP2;
        $('body').prepend(s);
    };

    //关闭覆层
    util.closeAlertx = function()
    {
        $('.i_dialog').remove();
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

    util.isWeiXin = function () {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    util.ajax = function(params)
    {
        $.ajax(params);
    };

    return util;
});