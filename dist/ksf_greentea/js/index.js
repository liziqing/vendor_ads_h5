define(["wx","base/env","base/wx","base/util","jquery","swiper","imgLoadCatch","fullpage"],function(e,o,t,a,n,c){!function(){var e=n(".loading-bar-active"),o=1,t=function(e,o){return Math.floor(Math.random()*(o-e+1)+e)},a=function(){var c=t(10,30);setTimeout(function(){if(window.loaded)return e.css("width","100%"),void n(".percent-num").text("100%");o+=t(1,5),o>98&&(o=98),e.css("width",o+"%"),n(".percent-num").text(o+"%"),a()},c)};a()}(),n(function(){function a(){i>=0&&i<36?(n(".fourth-screen .actor-img-content").addClass("actor-img-content-0"),n(".third-screen .actor-img-content").addClass("actor-img-content-none")):i>=36&&i<72?(n(".third-screen .actor-img-content").addClass("actor-img-content-36"),n(".fourth-screen .actor-img-content").addClass("actor-img-content-none")):i>=72&&(n(".third-screen .actor-img-content").addClass("actor-img-content-72"),n(".fourth-screen .actor-img-content").addClass("actor-img-content-none"))}window.loaded=!0,n(".loading-screen").fadeOut();var c="",i=0,r=!1,l=new Audio;console.log(localStorage),localStorage.mobile&&(c=localStorage.mobile),localStorage.actor?1==localStorage.actor?(n(".actor-img").show().attr("src","./img/lyf_cartoon.png"),n(".voice").show(),n(".logo-72").hide()):2==localStorage.actor?(n(".actor-img").show().attr("src","./img/wl_cartoon.png"),n(".voice").show(),n(".logo-72").show()):(n(".actor-img").hide(),n(".voice").hide()):(n(".actor-img").hide(),n(".voice").hide(),n(".logo-72").hide()),n("#main").fullpage({anchors:["","","page3",""],afterLoad:function(e,o){3==o&&n.fn.fullpage.setAllowScrolling(!0),4==o&&n.fn.fullpage.setAllowScrolling(!0)},onLeave:function(e,o,t){if(3==e&&"up"==t)return!1}}),n.fn.fullpage.setAllowScrolling(!1),n(".start-btn").click(function(){n.fn.fullpage.moveSectionDown()}),n(".avatar-lyf, .avatar-lyf-cartoon").click(function(){n.fn.fullpage.moveSectionDown(),localStorage.setItem("actor",1),n(".actor-img").show().attr("src","./img/lyf_cartoon.png"),n(".voice").show(),n(".logo-72").hide()}),n(".avatar-wl, .avatar-wl-cartoon").click(function(){n.fn.fullpage.moveSectionDown(),localStorage.setItem("actor",2),n(".actor-img").show().attr("src","./img/wl_cartoon.png"),n(".voice").show(),n(".logo-72").show()}),n(".voice").click(function(){switch(localStorage.actor){case"1":r||(l.setAttribute("src","./media/lyf.mp3"),l.play(),r=!0,l.addEventListener("ended",function(){r=!1}));case"2":r||(l.setAttribute("src","./media/wl.mp3"),l.play(),r=!0,l.addEventListener("ended",function(){r=!1}))}}),n(".rule-btn").click(function(){n(".mask").hide(),n(".weui_mask").fadeIn(),n(".rule-mask").fadeIn()}),n(".close-btn").click(function(){n(".weui_mask").fadeOut(),n(".mask").fadeIn()}),function(){n.ajax({type:"GET",url:"http://"+o.apidomain+"/kangshifu/huo-li?mobile="+c,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(e){0==e.code&&(i=e.data.value,n(".score-num").text(i),a())},error:function(e){console.log("ajaxFailure")}})}();var s={shareTitle:"康师傅绿茶",shareUrl:window.location.href,shareImg:"http://kangshifu.qnmami.com/img/logo.png",shareDes:"康师傅绿茶！"};t.initWxJs("wxf19834fcc10552b0","ksf_greentea",["onMenuShareTimeline","onMenuShareAppMessage"],function(){e.onMenuShareTimeline({title:s.shareTitle,link:s.shareUrl,imgUrl:s.shareImg,success:function(){},cancel:function(){}}),e.onMenuShareAppMessage({title:s.shareTitle,link:s.shareUrl,desc:s.shareDes,imgUrl:s.shareImg,type:"",dataUrl:"",success:function(){},cancel:function(){}})})})});