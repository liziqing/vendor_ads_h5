/**
 * Created by ianzhang on 15/11/17.
 */

define(['base/env', 'base/util', 'jquery', 'wx'],
    function(env, util, $, wx){

        var callUserinfo = function(alias, data, callback)
        {
            $.ajax({
                url: "http://"+env.apidomain+"/weixin/user-info",
                type: "get",
                data: {openid: data.openid, token: data.access_token, alias: alias, format: 'jsonp'},
                dataType: "jsonp",
                success : function(data){
                    if(data.code == 0)
                    {
                        callback(data.data);
                    }
                },
                error:function(){
                    alert('数据读取失败');
                }
            });
        };

        var initUserInfo = function(appid, alias, callback)
        {
            if(env.local == true){
                return ;
            }

            var code = util.queryString('code');

            if(code != undefined && code != null) {
                //进行token的获取
                util.ajax({
                    url: "http://" + env.apidomain + "/weixin/oauth-token-no-session",
                    type: "get",
                    data: {code: code, alias: alias, format: 'jsonp', is_userinfo: '1'},
                    dataType: "jsonp",
                    success: function (data) {
                        if (data.code == 0) {
                            callUserinfo(alias, data.data, callback);
                        }
                    },
                    error: function () {
                        alert('数据读取失败');
                    }
                });
            }else{
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                    + appid
                    + "&redirect_uri=" + encodeURIComponent(window.location.href)//encodeURIComponent(env.baseUrl + 'html/base/authjump.html?url=' + encodeURIComponent(window.location.href))
                    + "&response_type=code"
                    + "&scope=snsapi_userinfo"
                    + "&state=weiapppay#wechat_redirect";
            }

        }

        //获取网页参数中的wid，用接口去取token
        var initTokenNoSession = function(appid, alias, url, callback)
        {
            if(env.local == true){
                callback();
                return ;
            }

            var url = url || window.location.href;
            var code = util.queryString('code');

            util.ajax({
                url: "http://"+env.apidomain+"/weixin/oauth-token-no-session",
                type: "get",
                data: {code: code, alias: alias, format: 'jsonp'},
                dataType: "jsonp",
                success : function(data){
                    if(data.code == 0)
                    {
                        callback(data.data);
                    }
                },
                error:function(){
                    alert('数据读取失败');
                }
            });
        };

    //获取网页参数中的wid，用接口去取token
    var initToken = function(appid, callback)
    {
        if(env.local == true){
            callback();
            return ;
        }

        var code = util.queryString('code');

        util.ajax({
            url: "http://"+env.domain+"/weixin/common/cookie-oauth-token",
            type: "get",
            data: {format: 'jsonp'},
            dataType: "jsonp",
            success: function(data)
            {
                if(data.code == 0)
                {
                    if(data.data.access_token == "")
                    {
                        if(code != undefined && code != null)
                        {
                            //进行token的获取
                            util.ajax({
                                url: "http://"+env.domain+"/weixin/common/oauth-token",
                                type: "get",
                                data: {code: code, format: 'jsonp'},
                                dataType: "jsonp",
                                success : function(data){
                                    if(data.code == 0)
                                    {
                                        callback(data.data);
                                    }
                                },
                                error:function(){
                                    alert('数据读取失败');
                                }
                            });
                        }else{
                            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                + appid
                                + "&redirect_uri=" + encodeURIComponent(window.location.href)//encodeURIComponent(env.baseUrl + 'html/base/authjump.html?url=' + encodeURIComponent(window.location.href))
                                + "&response_type=code"
                                + "&scope=snsapi_base"
                                + "&state=weiapppay#wechat_redirect";
                        }
                    }else{
                        callback(data.data);
                    }
                }else{
                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                        + appid
                        + "&redirect_uri=" + encodeURIComponent(window.location.href)//encodeURIComponent(env.baseUrl + 'html/base/authjump.html?url=' + encodeURIComponent(window.location.href))
                        + "&response_type=code"
                        + "&scope=snsapi_base"
                        + "&state=weiapppay#wechat_redirect";
                }
            }
        });
    };

    var checkWxOauth = function(appid)
    {
        initToken(appid, donothing);
    };

    function donothing()
    {

    }

    function redirectToUrl(url)
    {
        if(url != window.location.href)
        {
            window.location.href = url;
        }
    }

    var handleGetOAuthUrl = function(appid, url, callback)
    {
        if(util.queryString('code') != null)
        {

        }
        else{
            util.ajax({
                url: "http://"+env.domain+"/weixin/common/cookie-oauth-token",
                type: "get",
                data: {r:Math.round(Math.random()*100000), format: 'jsonp'},
                dataType: "jsonp",
                success: function(data)
                {
                    if(data.code == 0)
                    {
                        if(data.data.access_token == "")
                        {
                            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                + appid
                                + "&redirect_uri=" + encodeURIComponent(url)
                                + "&response_type=code"
                                + "&scope=snsapi_base"
                                + "&state=weiapppay#wechat_redirect";

                            callback(url);
                        }else{
                            callback(url);
                        }
                    }else{
                        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                            + appid
                            + "&redirect_uri=" + encodeURIComponent(url)
                            + "&response_type=code"
                            + "&scope=snsapi_base"
                            + "&state=weiapppay#wechat_redirect";

                        callback(url);
                    }
                },
                error:function(data)
                {
                    url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                        + appid
                        + "&redirect_uri=" + encodeURIComponent(url)
                        + "&response_type=code"
                        + "&scope=snsapi_base"
                        + "&state=weiapppay#wechat_redirect";

                    callback(url);
                }
            });
        }
    };

    var goWithAuth = function(appid, url, elementStr)
    {
        $(elementStr).attr("disabled", "disabled");
        setOAuthUrl(appid, url, elementStr);
    };


    var setOAuthUrl = function(appid, url, elementStr)
    {
        util.ajax({
            url: "http://"+env.domain+"/weixin/common/cookie-oauth-token",
            type: "get",
            data: {app_id: appid, r:Math.round(Math.random()*100000), format: 'jsonp'},
            dataType: "jsonp",
            success: function(data)
            {
                if(data.code == 0)
                {
                    if(data.data.access_token == "")
                    {
                        $(element).removeAttr("disabled");
                        $(element).attr('href', "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                            + appid
                            + "&redirect_uri=" + encodeURIComponent(url)
                            + "&response_type=code"
                            + "&scope=snsapi_base"
                            + "&state=weiapppay#wechat_redirect");
                    }else{
                        $(element).removeAttr("disabled");
                        $(element).attr('href', url);
                    }
                }else{
                    $(element).removeAttr("disabled");
                    $(element).attr('href', "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                        + appid
                        + "&redirect_uri=" + encodeURIComponent(url)
                        + "&response_type=code"
                        + "&scope=snsapi_base"
                        + "&state=weiapppay#wechat_redirect");
                }
            },
            error:function(data)
            {
                alert('数据读取失败');
            }
        });
    };

    var initWxJs = function(appid, alias, jsApiList, callback)
    {
        util.ajax({
            type: 'GET',
            url: 'http://' + env.apidomain + '/weixin/sig',
            data: {url: encodeURIComponent(window.location.href), alias: alias, format: 'jsonp'},
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (data) {
                var timestamp = data.data.timestamp;
                var nonceStr = data.data.nonceStr;
                var signature = data.data.signature;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appid, // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名，见附录1
                    jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function () {
                    //alert("wx.ready()")
                    if(typeof callback != 'undefined')
                    {
                        callback();
                    }
                });
            }
        });
    };

    return {
        "initToken": initToken,
        "initTokenNoSession": initTokenNoSession,
        'goWithAuth': goWithAuth,
        'checkWxOauth': checkWxOauth,
        'initWxJs': initWxJs,
        'initUserInfo': initUserInfo
    };
});