	//图像裁剪层对象
	var cutbox = document.getElementById('cutbox');
	//图像预览层对象
	var prebox = document.getElementById('prebox');
	//图像预览对象
	var preimg = document.getElementById('preimg');
	//图像裁剪数据收集的input对象
	var inp = document.getElementById('imgdata');
	//上传按钮
    var btn = document.querySelector(".upPhoto");
    //姓名
    var stu_name = document.querySelector(".name");
    //证号
    var stu_card = document.querySelector(".card");
    // window.devicePixelRatio
    var load = document.querySelector(".load");
    //submit提交
    var sub = document.querySelector(".submit");
    //裁剪配置信息
    var xxx = document.querySelector(".head .icon");
 	var mkCrop = {
		//图片裁剪确定成功后回调函数
		'back_fnc': back_fnc,
		//裁剪左旋转按钮图片路径
		'leftrimgurl': '../images/left-btn.png',
		//裁剪右旋转按钮图片路径
		'rightrimgurl': '../images/right-btn.png',
		//裁剪完成确定按钮图片路径
		'okrimgsrc': '../images/cut-btn.png',
		//图片裁剪放置在那个dom节点对象里面
		'cropparentdom': cutbox,
		//图片预览dom节点对象
		'preimgdom': preimg,
		//图片裁剪数据信息收集的input对象，如果需要上传的话
		'cropinputdom': inp
	}

 	//自定义选择图像层
 	var selectimgbox = document.getElementById('selectimgbox');
 	//自定义选择图片或者拍照信息
 	var selectimginp = document.getElementById('selectimginp');
 	selectimginp.setAttribute('accept', 'image/*');
 	//文件读取对象


    //当选择文件的时候发生的事情
    function selChange(dom) {
        dom.onchange = function() {
            // if()
            let size = this.files[0].size / (1024 * 1024); //获取图片大小
            let imgType = this.files[0].type.slice(this.files[0].type.indexOf("/") + 1); //获取图片的种类
            //限制图片等格式
            if (imgType === "png" || imgType === "jpeg" || imgType === "bmp" || imgType === "jpg") {
                //限制图片大小
                if(size > 4) {
                    alert("上传的文件过大")
                }else{
                    var reader = new FileReader();
                    selectimgbox.style.display = 'none';
                    // prebox.style.display = "block";
                    reader.onload = function() {
                        mkCrop.imgsrc = this.result;
                        //初始化裁剪数据
                        initMkgoCrop(mkCrop);
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            }else{
                alert("图片的格式不对");
            }
        }
    }
    selChange(selectimginp);
	 //点击上传照片按钮发生的事情
	function upLoad(dt,res) {
		btn.addEventListener("click",function() {
            load.style.display = "block";
            $.ajax({
                type: 'POST',
                url: "/photoToWords.php",
                data: dt,
                success: function(res) {
                    load.style.display = "none";
                    if(res.status === 200){
                        console.log(res);
                        let data = res.data;
                        let cet_name = data.name;
                        let cet_id = data.examID;
                        stu_name.value = cet_name;
                        stu_card.value = cet_id;
                    }else{
                        alert("mdzz");
                    }
                },
                error: function(res) {
                    console.log(res);
                },
                dataType: "json"
            });
            prebox.style.display = "none";
            selectimgbox.style.display = "block";
            inp.value = "";
		})
	}

	//确定裁剪（裁剪完成回调函数）
	function back_fnc(res) {
		//隐藏裁剪层
		cutbox.innerHTML = '';
		//显示预览层
		prebox.style.display = 'block';
        setTimeout(() => {
            preimg.style.width = document.body.clientWidth + "px";
        },0)
        registLogin();
        //获取openid
        let openid = getOpenId();
        let maxsize = 4*1024*1024;//2M 
        let dt = {
            "openid": openid,
            "picture": res
        }
        upLoad(dt,res);
    }

    function getOpenId() {
        let search = window.location.search;
        let index = search.indexOf("=");
        let openid = search.substr(index+1);
        return openid;
    }

    var takePhoto = document.querySelector(".take-photo");
    function registLogin() {
        var selectimginp = document.getElementById("selectimginp");
        takePhoto.removeChild(selectimginp);
        createEle();
    }
    //创建一个新的file，防止第二次ajax点击失效
    function createEle() {
        var selectimginp = document.createElement("input");
        selectimginp.setAttribute("id","selectimginp");
        selectimginp.setAttribute("type","file");
        selectimginp.setAttribute("capture","camera");
 	    selectimginp.setAttribute('accept', 'image/*');

        selChange(selectimginp);
        takePhoto.appendChild(selectimginp);
    }

    sub.addEventListener("click",() => {
        //出现过度动画
        let openid = getOpenId();
        var name = stu_name.value;
        var id = stu_card.value;
        type = xxx ? 2 : 3;
        // alert(type);
        toUrl = xxx ? "./modifySuccess.html" :"./depositSuccess.html";
        var dt = {
            "name": name,
            "id": id,
            "openid": openid,
            "type": type
        }
        alert(dt);
        // alert(openid);
        // alert(JSON.stringify(dt));
        $.ajax({
            type: 'POST',
            url: "/UserData.php",
            data: dt,
            success: function(res) {
                console.log(res);
                alert(JSON.stringify(res))
                window.location.href = toUrl;
            },
            error: function(res) {
                console.log(res);
            },
            dataType: "json"
        });
    })


