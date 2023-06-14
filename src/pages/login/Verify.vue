<script lang="ts" setup>
    import { ref,reactive } from 'vue'
    import request from '../../network/request'
    const userinfo = reactive({
        email : "",
        code : ""
    })
    let err = ref<string>("")

    const rExp :RegExp = /[0-9]+@[0-9a-z]+.com/

    async function send(){
        request({url:'/user/send',method:'post'})
    }

    async function handleVerify() {
        if(!userinfo.email.match(rExp)){
            err.value = "邮箱不存在"
        }
        // else if(){
        //     err.value = "密码不符合规则"
        // }
        else{
            request({url:'/login',method:'post',data:userinfo})
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
                <span @click="send">发送验证码</span>
            </div>
            <div class="pwd">
                <input type="password" v-model="userinfo.code" placeholder="请输入验证码">
            </div>
            <div class="msg">
                <span v-html="err"></span>
            </div>
            <div class="btn">
                <button class="loginbtn" @click="handleVerify">登录</button>
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
        // border-radius: 25px;
        // border: 1px solid black;
        // background-color: #fff;
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

    .pwd{
        input{
            width: 60%;
            height: 40px;
            margin-top: 40px;
            margin-left: 20px;
            border: 1px solid black;
            background-color: rgba(255, 255, 255, 0.5);
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
        width: 80%;
        height: 40px;
        margin-top: 25px;
        background-color: skyblue; 
        &:hover{
           color: red;
           cursor: pointer;
        }  
    } 
     
}
</style>