'use strict';

/**
 * Created by Administrator on 2016/12/5.
 */

define(['jquery'], function ($) {
    $(function () {

        var descIndex = 0;
        var descLength = $('.desc-line').length;
        var timer = void 0;

        $('.pt-logo').fadeIn();

        setTimeout(function () {
            displayDesc();
            timer = setInterval(displayDesc, 2000);
        }, 1000);
        function displayDesc() {
            if (descIndex < descLength) {
                $('.desc-line').eq(descIndex).fadeIn();
                descIndex++;
                if (descIndex === descLength) {
                    clearInterval(timer);
                    setTimeout(function () {
                        $('.content-wrapper').fadeIn();
                    }, 2000);
                }
            }
        }
    });
});