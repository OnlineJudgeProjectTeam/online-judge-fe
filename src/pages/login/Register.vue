<script lang="ts" setup>
    import { ref, reactive } from "vue";
    import request from "../../network/request";
    import { useRouter } from "vue-router";

    interface RegisterRef{
        success:boolean
    }

    const userinfo = reactive({
        account:"",
        username :"",
        email :"",
        pwd :""
    })

    let err = ref<string>('')
    const rExpEmail :RegExp = /[0-9]+@[0-9a-z]+.com/

    const rExpPwd :RegExp = /[0-9]+@[0-9a-z]+.com/

    const router = useRouter()

    async function register() {
      if (userinfo.account === "") {
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
        const { data, whenFinish } = request<RegisterRef>({
        url: "/user/Register",
        method: "post",
        data: userinfo,
        });
        whenFinish.then(() => {
        if (data.value?.success) {
            router.push("/login")
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
                <input type = "text" v-model="userinfo.account" placeholder="请输入您的账号">
            </div>
            <div class="username">
                <input type = "text" v-model="userinfo.username" placeholder="请输入您的用户名">
            </div>
            <div class="email">
                <input type = "text" v-model="userinfo.email" placeholder="请输入您的邮箱">
            </div>
            <div class="pwd">
                <input type="password" v-model="userinfo.pwd" placeholder="请输入您的密码">
            </div>
            <div class="msg">
                <span >{{ err }}</span>
            </div>
            <div class="btn" @click="register">
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
        border: 1px solid black;
        background-color: white;
      }
}

.right{  
    position: relative;
    .text{
        input{
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
    input{
        width: 60%;
        height: 40px;
        margin-top: 20px;
        margin-left: 20px;
        border: 1px solid rgb(65, 63, 63);
        background-color: rgba(255, 255, 255, 0.5);
        font-size: inherit;
        padding-left: 20px;
        outline: none;
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
        height: 40px;
        background-color: skyblue; 
        margin-top: 40px;
        .registerbtn{
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
}
</style>