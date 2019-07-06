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
        <div class="grid-content bg-purple-light">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="车辆信息" name="tab_veh">
              <el-row>
                <el-col :span="18">
                  <div class="grid-content bg-purple">
                    <!-- <el-form ref="form" :model="header" label-width="auto"> -->
                      
                      <el-form ref="form" :model="header" label-width="auto" :inline=true>
                        <el-form-item label="车辆编号" filterable>
                        <!-- <el-col :span="12"> -->
                          <el-select
                            v-model="header.vehicle.assetId"
                            placeholder="请选择"
                            filterable
                            :default-first-option=true
                            @change="setVeh">
                            <el-option
                              v-for="item in vehs"
                              :key="item.assetId"
                              :label="item.platenumber"
                              :value="item.assetId">
                              <span
                                style="float: left"
                              >{{ item.platenumber + "," + item.assetType }}</span>
                              <span
                                style="float: right; color: #8492a6; font-size: 13px"
                              >{{ item.assetId }}</span>
                            </el-option>
                          </el-select>
                        <!-- </el-col> -->
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
                        <!-- <el-col :span="11"> -->
                          <el-date-picker
                            type="date"
                            v-model="header.vehicle.year"
                            style="width: 100%;"
                          ></el-date-picker>
                        <!-- </el-col> -->
                      </el-form-item>
                      <el-form-item label="车载设备编号">
                        <el-select v-model="header.vehicle.hardware"></el-select>
                      </el-form-item>
                      <el-form-item label="车辆所在地">
                        <el-select v-model="header.vehicle.location"></el-select>
                      </el-form-item>
                      </el-form>
                    <!-- </el-form> -->
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
                    <el-table-column prop="address" label="停靠站点">
                    </el-table-column>
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
                    <el-button @click="addStop" size="mini" type="primary">添加</el-button>
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
      edit: false,
      item:[],
      form:{
        locId:"",
        address:"",
        seq:"",
        planDepart:"",
        planArr:"",
        status:"P"
      },
      dialogFormVisible: false,
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
      locations: [],
      tourTypes:[],
      vehs: [],
      activeName: "tab_veh", //default tab
      header: {
        tourid: "$1",
        tourType:"",
        sourceLoc: {
          locId: ""
        },
        destLoc: {
          locId: ""
        },
        plannedStopsDetail: [],
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
    if(this.MT_DATA){
      this.locations = this.MT_DATA.locations;
      this.tourTypes = this.MT_DATA.tourTypes;
      this.vehs      = this.MT_DATA.assets;
    }
  },
  mounted() {},
  methods: {
    onSave(){
      debugger
      let postData = this.header;
      this.$axios({
          url: "/api/v1/tour",
          method: "post",
          data: postData,
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:8080"
          }
        }).then(successResponse => {
          this.$notify({
            title: '成功',
            message: '行程 '+ successResponse.data +' 创建成功',
            type: 'success'
          });
          this.header.tourid = successResponse.data;
            debugger;
        }).catch(failResponse => {
            console.log(failResponse);
      });
    },
    addStop() {
      this.edit = false;
      this.dialogFormVisible = true;
      this.form.locId="";
      this.form.address="";
      this.form.seq=this.header.plannedStopsDetail.length+1;
      this.form.planDepart="";
      this.form.planArr="";
      this.form.status="P";
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
      this.dialogFormVisible = false;
      if(!this.edit){
      let a = {};
      a.locid = this.form.locId;
      let location = this.locations.find(location => {
          return location.locId == a.locid;
      });
      a.address = location.address;
      a.seq=this.form.seq;
      a.planDepart = this.form.planDepart;
      a.planArr = this.form.planArr;
      a.status =  this.form.status;
      this.header.plannedStopsDetail.push(a);
      }else{
        //edit
        let idx = this.form.seq - 1;
        let locId = this.form.locId;
        this.header.plannedStopsDetail[idx].locid = this.form.locId;
        let location = this.locations.find(location => {
          return location.locId == locId;
        });
        this.header.plannedStopsDetail[idx].address = location.address;
        this.header.plannedStopsDetail[idx].planDepart = this.form.planDepart;
        this.header.plannedStopsDetail[idx].planArr = this.form.planArr;
      }
      debugger;
      console.log("submit!");
    },
    handleEdit(index, row) {
      this.edit = true
      this.dialogFormVisible = true;
      this.form.locId   = row.locId;
      this.form.address = row.address;
      this.form.seq    = row.seq;
      this.form.planDepart = row.planDepart;
      this.form.planArr    = row.planArr;
      this.form.status     = row.status;
    },
    handleDelete(index, row) {
      let idx = row.seq - 1;
      debugger
      this.header.plannedStopsDetail.splice(idx,1);
      debugger
    },
    handleClick(tab, event) {
      // console.log(this.$parent.$data.formInline.tourid);
      console.log(tab, event);
    }
  }
};
</script>