<template>
  <br>
  <el-input
    v-model="form.password"
    type="password"
    placeholder="输入密码"
    show-password
  />
  <el-input
    v-model="form.code"
    type="password"
    placeholder="输入验证码"
    clearable
  />
  <el-button type="primary" @click="apply">获取验证码</el-button>
  <el-button @click="send">提交</el-button>
</template>

<script lang="ts" setup>
import { userStore } from "../stores/login";
import { ref, reactive } from "vue";
import useSendCode from "../hooks/myspace/sendcode.ts";
import useEditCode from "../hooks/myspace/editcode.ts";

const store = userStore();
const form = reactive({
  code: '',
  password: '',
  email: store.$state.email,
})

const sendcode = useSendCode();
const apply = () => {
  sendcode(form.email).then((res: any) => {
    if (!res.error.value) {
    }
    // else{
    // }
  });
  console.log('submit!');
}

const editcode = useEditCode();
const send = () => {
  alert(form.code);
  editcode(form).then((res: any) => {
    if (!res.error.value) {
    }
    // else{
    // }
  });
  console.log('submit!');
}

</script>

