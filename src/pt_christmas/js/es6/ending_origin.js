/**
 * Created by Administrator on 2016/12/5.
 */

define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'snowfall'],
    function (wx, env, baseWx, util, $) {

        //函数挂载对象
        let app = {
            debug: env.debug,   //开发模式
            descIndex: 0,
            descLength: $('.desc-line').length,
            timer: undefined,
            snowImgArr: [
                './img/ending/snow/03.png',  //插件仅支持单图设置
            ],
            shareTimeline: {
                title: '张杰&谢娜邀你加入群聊...',
                imgUrl: 'http://ptxmas.net-show.cn/img/share.jpg',
                shareUrl: 'http://ptxmas.net-show.cn/index.html'
            },
            shareAppMessage: {
                title: '张杰&谢娜邀你加入群聊..',
                desc: '张杰谢娜的圣诞趣事，你听过吗？',
                imgUrl: 'http://ptxmas.net-show.cn/img/share.jpg',
                shareUrl: 'http://ptxmas.net-show.cn/index.html'
            },
            init: function () {
                let _this = this;

                if (_this.debug) {
                    _this.displayLogoBranch();
                    $('.desc-line').show();
                    $('.end-show').css('opacity', 1);
                    _this.setVideo();
                    _this.bindClick();
                } else {
                    _this.setShare();
                    _this.displaySnow();   //客户提供飘雪插件，内存泄漏，开发时如果须关闭debug模式请注释
                    _this.displayLogoBranch();
                    _this.setVideo();

                    setTimeout(function () {
                        _this.displayText();
                        _this.timer = setInterval(() => {
                            _this.displayText();
                        }, 1500);
                    }, 1000);
                }
            },
            displayLogoBranch: () => {
                $('.pt-logo').fadeIn();
                $('.left-branch').addClass('fadeInLeft animated');
                $('.right-branch').addClass('fadeInRight animated');
            },
            displayText: function () {
                let _this = this;

                if (_this.descIndex < _this.descLength) {
                    $('.desc-line').eq(_this.descIndex).fadeIn();
                    _this.descIndex++;
                    if (_this.descIndex === _this.descLength) {
                        clearInterval(_this.timer);
                        setTimeout(function () {
                            _this.showContent();
                            _this.bindClick();
                        }, 1500)
                    }
                }
            },
            displaySnow: function () {
                let _this = this;

                $("#body").snowfall({
                    image: _this.snowImgArr,
                    flakeCount: 600,
                    minSize: 2,
                    maxSize: 6,
                    maxSpeed: 0.8,
                    minSpeed: 0.5
                });
            },
            showContent: () => {
                $('.end-show').css('opacity', 1);
            },
            bindClick: () => {
                $('#emoticon_btn, #close_overlay_btn').on('click', () => {
                    $('#overlay').fadeToggle();
                });
                document.querySelector('#overlay').addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);
                $('#item_brn_1').on('click', () => {
                    window.location.href = 'http://item.jd.com/1513953554.html';
                });
                $('#item_brn_2').on('click', () => {
                    window.location.href = 'https://item.jd.com/11016136369.html';
                });
                $('#item_brn_3').on('click', () => {
                    window.location.href = 'https://item.jd.com/11062182787.html';
                });
                $('#item_brn_4').on('click', () => {
                    window.location.href = 'http://item.jd.com/4189806.html';
                });
                $('#focus_btn').on('click', () => {
                    window.location.href = 'http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MjM0NjIzMw==#wechat_redirect';
                });
            },
            setShare: function () {
                let _this = this;

                if (!_this.debug && util.isWeiXin()) {
                    baseWx.initWxJs(env.appid, 'pt_christmas', ['onMenuShareTimeline', 'onMenuShareAppMessage'], function () {
                        wx.onMenuShareTimeline({
                            title: _this.shareTimeline.title,
                            link: _this.shareTimeline.shareUrl,
                            imgUrl: _this.shareTimeline.imgUrl,
                            success: function () {
                            },
                            cancel: function () {
                            }
                        });
                        wx.onMenuShareAppMessage({
                            title: _this.shareAppMessage.title,
                            link: _this.shareAppMessage.shareUrl,
                            desc: _this.shareAppMessage.desc,
                            imgUrl: _this.shareAppMessage.imgUrl,
                            type: '',
                            dataUrl: '',
                            success: function () {
                            },
                            cancel: function () {
                            }
                        });
                    });
                }
            },
            setVideo: () => {
                let video = new WxMoment.Video({
                    vid: "p0021ehy1js",
                    pic: "./img/ending/video-no-btn.png", //设置视频默认缩略图
                    isHtml5ControlAlwaysShow: true,
                    autoplay: false,
                    oninited: function () {
                        //播放器在视频载入完毕触发
                    },
                    onplaying: function () {

                    },
                    onpause: function () {
                        //播放器触发暂停时，目前只针对HTML5播放器有效
                    },
                    onresume: function () {
                        //暂停后继续播放时触发
                    },
                    onallended: function () {
                        //播放器播放完毕时
                    },
                    onfullscreen: function (isfull) {

                    }
                });

                //let screenWidth = screen.width;
                //
                //if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
                //    screenWidth = document.body.clientWidth;
                //}
                $('#WxMomentVideo').width(750).height(750 * (9 / 16));
            }
        }


        //执行函数
        $(() => {
            app.init();
        });

    });
