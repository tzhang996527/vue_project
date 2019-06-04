
<style scoped>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
.content-window-card {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
}
.content-window-card p {
    height: 2rem;
}
.custom-info {
    border: solid 1px rgb(224, 27, 27);
}
.info-top {
    position: relative;
    background: none repeat scroll 0 0 rgb(69, 24, 153);
    border-bottom: 1px solid rgb(204, 204, 204);
    border-radius: 5px 5px 0 0;
}
.info-top div {
    display: inline-block;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    line-height: 31px;
    padding: 0 10px;
}
.info-top img {
    position: absolute;
    top: 10px;
    right: 10px;
    transition-duration: 0.25s;
}
.info-top img:hover {
    box-shadow: 0px 0px 5px #000;
}
.info-middle {
    font-size: 12px;
    padding: 10px 6px;
    line-height: 20px;
}
.info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
}
.info-bottom img {
    position: relative;
    z-index: 104;
}
span {
    margin-left: 5px;
    font-size: 11px;
}
.info-middle img {
    float: left;
    margin-right: 6px;
}
</style>

<template>
  <div>
    <div id="container-map" style="width:100%; height:500px"></div>
    <button @click="addTool">加载</button>
    <button @click="addTraffic">交通</button>
    <button @click="addPos">画点</button>
    <button @click="thisLocation">定位</button>
    <button @click="cancelLocation">取消圆</button>
    <button @click="getMaker">获取覆盖物信息</button>
    <button @click="drawLine">路径</button>
    <button @click="truckRoute">卡车</button>
    <input type="text" id="input_id">
    <span>{{chosePosition}}</span>
    <span>圆的长度{{myCircle.radius}}</span>
    <div id="panel"></div>
  </div>
</template>


<script>
//地理围栏
// https://lbs.amap.com/api/webservice/guide/api/geofence_service
// souruce
// 121.54449,31.218761
// 121.546335,31.217697
// 121.543932,31.215678
// 121.541615,31.212228
// dest
// 121.539683,31.206833

import AMap from "AMap";
import AMapUI from "AMapUI";
import * as util from '../utils/util'

export default {
  name: "map",
  data() {
    return {
      map: null,
      /* 当前位置 */
      thisPosition: {
        location: "",
        lng: "",
        lat: ""
      },

      /* 选取的位置 */
      chosePosition: {
        location: "",
        lng: "",
        lat: ""
      },

      /* 范围圆的数据 */
      myCircle: {},
      /* 签到圆对象 */
      circle: {},
      /* 编辑器对象 */
      circleEditor: null,
      /* 拖拽对象 */
      positionPickerObj: {},
      /* 当前城市编码 */
      citycode: "020",

      isVisible: true,
      trafficLayer: {}
    };
  },

  methods: {
    truckRoute(){
    //构造路线导航类
    var driving = new AMap.Driving({
        map: this.map,
        panel: "panel"
    }); 
    // 根据起终点经纬度规划驾车导航路线
    driving.search(new AMap.LngLat(121.54449,31.218761), new AMap.LngLat(121.539683,31.206833), function(status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === 'complete') {
            console.log('绘制驾车路线完成')
        } else {
            console.log('获取驾车数据失败：' + result)
        }
    });
    },
    drawLine() {
      
      // 121.54449,31.218761
      // 121.546335,31.217697
      // 121.543932,31.215678
      // 121.541615,31.212228
      // dest
      // 121.539683,31.206833
      // 折线的节点坐标数组，每个元素为 AMap.LngLat 对象
      var path = [
        [121.54449, 31.218761],
        [121.546335, 31.217697],
        [121.543932, 31.215678],
        [121.541615, 31.212228],
        [121.539683, 31.206833]
      ];

      var test = AMap.LngLat();
      debugger;

      var test2 = util.dateFormat(new Date());

      var polyline = new AMap.Polyline({
        path: path,
        showDir:true,
        isOutline: true,
        outlineColor: "#ffeeff",
        borderWeight: 3,
        strokeColor: "#3366FF",// 线颜色
        strokeOpacity: 1,
        strokeWeight: 6,       // 线宽
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: "round",
        lineCap: "round",
        zIndex: 50
      });

      polyline.setMap(this.map);
      // 缩放地图到合适的视野级别
      this.map.setFitView([polyline]);
    },

    addTraffic() {
      //实时路况图层
      // debugger
      // trafficLayer.setMap(this.map);

      if (this.isVisible) {
        this.trafficLayer.hide();
        this.isVisible = false;
      } else {
        this.trafficLayer.show();
        this.isVisible = true;
      }
    },

    /* 添加工具条 */
    addTool() {
      AMap.plugin(["AMap.ToolBar", "AMap.Driving"], () => {
        let toolbar = new AMap.ToolBar();
        this.map.addControl(toolbar);
      });
    },

    addPos() {

      var that = this;
      this.map.clearMap();
      // 以 icon URL 的形式创建一个途经点
      var viaMarker = new AMap.Marker({
        position: new AMap.LngLat(121.546335, 31.217697),
        // 将一张图片的地址设置为 icon
        icon:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
        // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-13, -30)
      });

      // 创建一个 Icon
      var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
      });

      // 将 icon 传入 marker
      var startMarker = new AMap.Marker({
        position: new AMap.LngLat(121.539683, 31.206833),
        icon: startIcon,
        offset: new AMap.Pixel(-13, -30)
      });

      // 创建一个 icon
      var endIcon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3)
      });

      // 将 icon 传入 marker
      var endMarker = new AMap.Marker({
        position: new AMap.LngLat(121.543932, 31.215678),
        icon: endIcon,
        offset: new AMap.Pixel(-13, -30)
      });

      // 将 markers 添加到地图
      this.map.add([viaMarker, startMarker, endMarker]);

      var marker = new AMap.Marker({
        position: [121.546335, 31.217697] //位置
      });

      //实例化信息窗体
      var title =
        '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',content = [];
      content.push(
        "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里"
      );
      content.push("电话：010-64733333");
      content.push(
        "<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>"
      );
      var infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: that.$options.methods.createInfoWindow.bind(this)(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45)
      });

      // var infoWindow = new AMap.InfoWindow({ //创建信息窗体
      //   isCustom: true,  //使用自定义窗体
      //   content:'<div>信息窗体</div>', //信息窗体的内容可以是任意html片段
      //   offset: new AMap.Pixel(16, -45)
      // });

      var map_test = this.map;
      var onMarkerClick = function(e) {
        infoWindow.open(map_test, e.target.getPosition()); //打开信息窗体
        //e.target就是被点击的Marker
      };

      this.map.add(marker); //添加到地图
      marker.on("click", onMarkerClick); //绑定click事件
    },

createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";

    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "https://webapi.amap.com/images/close2.gif";
    closeX.onclick = this.$options.methods.closeInfoWindow.bind(this);

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "https://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
},

//关闭信息窗体
closeInfoWindow() {
    this.map.clearInfoWindow();
},
    /* 定位具体位置 */
    thisLocation() {
      this.map.plugin("AMap.Geolocation", () => {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: false,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        this.map.addControl(geolocation);

        geolocation.getCurrentPosition();

        AMap.event.addListener(geolocation, "complete", data => {
          console.log(data);
          this.citycode = data.addressComponent.cityCode;
          this.thisPosition = data.position;
          this.thisPosition.message = data.formattedAddress;
          this.chosePosition = this.thisPosition;
          /* 画圆 */
          this.cancelLocation();
          this.addCircle();
          /* 拖拽选址 */
          this.positionPicker();
        });

        AMap.event.addListener(geolocation, "error", function(data) {
          alert("定位失败");
        });
      });
    },

    /* 画图 */
    addCircle() {

    },

    /* 取消圆 */

    cancelLocation() {
      this.map.remove(this.circle);
      if (this.circleEditor) {
        this.circleEditor.close();
      }
    },

    /* 搜索 */
    search() {
      let vm = this;
      AMap.plugin(["AMap.PlaceSearch", "AMap.Autocomplete"], () => {
        var autoOptions = {
          city: this.citycode,
          input: "input_id"
        };

        // eslint-disable-next-line no-unused-vars
        let autoComplete = new AMap.Autocomplete(autoOptions);
        // eslint-disable-next-line no-unused-vars
        let placeSearch = new AMap.PlaceSearch({
          city: this.citycode,
          map: vm.map
        });

        AMap.event.addListener(autoComplete, "select", e => {
          // TODO 针对选中的poi实现自己的功能
          placeSearch.setCity(e.poi.adcode);
          // placeSearch.search(e.poi.name)
          this.chosePosition = e.poi.location;
          if (this.chosePosition) {
            /* 画圆 *
            this.cancelLocation()

            this.addCircle()

            /* 拖拽选址 */
            this.positionPickerObj.stop();
            this.positionPicker();
            this.createWindow();
          }
        });
      });
    },

    /* 获取覆盖物信息 */
    getMaker() {
      var overlaysList = this.map.getAllOverlays("circle");
      console.log(overlaysList);
      // 可选参数有:‘marker’、‘circle’、‘polyline’、‘polygon
    },

    /* 拖拽选址 */
    positionPicker() {
      AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
        this.positionPickerObj = new PositionPicker({
          mode: "dragMarker", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: this.map // 依赖地图对象
        });

        this.positionPickerObj.on("success", positionResult => {
          this.chosePosition = positionResult.position;
          /* 画圆 */
          this.cancelLocation();
          this.addCircle();
        });

        this.positionPickerObj.start([
          this.chosePosition.lng,
          this.chosePosition.lat
        ]);
      });
    },

    /* 创建信息窗体 */

    createWindow() {
      // 信息窗体的内容

      var content = [
        '<div style="width: 100%;>',

        '<div class="fs-16">范围: 200米</div>',

        '<div class="fs-14">位置不准确？试试拖拽鼠标或者输入地点</div></div>'
      ];

      // 创建 infoWindow 实例

      var infoWindow = new AMap.InfoWindow({
        content: content.join("<br>"), // 传入 dom 对象，或者 html 字符串

        offset: new AMap.Pixel(0, -50)
      });

      // 打开信息窗体

      infoWindow.open(this.map, this.chosePosition);
    }
  },

  activated() {},
  // souruce
  // 121.54449,31.218761
  // 121.546335,31.217697
  // 121.543932,31.215678
  // 121.541615,31.212228
  // dest
  // 121.539683,31.206833

  mounted() {
    this.map = new AMap.Map("container-map", {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 15, //初始地图级别
      viewMode: "2D",
      center: [121.54449, 31.218761],
      zooms: [4, 18]
    });

    this.trafficLayer = new AMap.TileLayer.Traffic({
      zIndex: 10
    });
    this.map.add(this.trafficLayer); //添加图层到地图

    /* 添加工具条 */
    this.addTool();
    /* 获取当前位置 */
    // this.thisLocation()
    /* 添加搜索功能 */
    // this.search()
  }
};
</script>
