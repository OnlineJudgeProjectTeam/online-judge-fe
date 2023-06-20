<script lang="ts" setup>
import CodeEditor from "@/components/detail/CodeEditor.vue";
import ProblemMain from "@/components/detail/ProblemMain.vue";
import ProblemTab from "@/components/detail/ProblemTab.vue";
import useGetProblem from "@/hooks/detail/useGetProblem";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import SubmitStatus from "@/components/detail/SubmitStatus.vue";
import { Status } from "@/type/detail/index";

const { query } = useRoute();

const { data, fetching, error } = useGetProblem(query.problemId as any, 0);

const status = reactive({
  code: "",
  msg: "",
  language: "Java",
  timeCost: "-1",
  memoryCost: "-1",
  timeBeat: 0,
  memoryBeat: 0,
  isShow: false,
});

const setStatus = (isShow: boolean, _status?: Status) => {
  if (_status) {
    status.code = _status.code;
    status.msg = _status.msg;
    status.language = _status.language;
    status.isShow = _status.isShow;
    status.timeCost = _status.timeCost;
    status.memoryCost = _status.memoryCost;
    status.timeBeat = _status.timeBeat;
    status.memoryBeat = _status.memoryBeat;
  } else status.isShow = isShow;
};
</script>

<template>
  <div class="detail" v-if="!error && !fetching">
    <div class="left">
      <ProblemTab></ProblemTab>
      <ProblemMain :problem="data" :fetching="fetching"></ProblemMain>
    </div>
    <div class="right">
      <SubmitStatus :status="status"></SubmitStatus>
      <CodeEditor
        :template="data.template"
        @set-status="setStatus"
      ></CodeEditor>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #ededed;

  .left {
    position: relative;
    height: calc(100vh - 32px);
    margin: 16px;
    margin-right: 0;
    display: flex;
    flex-direction: column;
  }

  .right {
    position: relative;
    height: calc(100vh - 32px);
  }
}
</style>
