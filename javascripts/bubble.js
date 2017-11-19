let spans = document.querySelectorAll(".success-img span");
let index = -1;
let bubble = {
    show: function(dom) {
        dom.style.display = "block";        
    },
    hide: function(dom) {
        dom.style.display = "none";            
    },
    autoShow: function() {
        setInterval(() => {
            if(index >= 2){
                for(let i = 0 ;i < spans.length ; i++){
                    this.hide(spans[i]);
                }
                index = -1;
            }else{
                index++;    
                this.show(spans[index]);        
            }
        },500);
    }
}

bubble.autoShow();
