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
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="header" label-width="80px">
            <el-form-item label="行程编号">
              <el-input v-model="header.tourid"></el-input>
            </el-form-item>
            <el-form-item label="发车地点">
              <el-select v-model="header.sourceLoc.address"></el-select>
            </el-form-item>
            <el-form-item label="出发时间">
              <el-col :span="11">
                <el-date-picker type="date" v-model="header.planDepart" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="目的地址">
              <el-select v-model="header.destloc.address"></el-select>
            </el-form-item>
            <el-form-item label="预计达到">
              <el-col :span="11">
                <el-date-picker type="date" v-model="header.planArr" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>-->
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="车辆监控" name="tab_map">
              <div>
                <div id="container-map" style="width:100%; height:500px"></div>
                <button @click="setPlannedStop">加载</button>
                <button @click="addTraffic">交通</button>
                <button @click="drawLine">路径</button>
                <button @click="truckRoute">卡车</button>
                <button @click="reportPos">发送GPS</button>
                <div id="panel"></div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="车辆信息" name="tab_veh">
              <el-row>
                <el-col :span="18">
                  <div class="grid-content bg-purple">
                    <el-form ref="form" :model="header" label-width="100px">
                      <el-form-item label="车辆编号">
                        <el-input v-model="header.vehicle.assetId"></el-input>
                      </el-form-item>
                      <el-form-item label="车辆类型">
                        <el-select v-model="header.vehicle.assetType"></el-select>
                      </el-form-item>
                      <el-form-item label="车牌号码">
                        <el-select v-model="header.vehicle.platenumber"></el-select>
                      </el-form-item>
                      <el-form-item label="制造商">
                        <el-select v-model="header.vehicle.make"></el-select>
                      </el-form-item>
                      <el-form-item label="型号">
                        <el-select v-model="header.vehicle.model"></el-select>
                      </el-form-item>
                      <el-form-item label="车辆识别号">
                        <el-select v-model="header.vehicle.vin"></el-select>
                      </el-form-item>
                      <el-form-item label="出厂日期">
                        <el-col :span="11">
                          <el-date-picker
                            type="date"
                            v-model="header.vehicle.year"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="车载设备编号">
                        <el-select v-model="header.vehicle.hardware"></el-select>
                      </el-form-item>
                      <el-form-item label="车辆所在地">
                        <el-select v-model="header.vehicle.location"></el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light"></div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="停靠站点" name="tab_stop">
              <el-row>
                <el-col :span="24">
                  <el-table :data="header.plannedStopsDetail" style="width: 100%" stripe>
                    <el-table-column prop="seq" label="编号" sortable width="80"></el-table-column>
                    <el-table-column prop="location.address" label="停靠站点"></el-table-column>
                    <el-table-column prop="status" label="行程状态"></el-table-column>
                    <el-table-column label="计划出发时间" width="180" :formatter="formatDate">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.planDepart }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="计划到达时间" width="180" :formatter="formatDate">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.planArr }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="实际出发时间" width="180" :formatter="formatDate">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.actDepart }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="实际到达时间" width="180" :formatter="formatDate">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.actArr }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="预计出发时间" width="180" :formatter="formatDate">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.estDepart }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="预计到达时间" width="180" :formatter="formatDate">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.estArr }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="货物清单" name="tab_item">
              <el-row>
                <el-col :span="24">
                  <el-table :data="header.tourItem" style="width: 100%" stripe>
                    <el-table-column prop="seq" label="编号" sortable width="80"></el-table-column>
                    <el-table-column prop="container" label="集装箱编号"></el-table-column>
                    <el-table-column prop="commodity" label="货物"></el-table-column>
                    <el-table-column prop="quan" label="数量"></el-table-column>
                    <el-table-column prop="location" label="目的地"></el-table-column>
                    <el-table-column prop="status" label="运输状态"></el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="事件管理" name="tab_event">
              <el-row>
                <el-col :span="24">
                  <el-table :data="header.events" style="width: 100%" stripe>
                    <el-table-column prop="seq" label="编号" sortable width="80"></el-table-column>
                    <el-table-column prop="eventCode" label="事件编号"></el-table-column>
                    <el-table-column prop="location" label="发生位置"></el-table-column>
                    <el-table-column prop="status" label="时间状态"></el-table-column>
                    <el-table-column label="事件发生时间" width="180" :formatter="formatDate">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.createdOn }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="消息管理" name="tab_msg">
              <el-row>
                <el-col :span="24">
                  <el-table :data="header.notifications" style="width: 100%" stripe>
                    <el-table-column prop="seq" label="编号" sortable width="80"></el-table-column>
                    <el-table-column prop="text" label="消息通知"></el-table-column>
                    <el-table-column prop="createdBy" label="创建人"></el-table-column>
                    <el-table-column label="创建时间" width="180" :formatter="formatDate">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.createdOn }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AMap from "AMap";
import AMapUI from "AMapUI";
import * as util from "../../utils/util";

// “./”：代表目前所在的目录。
// “../”：代表上一层目录。
// 以”/”开头：代表根目录。
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
      srcLoc: {
        lng: "",
        lat: ""
      },
      destLoc: {
        lng: "",
        lat: ""
      },
      isVisible: false,
      trafficLayer: {},
      activeName: "tab_map",
      header: {
        tourid: "",
        sourceLoc: {
          address: ""
        },
        destloc: {
          address: ""
        },
        planDepart: "",
        planArr: "",
        vehicle: {
          assetId: "",
          assetType: "",
          platenumber: "",
          make: "",
          model: "",
          vin: "",
          year: "",
          hardware: "",
          location: ""
        }
      }
    };
  },
  created() {
    this.getParams();
  },
  activated() {},
  mounted() {
    this.map = new AMap.Map("container-map", {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 15, //初始地图级别
      viewMode: "2D",
      center: [121.475476, 31.228477],
      zooms: [4, 18]
    });

    this.trafficLayer = new AMap.TileLayer.Traffic({
      zIndex: 10
    });
    this.map.add(this.trafficLayer); //添加图层到地图

    this.trafficLayer.hide();
    /* 添加工具条 */
    this.addTool();
    debugger;

    this.getTour();
    //计划路线
    // this.getActStop();
  },
  methods: {
    /* 设置车辆位置 */
    setVehPos() {
      var vehIcon = new AMap.Icon({
        size: new AMap.Size(128, 128),
        image: "/static/truckyellow.png",
        imageSize: new AMap.Size(32, 32)
        // imageOffset: new AMap.Pixel(-3, -3)
      });

      //get vehicle position
      var oMarker = new AMap.Marker({
        position: new AMap.LngLat(this.thisPosition.lng, this.thisPosition.lat),
        icon: vehIcon,
        offset: new AMap.Pixel(-13, -30)
      });

      // 将 markers 添加到地图
      this.map.add(oMarker);
    },
    //Set planned stop position
    setPlannedStop() {
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

      //创建一个 icon
      var endIcon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3)
      });

      // 以 icon URL 的形式创建一个途经点
      // var viaMarker = new AMap.Marker({
      //   position: new AMap.LngLat(121.546335, 31.217697),
      //   // 将一张图片的地址设置为 icon
      //   icon:
      //     "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
      //   // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
      //   offset: new AMap.Pixel(-13, -30)
      // });

      var max_seq = this.header.plannedStopsDetail.length - 1;
      var markerList = this.header.plannedStopsDetail.map(function(
        value,
        index
      ) {
        var oIcon = {};
        if (index === 0) {
          //first stop
          oIcon = startIcon;
        } else if (index === max_seq) {
          oIcon = endIcon;
        } else {
          // 以 icon URL 的形式创建一个途经点
          return new AMap.Marker({
            position: new AMap.LngLat(value.location.lng, value.location.lat),
            // 将一张图片的地址设置为 icon
            icon:
              "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
            // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
            offset: new AMap.Pixel(-13, -30)
          });
        }
        var oMarker = new AMap.Marker({
          position: new AMap.LngLat(value.location.lng, value.location.lat),
          icon: oIcon,
          offset: new AMap.Pixel(-13, -30)
        });
        return oMarker;
      });

      // 将 markers 添加到地图
      this.map.add(markerList);
    },
    /* 添加工具条 */
    addTool() {
      AMap.plugin(["AMap.ToolBar", "AMap.TruckDriving"], () => {
        let toolbar = new AMap.ToolBar();
        this.map.addControl(toolbar);
      });
    },
    addTraffic() {
      //实时路况图层
      if (this.isVisible) {
        this.trafficLayer.hide();
        this.isVisible = false;
      } else {
        this.trafficLayer.show();
        this.isVisible = true;
      }
    },

    drawLine() {
      debugger;

      var path = this.header.actualStops.map(function(value, index) {
        var oGeo = [value.lng, value.lat];
        return oGeo;
      });
      // var test2 = util.dateFormat(new Date());

      var polyline = new AMap.Polyline({
        path: path,
        showDir: true,
        isOutline: true,
        outlineColor: "#ffeeff",
        borderWeight: 3,
        strokeColor: "#3366FF", // 线颜色
        strokeOpacity: 1,
        strokeWeight: 6, // 线宽
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
      // this.map.setFitView([polyline]);
    },
    truckRoute() {
      debugger;
      this.map.clearMap();
      //planned stop
      this.setPlannedStop();
      //current position
      this.setVehPos();
      //构造路线导航类
      var driving = new AMap.TruckDriving({
        map: this.map,
        size: 4, //车型大小，必填，1-4分别对应小型至大型
        panel: "panel",
        isOutline: false,
        autoFitView: true,
        hideMarkers: true
      });

      var path = [];
      debugger
      path.push({ lnglat: [this.thisPosition.lng, this.thisPosition.lat] }); //途径
      path.push({ lnglat: [this.destLoc.lng, this.destLoc.lat] }); //终点

      driving.search(path, function(status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === "complete") {
          // // result.routes[0].steps.path
          // var steps = result.routes[0].steps;
          // for (var i = 0; i < steps.length; i++) {
          //   var paths = steps[i].path;
          //   for (var j = 0; j < paths.length; j++) {
          //     console.log(paths[j].lng + "," + paths[j].lat);
          //   }
          // }
          console.log("绘制驾车路线完成");
        } else {
          console.log("获取驾车数据失败：" + result);
        }
      });

      //绘制已行驶路径
      this.drawLine();
    },
    formatDate: function(row, column) {
      debugger;
      // return row.createdBy;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClick(tab, event) {
      // console.log(this.$parent.$data.formInline.tourid);
      console.log(tab, event);
    },
    getParams: function() {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.id;
      // 将数据放在当前组件的数据内
      console.log("传来的参数==" + routerParams);
      this.header.tourid = routerParams;
    },
    reportPos(){
        this.$axios({
          url: "/api/v1/actualStop",
          method: "post",
          data: {
            tourid: this.header.tourid,
            lng:"121.475885",
            lat:"31.23082",
            seq: 1,
          },
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:8080"
          }
        })
          .then(successResponse => {
            debugger;
            this.header.actualStops.push(successResponse.data)
            this.thisPosition.lng = successResponse.data.lng;
            this.thisPosition.lat = successResponse.data.lat;
            this.truckRoute();
            
          })
          .catch(failResponse => {
            debugger;
            console.log(failResponse);
          });
    },
    getTour() {
      this.$axios
        .get("/api/v1/tourDetail", {
          params: {
            tourid: this.header.tourid
          }
        })
        .then(response => {
          this.header = response.data;
          //set source location
          this.srcLoc = {
            lng: this.header.sourceLoc.lng,
            lat: this.header.sourceLoc.lat
          };

          //set destination location
          this.destLoc = {
            lng: this.header.destloc.lng,
            lat: this.header.destloc.lat
          };

          this.thisPosition = {
            lng: this.header.actualStops[this.header.actualStops.length - 1].lng,
            lat: this.header.actualStops[this.header.actualStops.length - 1].lat
          };
          debugger;
          this.truckRoute();
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>