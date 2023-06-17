<script lang="ts" setup>
import useTab from "@/hooks/detail/useTab";

const { activeTab, setActiveTab } = useTab();
</script>

<template>
  <div class="problem-tab">
    <div
      class="problem-item"
      :class="{ active: activeTab === 0 }"
      @click="setActiveTab(0)"
    >
      题目描述
    </div>
    <div
      class="problem-item"
      :class="{ active: activeTab === 1 }"
      @click="setActiveTab(1)"
    >
      题解
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
