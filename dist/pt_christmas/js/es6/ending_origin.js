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
            video: undefined,
            snowImgArr: [
                './img/ending/snow/03.png',  //插件仅支持单图设置
            ],
            shareTimeline: {
                title: '张杰&谢娜邀请你加入群聊...',
                imgUrl: 'http://ptxmas.net-show.cn/img/share.jpg',
                shareUrl: 'http://clickc.admaster.com.cn/c/a79677,b1456056,c2,i0,m101,8a2,8b2,h'
            },
            shareAppMessage: {
                title: '张杰&谢娜邀请你加入群聊..',
                desc: '张杰谢娜的圣诞趣事，你听过吗？',
                imgUrl: 'http://ptxmas.net-show.cn/img/share.jpg',
                shareUrl: 'http://clickc.admaster.com.cn/c/a79677,b1456056,c2,i0,m101,8a2,8b2,h'
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

                    // setTimeout(function () {
                    //     _this.displayText();
                    //     _this.timer = setInterval(() => {
                    //         _this.displayText();
                    //     }, 1500);
                    // }, 1000);
                    _this.displayText();
                }
            },
            displayLogoBranch: () => {
                $('.pt-logo').fadeIn();
                $('.left-branch').addClass('fadeInLeft animated');
                $('.right-branch').addClass('fadeInRight animated');
            },
            displayText: function () {
                let _this = this;

                // if (_this.descIndex < _this.descLength) {
                //     $('.desc-line').eq(_this.descIndex).fadeIn();
                //     _this.descIndex++;
                //     if (_this.descIndex === _this.descLength) {
                //         clearInterval(_this.timer);
                //         setTimeout(function () {
                //             _this.showContent();
                //             _this.bindClick();
                //         }, 1500)
                //     }
                // }
                $('.desc-line').fadeIn();
                _this.showContent();
                _this.bindClick();
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
            bindClick: function() {
                let _this = this;
                $('#emoticon_btn').on('click', () => {
                    _smq.push(['custom','Ending页面','点击”下载表情包“']);
                    $('#overlay').fadeToggle();
                });
                $('#close_overlay_btn').on('click', () => {
                    _smq.push(['custom','Ending页面','面（浮层） 点击”我知道了“']);
                    $('#overlay').fadeToggle();
                });
                document.querySelector('#overlay').addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
                $('#item_brn_1').on('click', () => {
                    _smq.push(['custom', 'Ending页面', '点击”女王猫铂金吊坠购买“']);
                    window.location.href = 'https://item.jd.com/1535360709.html';
                });
                $('#item_brn_2').on('click', () => {
                    _smq.push(['custom', 'Ending页面', '点击”心连心吊坠购买“']);
                    window.location.href = 'https://item.jd.com/11016136369.html';
                });
                $('#item_brn_3').on('click', () => {
                    _smq.push(['custom', 'Ending页面', '点击“爱的礼物系列风吟铂金套链购买“']);
                    window.location.href = 'https://item.jd.com/11062182787.html';
                });
                $('#item_brn_4').on('click', () => {
                    _smq.push(['custom', 'Ending页面', '点击“BLINK系列晴彩铂金吊坠购买"']);
                    window.location.href = 'http://item.jd.com/4189806.html';
                });
                $('#item_brn_5').on('click', () => {
                    _smq.push(['custom', 'Ending页面', '点击“星轨铂金吊坠购买"']);
                    window.location.href = 'http://wq.jd.com/item/view?sku=11020562199';
                });
                $('#item_brn_6').on('click', () => {
                    _smq.push(['custom', 'Ending页面', '点击“满天星铂金吊坠购买"']);
                    window.location.href = 'http://item.jd.com/10345673349.html';
                });
                $('#item_brn_7').on('click', () => {
                    _smq.push(['custom', 'Ending页面', '点击“圣诞鹿铂金吊坠购买"']);
                    window.location.href = 'http://item.jd.com/11045261395.html';
                });
                $('#focus_btn').on('click', () => {
                    _smq.push(['custom','Ending页面','点击“关注铂金PT官方微信""']);
                    window.location.href = 'http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MjM0NjIzMw==#wechat_redirect';
                });
                $('.video-fe').on('click', function () {
                    _smq.push(['custom','Ending页面','点击“观看视频”']);
                    $(this).hide();
                    _this.video.getPlayer().play();
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
                                _smq.push(['custom','分享','分享至朋友圈']);
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
                                _smq.push(['custom','分享','分享给好友']);
                            },
                            cancel: function () {
                            }
                        });
                    });
                }
            },
            setVideo: function() {
                this.video = new WxMoment.Video({
                    vid: "c0022gqiekv",
                    pic: "./img/ending/video-no-btn.png", //设置视频默认缩略图
                    isHtml5ControlAlwaysShow: false,
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

                // let screenWidth = screen.width;
                //
                // if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
                //     screenWidth = document.body.clientWidth;
                // }
                // $('#WxMomentVideo').width(screenWidth * 2).height(screenWidth * (9 / 16) * 2);
                let viewportWidth = 750;
                $('#WxMomentVideo').width(viewportWidth).height(parseInt(viewportWidth * (9 / 16) - 1));

            }
        }


        //执行函数
        $(() => {
            app.init();
        });

    });
