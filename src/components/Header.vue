<script lang="ts" setup>

import { ref } from 'vue';
import { userStore } from "@/stores/login";

const store = userStore()
const person = ref<string>(store.$state.name)

const greet = ref<string>("Hello, "+ person.value +"!")

</script>

<template>
  <div class=" header">
    <div class="logo">
      <img src="" alt="">
      <a>OnlineJudge</a>
    </div>
    <div class="choice">
      <div class="">题库</div>
      <div class="">精选题解</div>
      <div class="">排行榜</div>
    </div>
    <div class="user">
      <a>{{ greet }}</a>
      <img src="" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 8vh;
  border-bottom: 1px solid gray;
  display: flex;
  background-color: rgb(241, 238, 238);
}
.logo{
  margin: auto 0;
  margin-left: 250px;
}
.choice{
  display: flex;
  justify-self: start;
  margin: auto;
  margin-left: 100px;
  div{
    width: 10vh;
    margin-right: 40px;
    margin-right: 40px;
    text-align: center;
    padding: 18px;
    // border-bottom: 3px solid black;
    &:hover{
      font-weight: 550;
      cursor: pointer;
    }
  }  
}
.user{
  margin: auto 0;
  margin-right: 100px;
}
</style>