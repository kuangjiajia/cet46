$.ajax({
    type: 'POST',
    url: "/UserData.php",
    // data: dt,
    success: function(res) {
        // console.log(res);
        // let data = res.data;
        // console.log(data);
        // let cet_name = data.name;
        // let cet_id = data.examID;
        // stu_name.value = cet_name;
        // stu_card.value = cet_id;
        console.log(res);
    },
    error: function(res) {
        console.log(res);
    },
    // contentType: "application/json; charset=utf-8",
    dataType: "json"
});