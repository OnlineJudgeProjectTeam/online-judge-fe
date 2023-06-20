<template>
  test shoeinfo
    <div>
      <el-avatar :size="150" :src="form.avatar" />
      <br>
      <br>
      <el-descriptions :column="1" border>
    
        <el-descriptions-item label="昵称" v-model="form.name" ><p class="message">{{form.name}}</p></el-descriptions-item>
        <el-descriptions-item label="性别" v-model="sex"><p class="message">{{sex}}</p></el-descriptions-item>
        <el-descriptions-item label="学校" v-model="form.school" ><p class="message">{{form.school}}</p></el-descriptions-item>
        <el-descriptions-item label="公司" v-model="form.company" ><p class="message">{{form.company}}</p></el-descriptions-item>
        <el-descriptions-item label="个人描述" v-model="form.description"><p class="message">{{form.description}}</p></el-descriptions-item>

      </el-descriptions>
    </div>
    </template>
    
<script setup lang="ts">
// import { ref } from 'vue';
import { userStore } from "@/stores/login";
import { reactive } from 'vue'

const store = userStore(); 
const form = reactive({
  name: store.$state.name,
  sex: store.$state.sex,
  school: store.$state.school,
  company: store.$state.company,
  description: store.$state.description,
  avatar: store.$state.avatar,
})

var sex:string;
if(form.sex){
  sex = '男';
}
else{
  sex = '女';
}

</script>
    
<style scoped>
.message{
  width: 20em;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.long{
  width: 60em;
  height: 5cm;
  overflow: scroll;
  text-overflow:visible;
  white-space: nowrap;
}
</style>
    