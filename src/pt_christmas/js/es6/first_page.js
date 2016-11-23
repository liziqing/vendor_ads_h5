/**
 * Created by Administrator on 2016/11/23.
 */
define(['jquery'],function($){
    $(()=>{
        //第一页
        let myDate=new Date();
        let hour=myDate.getHours();
        let minute=myDate.getMinutes();
        let mouth=myDate.getMonth()+1;
        let day=myDate.getDate();
        let week=myDate.getDay();
        let weekArr=['日','一','二','三','四','五','六'];
        //console.log(myDate,hour,minute,mouth,day,week);
        $('.hour-and-minute').html(zfill(hour)+':'+zfill(minute));
        $('.mouth-and-day').html(zfill(mouth)+'月'+zfill(day)+'日');
        $('.week').html('星期'+weekArr[week]);
        function zfill(num) {
            var s = "000000000" + num;
            return s.substr(s.length-2);
        }
    })
});