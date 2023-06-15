<script lang="ts" setup>
import { ref, reactive } from "vue";
import request from "../../network/request";
import { useRouter } from "vue-router";
import { Person } from "@/type/user/index";
import { userStore } from "@/stores/login";
interface LoginRes {
    success:boolean
    user: Person
}

const userinfo = reactive({
  username: "",
  password: "",
});
let err = ref<string>("");

const rExp: RegExp = /[a-zA-Z0-9]{4,32}$/;

const router = useRouter();

const store = userStore()

async function handleLogin() {
  if (userinfo.username === "") {
    err.value = "用户名不能为空";
  } else if (!userinfo.password.match(rExp)) {
    err.value = "密码不符合规则";
  } else {
    const { data, whenFinish } = request<LoginRes>({
      url: "/user/Login",
      method: "post",
      data: userinfo,
    });
    whenFinish.then(() => {
      if (data.value?.success) {
        store.$state = data.value?.user
        router.push("/")
      }
      else{
        
      }
    });
  }
}

async function verify() {
  router.push("/verify");
}

async function register() {
  router.push("/registry");
}
</script>

<template>
  <div class="login">
    <div class="container">
      <div class="left">
        <img src="" alt="" />
        <h1>欢迎来到online-judge</h1>
        <h3>Welcome to online-judge</h3>
      </div>
      <div class="right">
        <div class="text">
                <input type = "text" v-model="userinfo.username" placeholder="请输入您的邮箱">
            </div>
            <div class="pwd">
                <input type="password" v-model="userinfo.password" placeholder="验证码">
            </div>
            <div class="msg">
                <span >{{ err }}</span>
            </div>
            <div class="btn" @click="handleLogin">
                <p class="loginbtn">登录</p>
            </div>
            <div class="verify" @click="verify">验证登录</div>
            <div class="register" @click="register">注册账号</div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url();
  background-size: 100% 100%;
  background-color:  #fce38a;
  .container {
    height: 80%;
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
.container {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  .left {
    width: 750px;
    h1{
        margin-top: 10px;
        color: black;
        white-space: nowrap;
    }
    h3{
        margin-top: 10px;
        font-size: 1.2rem;
        text-align:center;
        color: black;
        white-space: nowrap;
    } 
  }  
  
  .right {
    width: 400px;
    height: 400px;
    border-radius: 25px;
    border: 1px solid black;
    background-color: white;
  }
}

.right {
  position: relative;
  .text {
    input {
      width: 60%;
      height: 40px;
      margin-top: 80px;
      margin-left: 20px;
      border: 1px solid rgb(65, 63, 63);
      background-color: rgba(255, 255, 255, 0.5);
      font-size: inherit;
      padding-left: 20px;
      outline: none;
    }
  }
  .pwd {
    input {
      width: 60%;
      height: 40px;
      margin-top: 40px;
      margin-left: 20px;
      border: 1px solid rgb(65, 63, 63);
      background-color: rgba(255, 255, 255, 0.5);
      font-size: inherit;
      padding-left: 20px;
      outline: none;
    }
  }

  .msg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    font-size: 0.9rem;
    color: red;
  }
  .btn{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 40px;
        background-color: skyblue; 
        margin-top: 50px;
        .loginbtn{
        text-align:center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        &:hover{
           color: red;
           cursor: pointer;
        }  
        } 
  }
  .verify{
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-top: 20px;
    &:hover{
      color: blue;
      cursor: pointer;
    }
  }
  .register{
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-top: 15px;
    &:hover{
      color: blue;
      cursor: pointer;
    }
  }

}
</style>
