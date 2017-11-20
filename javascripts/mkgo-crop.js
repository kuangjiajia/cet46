//文件名：mkgo-crop.js
//文件说明：马可波罗旅行html5移动端图片裁剪
//作者：qizexi
//邮箱：qizexi@163.com
//公司：马可波罗旅行
//网址：www.mkgo.cn
//微信服务号:mkgo-cn
//由来：项目需要用到裁剪技术，对用户的图像进行裁剪
//		但是尝试了网上的一些图片裁剪的开源项目
//		都不是很理想，要么存在安卓，ios系统的兼容
//		问题，要么就是有些手机上面存在压扁的问题，
//		所以最后决定使用html5+canvas来开发，目前
//		版本代码比较粗糙，但是裁剪方面是完美的。
//特点：支持移动，缩放，旋转
//使用方式：
// 		var mkCrop = {
			//图片地址
//			'imgsrc': imgsrc,
//			//图片裁剪后上传的路径
			//图片裁剪确定成功后回调函数
//			'back_fnc': back_fnc,
			//裁剪左旋转按钮图片路径
//			'leftrimgurl': leftrimgurl,
			//裁剪右旋转按钮图片路径
//			'rightrimgurl': rightrimgurl,
			//裁剪完成确定按钮图片路径
//			'okrimgsrc': okrimgsrc,
			//图片裁剪放置在那个dom节点对象里面
//			'cropparentdom': cropparentdom,
			//图片预览dom节点对象
//			'preimgdom': preimgdom,
//			//图片裁剪数据信息收集的input对象
//			'cropinputdom': cropinputdom
//		}
//		initMkgoCrop(mkCrop);

function initMkgoCrop(mkCrop) {
	//屏幕大小
	var screenW = getScreenAvailW(); //获取屏幕宽度
	var screenH = getScreenAvailH(); //获取屏幕高度
	
	//背景画布
	var bCObj = createCasObj(); //创建背景画布
	//裁剪画布
	var cCObj = createCasObj(); //创建裁剪画布
	//裁剪图像操作按钮
	var btnObj = createButtonBox(); 
	//旋转的角度
	var cangle = 0;
	
	//定义一个图像对象
	var CropImage = {
		//图像src地址
		'imgsrc': '', 
		//图像对象
		'image': null,
		//裁剪图像的初始x坐标
		'initx' : 0,
		//裁剪图像的初始y坐标
		'inity' : 0,
		//图像的实时x坐标
		'curx': 0,
		//图像的实时y坐标
		'cury': 0,
		//图像的实时临时x坐标
		'tmp_curx': 0,
		//图像的实时临时y坐标
		'tmp_cury': 0,
		//裁剪图像的原始宽度
		'naturalW' : 0,
		//裁剪图像的原始高度
		'naturalH' : 0,
		//裁剪图像的显示的起始宽度
		'initsw' : 0,
		//裁剪图像的显示的起始高度
		'initsh' : 0,
		//裁剪图像的当前显示的宽度
		'csw' : 0,
		//裁剪图像的当前显示的高度
		'csh' : 0,
		//裁剪图像的当前显示的临时宽度
		'tmp_csw': 0,
		//裁剪图像的当前显示的临时高度
		'tmp_csh': 0,
		//加载图像函数
		'initImage': initImage,
		//图像自动运动（归位）
		'autoMove': null,
	}
	
	//如果外层mkCrop.cropparentdom没有画布宽
	if (mkCrop.cropparentdom.width < screenW) {
		mkCrop.cropparentdom.style.width = screenW;
	}
	//如果外层mkCrop.cropparentdom没有画布高
	if (mkCrop.cropparentdom.height < screenW) {
		mkCrop.cropparentdom.style.height = screenH;
	}
	
	//清空裁剪层里面的数据
	mkCrop.cropparentdom.innerHTML = '';
	
	//设置背景画布的css
	setCasCss(bCObj.cas, screenW, screenH, 
		{'position': 'absolute', 'top': '0px', 'left': '0px'});
	//添加背景画布到body里面
	appendChild(mkCrop.cropparentdom, bCObj.cas);
	//获取裁剪画布的中心位置
	var cxyobj = getCasCenter(bCObj.cas);
	bCObj.cas.x = -cxyobj.cx;
	bCObj.cas.y = -cxyobj.cy;
	//平移坐标原点到画布中心
	bCObj.c2d.translate(cxyobj.cx, cxyobj.cy);
	//画出背景矩形
	fillRect(bCObj.c2d, {'fillStyle': '#000000'}, bCObj.cas.x, bCObj.cas.y, screenW, screenH);
	
	//设置裁剪画布的css
	setCasCss(cCObj.cas, screenW, screenH, 
		{'position': 'absolute', 'top': '0px', 'left': '0px'});
	//添加裁剪画布到body里面
	appendChild(mkCrop.cropparentdom, cCObj.cas);
	//画出背景矩形
	fillRect(cCObj.c2d, {'fillStyle': '#000000', 'globalAlpha': 0.5}, 0, 0, screenW, screenH);
	//获取裁剪画布的中心位置
	var cxyobj = getCasCenter(cCObj.cas);
	cCObj.cas.x = cxyobj.cx - cxyobj.zleng/2;
	cCObj.cas.y = cxyobj.cy - cxyobj.zleng/2;
	cCObj.cas.zleng = cxyobj.zleng;
	//剪辑掉裁剪画布的中心位置
	clearRect(cCObj.c2d, cCObj.cas.x, cCObj.cas.y, cxyobj.zleng, cxyobj.zleng);
	//给裁剪掉的区域画一个边框
	strokeRect(cCObj.c2d, {'strokeStyle': '#FFFFFF'}, 
		cCObj.cas.x, cCObj.cas.y, cxyobj.zleng, cxyobj.zleng);
		
	//加载待裁剪的图像
	CropImage.initImage(bCObj.c2d, mkCrop.imgsrc);
	
	//创建裁剪相关按钮的dom信息
	appendChild(mkCrop.cropparentdom, btnObj.btndiv);
	appendChild(btnObj.btndiv, btnObj.leftbtn);
	appendChild(btnObj.btndiv, btnObj.rightbtn);
	appendChild(btnObj.btndiv, btnObj.cutbtn);
	//设置裁剪编辑按钮层的css
	setCasCss(btnObj.btndiv, '', '', 
		{'position': 'absolute', 'top': (screenH-49)+'px', 'left': '0px', 'width': screenW+'px', 'height': '43px', 'paddingTop': '3px', 'backgroundColor': '#000000', 'textAlign': 'center', 'opacity': 0.5, 'zIndex': 2});
	//设置左旋按钮css
	setCasCss(btnObj.leftbtn, '', '', 
		{'width': '40px', 'height': '40px', 'display': 'inline-block', 'marginRight': '30px'});
	//设置左旋按钮css
	setCasCss(btnObj.rightbtn, '', '', 
		{'width': '40px', 'height': '40px', 'display': 'inline-block', 'marginRight': '30px'});
	//设置确定裁剪按钮css
	setCasCss(btnObj.cutbtn, '', '', 
		{'width': '40px', 'height': '40px', 'display': 'inline-block', 'marginRight': '30px'});
		
	//设置按钮的图片url
	btnObj.leftbtn.setAttribute('src', mkCrop.leftrimgurl);
	btnObj.leftbtn.setAttribute('btntype', 'left');
	btnObj.rightbtn.setAttribute('src', mkCrop.rightrimgurl);
	btnObj.rightbtn.setAttribute('btntype', 'right');
	btnObj.cutbtn.setAttribute('src', mkCrop.okrimgsrc);
	
	//滚动到底部
	window.scrollTo(0, screenH);
	
	//移动，缩放时间事件注册
	addEvent(cCObj.cas, 'touchstart', touch);
	addEvent(cCObj.cas, 'touchmove', touch);
	addEvent(cCObj.cas, 'touchend', touch);
	//左旋转注册
	addEvent(btnObj.leftbtn, 'click', changeAngle);
	addEvent(btnObj.leftbtn, 'dbclick', disevent);
	//右旋转注册
	addEvent(btnObj.rightbtn, 'click', changeAngle);
	addEvent(btnObj.rightbtn, 'dbclick', disevent);
	//确定裁剪注册
	addEvent(btnObj.cutbtn, 'click', okcut);
	addEvent(btnObj.cutbtn, 'dbclick', disevent);
	
	//创建裁剪的操作按钮（左旋转，右旋转，确定）
	function createButtonBox() {
		//按钮层
		var btndiv = document.createElement('div');
		//左旋转按钮
		var leftbtn = document.createElement('img');
		//右旋转按钮
		var rightbtn = document.createElement('img');
		//裁剪按钮
		var cutbtn = document.createElement('img');
		
		return {'btndiv': btndiv, 'leftbtn': leftbtn, 'rightbtn': rightbtn, 'cutbtn': cutbtn};
	}
	
	//创建画布canvas的dom对象
	//return josnobj {'cas'=>canvas_obj, 'c2d'=>content_2d}
	function createCasObj() {
		cas = document.createElement('canvas');
		c2d = cas.getContext('2d');
		
		var obj = {'cas': cas, 'c2d': c2d}
		return obj;
	}
	
	//设置画布的信息
	//casObj 画布的dom对象
	//width 画布的width
	//height 画布的height
	//cssJson 画布的css信息，如{'position': 'absolute', 'top': '0px'}
	function setCasCss(casObj, width, height, cssJson){
		var ratio = window.devicePixelRatio || 1;

		// if (width) {
		// 	casObj.setAttribute('width', width);
		// }
		// if (height) {
		// 	casObj.setAttribute('height', height);
		// }

		var oldWidth = width || window.clientWidth;
        var oldHeight = height || window.clientHeight;

        casObj.width = oldWidth * ratio;
        casObj.height = oldHeight * ratio;

        casObj.style.width = oldWidth + 'px';
        casObj.style.height = oldHeight + 'px';
		for (var key in cssJson) {
			casObj['style'][key] = cssJson[key];
		}
	}
	
	//画实心矩形
	//c2d 画布的context_2d对象
	//attrObj 矩形的属性 如{'fillStyle': '#000000', 'globalAlpha': 0.3}
	//x 矩形x坐标
	//y 矩形y坐标
	//width 矩形的宽度
	//height 矩形的高度
	function fillRect(c2d, attrObj, x, y, width, height) {
		for (var key in attrObj) {
			c2d[key] = attrObj[key];
		}
		c2d.fillRect(x, y, width, height);
	}
	
	//y 矩形y坐标
	//c2d 画布的context_2d对象
	//attrObj 矩形的属性 如{'fillStyle': '#000000', 'globalAlpha': 0.3}
	//x 矩形x坐标
	//y 矩形y坐标
	//width 矩形的宽度
	//height 矩形的高度
	function strokeRect(c2d, attrObj, x, y, width, height) {
		for (var key in attrObj) {
			c2d[key] = attrObj[key];
		}
		c2d.strokeRect(x, y, width, height);
	}
	
	//清除出一个矩形区域
	//c2d 画布的context_2d对象
	//x 矩形x坐标
	//y 矩形y坐标
	//width 矩形的宽度
	//height 矩形的高度
	function clearRect(c2d, x, y, width, height) {
		c2d.clearRect(x, y, width, height);
	}
	
	//画布背景的重新绘制
	function reDrawBg(obj) {
		//清除画布
		clearRect(obj.c2d, obj.cas.x, obj.cas.y, obj.cas.width, obj.cas.height);
		//重新绘制画布
		fillRect(obj.c2d, {}, obj.cas.x, obj.cas.y, obj.cas.width, obj.cas.height);
	}
	
	//获取画布的中心位置
	//casobj 画布的DOM对象
	function getCasCenter(casobj) {
		var width = casobj.width;
		var height = casobj.height;
		
		//去除一个合适正方形,去掉2个像素的左右或者上下边框
		var zleng = 0;
		var nwidth = width - 2;
		var nheight = height - 2;
		//高度大于宽度，就以宽带为正方形的边长
		if (nheight >= nwidth) {
			zleng = nwidth;
		}
		//否则，高度为正方形的边长
		else {
			zleng = nheight;
		}
		
		return {'cx': width/window.devicePixelRatio, 'cy': height/window.devicePixelRatio, 'zleng': zleng};
	}
	
	//加载图像信息
	//初始化裁剪的图像
	//画布的context_2d对象
	//imgsrc 图像的url地址
	function initImage(c2d, imgsrc) {
		var _this = this;
		_this.imgsrc = imgsrc;
		//获取裁剪框的信息
		var cxyobj = getCasCenter(cCObj.cas);
		
		//显示图像的大小
		_this.initsw = cxyobj.zleng;
		_this.csw = _this.initsw;
		_this.tmp_csw = _this.initsw;
		
		//创建img对象
		_this.image = document.createElement('img');
		//_this.image = new Image();
		//_this.image.crossOrigin = "Anonymous";
		_this.image.setAttribute('src', _this.imgsrc);
		//_this.image.setAttribute('crossOrigin', 'Anonymous');
		
		_this.image.onload = function() {
			//源图像大小
			if (this.naturalWidth && this.naturalHeight) {
				_this.naturalW = parseInt(this.naturalWidth);
				_this.naturalH = parseInt(this.naturalHeight);
			}
			else {
				_this.naturalW = parseInt(this.width);
				_this.naturalH = parseInt(this.height);
			}
			
			//等比例缩放，宽度为屏幕宽度，缩放图像的高度
			_this.initsh = scaleImage(_this.naturalW, _this.naturalH, _this.csw, '', 'width');
			_this.csh = _this.initsh;
			_this.tmp_csh = _this.initsh;
			
			//显示图像坐标信息
			_this.initx = -_this.csw/window.devicePixelRatio;
			_this.curx = _this.initx;
			_this.tmp_curx = _this.initx;
			_this.inity = -_this.csh/window.devicePixelRatio;
			_this.cury = _this.inity;
			_this.tmp_cury = _this.inity;
			
			//绘制图片
			drawImage(bCObj);
		}
		
		//_this.image.src = _this.imgsrc;
		//if ( _this.image.complete || _this.image.complete === undefined ) {
		//	_this.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		//	_this.image.src = _this.imgsrc;
		//}
	}
	
	//加载图像
	//obj 背景画布对象{'cas'=>canvas_dom, 'c2d'=>context2d}
	//x 传入图片的x坐标
	//y 传入图片的y坐标
	//w 传入图片的宽
	//h 传入图像的高
	function drawImage(obj, x, y, w, h) {
		//图像中心位置
		var curx = CropImage.curx;
		var cury = CropImage.cury;
		//有传入x，y坐标就以这个为准
		if (x && y) {
			curx = x;
			cury = y;
		}
		else {
			CropImage.tmp_curx = CropImage.curx;
			CropImage.tmp_cury = CropImage.cury;
		}
		
		var csw = CropImage.csw;
		var csh = CropImage.csh;
		//有传入图像宽和高，就以传入的为准
		if (w && h) {
			csw = w;
			csh = h;
		}
		//旋转角度(弧度)
		var angle = cangle * Math.PI / 180;
		
		c2d = obj.c2d;
		
		c2d.save();
		
		//重新绘制画布背景
		reDrawBg(obj);
	
		//旋转图形
		c2d.rotate(angle);
		//绘制图片
		c2d.drawImage(CropImage.image, curx, cury, csw, csh);
		
		c2d.restore();
	}
	
	//时间注册函数
	//obj dom对象
	//ename 事件名称
	//时间处理函数
	function addEvent(obj, ename, func) {
		obj.addEventListener(ename, func, false);
	}
	
	//触摸点1到图像的x坐标
	var tx = 0;
	//触摸点1图像的y坐标
	var ty = 0;
	//触摸点2到图像的x坐标
	var tx1 = 0;
	//触摸点2图像的y坐标
	var ty1 = 0;
	//触摸事件结束（可能是两个手指的其中一个结束）
	var istouchend = false;
	
	//触摸事件处理函数
	function touch (event) {
		var event = event || window.event;
		switch(event.type) {
			case "touchstart":
				event.preventDefault();
				//触摸点1的起始点
				tx = event.touches[0].clientX;
				ty = event.touches[0].clientY;
				//触摸点2的起始点
				if (event.touches.length >= 2) {	
					tx1 = event.touches[1].clientX;
					ty1 = event.touches[1].clientY;
				}
				istouchend = false;
				
				return false;
				break;
			case "touchend":
				event.preventDefault();
				CropImage.curx = CropImage.tmp_curx;
				CropImage.cury = CropImage.tmp_cury;
				CropImage.csw = CropImage.tmp_csw;
				CropImage.csh = CropImage.tmp_csh;
				//CropImage.autoMove(cjW, cjH);
				istouchend = true;
				return false;
				break;
			case "touchmove":
				event.preventDefault();
				var tnum = parseInt(event.touches.length);
				
				//触摸点1当前x，y坐标
				tmp_tx = event.touches[0].clientX;
				tmp_ty = event.touches[0].clientY;
					
				//单点触摸是滑动
				if (tnum == 1) {
					if (tmp_ty < 1) {
						//CropImage.autoMove(cjW, cjH);
						return false;
					}
					
					//如果单点触摸是由双点触摸释放其中一个手指触发的，则tx，ty重新计算
					if (istouchend) {
						istouchend = false;
						//触摸点1的起始点
						tx = event.touches[0].clientX;
						ty = event.touches[0].clientY;
					}
					
					//x移动速度的距离
					var tmp_dx = tmp_tx - tx;
					//y移动速度的距离
					var tmp_dy = tmp_ty - ty;
					
					//如果是90角度旋转
					if (cangle == 90 || cangle == -270) {
						CropImage.tmp_curx = CropImage.curx + tmp_dy;
						CropImage.tmp_cury = CropImage.cury - tmp_dx;
					}
					//如果是180角度旋转
					else if (cangle == 180 || cangle == -180) {
						CropImage.tmp_curx = CropImage.curx - tmp_dx;
						CropImage.tmp_cury = CropImage.cury - tmp_dy;
					}
					//如果是270都旋转
					else if (cangle == 270 || cangle == -90) {
						CropImage.tmp_curx = CropImage.curx - tmp_dy;
						CropImage.tmp_cury = CropImage.cury + tmp_dx;
					}
					//如果是0或360角度旋转，或者其它
					else {
						CropImage.tmp_curx = CropImage.curx + tmp_dx;
						CropImage.tmp_cury = CropImage.cury + tmp_dy;
					}
					
					//重新绘制画布背景
					reDrawBg(bCObj);
					
					//绘制图片
					drawImage(bCObj, CropImage.tmp_curx, CropImage.tmp_cury);
				}
				//双点触摸支持图片的缩放
				else {
					//触摸点2当前x，y坐标
					tmp_tx1 = event.touches[1].clientX;
					tmp_ty1 = event.touches[1].clientY;
					
					//如果触摸式由单点触摸改变为双点触摸的则tx,ty,tx1,ty1重新计算
					if (istouchend) {
						istouchend = false;
						//触摸点1的起始点
						tx = event.touches[0].clientX;
						ty = event.touches[0].clientY;
						//触摸点2的起始点
						tx1 = event.touches[1].clientX;
						ty1 = event.touches[1].clientY;
					}
					
					//触摸开始的两个点的距离
					var d1 = pointDistance(tx1, ty1, tx, ty);
					//当前触摸的两个点的距离
					var d2 = pointDistance(tmp_tx1, tmp_ty1, tmp_tx, tmp_ty);
					//缩放的距离
					var d = d2 - d1;
					//真实缩放的距离
					var rd = d;
					CropImage.tmp_csw = CropImage.csw + d;
					//图片不能缩放到大于原图的大小
					if (CropImage.tmp_csw > CropImage.naturalW) {
						rd -= CropImage.tmp_csw - CropImage.naturalW;
						CropImage.tmp_csw = CropImage.naturalW;
					}
					//图片不能缩小到小于初始化的大小
					else if (CropImage.tmp_csw < CropImage.initsw) {
						rd -= CropImage.tmp_csw - CropImage.initsw;
						CropImage.tmp_csw = CropImage.initsw;
					}
					//等比例缩放，宽度为屏幕宽度，缩放图像的高度
					CropImage.tmp_csh = scaleImage(CropImage.naturalW, CropImage.naturalH, CropImage.tmp_csw, '', 'width');
					if (CropImage.tmp_csh > CropImage.naturalH) {
						CropImage.tmp_csh = CropImage.naturalH;
					}
					
					//坐标改变，保证触摸点在屏幕中心显示
					CropImage.tmp_curx = CropImage.curx - rd/2;
					CropImage.tmp_cury = CropImage.cury - rd/2;
					
					//重新绘制画布背景
					reDrawBg(bCObj);
					
					//绘制图片
					drawImage(bCObj, CropImage.tmp_curx, CropImage.tmp_cury, CropImage.tmp_csw, CropImage.tmp_csh);
				}
				return false;
				break;
		}
	}
	
	//旋转注册（左旋，或右旋）
	function changeAngle(event) {
		var event = event || window.event;
		event.preventDefault();
		
		var btntype = this.getAttribute('btntype');
		//左旋
		if (btntype == 'left') {
			cangle -= 90;
		}
		//右旋
		else {
			cangle += 90;
		}
		
		cangle %= 360;
		
		//绘制图片
		drawImage(bCObj);
		
		return false;
	}
	
	//确定裁剪按钮
	function okcut(event) {
		var event = event || window.event;
		event.preventDefault();
		
		//原画布的图像信息
		var srcimgdata = bCObj.cas.toDataURL('image/png');
		
		//创建一个图片对象来接受原画布的图像信息
		var newimage = document.createElement('img');
		newimage.src = srcimgdata;
		newimage.onload = function() {
			//裁剪框的信息
			cx = parseInt(cCObj.cas.x);
			cy = parseInt(cCObj.cas.y);
			cw = parseInt(cCObj.cas.zleng);
			ch = cw * 0.8;
			
			//生成最终上传的画布信息
			var okObj = createCasObj();
			setCasCss(okObj.cas, cw / window.devicePixelRatio, ch / window.devicePixelRatio, {});
			//绘制图片[因为本画布和裁剪画布同一个大小和坐标]
			okObj.c2d.drawImage(this, -cx, -cy);
			
			//ajax发送数据值后台
			var imgdata = okObj.cas.toDataURL('image/png');
			//保持裁剪数据
			mkCrop.cropinputdom.setAttribute('value', imgdata);
			//显示预览图片
			mkCrop.preimgdom.setAttribute('src', imgdata);
			
			//调用回调处理函数
			if (typeof mkCrop.back_fnc == 'function') {
				mkCrop.back_fnc(imgdata);
			}
		}
		
		return false;
	}
	
	//阻止事件函数
	function disevent(event) {
		var event = event || window.event;
		event.preventDefault();
		return false;
	}
	
	//添加子元素
	//pObj 父级元素的DOM对象
	//cobj 子级元素的DOM对象
	function appendChild(pObj, cobj) {
		pObj.appendChild(cobj);
	}
	
	//等比例缩放函数
	//sw 源图片的宽
	//sh 源图片的高
	//dw 目标图片的宽
	//dh 目标图片的高
	//dtype 缩放类型：width按照宽度缩放；height按照高度缩放
	function scaleImage(sw, sh, dw, dh, dtype) {
		switch (dtype) {
			case 'width':
				dh = sh * (dw / sw); 
				break;
		}
		
		return dh;
	}

	//计算两个点之间的距离
	//x1 点1的x坐标
	//y1 点1的y坐标
	//x2 点2的x坐标
	//y2 点2的y坐标
	function pointDistance(x1, y1, x2, y2) {
		var y = Math.abs(y2 - y1);
		var x = Math.abs(x2 - x1);
		return parseInt(Math.sqrt(y*y + x*x));
	}
	
	//获取屏幕可见局域的宽
	function getScreenAvailW() {
		return screen.availWidth;
	}
	
	//获取屏幕可见局域的高
	function getScreenAvailH() {
		return screen.availHeight;
	}	
}