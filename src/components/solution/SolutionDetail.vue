<script lang="ts" setup>
import useGetSolutionDetail from "@/hooks/solution/useGetSolutionDetail";
import Md from "@components/detail/Md.vue";
import Like from "./Like.vue";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { SolutionItem } from "@/type/detail";

const { query } = useRoute();
const { data, fetching, error } = useGetSolutionDetail(query.id as any);
const solution = ref<SolutionItem>();

watch(data, () => {
  solution.value = data.value;
});

const content = computed(() => {
  return solution.value!.content.substring(
    solution.value!.content.indexOf("\n") + 1
  );
});
</script>

<template>
  <div class="solution-detail" v-if="!fetching && !error && solution">
    <div class="title">{{ solution.content.split("\n")[0].substring(2) }}</div>
    <div class="author">
      <img class="avatar" :src="solution.avatar" />
      <p class="name">{{ solution.name }}</p>
      <Like
        :isLike="solution.isLike"
        :likes="solution.likes"
        :id="query.id"
      ></Like>
    </div>
    <Md :content="content"></Md>
  </div>
</template>

<style lang="scss" scoped>
.solution-detail {
  position: relative;
  height: 100%;
  min-height: calc(100vh - 96px);
  width: 100%;
  padding: 8px 16px;
  background-color: white;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0px 1px 3px #0000000a,
    0px 4px 12px #00000014;
  filter: drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px)
    drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px);

  .title {
    font-size: 18px;
  }

  .author {
    margin-top: 8px;
    display: flex;
    align-items: center;

    .avatar {
      position: relative;
      height: 16px;
      width: 16px;
      border-radius: 50%;
    }

    .name {
      margin-left: 12px;
      font-size: 14px;
      color: #1a1a1abf;
    }
  }

  .md {
    margin-top: 12px;
  }
}
</style>
