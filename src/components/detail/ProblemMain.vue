<script lang="ts" setup>
import Problem from "./Problem.vue";
import useTabStore from "@/stores/tab";

defineProps<{
  problem: ProblemRes;
  fetching: boolean;
}>();

const store = useTabStore();
</script>

<template>
  <div class="main">
    <Problem
      :problem="problem"
      :fetching="fetching"
      v-show="store.$state.tab === 0"
    ></Problem>
  </div>
</template>

<style lang="scss" scoped>
.main {
  flex: 1;
}
</style>
