define(["wx","base/env","base/wx","base/util","jquery","swiper"],function(e,t,a,n,i,o){i(function(){function e(){return m.times+=1,m.roll(),m.times>m.cycle+10&&m.prize==m.index?(clearTimeout(m.timer),m.prize=-1,m.times=0,d=!1,o(s),i(".tel-mask").fadeIn(2500)):(m.times<m.cycle?m.speed-=10:m.times==m.cycle?m.prize=l:m.times>m.cycle+10&&(0==m.prize&&7==m.index||m.prize==m.index+1)?m.speed+=110:m.speed+=20,m.speed<40&&(m.speed=40),console.log(m.times+"^^^^^^"+m.speed+"^^^^^^^"+m.prize),m.timer=setTimeout(e,m.speed)),!1}function a(){i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/huo-li?mobile="+r,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){0==e.code&&(i("#score").text(e.data.value),i("#count").text(parseInt(i("#score").text()/72)))},error:function(e){console.log("ajaxFailure")}})}function o(e){var t="";switch(e){case 1:t="获得6.24李易峰&吴磊双人见面会入场券一张";break;case 2:t="获得6.10李易峰健康活力走入场券一张";break;case 3:t="获得6.24磊峰合体见面会入场券"}i("#prizeText").text(t),i("#prizeImg").attr("src","./img/prize_"+e+".png")}var r="";console.log(localStorage),localStorage.mobile&&(r=localStorage.mobile),i("#telephone").val(r),a(),function(){i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/lottery-result?mobile="+r,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){function t(e,t){-1!=e.indexOf(t)&&i("#prizeList").append('<img src="./img/prize_'+t+'.png">')}if(0==e.code){var a=e.data.list;t(a,"1"),t(a,"2"),t(a,"3")}},error:function(e){console.log("ajaxFailure")}})}();var s=3,l=0,c=[1,5],u=[2,6],p=[0,3,4,7],d=!1,m={index:0,count:0,timer:0,speed:200,times:0,cycle:50,prize:4,init:function(e){i("#"+e).find(".lottery-unit").length>0&&($lottery=i("#"+e),$units=$lottery.find(".lottery-unit"),this.obj=$lottery,this.count=$units.length,$lottery.find(".lottery-unit-"+this.index).addClass("active"))},roll:function(){var e=this.index,t=this.count,a=this.obj;return i(a).find(".lottery-unit-"+e).removeClass("active"),e+=1,e>t-1&&(e=0),i(a).find(".lottery-unit-"+e).addClass("active"),this.index=e,!1},stop:function(e){return this.prize=e,!1}};m.init("lottery"),i("#lottery a").click(function(){if(d)return!1;parseInt(i("#count").text())>0?i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/lottery?mobile="+r,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(t){if(0==t.code){switch(a(),s=parseInt(t.data.result)){case 1:l=c[Math.floor(Math.random()*c.length)];break;case 2:l=u[Math.floor(Math.random()*u.length)];break;case 3:l=p[Math.floor(Math.random()*p.length)]}return m.speed=100,e(),d=!0,!1}},error:function(e){console.log("ajaxFailure")}}):n.alerty("活力值不足，不能抽奖")}),i("#submit").unbind().click(function(){i("#fullname").val().trim()?n.isMobile(i("#telephone").val().trim())&&i.ajax({type:"POST",url:"http://"+t.apidomain+"/kangshifu/up-user-info",data:{name:i("#fullname").val().trim(),mobile:i("#telephone").val().trim()},dataType:"json",success:function(e){console.log(localStorage),i(".mask").hide(),i(".share-mask").fadeIn()},error:function(e){console.log("ajaxFailure")}}):n.alerty("请输入姓名")}),i(".prize-btn").click(function(){i(".prize-mask").fadeIn()}),i(".share-btn").click(function(){i(".weui_mask").fadeIn(),i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/have-share?mobile="+r,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){e.code},error:function(e){console.log("ajaxFailure")}})}),i(".weui_mask").click(function(){i(this).fadeOut()})})});