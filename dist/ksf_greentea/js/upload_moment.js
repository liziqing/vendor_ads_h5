define(["wx","base/env","base/wx","base/util","jquery","swiper"],function(a,e,o,t,n,i){n(function(){function i(){var a=document.getElementById("userfile"),e=document.getElementById("preview-box");return a.files&&a.files[0]&&n(e).attr("src",window.URL.createObjectURL(a.files[0])),!0}function r(a,o,t){n.ajax({type:"GET",url:"http://"+e.apidomain+"/kangshifu/image-up",data:{type:a,mobile:o,url:t,random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(a){console.log(localStorage),n(".mask").hide(),n(".share-mask").fadeIn()},error:function(a){console.log("ajaxFailure")}})}var s="",c=!0;console.log(localStorage),localStorage.mobile&&(s=localStorage.mobile),localStorage.actor?1==localStorage.actor?n(".actor").show().attr("src","./img/lyf_cover.png"):2==localStorage.actor?n(".actor").show().attr("src","./img/wl_cover.png"):n(".actor").hide():n(".actor").hide();var l=n("#key"),u=n("#userfile"),m="",p="http://vendor-ads.cdnqiniu02.qnmami.com/";!function(){n.ajax({type:"GET",url:"http://"+e.apidomain+"/kangshifu/qn-token",data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(a){0==a.code&&n('input[name="token"]').val(a.data.token)},error:function(a){console.log("ajaxFailure")}})}(),function(){n.ajax({type:"GET",url:"http://"+e.apidomain+"/kangshifu/image-list?type=2",data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(a){if(0==a.code)for(var e=0;e<a.data.list.length;e++)n("#wall").append('<img src="'+a.data.list[e]+'">')},error:function(a){console.log("ajaxFailure")}})}(),function(){n.ajax({type:"GET",url:"http://"+e.apidomain+"/kangshifu/image-list?type=1&mobile="+s,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(a){if(0==a.code&&0==a.data.list.length)return void(c=!1)},error:function(a){console.log("ajaxFailure")}})}(),n("#userfile").change(function(){n(".mask").hide(),n(".upload-mask").show(),i(),setTimeout(function(){n(".preview-box-cover").css({width:n("#preview-box").css("width"),height:n("#preview-box").css("height")})},100)}),n("#upload").click(function(){if(!u.val())return!1;var a=Math.random().toString(36).substr(2)+u.val().match(/\.?[^.\/]+$/);l.val(a);var e=new FormData(document.getElementById("upform"));return n.ajax({url:"http://upload.qiniu.com/",type:"POST",data:e,processData:!1,contentType:!1,xhr:function(){return myXhr=n.ajaxSettings.xhr(),myXhr.upload&&myXhr.upload.addEventListener("progress",function(a){if(a.lengthComputable){a.loaded,a.total}},!1),myXhr},success:function(a){var e="<span>已上传："+a.key+"</span>";e+='<img src="'+p+a.key+'"/>',console.log(p+a.key),m=p+a.key,s?r(2,s,m):(n(".mask").hide(),n(".tel-mask").fadeIn())},error:function(a){console.log("失败:"+JSON.stringify(a))}}),!1}),n("#submit").click(function(){var a=n("#telephone").val().trim();t.isMobile(a)&&(localStorage.setItem("mobile",a),r(2,a,m))}),n("#myUp").click(function(){c?window.location.href="./album.html":t.alerty("您还没有上传照片，先去拍一张吧！")}),n(".share-btn").click(function(){n(".weui_mask").fadeIn(),n.ajax({type:"GET",url:"http://"+e.apidomain+"/kangshifu/have-share?mobile="+s,data:{random:Math.random(),format:"jsonp"},dataType:"jsonp",jsonp:"callback",success:function(a){a.code},error:function(a){console.log("ajaxFailure")}})}),n(".weui_mask").click(function(){n(this).fadeOut()});var d={shareTitle:"康师傅绿茶！",shareUrl:"http://kangshifu.qnmami.com",shareImg:"http://kangshifu.qnmami.com/img/slogan.png",shareDes:"康师傅绿茶！"};o.initWxJs("wx8e56a8ebb0688ab9","pt_christmas",["onMenuShareTimeline","onMenuShareAppMessage"],function(){a.onMenuShareTimeline({title:d.shareTitle,link:d.shareUrl,imgUrl:d.shareImg,success:function(){},cancel:function(){}}),a.onMenuShareAppMessage({title:d.shareTitle,link:d.shareUrl,desc:d.shareDes,imgUrl:d.shareImg,type:"",dataUrl:"",success:function(){},cancel:function(){}})})})});