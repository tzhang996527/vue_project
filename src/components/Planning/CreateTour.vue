<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="header" label-width="80px">
            <el-form-item label="行程编号">
              <el-col :span="10">
                <el-input v-model="header.tourid" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="发车地点">
              <el-select
                v-model="header.sourceLoc.addres"
                placeholder="请选择"
                filterable
                default-first-option="true"
              >
                <el-option
                  v-for="item in locations"
                  :key="item.locId"
                  :label="item.address"
                  :value="item.locId"
                >
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
            <el-form-item label="目的地址">
              <el-select
                v-model="header.destLoc.addres"
                placeholder="请选择"
                filterable
                default-first-option="true"
              >
                <el-option
                  v-for="item in locations"
                  :key="item.locId"
                  :label="item.address"
                  :value="item.locId"
                >
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
            <el-tab-pane label="车辆信息" name="tab_veh">
              <el-row>
                <el-col :span="18">
                  <div class="grid-content bg-purple">
                    <el-form ref="form" :model="header" label-width="100px">
                      <el-form-item label="车辆编号" filterable>
                        <el-col :span="12">
                          <el-select
                            v-model="header.vehicle.assetId"
                            placeholder="请选择"
                            filterable
                            default-first-option="true"
                            @change="setVeh"
                          >
                            <el-option
                              v-for="item in vehs"
                              :key="item.assetId"
                              :label="item.platenumber"
                              :value="item.assetId"
                            >
                              <span
                                style="float: left"
                              >{{ item.platenumber + "," + item.assetType }}</span>
                              <span
                                style="float: right; color: #8492a6; font-size: 13px"
                              >{{ item.assetId }}</span>
                            </el-option>
                          </el-select>
                        </el-col>
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
                    <el-button @click="createStop" size="mini"
                          type="primary">添加</el-button>
                  </div>
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
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      locations: [],
      vehs: [],
      activeName: "tab_veh", //default tab
      header: {
        tourid: "$1",
        sourceLoc: {
          address: ""
        },
        destLoc: {
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
    //get all locations
    this.$axios
      .get("/api/v1/loc", {
        params: {
          locId: null,
          address: null
        }
      })
      .then(response => {
        debugger;
        this.locations = response.data;
      })
      .catch(function(error) {
        alert(error);
      });

    //get all vehicles
    this.$axios
      .get("/api/v1/asset", {
        params: {
          assetId: null,
          assetTpye: null
        }
      })
      .then(response => {
        debugger;
        this.vehs = response.data;
      })
      .catch(function(error) {
        alert(error);
      });
  },
  mounted() {},
  methods: {
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
          debugger;
          break;
        }
      }
      debugger;
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
    }
  }
};
</script>