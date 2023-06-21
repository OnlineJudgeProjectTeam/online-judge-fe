<script lang="ts" setup>
import { SolutionItem } from "@/type/detail";
import { useRouter } from "vue-router";

const languageList = ["Java", "C"];

defineProps<{
  solution: SolutionItem;
}>();

const router = useRouter();
</script>

<template>
  <div
    class="solution-card"
    @click="router.push(`/solution?id=${solution.id}`)"
  >
    <div class="title">{{ solution.content.split("\n")[0].substring(2) }}</div>
    <div class="author">
      <img class="avatar" :src="solution.avatar" />
      <p class="name">{{ solution.name }}</p>
      <p class="time">{{ solution.updatedTime }}</p>
    </div>
    <div class="content">
      <p>
        {{ solution.content.substring(solution.content.indexOf("\n") + 1) }}
      </p>
    </div>
    <div class="bottom">
      <div class="tag">
        <p>{{ languageList[solution.language] }}</p>
      </div>
      <div class="spacer"></div>
      <div class="like">
        <svg
          width="18"
          height="18"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.6002 18.5998V11.3998C27.6002 8.41743 25.1826 5.99977 22.2002 5.99977L15.0002 22.1998V41.9998H35.9162C37.7113 42.0201 39.2471 40.7147 39.5162 38.9398L42.0002 22.7398C42.1587 21.6955 41.8506 20.6343 41.1576 19.8373C40.4645 19.0403 39.4564 18.5878 38.4002 18.5998H27.6002Z"
            stroke="#838383"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M15 22.0001H10.194C8.08532 21.9628 6.2827 23.7095 6 25.7994V38.3994C6.2827 40.4894 8.08532 42.0367 10.194 41.9994H15V22.0001Z"
            fill="none"
            stroke="#838383"
            stroke-width="2"
            stroke-linejoin="round"
          />
        </svg>
        <p>{{ solution.likes }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.solution-card {
  position: relative;
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #ededed;
  }

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

    .time {
      margin-left: 24px;
      font-size: 14px;
      color: #3c3c4399;
    }
  }

  .content {
    margin-top: 8px;
    max-height: 36px;

    & > p {
      color: #262626bf;
      word-wrap: break-word;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .bottom {
    margin-top: 12px;
    display: flex;
    align-items: center;

    .spacer {
      flex: 1;
    }

    .tag {
      padding: 6px 12px;
      border-radius: 10px;
      background-color: #000a200d;

      & > p {
        font-size: 13px;
        color: #262626bf;
      }
    }

    .like {
      display: flex;
      align-items: center;
      & > p {
        margin-left: 4px;
        color: #3c3c4399;
        font-size: 14px;
      }
    }
  }
}
</style>
