/**
 * Created by Jenson on 2017/5/8.
 */
define(['wx', 'base/env', 'base/wx', 'base/util', 'jquery', 'swiper'], function (wx, env, baseWx, util, $, swiper) {

    $(function () {
        var mobile = "";

        console.log(localStorage);
        if (localStorage.mobile) {
            mobile = localStorage.mobile;
        }
        $('#telephone').val(mobile);
        getScore();
        getMyPrize();

        var prize = 3;
        var prizeIndex = 0;
        var prizeFirstArr = [6]; // 一等奖位置
        var prizeSecondArr = [2]; // 二等奖位置
        var prizeThirdArr = [0, 4]; // 三等奖位置
        var prizeFourthArr = [1, 3, 5, 7]; // 四等奖位置
        var click = false;
        var lottery = {
            index: 0,	//当前转动到哪个位置
            count: 0,	//总共有多少个位置
            timer: 0,	//setTimeout的ID，用clearTimeout清除
            speed: 200,	//初始转动速度
            times: 0,	//转动次数
            cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: 4,	//中奖位置
            init: function (id) {
                if ($("#" + id).find(".lottery-unit").length > 0) {
                    $lottery = $("#" + id);
                    $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    $lottery.find(".lottery-unit-" + this.index).addClass("active");
                }
                ;
            },
            roll: function () {
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-" + index).removeClass("active");
                index += 1;
                if (index > count - 1) {
                    index = 0;
                }
                ;
                $(lottery).find(".lottery-unit-" + index).addClass("active");
                this.index = index;
                return false;
            },
            stop: function (index) {
                this.prize = index;
                return false;
            }
        };

        function roll() {
            lottery.times += 1;
            lottery.roll();
            if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
                clearTimeout(lottery.timer);
                lottery.prize = -1;
                lottery.times = 0;
                click = false;
                getPrize(prize);
                setTimeout(function () {
                    $('.tel-mask').fadeIn();
                }, 1000)
            } else {
                if (lottery.times < lottery.cycle) {
                    lottery.speed -= 10;
                } else if (lottery.times == lottery.cycle) {
                    // 中奖位置
                    // prizeIndex = 2;
                    lottery.prize = prizeIndex;
                } else {
                    if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                        lottery.speed += 110;
                    } else {
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed < 40) {
                    lottery.speed = 40;
                }
                ;
                // console.log(lottery.times + '^^^^^^' + lottery.speed + '^^^^^^^' + lottery.prize);
                lottery.timer = setTimeout(roll, lottery.speed);
            }
            return false;
        }


        // 开始抽奖
        lottery.init('lottery');
        $("#lottery a").click(function () {
            if (click) {
                return false;
            } else {
                if (parseInt($('#count').text()) > 0) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://' + env.apidomain + '/kangshifu/lottery?mobile=' + mobile,
                        data: {
                            random: Math.random(),
                            format: 'jsonp'
                        },
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        success: function (data) {
                            if (data.code == 0) {
                                getScore();
                                prize = parseInt(data.data.result);
                                console.log("奖项："+prize);
                                switch (prize) {
                                    case 1:
                                        prizeIndex = prizeFirstArr[Math.floor(Math.random()*prizeFirstArr.length)];
                                        shareData.shareDes = '开心，我有李易峰610（李易峰吴磊624）的门票一张！你也来试试吧～';
                                        share();
                                        break;
                                    case 2:
                                        prizeIndex = prizeSecondArr[Math.floor(Math.random()*prizeSecondArr.length)];
                                        shareData.shareDes = '开心，我有李易峰610（李易峰吴磊624）的门票一张！你也来试试吧～';
                                        share();
                                        break;
                                    case 3:
                                        prizeIndex = prizeThirdArr[Math.floor(Math.random()*prizeThirdArr.length)];
                                        shareData.shareDes = '开心，我有李易峰吴磊6·24见面会爱奇艺特殊角度观看劵了！你也来试试吧～';
                                        share();
                                        break;
                                    case 4:
                                        prizeIndex = prizeFourthArr[Math.floor(Math.random()*prizeFourthArr.length)];
                                        shareData.shareDes = '给我活力，好想要李易峰x吴磊生日会门票><一回生二回熟，下次一定活力满满有好运！！';
                                        share();
                                        break;
                                }
                                lottery.speed = 100;
                                roll();
                                click = true;
                                return false;
                            }
                        },
                        error: function (data) {
                            console.log("ajaxFailure")
                        }
                    });
                } else {
                    util.alerty("活力值不足，不能抽奖");
                }

            }
        });

        // 获取活力值
        function getScore() {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/huo-li?mobile=' + mobile,
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {
                        $('#score').text(data.data.value);
                        $('#count').text(parseInt($('#score').text()/72));
                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        // 根据奖品id获取奖品信息
        function getPrize(prize) {
            var prizeStr = "";
            if (prize == 4) {
                $('.tel-mask').html("<h3>再次续活力</h3>\n<div class=\"telephone-box\">\n    <div class=\"prize-box\">\n        <p>再接再厉！好运就来</p>\n        <div><div class=\"btn buy-btn\" onclick=\"window.location.href=\'https://item.m.jd.com/product/2798826.html\'\">电商购买</div></div>\n        <div class=\"btn share-btn\"  style=\"width: 2.2rem;\">拉帮结派</div> <div class=\"btn return-btn\" onclick=\"window.location.href=\'./lottery.html\'\" style=\"width: 2.2rem;\">返 回</div>\n    </div>\n</div>\n<img src=\"./img/twins.png\" class=\"twins\">\n\n")
            } else {
                switch (prize) {
                    case 1:
                        prizeStr = "请输入您的手机号<br>以确保您的入场券顺利到达~";
                        break;
                    case 2:
                        prizeStr = "请输入您的手机号<br>以确保您的入场券顺利到达~";
                        break;
                    case 3:
                        prizeStr = "请输入您的手机号<br>以确保您当天观看顺利登入";
                        break;
                }
                $('#prizeText').html(prizeStr);
                $('#prizeImg').attr('src', './img/prize_' + prize + '.png');
            }
        }

        // 获取我的奖品
        function getMyPrize() {
            $.ajax({
                type: 'GET',
                url: 'http://' + env.apidomain + '/kangshifu/lottery-result?mobile=' + mobile,
                data: {
                    random: Math.random(),
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    if (data.code == 0) {
                        var arr = data.data.list;
                        checkPrize(arr, "1");
                        checkPrize(arr, "2");
                        checkPrize(arr, "3");
                        function checkPrize(arr, elem) {
                            if (arr.indexOf(elem) != -1) {
                                $('#prizeList').append('<img src="./img/prize_' + elem + '.png" class="prize'+ elem +'">');
                            }
                        }

                    }
                },
                error: function (data) {
                    console.log("ajaxFailure")
                }
            });
        }

        $('#submit').click(function () {
            if ($('#fullname').val().trim()) {
                if (util.isMobile($('#telephone').val().trim())) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://' + env.apidomain + '/kangshifu/up-user-info',
                        data: {
                            name: $('#fullname').val().trim(),
                            mobile: $('#telephone').val().trim(),
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
            } else {
                util.alerty('请输入姓名');
            }
        });

        $('.prize-btn').click(function () {
            $('.prize-mask').fadeIn();
        });

        $(document).on('click', '.share-btn', function () {
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

        $(document).on('click', '.prize3', function () {
            // window.location.href = "http://jd.com";
        });

        var shareData = {
            shareTitle: '【康师傅绿茶健康活力派】',
            shareUrl: 'http://kangshifu.qnmami.com',
            shareImg: 'http://kangshifu.qnmami.com/img/slogan.png',
            shareDes: '给我活力，好想要李易峰x吴磊生日会门票><一回生二回熟，下次一定活力满满有好运！！'
        };

        function share() {
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
        }

    });
});