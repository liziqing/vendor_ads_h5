define(["wx","base/env","base/wx","base/util","jquery","swiper","imgLoadCatch","fullpage"],function(e,a,o,t,n,c){!function(){var e=n(".loading-bar-active"),a=1,o=function(e,a){return Math.floor(Math.random()*(a-e+1)+e)},t=function(){var c=o(10,30);setTimeout(function(){if(window.loaded)return e.css("width","100%"),void n(".percent-num").text("100%");a+=o(1,5),a>98&&(a=98),e.css("width",a+"%"),n(".percent-num").text(a+"%"),t()},c)};t()}(),n(function(){function t(){r>=0&&r<36?(n(".fourth-screen .actor-img-content").addClass("actor-img-content-0"),n(".third-screen .actor-img-content").addClass("actor-img-content-none")):r>=36&&r<72?(n(".third-screen .actor-img-content").addClass("actor-img-content-36"),n(".fourth-screen .actor-img-content").addClass("actor-img-content-none")):r>=72&&(n(".third-screen .actor-img-content").addClass("actor-img-content-72"),n(".fourth-screen .actor-img-content").addClass("actor-img-content-none"))}function c(){l?n(".voice").addClass("play"):n(".voice").removeClass("play")}window.loaded=!0,n(".loading-screen").fadeOut();var i="",r=0,l=!1,s=new Audio;console.log(localStorage),localStorage.mobile&&(i=localStorage.mobile),localStorage.actor?1==localStorage.actor?(n(".actor-img").show().attr("src","./img/lyf_cartoon.png"),n(".voice").show(),n(".logo-72").hide()):2==localStorage.actor?(n(".actor-img").show().attr("src","./img/wl_cartoon.png"),n(".voice").show(),n(".logo-72").show()):(n(".actor-img").hide(),n(".voice").hide()):(n(".actor-img").hide(),n(".voice").hide(),n(".logo-72").hide()),n("#main").fullpage({anchors:["","","page3",""],animateAnchor:!1,afterLoad:function(e,a){3==a&&n.fn.fullpage.setAllowScrolling(!0),4==a&&n.fn.fullpage.setAllowScrolling(!0)},onLeave:function(e,a,o){if(3==e&&"up"==o)return!1}}),n.fn.fullpage.setAllowScrolling(!1),n(".start-btn").click(function(){n.fn.fullpage.moveSectionDown()}),n(".avatar-lyf, .avatar-lyf-cartoon").click(function(){n.fn.fullpage.moveSectionDown(),localStorage.setItem("actor",1),n(".actor-img").show().attr("src","./img/lyf_cartoon.png"),n(".voice").show(),n(".logo-72").hide(),l||(s.setAttribute("src","./media/lyf.mp3"),s.play(),l=!0,c(),s.addEventListener("ended",function(){l=!1,c()}))}),n(".avatar-wl, .avatar-wl-cartoon").click(function(){n.fn.fullpage.moveSectionDown(),localStorage.setItem("actor",2),n(".actor-img").show().attr("src","./img/wl_cartoon.png"),n(".voice").show(),n(".logo-72").show(),l||(s.setAttribute("src","./media/wl.mp3"),s.play(),l=!0,n(".voice").addClass("play"),s.addEventListener("ended",function(){l=!1,n(".voice").removeClass("play")}))}),n(".voice").click(function(){switch(localStorage.actor){case"1":l?(n(".voice").removeClass("play"),s.pause(),l=!1):(n(".voice").addClass("play"),s.setAttribute("src","./media/lyf.mp3"),s.play(),l=!0,s.addEventListener("ended",function(){l=!1,n(".voice").removeClass("play")}));break;case"2":l?(n(".voice").removeClass("play"),s.pause(),l=!1):(n(".voice").addClass("play"),s.setAttribute("src","./media/wl.mp3"),s.play(),l=!0,s.addEventListener("ended",function(){l=!1,n(".voice").removeClass("play")}))}}),n(".rule-btn").click(function(){n(".mask").hide(),n(".weui_mask").fadeIn(),n(".rule-mask").fadeIn()}),n(".close-btn").click(function(){n(".weui_mask").fadeOut(),n(".mask").fadeIn()}),function(){n.ajax({type:"GET",url:"http://"+a.apidomain+"/kangshifu/huo-li?mobile="+i,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){0==e.code&&(r=e.data.value,n(".score-num").text(r),t())},error:function(e){console.log("ajaxFailure")}})}();var d={shareTitle:"康师傅绿茶",shareUrl:window.location.href,shareImg:"http://kangshifu.qnmami.com/img/logo.png",shareDes:"康师傅绿茶！"};o.initWxJs("wx8e56a8ebb0688ab9","ksf_greentea",["onMenuShareTimeline","onMenuShareAppMessage"],function(){e.onMenuShareTimeline({title:d.shareTitle,link:d.shareUrl,imgUrl:d.shareImg,success:function(){},cancel:function(){}}),e.onMenuShareAppMessage({title:d.shareTitle,link:d.shareUrl,desc:d.shareDes,imgUrl:d.shareImg,type:"",dataUrl:"",success:function(){},cancel:function(){}})})})});