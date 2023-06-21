<script lang="ts" setup>
import Problem from "./Problem.vue";
import useTabStore from "@/stores/tab";
import SubmitList from "./SubmitList.vue";
import SolutionList from "./SolutionList.vue";
import { useRoute } from "vue-router";

defineProps<{
  problem: ProblemRes;
  fetching: boolean;
}>();

const { query } = useRoute();

const store = useTabStore();
</script>

<template>
  <div class="main">
    <Problem
      :problem="problem"
      :fetching="fetching"
      v-show="store.$state.tab === 0"
    ></Problem>
    <SolutionList v-show="store.$state.tab === 1"></SolutionList>
    <SubmitList
      :problem-id="query.problemId"
      v-show="store.$state.tab === 2"
    ></SubmitList>
  </div>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  flex: 1;
}
</style>
