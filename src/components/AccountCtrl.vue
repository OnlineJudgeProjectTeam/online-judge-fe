<template>
  <br /><br />
  <div class="main">
    <el-input
      v-model="form.password"
      type="password"
      placeholder="输入密码"
      show-password
      clearable
      class="medium"
    /><br /><br />
    <el-input
      v-model="firm"
      type="password"
      placeholder="确认密码"
      show-password
      clearable
      class="medium"
    />
    <br /><br />
    <el-input
      v-model="form.code"
      placeholder="输入验证码"
      class="inputcode"
      clearable
    />
    <el-button @click="apply" :disabled="isDisabled" class="getcode">{{
      s
    }}</el-button>
    <br />
    <div class="msg">
      <span>{{ err }}</span>
    </div>
    <br />
    <el-button type="primary" @click="send">提交</el-button>
  </div>
</template>

<script lang="ts" setup>
import { userStore } from "../stores/login";
import useSendCode from "../hooks/myspace/sendcode.ts";
import useEditCode from "../hooks/myspace/editcode.ts";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
const store = userStore();
const { userData } = storeToRefs(store);

const form = reactive({
  code: "",
  password: "",
  email: userData.value!.email,
});

let err = ref<string>("");
let firm = ref<string>("");
let s = ref<string>("发送验证码");
let isDisabled = ref<boolean>(false);
let count = ref<number>(60);

const sendcode = useSendCode();
const apply = () => {
  isDisabled.value = true;
  let id = setInterval(() => {
    if (count.value === 0) {
      clearInterval(id);
      s.value = "发送验证码";
      isDisabled.value = false;
      count.value = 60;
    } else {
      count.value--;
      s.value = count.value + "s后重发";
    }
  }, 1000);
  sendcode(form.email).then((res: any) => {
    if (!res.error.value) {
      err.value = "";
    } else {
      err.value = res.error.value;
    }
  });
  console.log("submit!");
};

const editcode = useEditCode();
const send = () => {
  if (form.password == "" || firm.value == "") {
    err.value = "请输入密码并确认密码";
    return;
  }
  if (form.password != firm.value) {
    err.value = "两次密码输入不一致";
    return;
  }
  editcode(form).then((res: any) => {
    if (!res.error.value) {
      window.location.reload();
    } else {
      err.value = res.error.value;
    }
  });
  console.log("submit!");
};
</script>

<style scoped>
.main {
  margin-left: 36mm;
  margin-top: 12mm;
  margin-bottom: 5mm;
}
.medium {
  width: 12cm;
}
.inputcode {
  width: 9.5cm;
}
.getcode {
  width: 2.5cm;
}
.msg {
  position: absolute;
  left: 38%;
  transform: translateX(-50%);
  margin-top: 0px;
  font-size: 0.9rem;
  color: red;
}
</style>
