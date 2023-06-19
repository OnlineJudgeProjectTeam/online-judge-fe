<script lang="ts" setup>
import { ref, Ref } from "vue";

const onChange = (index: number) => {
  // checked.value![index] = !checked.value![index]
  if (activeTag.value.indexOf(index) >= 0) {
    activeTag.value.splice(activeTag.value.indexOf(index), 1);
  } else activeTag.value.push(index);
};
const tags: string[] = [
  "数组",
  "哈希表",
  "位运算",
  "分治",
  "动态规划",
  "前缀和",
  "深度优先搜索",
  "图",
  "欧拉回路",
  "贪心",
  "排序",
  "计数排序",
  "字符串",
  "数学",
  "记忆化搜索",
  "二分查找",
  "单调栈",
  "双指针",
  "栈",
  "模拟",
  "计数",
];

// const checked = ref<boolean[]>()
// checked.value = new Array(21)

const activeTag = ref([]) as Ref<number[]>;

const checkActive = (num: number) => {
  let flag = false;
  activeTag.value.map((item) => {
    if (num === item) {
      flag = true;
      return;
    }
  });
  console.log(activeTag.value);
  return flag;
};
</script>

<template>
  <div class="tags">
    <el-check-tag
      :checked="checkActive(index)"
      @change="onChange(index)"
      v-for="(tag, index) in tags"
      @click="$emit('chooseTags', tag, checkActive(index))"
      >{{ tag }}</el-check-tag
    >
  </div>
</template>

<style lang="scss" scoped>
.tags {
  width: 80%;
}
.el-check-tag {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
