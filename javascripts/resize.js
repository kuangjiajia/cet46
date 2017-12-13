var h=$(window).height();
$(window).resize(function() {
    if($(window).height()<h){
        $('footer').hide();
        console.log(123);
    }
    if($(window).height()>=h){
        $('footer').show();
    }
});

$(".warn").on("click",function() {
  console.log($(".remind_mes").css("display"))
  $(".remind_mes").css("display","block");
})

$(".remind_mes").on("click",function() {
  $(".remind_mes").css("display","none");
})
