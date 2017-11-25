let search = window.location.search;
let index = search.indexOf("=");
let openid = search.substr(index+1);
let maxsize = 4*1024*1024;//2M 
let dt = {
    "openid": openid,
    "type": 1
}
alert(JOSN.stringify(search));
// alert(openid);
// $.ajax({
//     type: 'POST',
//     url: "/UserData.php",
//     data:dt,
//     success: function(res) {
//         // console.log(res);
//         // let data = res.data;
//         // console.log(data);
//         // let cet_name = data.name;
//         // let cet_id = data.examID;
//         // stu_name.value = cet_name;
//         // stu_card.value = cet_id;
//         console.log(res);
//         // alert(openid);
//     },
//     error: function(res) {
//         console.log(res);
//     },
//     // contentType: "application/json; charset=utf-8",
//     dataType: "json"
// });