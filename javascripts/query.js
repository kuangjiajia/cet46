let search = window.location.search;
let index = search.indexOf("=");
let openid = search.substr(index+1);
let maxsize = 4*1024*1024;//2M 
let dt = {
    "openid": openid,
    "type": 1
}




function paramsTojson(url) {
    var json = {}
    var params = url.split("?")[1]
    var props = params.split("&")
    for(var i = 0; i < props.length; i++) {
        var tmp = props[i].split("=")
        json[tmp[0]] = tmp[1]
    }
    return json
}

var json = paramsTojson(window.location.href)
$(".name").innerHTML = json['name']
$(".card").innerHTML = json['card']
$(".total-point").innerHTML = json['sumScore']
$(".listen-point").innerHTML = json['listening']
$(".read-type").innerHTML = json['reading']
$(".write-point").innerHTML = json['writing']



console.log(json)