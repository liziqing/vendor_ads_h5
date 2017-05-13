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
                                        break;
                                    case 2:
                                        prizeIndex = prizeSecondArr[Math.floor(Math.random()*prizeSecondArr.length)];
                                        break;
                                    case 3:
                                        prizeIndex = prizeThirdArr[Math.floor(Math.random()*prizeThirdArr.length)];
                                        break;
                                    case 4:
                                        prizeIndex = prizeFourthArr[Math.floor(Math.random()*prizeFourthArr.length)];
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
                $('.tel-mask').html("<h3>很遗憾</h3>\n<div class=\"telephone-box\">\n    <div class=\"prize-box\">\n        <p>这次没有抽中哦，请再接再厉！</p>\n        <p>购买后晒单可以继续抽奖</p>\n        <div class=\"btn buy-btn\" onclick=\"window.location.href=\'http://m.jd.com\'\">电商购买</div>\n    </div>\n</div>\n\n<div class=\"btn return-btn\" onclick=\"window.location.href=\'./lottery.html\'\">返 回</div>")
            } else {
                switch (prize) {
                    case 1:
                        prizeStr = "获得6.24李易峰&吴磊双人见面会入场券一张";
                        break;
                    case 2:
                        prizeStr = "获得6.10李易峰健康活力走入场券一张";
                        break;
                    case 3:
                        prizeStr = "获得6.24磊峰合体见面会入场券";
                        break;
                }
                $('#prizeText').text(prizeStr);
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
                                $('#prizeList').append('<img src="./img/prize_' + elem + '.png">');
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

        $('.share-btn').click(function () {
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

    });
});