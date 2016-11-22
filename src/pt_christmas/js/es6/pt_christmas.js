/**
 * Created by martin on 16/11/21.
 */
define(['jquery']
    , function($) {
        $(() => {
            let timer;
            let animateAble = true;
            let chatIndex = 0;
            let chatLength = $(".chat-list li").length;


            setTimeout(() => {
                displayChat();
                timer = setInterval(displayChat,1000);
            },1000);


            function displayChat(){
                if(animateAble && (chatIndex < chatLength)){
                    $(".chat-list li").eq(chatIndex).addClass("active").siblings().removeClass("active");
                    $(".chat-list li").eq(chatIndex).show();
                    scrollChat();
                    chatIndex++;
                    if(chatIndex == chatLength){
                        clearInterval(timer);
                    }
                }
            }

            function scrollChat(){
                var height = $(".chat-list")[0].scrollHeight;
                $(".chat-list").animate({scrollTop:height},800);
            }
            //视频结束
            function videoEnded(){
                setTimeout(function(){
                    animateAble = true;
                    displayChat();
                    timer = setInterval(displayChat,4000);
                },500)

            }


            $(".yuyin-image").click(function(){
                animateAble = false;
                clearInterval(timer);
            })




        });


    });
