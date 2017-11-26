
let nowUrl =  decodeURI(window.location.search);
function param(url) {
    const index = url.indexOf("?");
    let str = url.slice(index+1);
    let json = str.split("&");
    let obj = {};
    for(var i = 0 ; i < json.length; i++){
        obj[json[i].slice(0,json[i].indexOf("="))] = json[i].slice(json[i].indexOf("=")+1);
    }
    return obj;
}

let message = param(nowUrl);
alert(JSON.stringify(message));

// $.ajax({
//     type: 'GET',
//     url: "/UserData.php",
//     data: dt,
//     success: function(res) {
        
//     },
//     error: function(res) {
//         console.log(res);
//     },
//     dataType: "json"
// });