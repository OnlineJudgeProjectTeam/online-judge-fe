<template>
    <div>
      <br>
      <br>
      
        <div  style="width:14%;height: 130px;border-radius: 100px;display:inline-block;">
          <img
            style="width:100%;height: 100%;border-radius: 100px"
            src="../assets/images/avatar.jpg"
            class="image"
          ></div>
    
      <br>
      <br>
      <el-descriptions :column="1" border>
    
        <el-descriptions-item label="账号" v-model="name" ><p class="message">{{name}}</p></el-descriptions-item>
        <!-- <el-descriptions-item label="邮箱号" v-model="person.email" class="message"><p class="message">{{person.email}}</p></el-descriptions-item>
        <el-descriptions-item label="个人描述" v-model="person.description" class="message" ><p class="message">{{person.description}}</p></el-descriptions-item>
        <el-descriptions-item label="学校" v-model="person.school" class="message"><p class="message">{{person.school}}</p></el-descriptions-item>
     -->
      </el-descriptions>
    </div>
    </template>
    
    <script setup lang="ts">
    import { ref } from 'vue';
    import { userStore } from "@/stores/login";
    const store = userStore()
    const name = ref<string>(store.$state.name + '  name')
    </script>
    
    <style scoped>
    .message{
      width: 20em;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    </style>
    