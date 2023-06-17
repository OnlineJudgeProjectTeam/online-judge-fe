<script lang="ts" setup>
import { ProblemRes } from "@/type/detail/index";
import { computed } from "vue";
import Md from "./Md.vue";
import useFavorite from "@hooks/detail/useFavorite";

const props = defineProps<{
  problem: ProblemRes;
  fetching: boolean;
}>();

const { star, favorite, favoriteNum } = useFavorite(
  props.problem.isFavorite,
  props.problem.favorites,
  props.problem.id
);

const title = computed(() => {
  return `${props.problem.id}. ${props.problem.description
    .split("\n")[0]
    .substring(2)}`;
});

const content = computed(() => {
  return props.problem.description.substring(
    props.problem.description.indexOf("\n")
  );
});

const difficultyClass = computed(() => {
  switch (props.problem.difficulty) {
    case "简单":
      return "easy";
    case "中等":
      return "medium";
    case "困难":
      return "hard";
    default:
      return "";
  }
});
</script>

<template>
  <div class="problem">
    <div class="title">{{ title }}</div>
    <div class="title-bar">
      <div :class="`difficulty-tag ${difficultyClass}`">
        <p>{{ problem.difficulty }}</p>
      </div>
      <div class="favorite" @click="favorite">
        <img class="star" :src="star" />
        <p>{{ favoriteNum }}</p>
      </div>
    </div>
    <Md :content="content"></Md>
  </div>
</template>

<style lang="scss" scoped>
.problem {
  box-sizing: border-box;
  position: relative;
  width: 50vw;
  height: 100%;
  padding: 8px 16px;
  margin: 16px;
  margin-top: 0;
  overflow: auto;
  border-radius: 8px;
  background-color: white;

  .title {
    font-size: 18px;
  }

  .title-bar {
    margin-top: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;

    .difficulty-tag {
      height: 24px;
      width: 42px;
      border-radius: 16px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.easy {
        color: #00af9b;
        background-color: rgba($color: #00af9b, $alpha: 0.15);
      }

      &.medium {
        color: #ffb800;
        background-color: rgba($color: #ffb800, $alpha: 0.15);
      }

      &.hard {
        color: #ff2d55;
        background-color: rgba($color: #ff2d55, $alpha: 0.15);
      }
    }

    .favorite {
      margin-left: 24px;
      padding: 2px 4px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: rgba($color: #c4c4c4, $alpha: 0.3);
      }

      .star {
        height: 15px;
        width: 15px;
      }

      & > p {
        margin-left: 4px;
        font-size: 14px;
        color: #c4c4c4;
      }
    }
  }
}
</style>
