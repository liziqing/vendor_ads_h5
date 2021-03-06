/**
 * Created by Jenson on 2017/5/7.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'swiper', 'imgLoadCatch', 'fullpage'], function (wx, env, baseWx, util, $, swiper) {

    $(function () {
        var mobile = "";

        console.log(localStorage);
        if (localStorage.mobile) {
            mobile = localStorage.mobile;
        }


        var $key = $('#key');  // file name    eg: the file is image.jpg,but $key='a.jpg', you will upload the file named 'a.jpg'
        var $userfile = $('#userfile');  // the file you selected
        var imgUrl = "";
        var domain = "http://vendor-ads.cdnqiniu02.qnmami.com/";

        getToken();
        checkVerify();

        // 获取token
        function getToken() {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/qn-token',
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {
                        $('input[name="token"]').val(data.data.token);
                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        // 设置预览图
        function setImagePreview() {
            var docObj = document.getElementById("userfile");
            var imgObjPreview = document.getElementById("preview-box");
            if (docObj.files && docObj.files[0]) {
                $(imgObjPreview).attr("src", window.URL.createObjectURL(docObj.files[0]));
            }
            return true;
        }

        $("#userfile").change(function () {  // you can ues 'onchange' here to upload automatically after select a file
            _hmt.push(['_trackEvent', 'choose-order-btn', 'click']);
            stm_clicki('send', 'event', '上传订单截图', 'click');
            $('.mask').hide();
            $('.upload-mask').show();
            setImagePreview();
            // $uploadedResult.html('');
        });

        $('#upload').click(function () {
            _hmt.push(['_trackEvent', 'upload-order-btn', 'click']);
            var selectedFile = $userfile.val();
            if (selectedFile) {
                // randomly generate the final file name
                var ramdomName = Math.random().toString(36).substr(2) + $userfile.val().match(/\.?[^.\/]+$/);
                $key.val(ramdomName);
                // $selectedFile.html('文件：' + selectedFile);
            } else {
                return false;
            }
            var f = new FormData(document.getElementById("upform"));
            $.ajax({
                url: 'http://upload.qiniu.com/',  // Different bucket zone has different upload url, you can get right url by the browser error massage when uploading a file with wrong upload url.
                type: 'POST',
                data: f,
                processData: false,
                contentType: false,
                xhr: function () {
                    myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', function (e) {
                            // console.log(e);
                            if (e.lengthComputable) {
                                var percent = e.loaded / e.total * 100;
                                $('.loading-mask').show();
                                // $progress.html('上传：' + e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
                                if (e.loaded == e.total ) {
                                    $('.loading-mask').hide();
                                }
                            }
                        }, false);
                    }
                    return myXhr;
                },
                success: function (res) {
                    var str = '<span>已上传：' + res.key + '</span>';
                    // if (res.key && res.key.match(/\.(jpg|jpeg|png|gif)$/)) {
                    str += '<img src="' + domain + res.key + '"/>';
                    // }
                    // $uploadedResult.html(str);
                    console.log(domain + res.key)
                    imgUrl = domain + res.key;
                    if (!mobile) {
                        $('.mask').hide();
                        $('.tel-mask').fadeIn();
                    } else {
                        upload(1, mobile, imgUrl);
                    }

                },
                error: function (res) {
                    console.log("失败:" + JSON.stringify(res));
                    // $uploadedResult.html('上传失败：' + res.responseText);
                }
            });
            return false;
        });

        $('#submit').click(function () {
            _hmt.push(['_trackEvent', 'confirm-mobile-btn', 'click']);
            var tel = $('#telephone').val().trim();
            localStorage.setItem("mobile", tel);
            if (util.isMobile(tel)) {
                upload(1, tel, imgUrl);
            }
        });

        /**
         *
         * @param type: 1订单 2照片
         * @param tel: 手机号
         * @param imgUrl: 图片url
         */
        function upload(type, tel, imgUrl) {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/image-up',
                data: {
                    type: type,
                    mobile: tel,
                    url: imgUrl,
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    console.log(localStorage);
                    $('.mask').hide();
                    $('.share-mask').fadeIn();
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        function checkVerify() {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/verify-status',
                data: {
                    mobile: mobile,
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.data.image) {
                        $('.mask').hide();
                        $('.verify-success').fadeIn();
                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        $('.share-btn').click(function () {
            _hmt.push(['_trackEvent', 'share-btn', 'click']);
            $('.weui_mask').fadeIn();
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/have-share?mobile=' + mobile,
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {

                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        });

        $('.weui_mask').click(function () {
            $(this).fadeOut();
        });

        var shareData = {
            shareTitle: '【康师傅绿茶健康活力派】',
            shareUrl: 'http://kangshifu.qnmami.com',
            shareImg: 'http://kangshifu.qnmami.com/img/slogan.png',
            shareDes: '可以见峰峰和吴磊咯！赶紧一起京东下单一箱康师傅绿茶，有机会得到李易峰x吴磊见面会门票！'
        };

        baseWx.initWxJs('wx8e56a8ebb0688ab9', 'pt_christmas', ['onMenuShareTimeline', 'onMenuShareAppMessage'], function () {
            wx.onMenuShareTimeline({
                title: shareData.shareTitle, // 分享标题
                link: shareData.shareUrl, // 分享链接
                imgUrl: shareData.shareImg,
                success: function success() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function cancel() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: shareData.shareTitle, // 分享标题
                link: shareData.shareUrl,
                desc: shareData.shareDes,
                imgUrl: shareData.shareImg,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function success() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function cancel() {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    });
});