define(["wx","base/env","base/wx","base/util","jquery","swiper"],function(a,e,n,o,t,i){t(function(){var a="";console.log(localStorage),localStorage.mobile&&(a=localStorage.mobile);var n=document.getElementById("video");t("#play").click(function(){n.play(),t(this).hide()}),n.addEventListener("timeupdate",function(a){n.paused&&t("#play").show()}),n.addEventListener("ended",function(n){o.alerty("已播放完成，恭喜获得12活力值"),t(".weui_mask").fadeIn(),t.ajax({type:"GET",url:"http://"+e.apidomain+"/kangshifu/have-watch?mobile="+a,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(a){a.code},error:function(a){console.log("ajaxFailure")}})}),t(".share-btn").click(function(){t(".weui_mask").fadeIn(),t.ajax({type:"GET",url:"http://"+e.apidomain+"/kangshifu/have-share?mobile="+a,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(a){a.code},error:function(a){console.log("ajaxFailure")}})}),t(".weui_mask").click(function(){t(this).fadeOut()})})});