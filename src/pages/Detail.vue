<script lang="ts" setup>
import CodeEditor from "@/components/detail/CodeEditor.vue";
import ProblemMain from "@/components/detail/ProblemMain.vue";
import ProblemTab from "@/components/detail/ProblemTab.vue";
import useGetProblem from "@/hooks/detail/useGetProblem";
import { useRoute } from "vue-router";

const { query } = useRoute();

const { data, fetching, error } = useGetProblem(query.problemId as any, 0);
</script>

<template>
  <div class="detail" v-if="!error && !fetching">
    <div class="left">
      <ProblemTab></ProblemTab>
      <ProblemMain :problem="data" :fetching="fetching"></ProblemMain>
    </div>
    <CodeEditor :template="data.template"></CodeEditor>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #ededed;

  .left {
    position: relative;
    height: calc(100vh - 32px);
    margin: 16px;
    margin-right: 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
