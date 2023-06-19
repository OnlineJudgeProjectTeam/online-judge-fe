<script lang="ts" setup>
import { ref } from 'vue';





const onChange = (index:number) => {
  checked.value![index] = !checked.value![index]
}
const tags:string[] = ["数组","哈希表","位运算","分治","动态规划","前缀和","深度优先搜索","图",
"欧拉回路","贪心","排序","计数排序","字符串","数学","记忆化搜索","二分查找","单调栈","双指针","栈","模拟","计数"];

const checked = ref<boolean[]>() 
checked.value = new Array(21)

</script>



<template>
  <div class="tags">
    <el-check-tag :checked="checked![index]" @change="onChange" v-for="(tag,index) in tags" @click="$emit('chooseTags',tag,checked![index])">{{ tag }}</el-check-tag>
  </div>
</template>

<style lang="scss" scoped>
  .tags{
    width: 80%;
  }
  .el-check-tag{
    margin-left:10px;
    margin-top: 10px;
  }

</style>