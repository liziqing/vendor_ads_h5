'use strict';

/**
 * Created by Administrator on 2016/11/23.
 */
define(['jquery'], function ($) {
    $(function () {
        //第一页
        var myDate = new Date();
        var hour = myDate.getHours();
        var minute = myDate.getMinutes();
        var mouth = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var week = myDate.getDay();
        var weekArr = ['日', '一', '二', '三', '四', '五', '六'];
        //console.log(myDate,hour,minute,mouth,day,week);
        $('.hour-and-minute').html(zfill(hour) + ':' + zfill(minute));
        $('.mouth-and-day').html(zfill(mouth) + '月' + zfill(day) + '日');
        $('.week').html('星期' + weekArr[week]);
        function zfill(num) {
            var s = "000000000" + num;
            return s.substr(s.length - 2);
        }
    });
});