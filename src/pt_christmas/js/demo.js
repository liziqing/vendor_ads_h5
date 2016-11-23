/**
 * Created by martin on 16/11/23.
 */
define(['jquery', 'hammer', 'velocity'], function ($, Hammer, Velocity) {

    $(function () {
        $("#message_audio")[0].play();

        var hot = document.getElementById('hot_area');
        var swipe = document.getElementById('swipe_hint');
        $hot = $(hot);
        $swipe = $(swipe)
        var manager = new Hammer.Manager(hot);
        var Pan = new Hammer.Pan();
        manager.add(Pan);

        var deltaX = 0;
        var deltaY = 0;
        var swiperDone = false;

        manager.on('panmove', function(e) {
            $('#swipe_hint,#hot_area').removeClass('original');
            var dX = deltaX + (e.deltaX);
            var dY = deltaY + (e.deltaY);
            console.log(dX);
            if(dX > 0 && dX < 240){
                $.Velocity.hook($hot, 'translateX', dX + 'px');
                $.Velocity.hook($swipe, 'translateX', dX + 'px');
            }else if(dX >= 260){
                $.Velocity.hook($hot, 'translateX', '700px');
                $.Velocity.hook($swipe, 'translateX', '700px');
                swiperDone = true;
                $("#lock_audio")[0].play();
                // changeScreen();
            }
        });
        manager.on('panend', function(e) {
            if(!swiperDone){
                $("#swipe_hint").addClass("original");
                $("#hot_area").addClass("original");
            }
        });
    });

});