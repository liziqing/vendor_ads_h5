define(["wx","base/env","base/wx","base/util","jquery","swiper"],function(e,t,a,n,i,o){i(function(){function o(){return g.times+=1,g.roll(),g.times>g.cycle+10&&g.prize==g.index?(clearTimeout(g.timer),g.prize=-1,g.times=0,b=!1,r(u),setTimeout(function(){i(".tel-mask").fadeIn()},1e3)):(g.times<g.cycle?g.speed-=10:g.times==g.cycle?g.prize=d:g.times>g.cycle+10&&(0==g.prize&&7==g.index||g.prize==g.index+1)?g.speed+=110:g.speed+=20,g.speed<40&&(g.speed=40),g.timer=setTimeout(o,g.speed)),!1}function s(){i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/huo-li?mobile="+m,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){0==e.code&&(i("#score").text(e.data.value),i("#count").text(parseInt(i("#score").text()/72)))},error:function(e){console.log("ajaxFailure")}})}function r(e){var t="";if(4==e||0==e)i(".tel-mask").html('<h3>再次续活力</h3>\n<div class="telephone-box">\n    <div class="prize-box">\n        <p>再接再厉！好运就来</p>\n        <div><div class="btn buy-btn" onclick="window.location.href=\'https://item.m.jd.com/product/1636609.html\'">电商购买</div></div>\n        <div class="btn share-btn"  style="width: 2.2rem;">拉帮结派</div> <div class="btn return-btn" onclick="window.location.href=\'./lottery.html\'" style="width: 2.2rem;">返 回</div>\n    </div>\n</div>\n<img src="./img/twins.png" class="twins">\n\n');else{switch(e){case 1:case 2:t="请输入您的手机号<br>以确保您的入场券顺利到达~";break;case 3:t="请输入您的手机号<br>以确保您当天观看顺利登入"}i("#prizeText").html(t),i("#prizeImg").attr("src","./img/prize_"+e+".png")}}function l(){i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/lottery-result?mobile="+m,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){function t(e,t){-1!=e.indexOf(t)&&i("#prizeList").append('<img src="./img/prize_'+t+'.png" class="prize'+t+'">')}if(0==e.code){var a=e.data.list;t(a,"1"),t(a,"2"),t(a,"3"),i(".prize3").click(function(){i(".mask").hide(),i(".iqiyi-mask").fadeIn()})}},error:function(e){console.log("ajaxFailure")}})}function c(){a.initWxJs("wx8e56a8ebb0688ab9","pt_christmas",["onMenuShareTimeline","onMenuShareAppMessage"],function(){e.onMenuShareTimeline({title:v.shareTitle,link:v.shareUrl,imgUrl:v.shareImg,success:function(){},cancel:function(){}}),e.onMenuShareAppMessage({title:v.shareTitle,link:v.shareUrl,desc:v.shareDes,imgUrl:v.shareImg,type:"",dataUrl:"",success:function(){},cancel:function(){}})})}var m="";console.log(localStorage),localStorage.mobile&&(m=localStorage.mobile),i("#telephone").val(m),i("#telephone3").val(m),s(),l(),c();var u=3,d=0,h=[6],p=[2],f=[0,4],k=[1,3,5,7],b=!1,g={index:0,count:0,timer:0,speed:200,times:0,cycle:50,prize:4,init:function(e){i("#"+e).find(".lottery-unit").length>0&&($lottery=i("#"+e),$units=$lottery.find(".lottery-unit"),this.obj=$lottery,this.count=$units.length,$lottery.find(".lottery-unit-"+this.index).addClass("active"))},roll:function(){var e=this.index,t=this.count,a=this.obj;return i(a).find(".lottery-unit-"+e).removeClass("active"),e+=1,e>t-1&&(e=0),i(a).find(".lottery-unit-"+e).addClass("active"),this.index=e,!1},stop:function(e){return this.prize=e,!1}};g.init("lottery"),i("#lottery a").click(function(){if(_hmt.push(["_trackEvent","lottery-start-btn","click"]),stm_clicki("send","event","开始抽奖","click"),b)return!1;parseInt(i("#count").text())>0?i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/lottery?mobile="+m,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){if(0==e.code){switch(s(),u=parseInt(e.data.result),console.log("奖项："+u),u){case 1:d=h[Math.floor(Math.random()*h.length)],v.shareDes="开心，我有李易峰610（李易峰吴磊624）的门票一张！你也来试试吧～",c();break;case 2:d=p[Math.floor(Math.random()*p.length)],v.shareDes="开心，我有李易峰610（李易峰吴磊624）的门票一张！你也来试试吧～",c();break;case 3:d=f[Math.floor(Math.random()*f.length)],v.shareDes="开心，我有李易峰吴磊6·24见面会爱奇艺特殊角度观看劵了！你也来试试吧～",c();break;case 4:default:d=k[Math.floor(Math.random()*k.length)],v.shareDes="给我活力，好想要李易峰x吴磊生日会门票><一回生二回熟，下次一定活力满满有好运！！",c()}return g.speed=100,o(),b=!0,!1}},error:function(e){console.log("ajaxFailure")}}):n.alerty("活力值不足，不能抽奖")}),i("#submit").click(function(){_hmt.push(["_trackEvent","confirm-mobile-btn","click"]),i("#fullname").val().trim()?n.isMobile(i("#telephone").val().trim())&&i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/up-user-info",data:{name:i("#fullname").val().trim(),mobile:i("#telephone").val().trim(),random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){console.log(localStorage),i(".mask").hide(),i(".share-mask").fadeIn()},error:function(e){console.log("ajaxFailure")}}):n.alerty("请输入姓名")}),i("#submit2").click(function(){var e=i("#telephone2").val().trim();n.isMobile(e)&&(localStorage.setItem("mobile",e),console.log(localStorage),m=e,i("#telephone3").val(m),l(),i(".mask").hide(),i(".prize-mask").fadeIn())}),i(".prize-btn").click(function(){_hmt.push(["_trackEvent","prize-btn","click"]),m?i(".prize-mask").fadeIn():i(".check-mask").fadeIn()}),i("#send").click(function(){_hmt.push(["_trackEvent","send-btn","click"]);var e=i("#telephone3").val().trim();n.isMobile(e)&&i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/mobile-code",data:{mobile:e,random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){0==e.code?(i("#send").addClass("disable"),n.alerty("发送成功")):n.alerty(e.message)},error:function(e){console.log("ajaxFailure")}})}),i("#verify").click(function(){_hmt.push(["_trackEvent","verify-btn","click"]);var e=i("#telephone3").val().trim(),a=i("#code").val().trim();n.isMobile(e)&&i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/verify-code",data:{mobile:e,code:a,random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){0==e.code?(i(".mask").hide(),i(".watch-mask").fadeIn()):n.alerty(e.message)},error:function(e){console.log("ajaxFailure")}})}),i(document).on("click",".share-btn",function(){_hmt.push(["_trackEvent","share-btn","click"]),i(".weui_mask").fadeIn(),i.ajax({type:"GET",url:"http://"+t.apidomain+"/kangshifu/have-share?mobile="+m,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){e.code},error:function(e){console.log("ajaxFailure")}})}),i(".weui_mask").click(function(){i(this).fadeOut()});var v={shareTitle:"【康师傅绿茶健康活力派】",shareUrl:"http://kangshifu.qnmami.com",shareImg:"http://kangshifu.qnmami.com/img/slogan.png",shareDes:"给我活力，好想要李易峰x吴磊生日会门票><一回生二回熟，下次一定活力满满有好运！！"}})});