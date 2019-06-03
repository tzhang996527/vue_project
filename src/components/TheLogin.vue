<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm2.username" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                        v-model="ruleForm2.password" 
                        auto-complete="off" 
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
            <el-checkbox 
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            logining: false,
            ruleForm2: {
                username: 'Admin',
                password: 'Admin',
            },
            rules2: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit(event){
            // this.$refs.ruleForm2.validate((valid) => {

                this.logining = true;
                if(this.ruleForm2.username === 'Admin' && 
                    this.ruleForm2.password === 'Admin'){
                        this.logining = false;
                        sessionStorage.setItem('user', this.ruleForm2.username);
                        this.$router.push({path: '/dashboard'});
                }else{
                    this.logining = false;
                    this.$alert('username or password wrong!', 'info', {
                        confirmButtonText: 'ok'
                    })
                }

                return
                
                var axios = require('axios')
                axios.defaults.baseURL = process.env.API

                axios({
                    url: '/login',
                    method: 'post',
                    data: {
                    username: this.ruleForm2.username,
                    password: this.ruleForm2.password
                    },
                    transformRequest: [function (data) {
                    // Do whatever you want to transform the data
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                    }],
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Origin':'http://localhost:8080'
                    }
                }).then(successResponse => {
                    // this.responseResult = JSON.stringify(successResponse.data)
                    // // if (successResponse.data.code === 200) {
                    // this.$router.replace({path: '/index'})
                    // }
                        this.logining = false;
                        sessionStorage.setItem('user', this.ruleForm2.username);
                        this.$router.push({path: '/dashboard'});
                    })
                    // .catch(failResponse => {
                    //     this.logining = false;
                    //     this.$alert('username or password wrong!', 'info', {
                    //         confirmButtonText: 'ok'
                    //     })
                    // })

                // if(valid){
                //     this.logining = true;
                //     if(this.ruleForm2.username === 'admin' && 
                //        this.ruleForm2.password === '123456'){
                //            this.logining = false;
                //            sessionStorage.setItem('user', this.ruleForm2.username);
                //            this.$router.push({path: '/'});
                //     }else{
                //         this.logining = false;
                //         this.$alert('username or password wrong!', 'info', {
                //             confirmButtonText: 'ok'
                //         })
                //     }
                // }else{
                //     console.log('error submit!');
                //     return false;
                // }
            // })
        }
    }
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>