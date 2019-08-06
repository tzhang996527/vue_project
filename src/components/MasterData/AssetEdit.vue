<template>
  <div>
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆编号" prop="assetId" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.assetId"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号码" prop="platenumber" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.platenumber"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆类型">
              <el-col :span="12">
                <!-- <el-input maxlength="30" v-model="form.assetType"></el-input> -->
                <el-select v-model="form.assetType" placeholder="请选择">
                  <el-option
                    v-for="item in tableAssetType"
                    :key="item.assetType"
                    :label="item.assetText"
                    :value="item.assetType"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="制造商">
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.make"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆型号" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.model"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="VIN" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.vin"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出厂日期" style>
              <el-col :span="12">
                <el-input maxlength="10" v-model="form.year"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在地" style>
              <el-col :span="12">
                <el-select
                  v-model="form.location"
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
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">保 存</el-button>
      </div>
  </div>
</template>
<script>
//asset.vue要访问util.js需要返回上级目录components的上级目录src,然后再访问/components/store/util
// import {formatDate} from '../../components/store/util'
import {Dateformat} from '../store/util' //访问上级目录(components)下的store/util

export default {
  data() {
    var checkassetId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('车辆编号不能为空'));
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      };
      var validateplatenumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入车牌号码'));
        } else {
          // if (this.ruleForm.checkPass !== '') {
          //   this.$refs.ruleForm.validateField('checkPass');
          // }
          callback();
        }
      };
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else if (value !== this.ruleForm.pass) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
    return {
      notifyPromise:Promise.resolve(),
      search: "",
      edit: false,
      form: {
        assetType: "",
        assetId: "",
        platenumber: "",
        make: "",
        model: "",
        vin: "",
        year: "",
        hardware: "",
        location: ""
      },
      rules: {
         assetId: [
            { validator: checkassetId, trigger: 'blur' }
          ],
          platenumber: [
            { validator: validateplatenumber, trigger: 'blur' }
          ]
      },
      formInline: {
        assetType: "",
        assetId: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: [],
      tableAssetType: [],
      locations:[]
    };
  },
  //用于数据初始化
  created: function() {
    if (this.MT_DATA) {
      this.locations = this.MT_DATA.locations;
    }
    // Init get asset type
    this.$axios
      .get("/api/v1/assetType", {
        params: {
          assetType: null,
          assetText: null
        }
      })
      .then(response => {
        this.tableAssetType = response.data;
      })
      .catch(function(error) {
        alert(error);
      });

     // 取到路由带过来的参数
    debugger
    var routerParams = this.$route.params.id;
    this.form.assetId = routerParams;

    this.$axios
        .get("/api/v1/asset/" + this.form.assetId)
        .then(response => {
          this.form = response.data;
        }).catch(function(error) {
          alert(error);
        });
  },
  methods: {
    notify(msg){
      //通知，解决element-ui，同时调用notify时，通知重叠的问题
        this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(()=>{
          this.$notify({
            title: "警告",
            message: msg,
            dangerouslyUseHTMLString: true,
            position: "bottom-right",
            type: 'warning'
          });
        })
    },
    onCancel(){
      this.$router.go(-1);
    },
    onSubmit() {
      var formName = 'ruleForm';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      this.$axios({
          url: "/api/v1/asset",
          method: "put",
          data: this.form,
          headers: {
            "Content-Type": "application/json"
          }
        }).then(successResponse => {
          this.$notify({
              title: '成功',
              message: '车辆' + this.form.assetId + '更新成功',
              type: 'success'
          });
        }).catch(failResponse => {
          debugger
            this.notify( '车辆' + this.form.assetId + '更新失败');

            let msgList = failResponse.response.data.errors;
            
            for (let index = 0; index < msgList.length; index++) {
              const element = msgList[index];
              this.notify(element);
            }
        });
      }
    }
};
</script>