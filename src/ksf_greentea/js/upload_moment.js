/**
 * Created by Jenson on 2017/5/8.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'swiper'], function (wx, env, baseWx, util, $, swiper) {

    $(function () {
        var mobile = "";
        var isAlbumAccess = true;

        console.log(localStorage);
        if (localStorage.mobile) {
            mobile = localStorage.mobile;
        }
        if (localStorage.actor) {
            if (localStorage.actor == 1) {
                $('.actor').show().attr('src', './img/lyf_cover.png');
            } else if (localStorage.actor == 2) {
                $('.actor').show().attr('src', './img/wl_cover.png');
            } else {
                $('.actor').hide();
            }
        } else {
            $('.actor').hide();
        }


        var $key = $('#key');  // file name    eg: the file is image.jpg,but $key='a.jpg', you will upload the file named 'a.jpg'
        var $userfile = $('#userfile');  // the file you selected
        var imgUrl = "";
        var domain = "http://vendor-ads.cdnqiniu02.qnmami.com/";

        getToken();
        getImageWallList();
        getImageList();

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
            $('.mask').hide();
            $('.upload-mask').show();
            setImagePreview();
            setTimeout(function(){
                $('.preview-box-cover').css({
                    'width': $('#preview-box').css('width'),
                    'height': $('#preview-box').css('height')
                });
            }, 100);
            // $uploadedResult.html('');
        });

        $('#upload').click(function () {
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
                                // $progress.html('上传：' + e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
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
                        upload(2, mobile, imgUrl);
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
            var tel = $('#telephone').val().trim();
            if (util.isMobile(tel)) {
                localStorage.setItem("mobile", tel);
                upload(2, tel, imgUrl);
            }
        });

        $('#submit2').click(function () {
            _hmt.push(['_trackEvent', 'confirm-mobile-btn', 'click']);
            var tel = $('#telephone').val().trim();
            if (util.isMobile(tel)) {
                localStorage.setItem("mobile", tel);
                upload(2, tel, imgUrl2);
            }
        });

        $('#myUp').click(function () {
            _hmt.push(['_trackEvent', 'my-upload-btn', 'click']);
            if (isAlbumAccess) {
                window.location.href= "./album.html";
            } else {
                util.alerty("您还没有上传照片，先去拍一张吧！");
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
                    if (data.data.code == 2) {
                        $('.repeat-mask').fadeIn();
                    } else {
                        $('.share-mask').fadeIn();
                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }


        // 获取照片墙列表
        function getImageWallList() {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/image-list?type=2',
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {
                        for (var i = 0; i < data.data.list.length; i++) {
                            $('#wall').append('<img src="' + data.data.list[i] + '">');
                        }
                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        // 获取用户照片列表
        function getImageList() {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/image-list?type=1&mobile=' + mobile,
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {
                        if (data.data.list.length == 0) {
                            isAlbumAccess = false;
                            return;
                        }
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
            shareDes: '就想分你一点我的活力美照，拉帮结派晒活力～'
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
