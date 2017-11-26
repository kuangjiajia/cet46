
let nowUrl = decodeURIComponent(window.location.search);
function param(json) {
    let json = str.split("&");
    let obj = {};
    for(var i = 0 ; i < json.length; i++){
        obj[json[i].slice(0,json[i].indexOf("="))] = json[i].slice(json[i].indexOf("=")+1);
    }
    return obj;
}

let message = param(nowUrl);
alert(JSON.stringify(message));

var stu_name = document.querySelector(".name");
//证号
var stu_card = document.querySelector(".card");
let cet_name = data.name;
let cet_id = data.examID;
stu_name.value = cet_name;
stu_card.value = cet_id;

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