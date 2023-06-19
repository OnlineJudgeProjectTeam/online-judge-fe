<script lang="ts" setup>
import useTabStore from "@/stores/tab";

const store = useTabStore();
</script>

<template>
  <div class="problem-tab">
    <div
      class="problem-item"
      :class="{ active: store.$state.tab === 0 }"
      @click="store.setActive(0)"
    >
      题目描述
    </div>
    <div
      class="problem-item"
      :class="{ active: store.$state.tab === 1 }"
      @click="store.setActive(1)"
    >
      题解
    </div>
  </div>
</template>

<style lang="scss" scoped>
.problem-tab {
  margin: 0 16px;
  padding: 8px 16px;
  background-color: white;
  display: flex;
  align-items: center;

  .problem-item {
    box-sizing: border-box;
    height: 32px;
    margin-right: 16px;
    padding-bottom: 10px;
    font-size: 14px;
    cursor: pointer;

    &.active {
      border-bottom: 3px solid rgba($color: #000000, $alpha: 0.6);
    }
  }
}
</style>
