define(["wx","base/env","base/wx","base/util","jquery","swiper"],function(e,a,n,i,t,o){t(function(){function o(e){t.ajax({type:"GET",url:"http://"+a.apidomain+"/kangshifu/have-watch?mobile="+e,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){},error:function(e){console.log("ajaxFailure")}})}var s="";console.log(localStorage),localStorage.mobile&&(s=localStorage.mobile);var l=document.getElementById("video");t("#play").click(function(){l.play(),t(this).hide()}),l.addEventListener("timeupdate",function(e){l.paused&&t("#play").show()}),l.addEventListener("ended",function(e){i.alerty("已播放完成，恭喜获得12活力值"),console.log(localStorage),s?(o(s),t(".mask").hide(),t(".weui_mask").fadeIn()):(t(".mask").hide(),t(".tel-mask").fadeIn())}),t("#submit").click(function(){var e=t("#telephone").val().trim();i.isMobile(e)&&(localStorage.setItem("mobile",e),o(e),t(".mask").hide(),t(".weui_mask").fadeIn())}),t(".share-btn").click(function(){t(".weui_mask").fadeIn(),t.ajax({type:"GET",url:"http://"+a.apidomain+"/kangshifu/have-share?mobile="+s,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){e.code},error:function(e){console.log("ajaxFailure")}})}),t(".weui_mask").click(function(){t(this).fadeOut()});var c={shareTitle:"【康师傅绿茶健康活力派】",shareUrl:"http://kangshifu.qnmami.com",shareImg:"http://kangshifu.qnmami.com/img/slogan.png",shareDes:"李易峰x吴磊最新TVC，健（la）康（bang）活（jie）力（pai）看这里！"};n.initWxJs("wx8e56a8ebb0688ab9","pt_christmas",["onMenuShareTimeline","onMenuShareAppMessage"],function(){e.onMenuShareTimeline({title:c.shareTitle,link:c.shareUrl,imgUrl:c.shareImg,success:function(){},cancel:function(){}}),e.onMenuShareAppMessage({title:c.shareTitle,link:c.shareUrl,desc:c.shareDes,imgUrl:c.shareImg,type:"",dataUrl:"",success:function(){},cancel:function(){}})})})});