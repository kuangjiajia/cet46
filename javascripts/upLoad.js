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
    
    // window.devicePixelRatio
    console.log(preimg);
    preimg.style.width = window.clientX + "px";
    // preimg.style.width = window.client;
    //裁剪配置信息
    
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
 	selectimginp.onchange = function() {
        console.log(123);
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
	
	 //点击上传照片按钮发生的事情
	function upLoad(res) {
		btn.addEventListener("click",function() {
            prebox.style.display = "none";
            selectimgbox.style.display = "block";
            inp.value = "";
		})
	}

	//确定裁剪（裁剪完成回调函数）
	function back_fnc(res) {
		//隐藏裁剪层
		// cutbox.style.display = 'none';
		cutbox.innerHTML = '';

		//显示预览层
		prebox.style.display = 'block';
        setTimeout(() => {
            preimg.style.width = document.body.clientWidth + "px";
            console.log(document.body.clientWidth);
        },0)
        registLogin();
        let search = window.location.search;
        let index = search.indexOf("=");    
        let openid = search.substr(index+1);
        // console.log(openid);
        let dt = {
            "openid": openid,
            "picture": res  
        }
        upLoad(dt);       
        // $.ajax({
        //     type: 'POST',
        //     url: "/photoToWords.php",
        //     data: JSON.stringify(dt)
        //     success: function(res) {
        //         console.log(res);
        //         console.log(123123);
        //     },
        //     error: function(res) {
        //         console.log(res);
        //     },
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json"
        // }); 
        // console.log(dt);
	    // console.log(res);
        ajax({
            type: "post",
            url: "/photoToWords.php",
            // contentType: "json",
            data: {
                "openid": openid,
                "picture": res 
            }
        }).then((res) => {
            console.log(res);
            // alert(res);
        })
        //图片大小限制
    }
    
    var takePhoto = document.querySelector(".take-photo");
    function registLogin() {
        var selectimginp = document.getElementById("selectimginp");
        takePhoto.removeChild(selectimginp);
        createEle();
    }
    //创建一个新的file，防止第二次点击失效
    function createEle() {
        var selectimginp = document.createElement("input");
        selectimginp.setAttribute("id","selectimginp");
        selectimginp.setAttribute("type","file");
        selectimginp.setAttribute("capture","camera");
 	    selectimginp.setAttribute('accept', 'image/*');
        selectimginp.onchange = function() {
            var reader = new FileReader();
            console.log(123);
            selectimgbox.style.display = 'none';
            // prebox.style.display = "block";
            reader.onload = function() {
                 mkCrop.imgsrc = this.result;
                 //初始化裁剪数据
                initMkgoCrop(mkCrop);
             }
            reader.readAsDataURL(this.files[0]);	
        }
        takePhoto.appendChild(selectimginp);
    }