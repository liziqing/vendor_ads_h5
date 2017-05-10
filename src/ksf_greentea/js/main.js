requirejs.config({
    baseUrl: 'js',
    paths: {
        "jquery": "vendor/jquery/jquery-3.1.0.min",
        'wx': "http://res.wx.qq.com/open/js/jweixin-1.0.0",
        'swiper': 'vendor/swiper/idangerous.swiper.min',
        'jbox': 'vendor/jbox/jBox.min',
        'imgLoadCatch': 'vendor/imgLoadCatch/jQuery.imgLoadCatch.min',
        'fullpage': 'vendor/fullpage/jquery.fullPage.min',
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
        'imgLoadCatch': {
            deps: ['jquery'],
            exports: 'imgLoadCatch'
        },
        'fullpage': {
            deps: ['jquery'],
            exports: 'fullpage'
        },
        // 'ptShareConfig': {
        //     deps: ['jquery'],
        //     exports: 'ptShareConfig'
        // }
    }

});