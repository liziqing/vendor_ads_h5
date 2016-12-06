/**
 * Created by Administrator on 2016/12/5.
 */

define(['jquery'], function($) {
      $(() => {



          let descIndex=0;
          let descLength=$('.desc-line').length;
          let timer;



          $('.pt-logo').fadeIn();

          setTimeout(function(){
              displayDesc();
              timer = setInterval(displayDesc,2000);
          },1000);
          function displayDesc(){
              if(descIndex < descLength){
                  $('.desc-line').eq(descIndex).fadeIn();
                  descIndex++;
                  if(descIndex === descLength){
                      clearInterval(timer);
                      setTimeout(function(){
                          $('.content-wrapper').fadeIn();
                      },2000)
                  }
              }
          }
      });
});
