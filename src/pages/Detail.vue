<script lang="ts" setup>
import CodeEditor from "@/components/detail/CodeEditor.vue";
import Md from "@/components/detail/Md.vue";
import useGetProblem from "@/hooks/detail/useGetProblem";

const { data, fetching, error } = useGetProblem(1, 0);
console.log(error);
</script>

<template>
  <div class="detail" v-if="!error">
    <Md :problem="data" :fetching="fetching"></Md>
    <CodeEditor></CodeEditor>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  display: flex;
}
</style>
