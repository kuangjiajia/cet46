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
