define(["wx","base/env","base/wx","base/util","jquery","swiper"],function(e,t,a,n,o,i){o(function(){function e(){return f.times+=1,f.roll(),f.times>f.cycle+10&&f.prize==f.index?(clearTimeout(f.timer),f.prize=-1,f.times=0,m=!1,i(s),setTimeout(function(){o(".tel-mask").fadeIn()},1e3)):(f.times<f.cycle?f.speed-=10:f.times==f.cycle?f.prize=l:f.times>f.cycle+10&&(0==f.prize&&7==f.index||f.prize==f.index+1)?f.speed+=110:f.speed+=20,f.speed<40&&(f.speed=40),f.timer=setTimeout(e,f.speed)),!1}function a(){o.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/huo-li?mobile="+r,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){0==e.code&&(o("#score").text(e.data.value),o("#count").text(parseInt(o("#score").text()/72)))},error:function(e){console.log("ajaxFailure")}})}function i(e){var t="";if(4==e)o(".tel-mask").html('<h3>很遗憾</h3>\n<div class="telephone-box">\n    <div class="prize-box">\n        <p>这次没有抽中哦，请再接再厉！</p>\n        <p>购买后晒单可以继续抽奖</p>\n        <div class="btn buy-btn" onclick="window.location.href=\'https://mall.jd.com/qr/v.html?type=js&Id=1000010461&src=qr&resourceType=jdapp_share&resourceValue=Wxfriends&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends\'">电商购买</div>\n    </div>\n</div>\n\n<div class="btn return-btn" onclick="window.location.href=\'./lottery.html\'">返 回</div>');else{switch(e){case 1:t="获得6.24李易峰&吴磊双人见面会入场券一张";break;case 2:t="获得6.10李易峰健康活力走入场券一张";break;case 3:t="获得6.24磊峰合体见面会入场券"}o("#prizeText").text(t),o("#prizeImg").attr("src","./img/prize_"+e+".png")}}var r="";console.log(localStorage),localStorage.mobile&&(r=localStorage.mobile),o("#telephone").val(r),a(),function(){o.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/lottery-result?mobile="+r,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){function t(e,t){-1!=e.indexOf(t)&&o("#prizeList").append('<img src="./img/prize_'+t+'.png">')}if(0==e.code){var a=e.data.list;t(a,"1"),t(a,"2"),t(a,"3")}},error:function(e){console.log("ajaxFailure")}})}();var s=3,l=0,c=[6],u=[2],p=[0,4],d=[1,3,5,7],m=!1,f={index:0,count:0,timer:0,speed:200,times:0,cycle:50,prize:4,init:function(e){o("#"+e).find(".lottery-unit").length>0&&($lottery=o("#"+e),$units=$lottery.find(".lottery-unit"),this.obj=$lottery,this.count=$units.length,$lottery.find(".lottery-unit-"+this.index).addClass("active"))},roll:function(){var e=this.index,t=this.count,a=this.obj;return o(a).find(".lottery-unit-"+e).removeClass("active"),e+=1,e>t-1&&(e=0),o(a).find(".lottery-unit-"+e).addClass("active"),this.index=e,!1},stop:function(e){return this.prize=e,!1}};f.init("lottery"),o("#lottery a").click(function(){if(m)return!1;parseInt(o("#count").text())>0?o.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/lottery?mobile="+r,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(t){if(0==t.code){switch(a(),s=parseInt(t.data.result),console.log("奖项："+s),s){case 1:l=c[Math.floor(Math.random()*c.length)];break;case 2:l=u[Math.floor(Math.random()*u.length)];break;case 3:l=p[Math.floor(Math.random()*p.length)];break;case 4:l=d[Math.floor(Math.random()*d.length)]}return f.speed=100,e(),m=!0,!1}},error:function(e){console.log("ajaxFailure")}}):n.alerty("活力值不足，不能抽奖")}),o("#submit").click(function(){o("#fullname").val().trim()?n.isMobile(o("#telephone").val().trim())&&o.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/up-user-info",data:{name:o("#fullname").val().trim(),mobile:o("#telephone").val().trim(),random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){console.log(localStorage),o(".mask").hide(),o(".share-mask").fadeIn()},error:function(e){console.log("ajaxFailure")}}):n.alerty("请输入姓名")}),o(".prize-btn").click(function(){o(".prize-mask").fadeIn()}),o(".share-btn").click(function(){o(".weui_mask").fadeIn(),o.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/have-share?mobile="+r,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){e.code},error:function(e){console.log("ajaxFailure")}})}),o(".weui_mask").click(function(){o(this).fadeOut()})})});