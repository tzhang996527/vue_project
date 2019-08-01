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
    <el-dialog
      title="添加站点"
      :visible.sync="dialogFormVisible"
      width="50%"
      label-width="100px"
      label-position="left">
      <el-form ref="ruleForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="顺序" style>
              <el-col :span="10">
                <el-input maxlength="10" v-model="form.seq" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="站点">
              <el-col :span="18">
                <el-select
                  v-model="form.locId"
                  placeholder="请选择"
                  filterable
                  :default-first-option="true">
                  <el-option
                    v-for="item in locations"
                    :key="item.locId"
                    :label="item.address"
                    :value="item.locId">
                    <span style="float: left">{{ item.address }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.locId }}</span>
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划到达时间">
              <el-col :span="12">
                <el-date-picker
                  v-model="form.planArr"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划出发时间">
              <el-col :span="12">
                <el-date-picker
                  v-model="form.planDepart"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Cargo Form -->
    <el-dialog
      title="添加货物"
      :visible.sync="dialogFormVisibleCargo"
      width="50%"
      label-width="100px"
      label-position="left">
      <el-form ref="ruleForm" :model="cargoform" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="顺序" style>
              <el-col :span="10">
                <el-input maxlength="10" v-model="cargoform.seq" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="集装箱编号">
                <el-input maxlength="20" v-model="cargoform.container"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数量">
                <el-input maxlength="10" v-model="cargoform.quan"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位">
              <el-select v-model="cargoform.quanUom" placeholder="请选择">
                <el-option
                  v-for="item in UoMoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="货物">
                <el-input maxlength="10" v-model="cargoform.commodity"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="目的地">
              <el-col :span="18">
                <el-select
                  v-model="cargoform.locId"
                  placeholder="请选择"
                  filterable
                  :default-first-option="true">
                  <el-option
                    v-for="item in locations"
                    :key="item.locId"
                    :label="item.address"
                    :value="item.locId">
                    <span style="float: left">{{ item.address }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.locId }}</span>
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCargo = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitCargo">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-col :span="18">
          <el-form ref="form" :model="header" label-width="80px" :inline=true>
            <el-form-item label="行程编号">
                <el-input v-model="header.tourid" :disabled=true></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSave">保存</el-button>
          </el-form-item>
          <el-form ref="form" :model="header" label-width="80px" :inline=true>
            <el-form-item label="行程类型">
              <el-select
                v-model="header.tourType"
                placeholder="请选择"
                filterable
                :default-first-option="true">
                <el-option
                  v-for="item in tourTypes"
                  :key="item.tourType"
                  :label="item.text"
                  :value="item.tourType">
                  <span style="float: left">{{ item.text }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tourType }}</span>
                </el-option>
              </el-select>
              </el-form-item>
          </el-form>
          <el-form ref="form" :model="header" label-width="80px" :inline=true>
            <el-form-item label="发车地点">
              <el-select
                v-model="header.sourceLoc.locId"
                placeholder="请选择"
                filterable
                :default-first-option="true">
                <el-option
                  v-for="item in locations"
                  :key="item.locId"
                  :label="item.address"
                  :value="item.locId">
                  <span style="float: left">{{ item.address }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.locId }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出发时间">
              <el-col :span="11">
                <el-date-picker
                  v-model="header.planDepart"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            </el-form>
            <el-form ref="form" :model="header" label-width="80px" :inline=true>
            <el-form-item label="目的地址">
              <el-select
                v-model="header.destLoc.locId"
                placeholder="请选择"
                filterable
                :default-first-option=true>
                <el-option
                  v-for="item in locations"
                  :key="item.locId"
                  :label="item.address"
                  :value="item.locId">
                  <span style="float: left">{{ item.address }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.locId }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预计达到">
              <el-col :span="11">
                <el-date-picker
                  v-model="header.planArr"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            </el-form>
          </el-form>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
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
                    <el-form ref="form" :model="header" label-width="100px" :inline=true>
                      <el-form-item label="车辆编号" filterable label-width="100px">
                        <el-select
                          v-model="header.vehicle.assetId"
                          placeholder="请选择"
                          filterable
                          :default-first-option="true"
                          @change="setVeh">
                          <el-option
                            v-for="item in vehs"
                            :key="item.assetId"
                            :label="item.platenumber"
                            :value="item.assetId">
                            <span style="float: left">{{ item.platenumber + "," + item.assetType }}</span>
                            <span
                              style="float: right; color: #8492a6; font-size: 13px"
                            >{{ item.assetId }}</span>
                          </el-option>
                        </el-select>
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
                          <el-date-picker
                            type="date"
                            v-model="header.vehicle.year"
                          ></el-date-picker>
                      </el-form-item>
                      <el-form-item label="车载设备编号">
                        <el-select v-model="header.vehicle.hardware"></el-select>
                      </el-form-item>
                      <el-form-item label="车辆所在地">
                        <el-select v-model="header.vehicle.location"></el-select>
                      </el-form-item>
                    </el-form>
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
                    <el-table-column prop="status" label="行程状态" :formatter="formatStatus"></el-table-column>
                    <el-table-column prop = "planDepart" label="计划出发时间" width="180" :formatter="this.util.dateFormat">
                    </el-table-column>
                    <el-table-column prop = "planArr" label="计划到达时间" width="180" :formatter="this.util.dateFormat">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px">
                    <el-button @click="addStop" size="mini" type="primary">添加</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="客户信息" name="tab_cust">
              <el-row>
                <el-col :span="18">
                  <!-- inline = true的时候el-form-item需要加label-width -->
                  <el-form ref="form" :model="header" :inline="false" label-width="80px">
                    <el-form-item label="客户编号" label-width="80px" filterable>
                       <el-select
                        v-model="header.custId"
                        placeholder="请选择"
                        filterable
                        :default-first-option="true"
                        @change="setCust">
                        <el-option
                          v-for="item in customers"
                          :key="item.custId"
                          :label="item.name"
                          :value="item.custId">
                          <span style="float: left">{{ item.address }}</span>
                          <span
                            style="float: right; color: #8492a6; font-size: 13px">{{ item.custId }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-form ref="form" :model="header" :inline="true" label-width="80px">
                    <el-form-item label="客户名" label-width="80px">
                      <el-input v-model="header.soldto.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="客户地址" label-width="80px">
                      <el-input v-model="header.soldto.address" :disabled="true"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-form ref="form" :model="header" :inline="false" label-width="80px">
                    <el-form-item label="送达方" filterable label-width="80px">
                      <el-select
                        v-model="header.shipTo"
                        placeholder="请选择"
                        filterable
                        :default-first-option="true"
                        @change="setShipTo">
                        <el-option
                          v-for="item in customers"
                          :key="item.custId"
                          :label="item.name"
                          :value="item.custId">
                          <span style="float: left">{{ item.name }}</span>
                          <span
                            style="float: right; color: #8492a6; font-size: 13px">{{ item.custId }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-form ref="form" :model="header" :inline="true" label-width="80px">
                    <el-form-item label="客户名" label-width="80px">
                      <el-input v-model="header.shipto.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="客户地址" label-width="80px">
                      <el-input v-model="header.shipto.address" :disabled="true"></el-input>
                    </el-form-item>
                  </el-form>
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
                    <el-table-column prop="address" label="目的地"></el-table-column>
                    <el-table-column prop="status" label="运输状态"></el-table-column>
                      <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button size="mini" @click="handleEditCargo(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDeleteCargo(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px">
                    <el-button @click="addCargo" size="mini" type="primary">添加</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="驾驶员信息" name="tab_drv">
              <el-form ref="form" :model="header" :inline="false" label-width="80px">
                 <el-form-item label="驾驶员编号" label-width="100px">
                   <el-select
                        v-model="header.driver.driverId"
                        placeholder="请选择"
                        filterable
                        :default-first-option="true"
                        @change="setDriver">
                        <el-option
                          v-for="item in drivers"
                          :key="item.driverId"
                          :label="item.driverId"
                          :value="item.driverId">
                          <span style="float: left">{{ item.name }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.driverId }}</span>
                        </el-option>
                      </el-select>
                </el-form-item>
              </el-form>
              <el-form ref="form" :model="header" :inline="true" label-width="100px">
                <el-form-item label="姓名" label-width="100px">
                  <el-input v-model="header.driver.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" label-width="100px">
                  <el-input v-model="header.driver.tel" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="事件管理" name="tab_event">
              <el-row>
                <el-col :span="24">
                  <el-table :data="header.events" style="width: 100%" stripe>
                    <el-table-column prop="seq" label="编号" sortable width="80"></el-table-column>
                    <el-table-column prop="eventCode" label="事件编号"></el-table-column>
                    <el-table-column prop="location" label="发生位置"></el-table-column>
                    <el-table-column prop="status" label="时间状态"></el-table-column>
                    <el-table-column prop="createdOn" label="事件发生时间" width="180" :formatter="this.util.dateFormat">
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
                    <el-table-column label="创建时间" width="180" :formatter="this.util.dateFormat">
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
      form: {
        locId: "",
        address: "",
        seq: "",
        planDepart: "",
        planArr: "",
        status: "P"
      },
      cargoform:{
        seq:"",
        container:"",
        quan:"",
        quanUom:"",
        commodity:"",
        locId:"",
        address:""
      },
      dialogFormVisible: false,
      dialogFormVisibleCargo:false,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
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
      tourTypes:[],
      locations:[],
      customers: [],
      tourTypes: [],
      drivers:[],
      vehs: [],
      plannedStopsDetail:[],
      header: {
        tourid: "",
        exeStatus:"",
        sourceLoc: {
          address: ""
        },
        destLoc: {
          address: ""
        },
        driver: {
          driverId: "",
          name: "",
          tel: ""
        },
        soldto:{
          custId:"",
          type:"",
          name:"",
          address:""
        },
        shipto:{
          custId:"",
          type:"",
          name:"",
          address:""
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
    if (this.MT_DATA) {
      this.locations = this.MT_DATA.locations;
      this.tourTypes = this.MT_DATA.tourTypes;
      this.vehs = this.MT_DATA.assets;
      this.customers = this.MT_DATA.customers;
      this.drivers = this.MT_DATA.drivers;
      this.UoMoptions = this.MT_DATA.UoMoptions;
    }
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

    this.getTour();
    //计划路线
    // this.getActStop();
  },
  methods: {
    onSave() {
      debugger;
      let postData = this.header;
      this.$axios({
        url: "/api/v1/tour",
        method: "put",
        data: postData,
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080"
        }
      })
        .then(successResponse => {
          this.$notify({
            title: "成功",
            message: "行程 " + successResponse.data + " 更新成功",
            type: "success"
          });
          debugger;
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
    },
    handleEdit(index, row) {
      this.edit = true;
      this.dialogFormVisible = true;
      this.form.locId = row.locid;
      this.form.address = row.address;
      this.form.seq = row.seq;
      this.form.planDepart = row.planDepart;
      this.form.planArr = row.planArr;
      this.form.status = row.status;
    },
    handleEditCargo(index, row) {
      this.edit = true;
      this.dialogFormVisibleCargo = true;
      this.cargoform.locId = row.locId;
      this.cargoform.address = row.address;
      this.cargoform.seq = row.seq;
      this.cargoform.container = row.container;
      this.cargoform.quan = row.quan;
      this.cargoform.quanUom = row.quanUom;
      this.cargoform.commodity = row.commodity;
    },
    handleDelete(index, row) {
      let idx = row.seq - 1;
      this.header.plannedStopsDetail.splice(idx, 1);
    },
    handleDeleteCargo(index, row) {
      let idx = row.seq - 1;
      this.header.tourItem.splice(idx, 1);
    },
    addStop() {
      this.edit = false;
      this.dialogFormVisible = true;
      this.form.locId = "";
      this.form.address = "";
      this.form.seq = this.header.plannedStopsDetail.length + 1;
      this.form.planDepart = "";
      this.form.planArr = "";
      this.form.status = "P";
    },
    addCargo(){
      this.edit = false;
      this.dialogFormVisibleCargo = true;
      this.cargoform.locId = "";
      this.cargoform.address = "";
      this.cargoform.seq = this.header.tourItem.length + 1;
      this.cargoform.container = "";
      this.cargoform.quan = "";
      this.cargoform.quanUom = "";
      this.cargoform.commodity = "";
      this.cargoform.location = "";
    },
    setCust(custId) {
      for (let c of this.customers) {
        if (c.custId === custId) {
          this.header.custId = custId;
          this.header.soldto = {
            name:c.name,
            address:c.address
          };
          break;
        }
      }
    },
    setShipTo(shipTo) {
      for (let c of this.customers) {
        if (c.custId === shipTo) {
          this.header.shipTo = shipTo;
          this.header.shipto = {
            name:c.name,
            address:c.address
          };
          break;
        }
      }
    },
    setDriver(driverId){
      for (let d of this.drivers) {
        if (d.driverId === driverId) {
          this.header.driver = {
            driverId:d.driverId,
            name:d.name,
            tel:d.tel
          };
          break;
        }
      }
    },
    setVeh(vehId) {
      for (let v of this.vehs) {
        if (v.assetId === vehId) {
          this.header.vehicle = {
            assetId: vehId,
            assetType: v.assetType,
            platenumber: v.platenumber,
            make: v.make,
            model: v.model,
            vin: v.vin,
            year: v.year,
            hardware: v.hardware,
            location: v.location
          };
          break;
        }
      }
    },
    /* 设置车辆位置 */
    setVehPos() {

      var img = "";
      if(this.header.exeStatus==="01"){
        img = "./static/lorrygreen.png"
      }else{
        img = "./static/truckyellow.png";
      }
      var vehIcon = new AMap.Icon({
        size: new AMap.Size(128, 128),
        image: img,
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
    formatStatus: function(row, column, cellValue, index){
      return cellValue === "P" ? "计划中" : "运行中";
    },
    onSubmit() {
      this.dialogFormVisible = false;
      if (!this.edit) {
        let a = {};
        a.locid = this.form.locId;
        let location = this.locations.find(location => {
          return location.locId == a.locid;
        });
        // a.address = location.address;
        a.seq = this.form.seq;
        a.planDepart = this.form.planDepart;
        a.planArr = this.form.planArr;
        a.status = this.form.status;
        a.location = {};
        a.location.address = location.address;
        this.header.plannedStopsDetail.push(a);
      } else {
        //edit
        let idx = this.form.seq - 1;
        let locId = this.form.locId;
        this.header.plannedStopsDetail[idx].locid = this.form.locId;
        let location = this.locations.find(location => {
          return location.locId == locId;
        });
        // this.header.plannedStopsDetail[idx].address = location.address;
        this.header.plannedStopsDetail[idx].location.address = location.address;
        this.header.plannedStopsDetail[idx].planDepart = this.form.planDepart;
        this.header.plannedStopsDetail[idx].planArr = this.form.planArr;
      }
    },
    onSubmitCargo() {
      debugger
      this.dialogFormVisibleCargo = false;
      if (!this.edit) {
        let a = {};
        a.locid = this.cargoform.locId;
        let location = this.locations.find(location => {
          return location.locId == a.locid;
        });
        a.address   = location.address;
        a.seq       = this.cargoform.seq;
        a.container = this.cargoform.container;
        a.quan      = this.cargoform.quan;
        a.quanUom   = this.cargoform.quanUom;
        a.commodity = this.cargoform.commodity;
        a.location  = this.cargoform.locId;
        a.status    = "计划中";
        this.header.tourItem.push(a);
      } else {
        //edit
        let idx   = this.cargoform.seq - 1;
        let locId = this.cargoform.locId;
        this.header.tourItem[idx].locid = this.cargoform.locId;
        let location = this.locations.find(location => {
          return location.locId == locId;
        });
        this.header.tourItem[idx].address = location.address;
        this.header.tourItem[idx].container = this.cargoform.container;
        this.header.tourItem[idx].quan = this.cargoform.quan;
        this.header.tourItem[idx].quanUom = this.cargoform.quanUom;
        this.header.tourItem[idx].commodity = this.cargoform.commodity;
        this.header.tourItem[idx].location = this.cargoform.locId;
      }
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
          debugger
          //set source location
          this.srcLoc = {
            lng: this.header.sourceLoc.lng,
            lat: this.header.sourceLoc.lat
          };

          //set destination location
          this.destLoc = {
            lng: this.header.destLoc.lng,
            lat: this.header.destLoc.lat
          };

          //this.header.vehicle = response.data.vehicle;

          let len = response.data.actualStops.length;
          this.thisPosition = {
            lng: len > 0 ? response.data.actualStops[len - 1].lng : response.data.sourceLoc.lng,
            lat: len > 0 ? response.data.actualStops[len - 1].lat : response.data.sourceLoc.lat
          };

          this.truckRoute();
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>