<template>
  <el-container class="layout-container-demo" style="height: 900px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '1']">

          <el-sub-menu index="1">
            <template #title>
              <el-icon><setting /></el-icon>信息管理
            </template>
            <el-menu-item-group>
              
              <router-link class="alink" to="/showinfo">
                <el-menu-item index="1-1">
                  <el-icon><User /></el-icon>基本信息
                </el-menu-item>
              </router-link>

              <router-link class="alink" to="/infodditor">
                <el-menu-item index="1-2">
                  <el-icon><EditPen /></el-icon>信息修改
                </el-menu-item>
              </router-link>

              <router-link class="alink" to="/imageup">
                <el-menu-item index="1-3">
                  <el-icon><Picture /></el-icon>头像修改
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
                  <el-icon><DataLine /></el-icon>我的题解
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
      </el-scrollbar>
    </el-aside>

    <el-container>
      <!-- <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header> -->

      <el-main>
        <!-- <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar> -->
        <div style="width: 80%;margin: 0 auto">
            <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
// import { Menu as IconMenu, Message, Setting, CollectionTag } from '@element-plus/icons-vue'
// import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { Setting, CollectionTag, User, EditPen, Star, Picture, DataLine} from '@element-plus/icons-vue'

</script>

<style scoped>
.layout-container-demo .el-aside {
  /* color: var(--el-text-color-primary); */
  color: #D4D7DE;
  /* background: var(--el-color-primary-light-8); */
  background: #D4D7DE;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.alink{
text-decoration: none;
}
</style>
