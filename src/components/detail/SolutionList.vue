<script lang="ts" setup>
import useGetSolution from "@/hooks/detail/useGetSolution";
import SolutionCard from "@components/detail/SolutionCard.vue";
import { SolutionItem } from "@/type/detail";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const { query } = useRoute();
const { data, fetching, error } = useGetSolution(query.problemId as any);
const solutionList = ref<SolutionItem[]>();

watch(data, () => {
  solutionList.value = data.value.list;
});
</script>

<template>
  <div class="solution-list" v-if="!fetching && !error">
    <SolutionCard v-for="item in solutionList" :solution="item"></SolutionCard>
  </div>
</template>

<style lang="scss" scoped>
.solution-list {
  box-sizing: border-box;
  position: relative;
  width: 50vw;
  height: calc(100vh - 152px);
  padding: 8px 0;
  margin: 16px;
  margin-top: 0;
  overflow: auto;
  border-radius: 8px;
  background-color: white;
}
</style>
