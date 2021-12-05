$(function(){
    $("html").easeScroll({
        frameRate: 60,
        animationTime: 1000,
        stepSize: 120,
        pulseAlgorithm: 1,
        pulseScale: 8,
        pulseNormalize: 1,
        accelerationDelta: 20,
        accelerationMax: 1,
        keyboardSupport: true,
        arrowScroll: 50,
        touchpadSupport: true,
        fixedBackground: true
    });
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $("html,body").stop().animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 32
        }, 2000,'easeInOutCubic');
    });
    $(".btn_nav, .header ul.nav li a, .body_blur").click(function(){
        $("body").toggleClass("open_nav");
    });
    /*
    $('html').click(function(e) {
        if($(e.target).hasClass("header")){                
            $("body").removeClass("open_nav");
        } 
    });
    */
});
function resize(){
	var window_w = $(window).width(),
	    window_h = $(window).height();
    
    if(!$(".btn_nav").is(":visible")){
        $("#visual").height(window_h);
    }else{
        $("#visual .bg_layer, #visual .bg_layer div.white_wall").attr("style","");
    }
    $("body").removeClass("open_nav");
    
}
window.onresize = resize;
var $bg_01, $bg_02, $bg_03, $bg_04, $bg_05, SH, SE, scroll_per;
$(window).load(function(){
	resize();
    $("html, body").animate({scrollTop: 0}, 1, function(){});
    setTimeout(function(){$("html, body").removeClass("load").animate({scrollTop: 0}, 1, function(){});}, 1000);
    $bg_01 = $(".bg_01"),
    $bg_02 = $(".bg_02"),
    $bg_03 = $(".bg_03"),
    $bg_04 = $(".bg_04"),
    $bg_05 = $(".bg_05");
    $(window).scroll(function(){
        SH = $bg_01.height(),
        SE = $(document).scrollTop();
        if(SE <= 0){
            $(".header").addClass("under").removeClass("fixed");
        }else if(SE > SH/3){
            $(".header").removeClass("under").addClass("fixed");
            $(".gotop").addClass("on");
        }else{
            $(".header").removeClass("fixed").removeClass("under");
            $(".gotop").removeClass("on");
        }
        if(SE > 99){
            $("#reservation").addClass("view");
        }else{
            $("#reservation").removeClass("view");
        }
        if(!$(".btn_nav").is(":visible")){
        scroll_per = SE/SH;
            if(scroll_per <= 1 && SE >= 0){
                $bg_01.css({marginTop: SE * 0.9, filter:"blur("+scroll_per*10+"px)"}).find("div.white_wall").css({opacity: scroll_per * 0.25});
                $bg_02.css({marginTop: SE * 0.5, filter:"blur("+scroll_per*8+"px)"});
                $bg_03.css({marginTop: SE * 0.6, filter:"blur("+scroll_per*6+"px)"}).find("div.white_wall").css({opacity: scroll_per * 0.5});
                $bg_04.css({marginTop: SE * 0.5, filter:"blur("+scroll_per*4+"px)"});
                $bg_05.css({marginTop: SE * 0.3, filter:"blur("+scroll_per*2+"px)"}).find("div.white_wall").css({opacity: scroll_per });
            }else if( SE < 0){
                $("#visual .bg_layer").animate({marginTop: 0},100).css({filter:"blur(0px)"}).find("div.white_wall").animate({opacity: 0},100);
            }
        }
    });
    $("#visual").on("mousemove", function(event){
        if(!$(".btn_nav").is(":visible")){
            var x = event.pageX,
                y = event.pageY,
                w = $(window).width(),
                h = $(window).height(),
                px = (w/2-x),
                py = (h/2-y);
            $(".bg_01").css({transform:"translateX("+px*-0.01+"px) translateY("+py*-0.01+"px)"});
            $(".bg_03").css({transform:"translateX("+px*-0.02+"px) translateY("+py*-0.02+"px)"});
            $(".bg_02,.bg_04").css({transform:"translateX("+px*-0.03+"px) translateY("+py*-0.03+"px)"});
            $(".bg_05").css({transform:"translateX("+px*-0.04+"px) translateY("+py*-0.04+"px)"});
        }
    });
    $("#visual").hover(function (event){
        $(this).removeClass("ani_end");
    },function(){
        $(this).addClass("ani_end");
    });
});