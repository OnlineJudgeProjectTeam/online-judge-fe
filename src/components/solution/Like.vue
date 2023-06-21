<script lang="ts" setup>
import useLike from "@hooks/solution/useLike";
import likeImg from "@assets/images/like.png";
import likePrimaryImg from "@assets/images/like-primary.png";
const props = defineProps<{
  isLike: boolean;
  likes: number;
  id: any;
}>();

const { isLike, likeCount, likeHandler } = useLike(
  props.isLike,
  props.likes,
  props.id
);
</script>

<template>
  <div class="like" @click="likeHandler">
    <img :src="isLike ? likePrimaryImg : likeImg" />
    <p>{{ likeCount }}</p>
  </div>
</template>

<style lang="scss" scoped>
.like {
  margin-left: 36px;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
  }

  & > img {
    height: 16px;
    width: 16px;
  }

  & > p {
    margin-left: 4px;
    color: #3c3c4399;
    font-size: 14px;
  }
}
</style>
