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
            <el-form-item label="顺序" style label-width="100px">
              <el-col :span="10">
                <el-input maxlength="10" v-model="form.seq" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="站点" label-width="100px">
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
            <el-form-item label="计划出发时间" label-width="100px">
              <el-col :span="12">
                <el-time-picker
                  v-model="form.planDepart"
                  placeholder="选择时间"
                ></el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划到达时间" label-width="100px">
              <el-col :span="12">
                <el-time-picker
                  v-model="form.planArr"
                  placeholder="选择时间"
                ></el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="运行天数" label-width="100px">
          <el-col :span="12">
            <el-input-number
              v-model="form.days"
              placeholder="选择时间"
            ></el-input-number>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-col :span="18">
        <el-form ref="form" :model="header" label-width="100px" :inline="true">
          <el-form-item label="计划编号" label-width="100px">
            <el-input v-model="header.schId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSave">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="header" label-width="100px" :inline="false">
          <el-form-item label="计划类型" label-width="100px">
            <el-select
              v-model="header.schType"
              placeholder="请选择"
              filterable
              :default-first-option="true">
              <el-option
                v-for="item in schTypes"
                :key="item.schType"
                :label="item.text"
                :value="item.schType">
                <span style="float: left">{{ item.text }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.schType }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="header" label-width="100px" :inline="true">
          <el-form-item label="计划开始时间" label-width="100px">
            <el-col :span="11">
              <el-date-picker
                v-model="header.startDt"
                type="date"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="计划结束时间" label-width="100px">
            <el-col :span="11">
              <el-date-picker
                v-model="header.endDt"
                type="date"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form ref="ruleForm" :model="form" label-width="100px" class="demo-ruleForm" :inline=true>
              <el-form-item label="发车规则 :">
              </el-form-item>
          </el-form>
          <el-form ref="ruleForm" :model="header" label-width="100px" class="demo-ruleForm" :inline=true> 
              <el-form-item label="星期一">
                <el-switch v-model="header.mon"></el-switch>
              </el-form-item>
              <el-form-item label="星期二">
                <el-switch v-model="header.tue"></el-switch>
              </el-form-item>
              <el-form-item label="星期三">
                <el-switch v-model="header.wed"></el-switch>
              </el-form-item>
              <el-form-item label="星期四">
                <el-switch v-model="header.thu"></el-switch>
              </el-form-item>
        </el-form>
        <el-form ref="ruleForm" :model="header" label-width="100px" class="demo-ruleForm" :inline=true>
              <el-form-item label="星期五">
                <el-switch v-model="header.fri"></el-switch>
              </el-form-item>
              <el-form-item label="星期六">
                <el-switch v-model="header.sat"></el-switch>
              </el-form-item>
              <el-form-item label="星期日">
                <el-switch v-model="header.sun"></el-switch>
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
            <el-tab-pane label="停靠站点" name="tab_stop">
              <el-row>
                <el-col :span="24">
                  <el-table :data="header.schStops" style="width: 100%" stripe>
                    <el-table-column prop="seq" label="编号" sortable width="80"></el-table-column>
                    <el-table-column prop="address" label="停靠站点" width="180"></el-table-column>
                    <el-table-column prop = "planDepart" label="计划出发时间" width="180" :formatter="this.util.dateFormat">
                    </el-table-column>
                    <el-table-column prop = "planArr" label="计划到达时间" width="180" :formatter="this.util.dateFormat">
                    </el-table-column>
                    <el-table-column label="运行天数" width="180">
                      <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.days }}</span>
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
      item: [],
      UoMoptions:[],
      schTypes:[],
      form: {
        seq:"",
        locId:"",
        planDepart:"",
        planArr:"",
        days:0
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
      locations: [],
      customers: [],
      tourTypes: [],
      drivers:[],
      vehs: [],
      activeName: "tab_stop", //default tab
      header: {
        schId:"$1",
        schType:"",
        startDt:"",
        endDt:"",
        mon:false,
        tue:false,
        wed:false,
        thu:false,
        fri:false,
        sat:false,
        sun:false,
        schStops:[]
        }
      }
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

     this.$axios({
        url: "/api/v1/schType",
        method: "get"
      }).then(successResponse => {
          this.schTypes = successResponse.data;
          debugger;
    });
  },
  mounted() {},
  methods: {
    onSave() {
      debugger;
      let postData = this.header;
      this.$axios({
        url: "/api/v1/sch",
        method: "post",
        data: postData,
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080"
        }
      }).then(successResponse => {
          this.$notify({
            title: "成功",
            message: "计划 " + successResponse.data + " 创建成功",
            type: "success"
          });
          this.header.schId = successResponse.data;
          debugger;
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
    },
    addStop() {
      this.edit = false;
      this.dialogFormVisible = true;
      this.form.locId = "";
      this.form.address = "";
      this.form.days = 0;
      this.form.seq = this.header.schStops.length + 1;
      this.form.planDepart = "";
      this.form.planArr = "";
      this.form.status = "P";
    },
    onSubmit() {
      this.dialogFormVisible = false;
      debugger
      if (!this.edit) {
        let a = {};
        a.locid = this.form.locId;
        let location = this.locations.find(location => {
          return location.locId == a.locid;
        });
        a.address = location.address;
        a.seq = this.form.seq;
        a.planDepart = this.form.planDepart;
        a.planArr = this.form.planArr;
        a.status = this.form.status;
        a.days = this.form.days;
        this.header.schStops.push(a);
      } else {
        //edit
        let idx = this.form.seq - 1;
        let locId = this.form.locId;
        this.header.schStops[idx].locid = this.form.locId;
        let location = this.locations.find(location => {
          return location.locId == locId;
        });
        this.header.schStops[idx].address = location.address;
        this.header.schStops[idx].planDepart = this.form.planDepart;
        this.header.schStops[idx].planArr = this.form.planArr;
        this.header.schStops[idx].days = this.form.days;
      }
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
      this.form.days = row.days;
    },
    handleDelete(index, row) {
      this.header.schStops.splice(index, 1);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>