/**
 * Created by ianzhang on 15/11/17.
 */
define(function(require){
    
    var appid = 'wxe5613adadd2e9d16';

    var env = Object();

    var hostUrl = window.location.href;

    // env.debug = 1;   /////////////////////////

    if(hostUrl.indexOf("t1.") > 0){
        env.baseUrl = 'http://t1.h5.qnmami.com/';
        env.domain = 't1.api.qnmami.com';
        env.h5domain = 't1.h5.qnmami.com';
        env.debug = 1;
        env.domain = 'api.qnmami.com';
    }else{
        env.baseUrl = 'http://h5.qnmami.com/';
        env.domain = 'api.qnmami.com';
        env.h5domain = 'h5.qnmami.com';
    }


    env.appid = appid;

    var shareTimeline = {};
    shareTimeline.title = '柿集送来红包，数十万海外精品随你挑。';
    shareTimeline.imgUrl = 'http://7xjc5h.com2.z0.glb.qiniucdn.com/quiz_3_1449663978';


    var shareAppMessage = {};
    shareAppMessage.title = '柿集送来大红包，带你买下全世界。';
    shareAppMessage.desc = '柿集送你大红包，数十万海外精品随你挑。';
    shareAppMessage.imgUrl = 'http://7xjc5h.com2.z0.glb.qiniucdn.com/quiz_3_1449663978';

    env.shareTimeline = shareTimeline;
    env.shareAppMessage = shareAppMessage;

    return env;
});



