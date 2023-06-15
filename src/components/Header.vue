<script lang="ts" setup>

import { ref } from 'vue';
import { userStore } from "@/stores/login";

const store = userStore()
const person = ref<string>(store.$state.name)

const greet = ref<string>("Hello, "+ person.value +"!")

const isShowb = ref<boolean>(true)
const isShows = ref<boolean>(false)
const isShowr = ref<boolean>(false)
async function displayb() {
  isShowb.value = true
  isShowr.value = false
  isShows.value = false
}
async function displays() {
  isShows.value = true
  isShowb.value = false
  isShowr.value = false
}
async function displayr() {
  isShowr.value = true
  isShows.value = false
  isShowb.value = false
}
</script>

<template>
  <div class=" header">
    <div class="logo">
      <img src="" alt="">
      <a>OnlineJudge</a>
    </div>
    <div class="choice">
      <div class="bank" @click="displayb">题库
        <hr :class=" isShowb === true ? 'show' : 'hide'">
      </div>
      <div class="solving" @click="displays">精选题解
        <hr :class=" isShows === true ? 'show' : 'hide'">
      </div>
      <div class="rank" @click="displayr">排行榜
        <hr :class=" isShowr === true ? 'show' : 'hide'">
      </div>
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
  box-shadow: 0 5px 10px -5px rgb(241, 238, 238);
  display: flex;
  background-color: white;
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
}
.bank{
    width: 5vh;
    margin-right: 40px;
    margin-right: 40px;
    text-align: center;
    padding: 18px;
    &:hover{
      font-weight: 550;
      cursor: pointer;
    }
    h{
      margin-top: 13px;
      border-color: black;
    }
}
.solving{
  width: 10vh;
    margin-right: 40px;
    margin-right: 40px;
    text-align: center;
    padding: 18px;
    &:hover{
      font-weight: 550;
      cursor: pointer;
    }
}
.rank{
    width: 8vh;
    margin-right: 40px;
    margin-right: 40px;
    text-align: center;
    padding: 18px;
    &:hover{
      font-weight: 550;
      cursor: pointer;
    }
    .hr{
      margin-torp: 13px;
      border-color: black;
    }
}
.user{
  margin: auto 0;
  margin-right: 100px;
}
.hide{
  display: none;
}
.show{
      margin-top: 13px;
      border-color: black;
}
</style>