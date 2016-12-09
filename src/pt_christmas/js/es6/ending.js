/**
 * Created by Jenny on 16/12/9.
 */
define(['jquery'],function($){

    $(() =>{


        //视频播放
        $('.video-btn').on('click',function(){
            $('#zj-xn-video')[0].play();
            $('#zj-xn-video')[0].webkitRequestFullScreen();
        });
        //商品跳转链接
        $('.commodity1').on('click',function(){
            window.location.href='https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w11740123-15089746887.11.6u1T6c&id=44620240912&skuId=3244661233131';
        });
        $('.commodity2').on('click',function(){
            window.location.href='https://detail.tmall.com/item.htm?spm=a1z10.5-b-s.w4011-14658579317.165.bwjTGk&id=520531201728&rn=a9b52c882f18d0280d651f930befa2a2&abbucket=15&skuId=3216300326649';
        });
        $('.commodity3').on('click',function(){
            window.location.href='https://detail.tmall.com/item.htm?id=537961608104';
        });
        $('.commodity4').on('click',function(){
            window.location.href='https://detail.tmall.com/item.htm?spm=a1z10.5-b.w4011-9954919894.70.Zh6s1k&id=41842497990&rn=c9cca3872c049e6075fe0367ae07ac82&abbucket=15&skuId=88293510462';
        });
        $('.commodity5').on('click',function(){
            window.location.href='https://detail.tmall.com/item.htm?spm=a1z10.3-b-s.w4011-14465444976.71.MpyA1q&id=542642696842&rn=2fe99c55dea93a08c1bca95a67d5a341&abbucket=15&skuId=3426395254344';
        });
        $('.commodity6').on('click',function(){
            window.location.href='https://detail.tmall.com/item.htm?id=542618521966';
        });
        $('.commodity7').on('click',function(){
            window.location.href='https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.17.hbiD7i&id=535816431616&skuId=3198270053232&user_id=673558948&cat_id=2&is_b=1&rn=90aa985e4df1601558860bc912174054 ';
        });
        $('.commodity8').on('click',function(){
            window.location.href='https://detail.tmall.com/item.htm?spm=a1z10.3-b-s.w4011-14768600827.141.GGBeTh&id=528076652144&rn=da0fcb7c5161ac69742059aeb91970bf&abbucket=3';
        });
        //关注
        $('.attention').on('click',function(){
            //window.location.href='';
        });
    });

});
