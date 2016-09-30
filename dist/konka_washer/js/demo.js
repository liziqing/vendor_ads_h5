/**
 * Created by ianzhang on 16/9/27.
 */

define(['wx', 'base/env', 'base/wechat/wx_pay', 'base/util', 'jquery']
    , function(wx, env, wxPay, util, $) {

        wxPay.config(
            {
                appId: 'wxf19834fcc10552b0',
                editAddr: false,
                queryChargeUrl: 'http://' + env.domain + '/shop/order/query',
                success: success,
                fail: fail,
                callback: function(){
                    alert('初始化');
                }
            }
        );

        $('#demo').click(function(){

            var params = {
                'name': 'abc',
                'age': '15',
                'phone': '13795380329',
                'address': 'asdasd',
                'gender': '女',
                'baby': '无'
            };
            var url = 'http://' + env.domain + '/shop/order/create';

            wxPay.pay(params, url);
        })

        $('#detail').click(function(){
            orderDetail('ch_L8OWv9anPSe1XnDWvLXn58y1');
        });

        $('#count').click(function(){
            orderCount();
        });

        $('#try').click(function(){
            createTryApply('test_name', 'test_age', 'test_phone', 'test_address', 'test_reason');
        });

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

        function orderDetail(chargeId)
        {
            util.ajax({
                url: "http://" + env.domain + "/shop/order/detail",
                type: "get",
                data: {format: 'jsonp', 'charge_id': chargeId},
                dataType: "jsonp",
                success: function (data) {
                    console.log(data.data)
                    alert(data.code);
                }
            });
        }

        function orderCount()
        {
            util.ajax({
                url: "http://" + env.domain + "/shop/order/statistics",
                type: "get",
                data: {format: 'jsonp'},
                dataType: "jsonp",
                success: function (data) {
                    console.log(data.data)

                    alert(data.code);
                }
            });
        }

        function createTryApply(name, age, phone, address, reason)
        {
            var params = {
                'format': 'jsonp',
                'name': name,
                'age': age,
                'phone': phone,
                'address': address,
                'reason': reason
            };

            util.ajax({
                url: "http://" + env.domain + "/shop/try/create",
                type: "get",
                data: params,
                dataType: "jsonp",
                success: function (data) {
                    console.log(data.data)

                    alert(data.code);
                }
            });
        }

    }
);