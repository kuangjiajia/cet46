var sub = document.querySelector(".submit");

sub.addEventListener("click",() => {
    //出现过度动画
    load.style.display = "block";

    let openid = getOpenId();
    var name = stu_name.value;
    var id = stu_card.value;
    var dt = {
        "name": name,
        "id": id,
        "openid": openid,
        "type": 3
    }
    // alert(openid);
    // alert(JSON.stringify(dt));
    $.ajax({
        type: 'POST',
        url: "/UserData.php",
        data: dt,
        success: function(res) {
            load.style.display = "none";
            console.log(res);
            alert(JSON.stringify(res))
            window.location.href = "./depositSuccess.html";
        },
        error: function(res) {
            console.log(res);
        },
        dataType: "json"
    });
})