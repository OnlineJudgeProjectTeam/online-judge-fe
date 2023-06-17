<script lang="ts" setup>
import CodeEditor from "@/components/detail/CodeEditor.vue";
import Problem from "@/components/detail/Problem.vue";
import useGetProblem from "@/hooks/detail/useGetProblem";

const { data, fetching, error } = useGetProblem(1, 0);
</script>

<template>
  <div class="detail" v-if="!error && !fetching">
    <Problem :problem="data" :fetching="fetching"></Problem>
    <CodeEditor :template="data.template"></CodeEditor>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #ededed;
}
</style>
