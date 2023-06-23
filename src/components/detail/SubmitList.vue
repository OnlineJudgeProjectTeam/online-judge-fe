<script lang="ts" setup>
import useGetSubmitList from "@/hooks/detail/useGetSubmitList";
import { SubmitListItem } from "@/type/detail";
import { ref, watch } from "vue";
import SubmitItem from "./SubmitItem.vue";
import Dropdown from "./Dropdown.vue";
import useTabStore from "@/stores/tab";

const props = defineProps<{
  problemId: any;
}>();

const submitList = ref<SubmitListItem[]>([]);
const activeItem = ref<number>();
const store = useTabStore();

const { data, fetching, error, requery } = useGetSubmitList(props.problemId);

watch(data, () => {
  submitList.value = data.value.list;
});

const switchActive = (index: number) => {
  activeItem.value = index;
};

const statusList = ["所有状态", "通过", "错误"];
const languageList = ["全部语言", "Java", "C"];

const language = ref(-1);
const status = ref(0);

const statusSearch = (index: number) => {
  switch (index) {
    case 0:
      status.value = -1;
      break;
    case 1:
      status.value = 1;
      break;
    case 2:
      status.value = 0;
      break;
  }
};

const languageSearch = (index: number) => {
  language.value = index - 1;
  console.log(language.value);
};

watch(language, () => {
  requery(language.value, status.value);
  activeItem.value = undefined;
});

watch(status, () => {
  requery(language.value, status.value);
  activeItem.value = undefined;
});

watch(store.$state, () => {
  requery(language.value, status.value);
  activeItem.value = 0;
});
</script>

<template>
  <div v-if="!fetching && !error" class="submit-list">
    <div class="submit-list-top">
      <Dropdown :list="statusList" @callback="statusSearch"></Dropdown>
      <Dropdown :list="languageList" @callback="languageSearch"></Dropdown>
    </div>
    <SubmitItem
      v-for="(item, index) in submitList"
      :submit="item"
      :index="index"
      :active="activeItem === index"
      @switch-active="switchActive"
    ></SubmitItem>
  </div>
</template>

<style lang="scss" scoped>
.submit-list {
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

  .submit-list-top {
    position: relative;
    padding: 0 16px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
}
</style>
