<script lang="ts" setup>
import { SubmitListItem } from "@/type/detail";
import useStatusStore from "@/stores/status";

const languageList = ["Java", "C"];

const props = defineProps<{
  submit: SubmitListItem;
  active: boolean;
  index: number;
}>();

const emit = defineEmits(["switch-active"]);

const store = useStatusStore();

const clickHandler = () => {
  emit("switch-active", props.index);
  store.$state = {
    code: props.submit.code,
    msg: props.submit.output,
    language: languageList[props.submit.language],
    isShow: true,
    timeCost: props.submit.timeCost,
    timeBeat: props.submit.timeBeat,
    memoryCost: props.submit.memoryCost,
    memoryBeat: props.submit.memoryBeat,
  };
};
</script>

<template>
  <div class="submit-item" :class="{ active: active }" @click="clickHandler">
    <div class="left">
      <div class="status" :class="{ pass: submit.pass === 1 }">
        {{ submit.pass === 1 ? "通过" : "错误" }}
      </div>
      <div class="time">{{ submit.executionTime.split(" ")[0] }}</div>
    </div>
    <div class="tag">
      <p class="tag-text">{{ languageList[submit.language] }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.submit-item {
  position: relative;
  padding: 16px 16px;
  background-color: white;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
  }

  &.active {
    background-color: #007aff14;

    &:hover {
      background-color: #007aff14;
    }
  }

  .left {
    margin-right: 64px;

    .status {
      font-size: 14px;
      color: rgb(239 71 67);

      &.pass {
        color: rgb(45 181 93);
      }
    }

    .time {
      font-size: 12px;
      color: #3c3c4399;
    }
  }

  .tag {
    position: relative;
    padding: 2px 10px;
    border-radius: 10px;
    background-color: rgba(0, 122, 255, 0.1);

    .tag-text {
      font-size: 14px;
      color: rgb(0 122 255);
    }
  }
}
</style>
