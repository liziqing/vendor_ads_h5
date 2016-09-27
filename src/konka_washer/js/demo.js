/**
 * Created by ianzhang on 16/9/27.
 */

define(['wx', 'base/env', 'base/wechat/wx_pay', 'base/util', 'jquery']
    , function(wx, env, wxPay, util, $) {

        wxPay.config(
            {
                appId: 'wxf19834fcc10552b0',
                editAddr: false,
                queryChargeUrl: 'http://' + env.domain + '/shop/order/create',
                success: success,
                fail: fail,
                callback: function(){
                    alert('初始化');
                }
            }
        );


        function success() {
            alert('success');
        }

        function fail(res){
            if(res.err_msg == 'get_brand_wcpay_request:cancel')
            {
                $('#submit').text('重新支付');
                alert('请重新支付');
            }else if(res.err_msg == 'get_brand_wcpay_request:fail')
            {
                alert('支付异常');
                window.location.href = env.baseUrl + "wechat/html/list/orderPay.html?orderNumber="+orderNum;
            }
        }
    }
);