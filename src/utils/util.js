/*
 *首先是相互调用，接收的地方用import，输出的地方用export
 *比如这里面需要用到cookie.js中的方法，那么就要先把cookie引用进来，这个思想跟后面的引用是一致的
 */
// import cookie from './cookie';

/*
 *接下来是定义全局函数
 *因为全局函数是要给外部使用的，所以需要将函数用export告知外部即可
 *比如我们在这里定义了日期的格式，供后面组件统一改变
 */
//Date对象转化为yyyy-MM-dd格式
export function dateFormat(dateObj){
  var year = dateObj.getFullYear();
  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

// createInfoWindow(title, content) {
//   var info = document.createElement("div");
//   info.className = "custom-info input-card content-window-card";

//   //可以通过下面的方式修改自定义窗体的宽高
//   //info.style.width = "400px";
//   // 定义顶部标题
//   var top = document.createElement("div");
//   var titleD = document.createElement("div");
//   var closeX = document.createElement("img");
//   top.className = "info-top";
//   titleD.innerHTML = title;
//   closeX.src = "https://webapi.amap.com/images/close2.gif";
//   closeX.onclick = closeInfoWindow;

//   top.appendChild(titleD);
//   top.appendChild(closeX);
//   info.appendChild(top);

//   // 定义中部内容
//   var middle = document.createElement("div");
//   middle.className = "info-middle";
//   middle.style.backgroundColor = "white";
//   middle.innerHTML = content;
//   info.appendChild(middle);

//   // 定义底部内容
//   var bottom = document.createElement("div");
//   bottom.className = "info-bottom";
//   bottom.style.position = "relative";
//   bottom.style.top = "0px";
//   bottom.style.margin = "0 auto";
//   var sharp = document.createElement("img");
//   sharp.src = "https://webapi.amap.com/images/sharp.png";
//   bottom.appendChild(sharp);
//   info.appendChild(bottom);
//   return info;
// },
// closeInfoWindow() {
//   this.map.clearInfoWindow();
// }