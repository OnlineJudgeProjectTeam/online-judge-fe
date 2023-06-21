<script lang="ts" setup>
    import { ref, reactive } from "vue";
    import { useRouter } from "vue-router";
    import useRegister from "@/hooks/login/useRegister";
    import useRegisterSend from "@/hooks/login/useRegisterSend";

    const registerSend = useRegisterSend()

    const userinfo = reactive({
        name:"",
        username :"",
        email :"",
        code : "",
        pwd :""
    })

    let s = ref<string>("发送验证码")
    let isDisabled = ref<boolean>(false)
    let count = ref<number>(60)
    const register = useRegister();

    let err = ref<string>('')
    const rExpEmail :RegExp = /[0-9]+@[0-9a-z]+.com/

    const rExpPwd :RegExp = /[0-9]+@[0-9a-z]+.com/

    const router = useRouter()

    async function send(){
        if (userinfo.name === "") {
            err.value = "账号不能为空";
        } 
        else if(userinfo.username === ""){
          err.value = "用户名不能为空"
        }
        else if (!userinfo.email.match(rExpEmail)) {
          err.value = "邮箱不存在";
        }
        else{
            err.value = ""
            isDisabled.value = true;
            s.value = count.value + "s后重发"
            let id = setInterval(() => {
                if (count.value === 0) {
                    clearInterval(id)
                    s.value = "发送验证码"
                    isDisabled.value = true
                    count.value = 60
                }
                else{
                    count.value--;
                    s.value = count.value + "s后重发"
                }
            },1000)
            registerSend(userinfo.email).then((res: any) => {
            if (res.error.value) {
                err.value = res.error.value;
            }
            });
        }
    }

    async function handleRegister() {
      if (userinfo.name === "") {
        err.value = "账号不能为空";
      } 
      else if(userinfo.username === ""){
        err.value = "用户名不能为空"
      }
      else if (!userinfo.email.match(rExpEmail)) {
        err.value = "邮箱不存在";
      }
      else if (!userinfo.email.match(rExpPwd)) {
        err.value = "密码不符合规则";
      } else {
        register(userinfo).then((res: any) => {
        err.value = ""
        if (!res.error.value) {
          router.push("/login");
        }
        else{
          err.value = res.error.value;
        }
        });
      }
    }

</script>

<template>
  <div class="register">
    <div class="container">
        <div class="left">
            <img src="../../assets/images/logo.svg" alt="">
            <h1>欢迎来到online-judge</h1>
            <h3>Welcome to online-judge</h3>
        </div>
        <div class="right">
            <div class="text">
                <input type = "text" v-model="userinfo.name" placeholder="请输入您的账号">
            </div>
            <div class="username">
                <input type = "text" v-model="userinfo.username" placeholder="请输入您的用户名">
            </div>
            <div class="email">
                <input type = "text" v-model="userinfo.email" placeholder="请输入您的邮箱">
            </div>
            <div class="code">
                <input type="password" v-model="userinfo.code" placeholder="请输入验证码">
                <el-button class="click" @click="send" :disabled = isDisabled>{{ s }}</el-button>
            </div>
            <div class="pwd">
                <input type="password" v-model="userinfo.pwd" placeholder="请输入您的密码">
            </div>
            <div class="msg">
                <span >{{ err }}</span>
            </div>
            <div class="btn" @click="handleRegister">
                <p class="registerbtn">注册</p>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register{
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url();
    background-size: 100% 100%;
    background-color: #fce38a;
    .container{
        height: 80%;
        width: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
}
.container{
    display: flex;
    flex-direction:row;
    text-align:center;
    align-items: center;
    .left{
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
    .right{
        width: 400px;
        height: 400px;
        border-radius: 25px;
        border: 1px solid rgb(227, 229, 235);
        background-color: white;
      }
}

.right{  
    position: relative;
    .text{
        input{
        width: 60%;
        height: 35px;
        margin-top: 30px;
        margin-left: 20px;
        border: 1px solid rgb(227, 229, 235);
        background-color: rgba(255, 255, 255, 0.5);
        font-size: inherit;
        padding-left: 20px;
        outline: none;
    }
    }
    input{
        width: 60%;
        height: 35px;
        margin-top: 20px;
        margin-left: 20px;
        border: 1px solid rgb(227, 229, 235);
        background-color: rgba(255, 255, 255, 0.5);
        font-size: inherit;
        padding-left: 20px;
        outline: none;
    }

    .code{
        input{
            height: 35px;
            margin-top: 20px;
            margin-left: 20px;
            border: 1px solid rgb(227, 229, 235);
            background-color: rgba(255, 255, 255, 0.5);
            font-size: inherit;
            padding-left: 20px;
            outline: none;
            width: 33%;
        }
        .click{
            text-align: center;
            margin-left: 2%;
            width: 25%;
        }
    }

    .msg{
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
        height: 35px;
        background-color: skyblue; 
        margin-top: 40px;
        border-radius: 5px;
        cursor: pointer;
        .registerbtn{
            text-align:center;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            &:hover{
               color: red;
            }  
        } 
    }
}
</style>