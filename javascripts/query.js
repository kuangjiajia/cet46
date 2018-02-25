let search = window.location.search;
let index = search.indexOf("=");
let openid = search.substr(index+1);
let maxsize = 4*1024*1024;//2M 
let dt = {
    "openid": openid,
    "type": 1
}

$.ajax({
    type: "get",
    url: "/cet.php",
    success: function(data) {
        console.log()
    },
    dataType: "json",
    data: {
        name: "杨俊逸",

    }
})
