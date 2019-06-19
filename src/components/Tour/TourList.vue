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
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="车辆监控" name="tab_map">
              <div>
                <div id="container-map" style="width:100%; height:500px"></div>
                <button @click="addTool">加载</button>
                <button @click="addTraffic">交通</button>
                <button @click="drawLine">路径</button>
                <button @click="truckRoute">卡车</button>
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
                  <el-table :data="header.plannedStops" style="width: 100%" stripe>
                    <el-table-column prop="seq" label="编号" sortable width="80"></el-table-column>
                    <el-table-column prop="locid" label="停靠站点"></el-table-column>
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
import * as util from '../../utils/util'

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
    debugger;
    this.getParams();
    this.getTour();
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
  },
  methods: {
    /* 添加工具条 */
    addTool() {
      AMap.plugin(["AMap.ToolBar", "AMap.Driving"], () => {
        let toolbar = new AMap.ToolBar();
        this.map.addControl(toolbar);
      });
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
      this.map.setFitView([polyline]);
    },
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
      debugger;
      var routerParams = this.$route.params.id;
      // 将数据放在当前组件的数据内
      console.log("传来的参数==" + routerParams);
      this.header.tourid = routerParams;
    },
    getTour() {
      this.$axios
        .get("/api/v1/tourDetail", {
          params: {
            tourid: this.header.tourid
          }
        })
        .then(response => {
          this.header = response.data[0];
          debugger;
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>