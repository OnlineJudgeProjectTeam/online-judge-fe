<script lang="ts" setup>
import downImg from "@assets/images/down.png";
import { ref } from "vue";

defineProps<{
  list: string[];
}>();

const isShow = ref(false);
const activeItem = ref(0);

const emit = defineEmits(["callback"]);

const clickHandler = (index: number) => {
  emit("callback", index);
  activeItem.value = index;
  isShow.value = false;
};
</script>

<template>
  <div class="dropdown">
    <div class="btn" @click="isShow = !isShow">
      <div class="text">{{ list[activeItem] }}</div>
      <div class="spacer"></div>
      <img class="icon" :class="{ active: isShow }" :src="downImg" />
    </div>
    <div class="list" v-show="isShow">
      <div
        v-for="(item, index) in list"
        class="list-item"
        @click="clickHandler(index)"
      >
        <p>{{ item }}</p>
        <div class="spacer"></div>
        <svg
          v-show="activeItem === index"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
          class="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9.688 15.898l-3.98-3.98a1 1 0 00-1.415 1.414L8.98 18.02a1 1 0 001.415 0L20.707 7.707a1 1 0 00-1.414-1.414l-9.605 9.605z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  width: 45%;
  margin-right: 5%;

  .btn {
    position: relative;
    background-color: #000a200d;
    border-radius: 10px;
    padding: 6px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    z-index: 1000;

    .spacer {
      flex: 1;
    }

    .text {
      font-size: 14px;
      color: #262626bf;
    }

    .icon {
      height: 14px;
      width: 18px;
      transition: transform 0.3s ease-out;

      &.active {
        transform: rotate(180deg);
      }
    }
  }

  .list {
    position: absolute;
    left: 4px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000,
      0px 1px 3px #0000000a, 0px 4px 12px #00000014;
    filter: drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px)
      drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px);
    z-index: 100;

    .list-item {
      width: 20vw;
      padding: 8px 12px;
      display: flex;

      &:hover {
        background-color: #f3f3f3;
      }

      .spacer {
        flex: 1;
      }

      & > p {
        font-size: 14px;
      }

      & > svg {
        color: rgb(0, 122, 255);
        height: 20px;
        width: 20px;
      }
    }
  }
}
</style>
