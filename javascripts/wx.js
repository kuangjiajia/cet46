// let wx_wheel = {
//     connect_wx(json) {
//         ajax({
//             url: json.url,
//             type: json.type,
//             data: json.data,
//         }).then((dt) => {
//             let success = json.success;
//             wx.config({
//                 debug: true,
//                 appId: result.appId,
//                 timestamp: result.timestamp,
//                 nonceStr: result.nonceStr, 
//                 signature: result.signature,
//                 jsApiList: ["chooseImage", "previewImage", "uploadImage", "downloadImage"] //需要的接口列表
//             })
//         })
//     },
//     ready() {
//         wx.ready(() => {
//             console.log("success");
//         })
//     },
//     error() {
//         wx.error(() => {
//             console.log("error");
//         })
//     },
//     checkApi(list) {
//         wx.checkJsApi({
//             jsApiList: list, // 需要检测的JS接口列表，所有JS接口列表见附录2,
//             success: function(res) {
//                 console.log(res);
//             }
//         });
//     },
//     chooseImage(json) {
//         wx.chooseImage({
//             count: 1, // 默认9
//             sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//             sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//             success: function (res) {
//                 var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//             }
//         });
//     }
// }