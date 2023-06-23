<script lang="ts" setup>
import usePointer from "@/hooks/usePointer";
import { ref, watch } from "vue";

const props = defineProps<{
  pointerPosition: {
    x: number;
    y: number;
  };
  offsetLeft: number;
  offsetTop: number;
  code: string[];
}>();

const pointer = ref();

const getPointerX = (str: string) => {
  let x = 0;
  for (let i = 0; i < str.length; i++) {
    let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    if (reg.test(str[i])) x += 16;
    else x += 8;
  }
  return x;
};

watch(props.pointerPosition, (pointerPosition) => {
  pointer.value.style.top = `${pointerPosition.y * 18.1 + 17.5}px`;
  pointer.value.style.left = `${getPointerX(
    props.code[pointerPosition.y].substring(0, pointerPosition.x)
  )}px`;
});

const { isShowPointer } = usePointer(props.code);
</script>

<template>
  <div class="pointer" :class="{ hidden: !isShowPointer }" ref="pointer"></div>
</template>

<style lang="scss" scoped>
.pointer {
  position: relative;
  left: -1000px;
  height: 16px;
  width: 0px;
  border-right: 1px solid black;
  z-index: 10;

  &.hidden {
    visibility: hidden;
  }
}
</style>
