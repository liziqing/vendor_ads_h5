require.config({
    baseUrl: '../js',
    paths: {
        'jquery': "../vendor/jquery/jquery-3.1.0",
        'template': "../vendor/arttemplate/template",
        'wx': "http://res.wx.qq.com/open/js/jweixin-1.0.0",
        'base/env': "../vendor/base/env",
        'base/util': "../vendor/base/util",
        'base/wx': "../vendor/base/wx",
        'swiper': "../vendor/swiper/swiper.jquery.min",
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'swiper': {
            deps: ['jquery'],
            exports: 'swiper'
        }
    }

});


