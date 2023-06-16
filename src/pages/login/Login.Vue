<script lang="ts" setup>
import useLogin from "../../hooks/login/useLogin";
import { userStore } from "../../stores/login";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const userinfo = reactive({
  username: "",
  password: "",
});

const login = useLogin();

let err = ref<string>("");

const rExp: RegExp = /[a-zA-Z0-9]{4,32}$/;

const router = useRouter();

const store = userStore();

async function handleLogin() {
  err.value = ""
  if (userinfo.username === "") {
    err.value = "用户名不能为空";
  } else if (!userinfo.password.match(rExp)) {
    err.value = "密码不符合规则";
  } else {
    login(userinfo).then((res: any) => {
      if (!res.error) {
        store.$state = res.data.value;
        router.push("/");
      }
      else{
        err.value = res.error;
      }
    });
  }
}

async function verify() {
  router.push("/verify");
}

async function register() {
  router.push("/register");
}
</script>

<template>
  <div class="login">
    <div class="container">
      <div class="left">
        <img src="../../assets/images/logo.svg" alt="" />
        <h1>欢迎来到online-judge</h1>
        <h3>Welcome to online-judge</h3>
      </div>
      <div class="right">
        <div class="text">
          <input
            type="text"
            v-model="userinfo.username"
            placeholder="请输入您的用户名"
          />
        </div>
        <div class="pwd">
          <input
            type="password"
            v-model="userinfo.password"
            placeholder="请输入密码"
          />
        </div>
        <div class="msg">
          <span>{{ err }}</span>
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
  background-color: #fce38a;
  .container {
    height: 80%;
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.container {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  .left {
    width: 750px;
    h1 {
      margin-top: 10px;
      color: black;
      white-space: nowrap;
    }
    h3 {
      margin-top: 10px;
      font-size: 1.2rem;
      text-align: center;
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
  .btn {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 40px;
    background-color: skyblue;
    margin-top: 50px;
    cursor: pointer;
    .loginbtn {
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      &:hover {
        color: red;
      }
    }
  }
  .verify {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-top: 20px;
    &:hover {
      color: blue;
      cursor: pointer;
    }
  }
  .register {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-top: 15px;
    &:hover {
      color: blue;
      cursor: pointer;
    }
  }
}
</style>
