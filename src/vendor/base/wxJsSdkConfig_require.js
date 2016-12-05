/**
 * Created by martin on 16/12/5.
 */

define(['jquery'], function ($) {

    var ptShareConfig = {
        init: function init(callback) {
            this.getAccessToken(callback);
        },
        getAccessToken: function getAccessToken(callback) {
            var _this = this;
            $.ajax({
                url: "http://ptcartoon.preciousplatinum.com.cn/CheckAll.ashx",
                type: "get",
                data: {
                    actiontype: 'AT'
                },
                dataType: "jsonp",
                jsonpCallback: 'atCallback',
                success: function success(data) {
                    _this.getJsapiTicket(data.result, callback);
                },
                error: function error() {
                    alert('请求失败');
                }
            });
        },
        getJsapiTicket: function getJsapiTicket(PTAT, callback) {
            var _this = this;
            $.ajax({
                url: "http://ptcartoon.preciousplatinum.com.cn/CheckAll.ashx",
                type: "get",
                data: {
                    actiontype: 'JT',
                    PTAT: PTAT
                },
                dataType: "jsonp",
                jsonpCallback: 'jsTicketCallback',
                success: function success(data) {
                    //Jsapi_Ticket 有效期7200秒
                    _this.calculateSignature(data.result, callback);
                },
                error: function error() {
                    alert('请求失败');
                }
            });
        },
        getRandomString: function getRandomString(len) {
            len = len || 32;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        getTimeStamp: function getTimeStamp() {
            var tempTimeStamp = parseInt(new Date().getTime() / 1000);
            return tempTimeStamp;
        },
        calculateSignature: function calculateSignature(jsapi_ticket, callback) {
            var JsapiTicket = jsapi_ticket;
            var noncestr = this.getRandomString(16);
            var timestamp = this.getTimeStamp();
            var thisUrl = window.location.href.split("#")[0];
            var resultStr = 'jsapi_ticket=' + JsapiTicket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + thisUrl;
            var signature = hex_sha1(resultStr);
            var configData = {
                timestamp: timestamp,
                noncestr: noncestr,
                signature: signature
            };
            callback(configData);
        }
    };

    return ptShareConfig;
});
