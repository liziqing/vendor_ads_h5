/**
 * Created by ianzhang on 15/11/17.
 */
define(['base/env', 'base/util', 'base/wechat/wx', 'jquery'],
    function(env, util, baseWx, $){

    //配置项
    var config = {};

    //微信支付接口是否准备好
    var _wxIsReady = false;
    //微信支付是否成功
    var _paySuccess = false;
    //useragent
    var _ua = navigator.userAgent.toLowerCase();
    //
    var _token = null;
    var _openid = null;

    //是否需要编辑地址
    var _needEditAddr;

    //queryOrder 最大尝试数
    var _maxAttempt = 5;
    //queryOrder 失败尝试数
    var _attempt = 0;
    var _queryTimeout;
    var _queryParams = {};

    var _configCallback = null;


    var config = function(params)
    {
        if(typeof params.queryChargeUrl != 'undefined') config.queryChargeUrl = params.queryChargeUrl;
        if(typeof params.success != 'undefined') config.success = params.success;

        if(typeof params.fail != "undefined")
        {
            config.fail = params.fail;
        }

        if(typeof params.appId != 'undefined') config.appId = params.appId;
        if(typeof params.editAddr != 'undefined')
        {
            config.editAddr = params.editAddr;
            if(config.editAddr == true)
            {
                if(typeof params.editAddrCallback == 'undefined')
                {
                    alert('你还没有配置修改地址成功的回调方法。');
                    return;
                }

                config.editAddrCallback = params.editAddrCallback;
            }
        }
        if(typeof params.maxAttempt != 'undefined') _maxAttempt = params.maxAttempt;

        if(typeof params.createChargeUrl != 'undefined')
        {
            config.createChargeUrl = params.createChargeUrl;
        }else{
            config.createChargeUrl = 'http://' + env.h5domain + '/proxy/weixin/pay/create-charge';
        }

        if(typeof params.callback != "undefined")
        {
            _configCallback = params.callback;
        }

        baseWx.initTokenNoSession(params.appId, window.location.href, setToken);
    }

    var setToken = function(data)
    {
        _token = data.access_token;
        _openid = data.openid;

        if(_configCallback != null)
        {
            _configCallback();
        }
    };

    function clone(obj)
    {
        if (typeof (obj) != 'object')
            return obj;

        var re = {};
        if (obj.constructor==Array)
            re = [];

        for ( var i in obj)
        {
            re[i] = clone(obj[i]);
        }

        return re;
    }

    var pay = function(param, url)
    {
        url = url || config.createChargeUrl;
        if(typeof url == 'undefined')
        {
            alert('你还没有配置创建交易接口。');
        }
        param = param || {};
        param.open_id = _openid;
        param.format = 'jsonp';
        if(_wxIsReady == true && getWeixinVersion() >= 5)
        {
            util.alertx('支付提交中，请耐心等待');
            util.ajax({
                url: url,
                type: "post",
                data: param,
                dataType: "jsonp",
                success: function(data)
                {
                    util.closeAlertx();

                    if(data.code == 0)
                    {
                        var nonceStr = data.data.nonce_str;
                        var timestamp = data.data.timestamp;
                        var packageStr = data.data.package_str;
                        var paySign = data.data.pay_sign;
                        var signType = data.data.sign_type;

                        _queryParams = clone(data.data);

                        delete _queryParams.nonce_str;
                        delete _queryParams.timestamp;
                        delete _queryParams.package_str;
                        delete _queryParams.pay_sign;
                        delete _queryParams.sign_type;

                        _paySuccess = false;
                        wxPayMch(config.appId, nonceStr, timestamp, packageStr, paySign, signType);
                    }else{
                        alert(data.message);
                    }
                },
                error:function(data){
                    util.closeAlertx();

                    alert('数据读取失败');
                }
            });
        }
    };

    /**
     * @method wxPayMch
     * @desc 新支付接口
     * @param {string} appId appid
     * @param {string} nonceStr 随机串
     * @param {string} timestamp 时间戳
     * @param {string} package 扩展包
     * @param {string} paySign 微信签名
     */
    function wxPayMch(appId, nonceStr, timestamp, packageStr, paySign, signType)
    {
        if(typeof appId == 'undefined')
        {
            alert('你还没有配置APP ID');
            return;
        }
        WeixinJSBridge.invoke('getBrandWCPayRequest',{
            'appId' : appId, //公众号名称，由商户传入
            'timeStamp' : timestamp, //时间戳
            'nonceStr' : nonceStr, //随机串
            'package' : packageStr,//扩展包
            'signType' : signType, //微信签名方式:1.sha1
            'paySign' : paySign //微信签名
        },function(res){
            //loading...
            if(res.err_msg == 'get_brand_wcpay_request:ok' )
            {
                _queryTimeout = setTimeout(function(){
                    _attempt = 0;
                    //进行后台是否成功的轮询的轮询
                    queryOrder();
                }, 1000);
            }else{
                config.fail(res);
            }
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            //因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
        });
    }

    /**
     * @method queryOrder
     * @desc 订单查询
     * @param {string} url 订单查询接口
     */
    function queryOrder()
    {

        if(typeof _queryParams.charge_id == 'undefined')
        {
            alert('没有获取到交易id。');
            return;
        }

        var charge_id = _queryParams.charge_id;

        var url = config.queryChargeUrl;

        if(typeof url == 'undefined')
        {
            alert('你还没有配置查询订单接口。');
            return;
        }

        //url = url + (url.match(/\?/) ? "&" : "?")+'order_id='+orderId;

        if(typeof config.success == 'undefined')
        {
            alert('你还没有配置成功页或回调方法。');
            return;
        }

        _queryParams.format = 'jsonp';

        util.ajax(
            {
                url: url,
                type: "get",
                data: _queryParams,
                dataType: "jsonp",
                success: function(data)
                {
                    util.closeAlertx();

                    if(data.code == 0)
                    {
                        if(data.data.paid == true)
                        {
                            if (typeof config.success == 'string'){

                                window.location.href = config.success;
                            }
                            else if (typeof config.success == 'function'){
                                config.success();
                            }
                        }else{
                            if(++_attempt < _maxAttempt) queryOrder();
                            else clearTimeout(_queryTimeout);
                        }
                    }else{
                        if(++_attempt < _maxAttempt) queryOrder();
                        else clearTimeout(_queryTimeout);
                    }
                },
                error:function(data){
                    util.closeAlertx();

                    alert('数据读取失败');
                }
            });
    };

    //编辑地址
    var editAddr = function()
    {
        if(_wxIsReady && getWeixinVersion() >= 5)
        {
            util.alertx('请耐心等待');

            if(_token != null)
            {
                getEditParams(config.appId, _token, window.location.href);
            }
        }
    };

    var getEditParams = function(appId, token, url)
    {
        util.ajax({
            url: "http://"+env.domain+"/weixin/common/edit-addr-params",
            type: "get",
            data: {url: encodeURIComponent(url), token: token, format: 'jsonp'},
            dataType: "jsonp",
            success: function(data)
            {
                if(data.code == 0)
                {
                    var appId = config.appId;
                    var scope = 'jsapi_address';
                    var signType = 'sha1';
                    var addrSign = data.data.signature;
                    var timeStamp = data.data.timestamp;
                    var nonceStr = data.data.nonceStr;

                    wxEditAddr(appId, scope, signType, addrSign, timeStamp, nonceStr);
                }else{
                    alert(data.message);
                }
            },
            error:function(data){
                util.closeAlertx();

                alert('数据读取失败');
            }
        });
    };

    var wxEditAddr = function(appId, scope, signType, addrSign, timeStamp, nonceStr)
    {
        util.closeAlertx();
        WeixinJSBridge.invoke('editAddress',{
                "appId" : appId,
                "scope" : scope,
                "signType" : signType,
                "addrSign" : addrSign,
                "timeStamp" : timeStamp,
                "nonceStr" : nonceStr,
            },function(res){
                //若res 中所带的返回值丌为空,则表示用户选择该返回值作为收货地 址。否则若返回空,则表示用户取消了这一次编辑收货地址。
                if(res.err_msg == "edit_address:ok")
                {
                    config.editAddrCallback(res);
                }
            }
        );
    }

    var getWeixinVersion = function()
    {
        var rMicroMessenger = /(micromessenger)[ \/]([\w.]+)/;
        var match = rMicroMessenger.exec(_ua) || [],
            version = match[2] || '0';

        return parseFloat(version);
    };

    function wxPayReady()
    {
        //公众号支付
        _wxIsReady = true;
    }

    $(function() {

        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', wxPayReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', wxPayReady);
                document.attachEvent('onWeixinJSBridgeReady', wxPayReady);
            }
        }else{
            wxPayReady();
        }
    });

    return {
        'config': config,
        'editAddr': editAddr,
        'pay': pay
    };
});