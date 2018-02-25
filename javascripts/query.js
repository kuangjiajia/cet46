function paramsTojson(url) {
    var json = {}
    var params = decodeURI(url.split("?")[1])
    var props = params.split("&")
    for(var i = 0; i < props.length; i++) {
        var tmp = props[i].split("=")
        json[tmp[0]] = tmp[1]
    }
    return json
}

var json = paramsTojson(window.location.href)
$(".name").html(json['name'])
$(".card").html(json['card'])
$(".total-point").html(json['sumScore'])
$(".listen-point").html(json['listening'])
$(".read-type").html(json['reading'])
$(".write-point").html(json['writing'])



console.log(json)