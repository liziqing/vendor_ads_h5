!(function(a,b,c,d,e,f){var g="",h=a.sessionStorage,i="__admaster_ta_param__",j="tmDataLayer"!==d?"&dl="+d:"";
if(a[f]={},a[d]=a[d]||[],a[d].push({startTime:+new Date,event:"tm.js"}),h){var k=a.location.search,
l=new RegExp("[?&]"+i+"=(.*?)(&|#|$)").exec(k)||[];l[1]&&h.setItem(i,l[1]),l=h.getItem(i),
l&&(g="&p="+l+"&t="+ +new Date)}var m=b.createElement(c),n=b.getElementsByTagName(c)[0];m.src="//tag.cdnmaster.cn/tmjs/tm.js?id="+e+j+g,
m.async=!0,n.parentNode.insertBefore(m,n)})(window,document,"script","tmDataLayer","TM-673037","admaster_tm");