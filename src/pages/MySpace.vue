<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header/></el-header>
      <el-main>
        <div class="main">
          <div class="layout-container-demo">

    <!-- <el-container>
      <el-header></el-header> -->
      <el-container>
        <el-aside width="200px" class="aside">

    <div class="menu">
      <router-link class="alink" to="/infoeditor">
<el-icon><User /></el-icon> 基本信息
  </router-link>
  </div>

  <div class="menu">
      <router-link class="alink" to="/accountctrl">
<el-icon><Lock /></el-icon> 密码修改
  </router-link><br>
  </div>

  <div class="menu">
      <router-link class="alink" to="/myhistory">
<el-icon><DataLine /></el-icon> 做题记录
  </router-link><br>
  </div>

  <div class="menu">
      <router-link class="alink" to="/myupload">
<el-icon><Notebook /></el-icon> 我的题解
  </router-link><br>
  </div>

  <div class="menu">
      <router-link class="alink" to="/mycollect">
<el-icon><Star /></el-icon> 我的收藏
  </router-link><br>
  </div>

  <!-- <div class="menu">
      <router-link class="alink" to="/infoeditor">
<el-icon><User /></el-icon>基本信息
  </router-link>
  </div> -->

        </el-aside>
        <el-main>
          <div>
            <router-view></router-view>
        </div>
        </el-main>
      </el-container>
    <!-- </el-container> -->
  </div>

        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import  Header  from "@/components/Header.vue";
import { Setting, CollectionTag, User, Star, DataLine, Notebook, Lock} from '@element-plus/icons-vue'
</script>

<style scoped>
.el-aside{
  margin-right: 0px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.main{
  margin: 0 15vw;
}
.layout-container-demo{
  margin-top: 1.5mm;
}
/* .layout-container-demo .el-aside tbody tr:hover>td {
  background-color:transparent!important;
}  */

/* .layout-container-demo .el-aside-column .button:hover {
    background-color: #4CAF50; 
    color: white;
} */
.layout-container-demo > .el-aside--enable-row-hover .el-table__body tr:hover > td {
  background-color: white !important;
}

.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.alink{
text-decoration: none;
color: black;
}
.menu{
  margin: 20px 0;
  padding: 10px;
  text-align: center;
  &:hover{
    cursor: pointer;
    background-color: rgb(237, 238, 240);
  }
  &:focus{
    background-color: rgb(237, 238, 240);
  }
}
/* .button{
  margin: 20px 0;
  padding: 10px;
  text-align: center;
  &:hover{
    cursor: pointer;
    background-color: rgb(237, 238, 240);
  }
  &:focus{
    background-color: rgb(237, 238, 240);
  }
} */

</style>