WXSHARE.config({
    debug: false,
    jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWe,ibo',
        'onMenuShareQZone',
        'chooseImage',
        "uploadImage",
        "previewImage",
        "getLocalImgData",
        "downloadImage"
    ]
});
WXSHARE.ready(function() {
  var option = {
        title: '',
        link: "",
        imgUrl: '',
        desc: '',
        type: '',
        success: function() {
            console.log('');
        },
        cancel: function() {
            console.log('');
        },
    };
  wx.onMenuShareTimeline(option);
  wx.onMenuShareAppMessage(option);
  wx.onMenuShareQQ(option);
  wx.onMenuShareWeibo(option);
  wx.onMenuShareQZone(option);


  wx.checkJsApi({
      jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        console.log(res);
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
  });
});
function fuck() {
    console.log('reds');
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            alert(localIds);
        }
    });
}
