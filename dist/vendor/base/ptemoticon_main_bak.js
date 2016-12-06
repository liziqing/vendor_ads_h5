require.config({
    paths: {
        'jquery': "../vendor/jquery/jquery-3.1.0.min",
        'template': "../vendor/arttemplate/template",
        'wx': "http://res.wx.qq.com/open/js/jweixin-1.0.0",
        'base/env': "../vendor/base/env",
        'base/util': "../vendor/base/util",
        'base/wx': "../vendor/base/wx",
        'swiper': "../vendor/swiper/swiper.min",
        'WxMoment': "http://wximg.qq.com/wxp/libs/wxmoment/0.0.4/wxmoment.min",
    },
    shim: {
        'jquery': {
            exports: '$'
        },
    }

});


