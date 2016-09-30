requirejs.config({
    baseUrl: 'js',
    paths: {
        "jquery": "vendor/jquery/jquery-3.1.0.min",
        'wx': "http://res.wx.qq.com/open/js/jweixin-1.0.0",
        'swiper': 'vendor/swiper/swiper.jquery.min',
        'jbox': 'vendor/jbox/jBox.min',
        // 'ptShareConfig': 'vendor/base/wxJsSdkConfig',
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'swiper': {
            deps: ['jquery'],
            exports: 'swiper'
        },
        'jbox': {
            deps: ['jquery'],
            exports: 'jBox'
        },
        // 'ptShareConfig': {
        //     deps: ['jquery'],
        //     exports: 'ptShareConfig'
        // }
    }

});