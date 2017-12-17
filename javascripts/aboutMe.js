function URLdecode(str) {  
    var ret = "";  
    for(var i=0;i<str.length;i++) {  
            var chr = str.charAt(i);  
            if(chr == "+") {  
                    ret += " ";  
            }else if(chr=="%") {  
                    var asc = str.substring(i+1,i+3);  
                    if(parseInt("0x"+asc)>0x7f) {  
                            ret += decodeURI("%"+ str.substring(i+1,i+9));  
                            i += 8;  
                    }else {  
                            ret += String.fromCharCode(parseInt("0x"+asc));  
                            i += 2;  
                    }  
            }else {  
                    ret += chr;  
            }  
    }  
    return ret;  
} 

let nowUrl = URLdecode(window.location.href);
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
// alert(JSON.stringify(message));

var stu_name = document.querySelector(".name");
//证号
var stu_card = document.querySelector(".card");
let cet_name = message.name;
let cet_id = message.examID;
stu_name.value = cet_name;
stu_card.value = cet_id;
