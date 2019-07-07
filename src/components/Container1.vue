<template>
  <div class="app">
    <el-container style="height: 100%; border: 1px #eee">
      <el-header class="app-header">
        <el-row>
          <el-col :span="6">
            <div align="center">
              <img src="@/assets/logo.png" :width="isCollapse ? '60' : '60'" height="60">
            </div>
          </el-col>
          <el-col :span="18">
            <!-- 我是样例菜单 -->
            <el-menu
              :default-active="defaultActive"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item @click.native="back">返回</el-menu-item>
              <el-submenu index="/2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">我的消息</el-menu-item>
                <el-menu-item index="2-2">设置</el-menu-item>
                <el-menu-item index="2-3" @click.native="logout">退出登录</el-menu-item>
              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="app-side app-side-left" :class="isCollapse=false">
          <div>
            <!-- 我是样例菜单 -->
            <el-menu
              :default-active="defaultActive"
              router
              class="el-menu-vertical-demo"
              @open="handleOpen"
              :collapse="isCollapse"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>主数据</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/assetType">车辆类型</el-menu-item>
                  <el-menu-item index="/asset">车辆主数据</el-menu-item>
                  <el-menu-item index="/location">仓库/配送中心</el-menu-item>
                  <el-menu-item index="/tourType">行程类型</el-menu-item>
                  <el-menu-item index="/resvType">预定类型</el-menu-item>
                  <el-menu-item index="/event">事件管理</el-menu-item>
                  <el-menu-item index="/customer">客户主数据</el-menu-item>
                  <el-menu-item index="/driver">驾驶员主数据</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-order"></i>
                  <span>运输计划</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/reservation">车辆预定</el-menu-item>
                  <el-menu-item index="/schedule">行程计划</el-menu-item>
                  <el-menu-item index="/createtour">创建行程</el-menu-item>
                  <el-menu-item index="/resvList">车辆预定清单</el-menu-item>
                  <el-menu-item index="/tourList">行程清单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-promotion"></i>
                  <span>运输执行</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">分组一</template> -->
                  <el-menu-item index="/monitor">实时监控</el-menu-item>
                  <el-menu-item index="/searchTour">行程查询</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-marketing"></i>
                  <span>数据分析</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">分组一</template> -->
                  <el-menu-item index="/cost">运输成本</el-menu-item>
                  <el-menu-item index="/tourRep">行程统计</el-menu-item>
                  <el-menu-item index="/tourUsage">车辆使用率</el-menu-item>
                  <el-menu-item index="/tourETA">车辆准点率</el-menu-item>
                  <el-menu-item index="/tourbroken">车辆故障统计</el-menu-item>
                  <el-menu-item index="/tourHistory">历史数据查询</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- $router包含了所有的路由包含了许多关键的对象和属性 -->
              <!-- <template v-for="route in $router.options.routes">
                <!-- v-if="route.children && route.children.length"> -->
                <!-- <template v-for="item in route.children">
                  <el-menu-item :key="route.path + '/' + item.path" :index="item.path">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ item.name }}</span>
                  </el-menu-item>
                </template> -->
              <!-- </template> -->
            </el-menu>
          </div>
        </el-aside>
        <el-main class="app-body">
          <template>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  name: "Container",
  data() {
    return {
      username: "",
      isCollapse: false
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
        this.MT_DATA.locations = response.data;
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
        this.MT_DATA.assets = response.data;
      })
      .catch(function(error) {
        alert(error);
      });

    //get all tour types
    this.$axios
      .get("/api/v1/tourType", {
        params: {
          tourType: null
        }
      })
      .then(response => {
        debugger;
        this.MT_DATA.tourTypes = response.data;
      })
      .catch(function(error) {
        alert(error);
      });

    //get all customrs
    this.$axios
      .get("/api/v1/customer", {
        params: {
          custId: null
        }
      })
      .then(response => {
        debugger;
        this.MT_DATA.customers = response.data;
      })
      .catch(function(error) {
        alert(error);
      });

    //get all drivers
    this.$axios
      .get("/api/v1/driver", {
        params: {
          custId: null
        }
      })
      .then(response => {
        debugger;
        this.MT_DATA.drivers = response.data;
      })
      .catch(function(error) {
        alert(error);
      });
  },
  computed: {
    // 默认激活的路由, 用来激活菜单选中状态
    defaultActive: function() {
      return this.$route.path;
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    logout: function() {
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // switch(key){
      //     case '1-1':
      //       this.$router.push('/page1');
      //       //this.breadcrumbItems  = ['导航一']
      //       break;
      //     case '2-1':
      //       this.$router.push('/page2')
      //       this.breadcrumbItems  = ['导航二']
      //       break;
      //     case '3':
      //       this.$router.push('/Page3')
      //       this.breadcrumbItems  = ['导航三']
      //       break;
      //   }
    },
    back(){
      this.$router.go(-1);//返回上一层
    }
  },
  mounted: function() {
    let user = sessionStorage.getItem("user");
    if (user) {
      this.username = user;
    }
  }
};
</script>
