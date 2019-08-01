<template>
  <div>
    <!-- dialg -->
    <el-dialog
      title="行程计划"
      :visible.sync="dialogFormVisible"
      width="50%"
      label-width="100px"
      label-position="left">
      <el-form ref="ruleForm" :model="form" label-width="100px" class="demo-ruleForm" :inline=true>
            <el-form-item label="计划编号" prop="name" style>
              <!-- <el-col :span="12"> -->
                <el-input maxlength="10" v-model="form.schId" :disabled="true"></el-input>
              <!-- </el-col> -->
            </el-form-item>
            <el-form-item label="计划类型">
              <!-- <el-col :span="18"> -->
                <el-select
                  v-model="form.schType"
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
              <!-- </el-col> -->
            </el-form-item>
            <el-form-item label="开始时间">
              <el-col :span="18">
                 <el-time-picker
                  v-model="form.startDt"
                  placeholder="选择时间"
                ></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-col :span="18">
                 <el-time-picker
                  v-model="form.endDt"
                  placeholder="选择时间"
                ></el-time-picker>
              </el-col>
            </el-form-item>
      </el-form>
      <el-form ref="ruleForm" :model="form" label-width="100px" class="demo-ruleForm" :inline=true>
            <el-form-item label="星期一">
              <el-switch v-model="form.mon"></el-switch>
            </el-form-item>
            <el-form-item label="星期二">
              <el-switch v-model="form.tue"></el-switch>
            </el-form-item>
            <el-form-item label="星期三">
              <el-switch v-model="form.wed"></el-switch>
            </el-form-item>
            <el-form-item label="星期四">
              <el-switch v-model="form.thu"></el-switch>
            </el-form-item>
      </el-form>
      <el-form ref="ruleForm" :model="form" label-width="100px" class="demo-ruleForm" :inline=true>
            <el-form-item label="星期五">
              <el-switch v-model="form.fri"></el-switch>
            </el-form-item>
            <el-form-item label="星期六">
              <el-switch v-model="form.sat"></el-switch>
            </el-form-item>
            <el-form-item label="星期日">
              <el-switch v-model="form.sun"></el-switch>
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
          <el-form-item label="计划编号">
            <el-input v-model="formInline.schId" placeholder="预定编号"></el-input>
          </el-form-item>
          <el-form-item label="计划类型">
            <el-input v-model="formInline.schType" placeholder="类型"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onGet">查询</el-button>
            <!-- dialog -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column type="index" width="20"></el-table-column>

          <el-table-column label="计划编号" sortable width="110">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.schId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划类型" width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>类型: {{ scope.row.schType }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.schText }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop = "startDt" label="计划开始时间" width="110" :formatter="this.util.dateFormat">
          </el-table-column>
          <el-table-column prop = "endDt" label="计划结束时间" width="110" :formatter="this.util.dateFormat">
          </el-table-column>
          <el-table-column label="星期一" width="70">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mon" active-value="true" inactive-value="false" disabled>
              </el-switch>
             </template>
          </el-table-column>
          <el-table-column label="星期二" width="70">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.tue" active-value="true" inactive-value="false" disabled>
              </el-switch>
             </template>
          </el-table-column>
          <el-table-column label="星期三" width="70">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.wed" active-value="true" inactive-value="false" disabled>
              </el-switch>
             </template>
          </el-table-column>
          <el-table-column label="星期四" width="70">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.thu" active-value="true" inactive-value="false" disabled>
              </el-switch>
             </template>
          </el-table-column>
          <el-table-column label="星期五" width="70">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.fri" active-value="true" inactive-value="false" disabled>
              </el-switch>
             </template>
          </el-table-column>
          <el-table-column label="星期六" width="70">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.sat" active-value="true" inactive-value="false" disabled>
              </el-switch>
             </template>
          </el-table-column>
          <el-table-column label="星期日" width="70">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.sun" active-value="true" inactive-value="false" disabled>
              </el-switch>
             </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleGen(scope.$index, scope.row)">生成行程</el-button>
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
        sun:false
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
      schTypes: [],
      formInline: {
        schId: "",
        schType: ""
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
      this.schTypes = this.MT_DATA.schTypes;
    }

    this.$axios
      .get("/api/v1/sch",{
        params: {
            schId: null
          }
      }).then(response => {
        debugger
        this.tableData = response.data;
        for(let i=0; i < this.tableData.length ; i++){
          for(let rt of this.schTypes){
            if(rt.schType === this.tableData[i].schType){
              this.tableData[i].schText = rt.text;
            }
          }
        }
      })
      .catch(function(error) {
        alert(error);
      });
  },
  methods: {
    formatDate: function(row, column, cellValue, index) {
      debugger
      if(cellValue !== "" && cellValue !== null){
        let a = new Date(cellValue)
        return a.toLocaleDateString();
      }
    },
    handleGen(index,row){
      this.$axios({
        url: "/api/v1/schGenTour",
        method: "post",
        data: {
          schId: row.schId
        },
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080"
        }
      }).then(successResponse => {
          this.$notify({
            title: "成功",
            message: " 创建成功" + successResponse.data.length + "个行程 ",
            type: "success"
          });
          // this.header.tourid = successResponse.data;
          debugger;
      }).catch(failResponse => {
          console.log(failResponse);
      });
    },
    handleEdit(index, row) {
      this.edit = true;
      this.dialogFormVisible = true;
      this.form.schId=row.resvId;
      debugger;
      console.log(index, row.createdBy);
    },
    handleDelete(index, row) {
      this.$axios({
        url: "/api/v1/sch/" + row.schId,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080"
        }
      }).then(successResponse => {
          debugger;
          this.tableData = successResponse.data;
          for(let i=0; i < this.tableData.length ; i++){
            for(let rt of this.schTypes){
              if(rt.resvType === this.tableData[i].schType){
                this.tableData[i].schText = rt.text;
              }
            }
          }
        })
        .catch(failResponse => {
          console.log(failResponse);
        });
      console.log(index, row);
    },
    onGet() {
      this.$axios
        .get("/api/v1/sch", {
          params: {
            schId: this.formInline.resvId,
            schType: this.formInline.resvType
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
    onSubmit() {
      this.dialogFormVisible = false;

      this.$axios({
          url: "/api/v1/sch",
          method: "put",
          data: this.form,
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:8080"
          }
        }).then(successResponse => {
            debugger;
            console.log(successResponse.data);
            this.tableData = successResponse.data;
            for(let i=0; i < this.tableData.length ; i++){

              for(let rt of this.schTypes){
                if(rt.resvType === this.tableData[i].resvType){
                  this.tableData[i].schText = rt.text;
                }
              }
            }
          })
          .catch(failResponse => {
            console.log(failResponse);
          });
      }
    }
};
</script>