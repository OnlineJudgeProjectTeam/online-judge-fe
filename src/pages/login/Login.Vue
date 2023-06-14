<script lang="ts" setup>
    import { ref,reactive } from 'vue'
    import request from '../../network/request'

    const userinfo = reactive({
        username : "",
        password : ""
    })
    let err = ref<string>("")

    const rExp :RegExp = /[a-zA-Z0-9]{4,32}$/

    async function handleLogin(userinfo) {
        if(userinfo.username === null){
            err.value = "用户名不能为空"
        }
        else if(!userinfo.password.match(rExp)){
            err.value = "密码不符合规则"
        }
        else{
            request({url:'/login',method:'post',data:userinfo})
        }
    }

    async function verify() {
        this.router.push('/verify') 
    }

    async function register() {
        this.router.push('/registry') 
    }

</script>

<template>
  <div class="login">
    <div class="container">
        <div class="left">
            <img src="" alt="">
            <h1>欢迎来到</h1>
            <h3>Welcome to</h3>
        </div>
        <div class="right">
            <div class="submit">
                用户名
                <input type = "text" v-model="userinfo.username" placeholder="请输入您的账号">
            </div>
            <div>
                密码
                <input type="password" v-model="userinfo.password" placeholder="请输入您的账号">
            </div>
            <div class="msg">
                <span v-html="err"></span>
            </div>
            <div class="btn">
                <button class="loginbtn" @click="handleLogin">登录</button>
            </div>
            <div class="verify" @click="">
                验证码登录
            </div>
            <div class="register" @click="">
                注册账号
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login{
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url();
    background-size: 100% 100%;
    background-color: skyblue;
    .container{
        height: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 25px;
        border: 1px solid black;
    }
}
.container{
    display: flex;
    flex-direction:row;
    text-align:center;
    align-items: center;
    .left{
        width: 500px;
        h1{
            color: white;
            white-space: nowrap;
        }
        h3{
            font-size: 1.2rem;
            text-align:center;
            color: white;
            white-space: nowrap;
        }   
    }
    .right{
        width: 400px;
      }
}

.right{
    display: flex;
    justify-content: center;
    align-items: center;
    .submit{
        input{
            width: 80%;
            height: 45px;
            margin-top: 10px;
            border: 1px solid white;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            font-size: inherit;
            padding-left: 20px;
            outline: none;
        }
    }

    .msg{
        margin-top: 26px;
        font-size: 0.9rem;
        color: red;
    }
    .loginbtn{
        width: 100%;
        height: 35px;
        margin-top: 10px;
        border-radius: 10px;
        background-color: rgba(207, 38, 38, 0.8);    
    } 
    
}

</style>