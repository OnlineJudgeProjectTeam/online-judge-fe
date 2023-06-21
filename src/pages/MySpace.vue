<template>
  <Header/>
  <!-- <br> -->
  <div class="layout-container-demo">
    <!-- <el-container>
      <el-header></el-header> -->
      <el-container>
        <el-aside width="200px">
          <!-- <el-scrollbar> -->
        <el-menu :default-openeds="['1', '2']">

          <el-sub-menu index="1">
            <template #title>
              <el-icon><setting /></el-icon>信息管理
            </template>
            <el-menu-item-group>

              <router-link class="alink" to="/infoeditor">
                <el-menu-item index="1-1">
                  <el-icon><User /></el-icon>基本信息
                </el-menu-item>
              </router-link>

              <router-link class="alink" to="/accountctrl">
                <el-menu-item index="1-2">
                  <el-icon><Lock /></el-icon>密码修改
                </el-menu-item>
              </router-link>

              <router-link class="alink" to="/showinfo">
                <el-menu-item index="1-3">
                  <el-icon><User /></el-icon>test
                </el-menu-item>
              </router-link>

            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <el-icon><CollectionTag /></el-icon>我的记录
            </template>
            <el-menu-item-group>

              <router-link class="alink" to="/myhistory">
                <el-menu-item index="2-1">
                  <el-icon><DataLine /></el-icon>做题记录
                </el-menu-item>
              </router-link>

              <router-link class="alink" to="/myupload">
                <el-menu-item index="2-2">
                  <el-icon><Notebook /></el-icon>我的题解
                </el-menu-item>
              </router-link>

            </el-menu-item-group>
          </el-sub-menu>

          <router-link class="alink" to="/mycollect">
                <el-menu-item index="3">
                  <el-icon><Star /></el-icon>收藏夹
                </el-menu-item>
          </router-link>

        </el-menu>
      <!-- </el-scrollbar> -->
        </el-aside>
        <el-main>
          <div style="width: 80%;margin: 0 auto">
            <router-view></router-view>
        </div>
        </el-main>
      </el-container>
    <!-- </el-container> -->
  </div>
</template>

<script lang="ts" setup>
import  Header  from "@/components/Header.vue";
import { Setting, CollectionTag, User, Star, DataLine, Notebook, Lock} from '@element-plus/icons-vue'

</script>

<style scoped>
.layout-container-demo .el-sub-menu tbody tr:hover>td{
  background-color: #ffffff !important;
  color: #ffffff !important;
}
.layout-container-demo{
  margin-top: 1.8mm;
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
/* .layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 10px;
} */

.alink{
text-decoration: none;
}
/* 
    /deep/ .el-submenu__title:focus {
      color: @font-color;
      background: none;
    }
    /deep/ .el-submenu__title:hover {
      color: @font-color;
      background: none;
    }
    .el-menu-item:focus, .el-menu-item:hover {
      color: @font-color;
      background-color: @font-bg-color;
    } */

</style>

<!-- <style lang="less">
//设置鼠标悬停时el-submenu的样式
.layout-container-demo:hover{
        background-color: #550d0d !important;
        color: #114b6e !important;
        i {
            color: #1787FB;
        } 
    }
</style> -->

<!-- css: {
  preprocessorOptions: {
      less: {
        math: "always",
      },
  },
}, -->