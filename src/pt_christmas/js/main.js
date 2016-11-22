requirejs.config({
    baseUrl: 'js',
    paths: {
        "jquery": "vendor/jquery/jquery-3.1.0.min",
        'wx': "http://res.wx.qq.com/open/js/jweixin-1.0.0"
    },
    shim: {
        'jquery': {
            exports: '$'
        }
    }

});