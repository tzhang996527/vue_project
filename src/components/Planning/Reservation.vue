<template>
  <div>
    <!-- dialg -->
    <el-dialog
      title="车辆预定"
      :visible.sync="dialogFormVisible"
      width="60%"
      label-width="100px"
      label-position="left">
      <el-form ref="ruleForm" :model="form" label-width="100px" class="demo-ruleForm" :inline=true>
            <el-form-item label="预定编号" prop="name" style>
              <!-- <el-col :span="12"> -->
                <el-input maxlength="10" v-model="form.resvId" :disabled="true"></el-input>
              <!-- </el-col> -->
            </el-form-item>
            <el-form-item label="类型">
              <!-- <el-col :span="18"> -->
                <el-select
                  v-model="form.resvType"
                  placeholder="请选择"
                  filterable
                  :default-first-option="true">
                  <el-option
                    v-for="item in resvTypes"
                    :key="item.resvType"
                    :label="item.text"
                    :value="item.resvType">
                    <span style="float: left">{{ item.text }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.resvType }}</span>
                  </el-option>
                </el-select>
              <!-- </el-col> -->
            </el-form-item>
            <el-form-item label="发车地点">
              <el-col :span="18">
                 <el-select
                  v-model="form.sourceLocid"
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
            <el-form-item label="计划出发时间">
              <el-col :span="18">
                 <el-date-picker
                  v-model="form.planDepart"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="目的地址">
              <el-col :span="18">
                <el-select
                  v-model="form.destLocid"
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
            <el-form-item label="计划到达时间">
              <el-col :span="18">
                 <el-date-picker
                  v-model="form.planArr"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="车辆编号" filterable label-width="100px">
              <el-select
                v-model="form.vehicleId"
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
                    style="float: right; color: #8492a6; font-size: 13px">{{ item.assetId }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="驾驶员编号" filterable label-width="100px">
              <el-select
                v-model="form.driverId"
                placeholder="请选择"
                filterable
                :default-first-option="true"
                @change="setDriver">
                <el-option
                  v-for="item in drivers"
                  :key="item.driverId"
                  :label="item.name"
                  :value="item.driverId">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.driverId }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户编号" filterable>
              <el-select
                v-model="form.custId"
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
            <el-form-item label="送达方" filterable>
              <el-select
                v-model="form.shipTo"
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="预定编号">
            <el-input v-model="formInline.resvId" placeholder="预定编号"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="formInline.resvType" placeholder="类型"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onGet">查询</el-button>
            <el-button type="primary" @click="onCreate">创建</el-button>
            <!-- dialog -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column type="index" width="50"></el-table-column>

          <el-table-column label="预定编号" sortable width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.resvId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="80">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>类型: {{ scope.row.resvType }}</p>
                <p>客户: {{ scope.row.shipTo }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.resvText }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="发车地点" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sourceLocAddr }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="planDepart" label="计划发车时间" width="180" :formatter="this.util.dateFormat">
          </el-table-column>

          <el-table-column label="目的地址" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.destLocAddr }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="planArr" label="计划到达时间" width="180" :formatter="this.util.dateFormat">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      edit: false,
      form: {
        resvId:"$1",
        resvType:"",
        sourceLocid:"",
        planDepart:"",
        destLocid:"",
        planArr:"",
        vehicleId:"",
        driverId:"",
        custId:"",
        shipTo:""
      },
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
      resvTypes: [],
      drivers:[],
      vehs: [],
      resvTypes: [],
      formInline: {
        resvId: "",
        resvType: "",
        sourceLocid:"",
        destLocid:"",
        vehicleId:"",
        driverId:"",
        shipTo:""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: []
    };
  },
  //用于数据初始化
  created: function() {
    if (this.MT_DATA) {
      this.locations = this.MT_DATA.locations;
      this.vehs = this.MT_DATA.assets;
      this.customers = this.MT_DATA.customers;
      this.drivers = this.MT_DATA.drivers;
      this.resvTypes = this.MT_DATA.resvTypes;
    }

    this.$axios
      .get("/api/v1/reservation",{
        params: {
            resvId: null
          }
      })
      .then(response => {
        debugger
        this.tableData = response.data;
        for(let i=0; i < this.tableData.length ; i++){
          for(let loc of this.locations){
            //source location
            if(loc.locId===this.tableData[i].sourceLocid){
               this.tableData[i].sourceLocAddr = loc.address;
            }

            //destination loc
            if(loc.locId===this.tableData[i].destLocid){
               this.tableData[i].destLocAddr = loc.address;
            }
          }

          for(let rt of this.resvTypes){
            if(rt.resvType === this.tableData[i].resvType){
              this.tableData[i].resvText = rt.text;
            }
          }
        }
      })
      .catch(function(error) {
        alert(error);
      });
  },
  methods: {
    handleEdit(index, row) {
      this.edit = true;
      this.dialogFormVisible = true;
      this.form.resvId=row.resvId;
      this.form.resvType=row.resvType;
      this.form.sourceLocid=row.sourceLocid;
      this.form.planDepart=row.planDepart;
      this.form.destLocid=row.destLocid;
      this.form.planArr=row.planArr;
      this.form.vehicleId=row.vehicleId;
      this.form.driverId=row.driverId;
      this.form.custId=row.custId;
      this.form.shipTo=row.shipTo;
      debugger;
      console.log(index, row.createdBy);
    },
    handleDelete(index, row) {
      this.$axios({
        url: "/api/v1/reservation/" + row.resvId,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080"
        }
      })
        .then(successResponse => {
          debugger;
          this.tableData = successResponse.data;
          for(let i=0; i < this.tableData.length ; i++){
            for(let loc of this.locations){
              //source location
              if(loc.locId===this.tableData[i].sourceLocid){
                this.tableData[i].sourceLocAddr = loc.address;
              }

              //destination loc
              if(loc.locId===this.tableData[i].destLocid){
                this.tableData[i].destLocAddr = loc.address;
              }
            }

            for(let rt of this.resvTypes){
              if(rt.resvType === this.tableData[i].resvType){
                this.tableData[i].resvText = rt.text;
              }
            }
          }
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
      console.log(index, row);
    },
    setVeh(vehId) {
      // this.form.vehicleId
    },
    setCust(custId) {
      // for (let c of this.customers) {
      //   if (c.custId === custId) {
          this.form.custId = custId;
          // this.header.soldto = {
          //   name:c.name,
          //   address:c.address
          // };
      //     break;
      //   }
      // }
    },
    setShipTo(shipTo) {
      // for (let c of this.customers) {
      //   if (c.custId === shipTo) {
          this.form.shipTo = shipTo;
          // this.header.shipto = {
          //   name:c.name,
          //   address:c.address
          // };
          // break;
      //   }
      // }
    },
    setDriver(driverId){
      // for (let d of this.drivers) {
      //   if (d.driverId === driverId) {
      //     this.header.driver = {
      //       driverId:d.driverId,
      //       name:d.name,
      //       tel:d.tel
      //     };
      //     break;
      //   }
      // }
    },
    onGet() {
      debugger;

      this.$axios
        .get("/api/v1/reservation", {
          params: {
            resvId: this.formInline.resvId,
            resvType: this.formInline.resvType
          }
        })
        .then(response => {
          debugger
          this.tableData = response.data;
        })
        .catch(function(error) {
          alert(error);
        });
    },
    onCreate() {
      this.dialogFormVisible = true;
      this.edit = false;
      this.form.resvId="$1";
      this.form.resvType="";
      this.form.sourceLocid="";
      this.form.planDepart="";
      this.form.destLocid="";
      this.form.planArr="";
      this.form.vehicleId="";
      this.form.driverId="";
      this.form.custId="";
      this.form.shipTo="";
    },
    onSubmit() {
      this.dialogFormVisible = false;
      debugger;
      if (this.edit === false) {
        this.$axios({
          url: "/api/v1/reservation",
          method: "post",
          data: this.form,
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:8080"
          }
        })
          .then(successResponse => {
            debugger;
            this.form.resvId="$1";
            this.form.resvType="";
            this.form.sourceLocid="";
            this.form.planDepart="";
            this.form.destLocid="";
            this.form.planArr="";
            this.form.vehicleId="";
            this.form.driverId="";
            this.form.custId="";
            this.form.shipTo="";
            this.tableData = successResponse.data;
            for(let i=0; i < this.tableData.length ; i++){
              for(let loc of this.locations){
                //source location
                if(loc.locId===this.tableData[i].sourceLocid){
                  this.tableData[i].sourceLocAddr = loc.address;
                }

                //destination loc
                if(loc.locId===this.tableData[i].destLocid){
                  this.tableData[i].destLocAddr = loc.address;
                }
              }

              for(let rt of this.resvTypes){
                if(rt.resvType === this.tableData[i].resvType){
                  this.tableData[i].resvText = rt.text;
                }
              }
            }
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      } else {
        this.$axios({
          url: "/api/v1/reservation",
          method: "put",
          data: this.form,
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:8080"
          }
        })
          .then(successResponse => {
            debugger;
            console.log(successResponse.data);
            this.form.resvId="$1";
            this.form.resvType="";
            this.form.sourceLocid="";
            this.form.planDepart="";
            this.form.destLocid="";
            this.form.planArr="";
            this.form.vehicleId="";
            this.form.driverId="";
            this.form.custId="";
            this.form.shipTo="";
            this.tableData = successResponse.data;
            for(let i=0; i < this.tableData.length ; i++){
              for(let loc of this.locations){
                //source location
                if(loc.locId===this.tableData[i].sourceLocid){
                  this.tableData[i].sourceLocAddr = loc.address;
                }

                //destination loc
                if(loc.locId===this.tableData[i].destLocid){
                  this.tableData[i].destLocAddr = loc.address;
                }
              }

              for(let rt of this.resvTypes){
                if(rt.resvType === this.tableData[i].resvType){
                  this.tableData[i].resvText = rt.text;
                }
              }
            }
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      }
    }
  }
};
</script>