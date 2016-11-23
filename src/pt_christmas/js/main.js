requirejs.config({
    baseUrl: 'js',
    paths: {
        "jquery": "vendor/jquery/jquery-3.1.0.min",
        'wx': "http://res.wx.qq.com/open/js/jweixin-1.0.0",
        'hammer': "vendor/hammer/hammer.min",
        'velocity': 'vendor/velocity/velocity.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'hammer': {
            exports: 'hammer'
        },
        'velocity': {
            exports: 'velocity'
        }
    }

});