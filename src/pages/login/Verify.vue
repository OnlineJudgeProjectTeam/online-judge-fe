<script lang="ts" setup>
  import { ref,reactive } from "vue"
  import request from "../../network/request"
 import { useRouter } from "vue-router";


    interface Data{
        code:string
        success:boolean
    }


    const userinfo = reactive({
        email : "",
        code : ""
    })
    let err = ref<string>("")
    let s = ref<string>("发送验证码")
    let code = ref<string>("")
    let isDisabled = ref<boolean>(true)
    let count = ref<number>(60)

    const rExp :RegExp = /[0-9]+@[0-9a-z]+.com/
    const router = useRouter()

    async function send(){
        const { data, whenFinish } = request<Data>({
            url: "/user/Loginsend",
            method: "post",
            data: userinfo,
            });
            whenFinish.then(() => {
            if (data.value?.code) {
                code.value = data.value.code
                isDisabled.value = false;
                s.value = count.value + "s后重发"
                let id = setInterval(() => {
                    count.value--;
                    s.value = count.value + "s后重发"
                },1000)
                if (count.value === 0) {
                    clearInterval(id)
                    s.value = "发送验证码"
                    isDisabled.value = true
                    count.value = 60
                }
            }
            });
    }

    async function handleVerify() {
        if(!userinfo.email.match(rExp)){
            err.value = "邮箱不存在"
        }
        else if(!code.value.match(rExp)){
            err.value = "密码不符合规则"
        }
        else{
            const { data, whenFinish } = request<Data>({
            url: "/user/LoginByCode",
            method: "post",
            data: userinfo,
            });
            whenFinish.then(() => {
            if (data.value?.success) {
                router.push("/")
            }
            });
        }
    }

</script>

<template>
  <div class="verify">
    <div class="container">
        <div class="left">
            <img src="" alt="">
            <h1>欢迎来到online-judge</h1>
            <h3>Welcome to online-judge</h3>
        </div>
        <div class="right">
            <div class="text">
                <input type = "text" v-model="userinfo.email" placeholder="请输入您的邮箱">
            </div>
            <div class="code">
                <input type="password" v-model="userinfo.code" placeholder="验证码">
                <p  @click="send" :disabled = isDisabled>{{ s }}</p>
            </div>
            <div class="msg">
                <span >{{ err }}</span>
            </div>
            <div class="btn" @click="handleVerify">
                <p class="loginbtn">登录</p>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.verify{
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
            margin-top: 80px;
            margin-left: 20px;
            border: 1px solid rgb(65, 63, 63);
            background-color: rgba(255, 255, 255, 0.5);
            font-size: inherit;
            padding-left: 20px;
            outline: none;
        }
    }

    .code{
        input{
            height: 40px;
            margin-top: 40px;
            margin-left: 20px;
            border: 1px solid black;
            background-color: rgba(255, 255, 255, 0.5);
            font-size: inherit;
            padding-left: 20px;
            outline: none;
            width: 33%;
        }
        p{
            border: 1px solid black;
            border-radius: 2px;
            cursor: pointer;
            margin-left: 2%;
            display: inline-block;
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
     
}
</style>