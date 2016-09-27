/**
 * Created by ianzhang on 15/11/17.
 */
define(['base/env', 'jquery', 'base/util'], function(env, $, util){

    var util = Object();

    //提示框ui
    var _alertxP1 = '<div class="i_dialog" style="opacity: 1;-webkit-transition: opacity 0.4s linear;transition: opacity 0.4s linear;-webkit-box-orient: vertical;-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;-webkit-box-pack: center;-webkit-justify-content: center;-ms-flex-pack: center;justify-content: center;-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;position: absolute;top: 40%;left: 0;text-align: center;z-index: 99999;padding: 0 22%;"><div class="pop-loading-cnt" style="background-color: rgba(0,0,0,0.5);padding-top: 15px;color: #000000;-webkit-border-radius: 4px;border-radius: 4px;overflow: hidden;-webkit-box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);color: #FFFFFF;">'
        +'<span style="display:inline-block;height:30px;width:30px;background:url(http://appmedia.qq.com/media/weiapp/image/loading_128.gif);-webkit-background-size: auto 100%;background-size:auto 100%;"></span>'
        +'<div style="padding: 20px 10px;">';
    //提示框ui
    var _alertxP2 = '</div></div></div>';

    util.alertx = function(data)
    {
        util.closeAlertx();

        var s = _alertxP1+data+_alertxP2;
        $('body').prepend(s);
    };

    util.closeAlertx = function()
    {
        $('.i_dialog').remove();
    }

    var _alertyP1 = '<div class="i_dialog" style="opacity: 1;-webkit-transition: opacity 0.8s linear;transition: opacity 0.8s linear;-webkit-box-orient: vertical;-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;-webkit-box-pack: center;-webkit-justify-content: center;-ms-flex-pack: center;justify-content: center;-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;position: absolute;top: 40%;left: 0;text-align: center;z-index: 99999;padding: 0 22%;"><div class="pop-loading-cnt" style="background-color: rgba(0,0,0,0.7);color: #000000;-webkit-border-radius: 4px;border-radius: 4px;overflow: hidden;-webkit-box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);box-shadow: 0 0 6px 0 rgba(0,0,0,0.2);color: #FFFFFF;">'
        +'<div style="padding: 20px 10px;">';

    var _alertyP2 = '</div></div></div>';

    util.alerty = function (data) {
        util.closeAlerty();

        var s = _alertyP1+data+_alertyP2;
        $('body').prepend(s);

        setTimeout(function () {
            $('.i_dialog').fadeOut();
        },2000);
    }

    util.openAlerty = function () {
        util.closeAlerty();

        var s = _alertyP1+data+_alertyP2;
        $('body').prepend(s);
    }

    util.closeAlerty = function()
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

    util.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    util.isMobile = function(mobile) {
        var pattern = /^[1][34578]\d{9}$/;
        if(mobile == '' || !pattern.test(mobile)) {
            this.alerty('手机号格式错误');
            $('#receive_mobile').val('');
            return false;
        }else{
            return true;
        }
    };

    util.ajax = function(data){
        $.ajax(data);
    }

    util.jsonp = function(url, data, callback, fail_callback){

        if(url.indexOf('http://') < 0)
        {
            url = 'http://' + env.domain + '/' + url;
        }

        if(typeof data.format == 'undefined')
        {
            data['format'] = 'jsonp';
        }

        $.ajax({
            type: 'get',
            url: url,
            data: data,
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(data){
                if(data.code == '0'){
                    callback(data);
                }else{
                    if(fail_callback)
                    {
                        fail_callback();
                    }else{
                        util.alerty(data.message);
                    }
                }
            },
            error: function (data) {
                util.alerty(data.message);
            }
        });
    };

    util.isWeiXin = function () {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    util.userAgent = function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        if(isAndroid){
            return "android";
        }else if(isiOS){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.indexOf("like mac os x") > 0){
                var regStr_saf = /os [\d._]*/gi ;
                var verinfo = ua.match(regStr_saf) ;
                var version = (verinfo+"").replace(/[^0-9|_.]/ig,"").replace(/_/ig,".");
                var versionId = parseInt(version.substring(0,1));
                if(versionId > 8){
                    return "highios";
                }else{
                    return "lowios";
                }
            }
        }
    }

    util.isChrome = function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("chrome") > -1 ? true: false;
    }

    return util;
});