/*封装一个获取id的函数*/
function byId(id){
    //判断是否是字符因为id不可以设置成数字
   return typeof(id) === "string"?document.getElementById(id):id;
}
/*全局变量*/
var index = 0,
    timer = null,//设置定时器
    pics = byId("banner").getElementsByTagName("div"),
    yuan = byId("yuan").getElementsByTagName("span"),
    pre = byId("pre"),
    next = byId("next"),
    len = pics.length,
    menu = byId("menu-content"),
    subMenu = byId("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    menuItems = menu.getElementsByClassName("menu-item");
function slideImg(){
   var main = byId("main");
   //滑过清除定时器,离开继续
    main.onmouseover = function(){
       //滑过清除定时器
        if(timer)
            clearInterval(timer);
    }
    main.onmouseout = function(){
       timer = setInterval(function(){
           index++;
         if (index >= len){
        index = 0;
         }
             changeImg();
       },3000)
    }
    main.onmouseout();
    //圆点设置
   for(var d=0;d<len;d++){
       yuan[d].index = d;
       yuan[d].onclick = function(){
        index = this.index;
        //调用changeImg
           changeImg();
       }
   }
    next.onclick = function(){
        index++;
        if(index >= len)
            index = 0;
        changeImg();
    }
    pre.onclick = function(){
        index--;
        if(index < 0)
            index = len-1;
        changeImg();
    }
        //导航菜单
    //遍历主菜单,且绑定时间
    console.log(menuItems.length);
    for(var m = 0;m<menuItems.length;m++){
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover = function(){
        var idx = this.getAttribute("data-index");
        for(var j = 0;j<innerBox.length;j++){
                innerBox[j].style.display = "none";
                menuItems[j].style.background = "none";
        }
            menuItems[idx].style.background = 'rgba(0,0,0,0.1)';
        subMenu.style.display = "block";
        innerBox[idx].style.display = "block";
        }
        //离开恢复原状
        menuItems[m].onmouseout = function(){
            subMenu.style.display = "none";
        }
        subMenu.onmouseover = function(){
            subMenu.style.display = "block";
        }
        subMenu.onmouseout = function(){
            subMenu.style.display = "none";
        }
    }


}
//切换图片
function changeImg(){
    for(var i=0;i<len;i++){
        pics[i].style.display = "none";
        yuan[i].className = "";
    }
    pics[index].style.display = 'block';
    yuan[index].className = "active";
}
slideImg();
