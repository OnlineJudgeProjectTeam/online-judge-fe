<script lang="ts" setup>
import { ref, watch, Ref, reactive } from "vue";
// import useGetProblemList from "../hooks/homeMain/useGetProblemList";
import useGetRecord from "@/hooks/myspace/getRecord";
import {RecordGate, RecordInfo} from "@/type/user/index";
import { useRouter } from "vue-router";

const value1 = ref('')
const value2 = ref('')

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]


let problemInfo: RecordGate = reactive({
  pageNum: 1,
  pageSize: 7,
  navSize: 3,
  startTime: value1,
  endTime: value2,
});

const currentPage = ref<number>(1);

const pageinfo = ref({}) as Ref<RecordInfo>;

const { data, fetching, error, query } = useGetRecord();

query(problemInfo);

async function search() {
  problemInfo.pageNum = currentPage.value;
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

async function update() {
  alert(value1.value);
  problemInfo.startTime=value1.value;
  problemInfo.endTime=value2.value;
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

const router = useRouter();
async function enter(id: number) {
  router.push(`/detail?problemId=${id}`);
}

function judge() {
  if (
    !error.value &&
    !fetching.value 
    // !errorEvery.value &&
    // !fetchingEvery.value &&
    // !errorAc.value &&
    // !fetchingAc.value
  ) {
    return true;
  } else {
    return false;
  }
}

watch(data, () => {
  pageinfo.value = data.value;
});
</script>

<template>
  <div class="container" v-if="judge()">     
  <div class="demo-datetime-picker">
    <div class="block">
      <span class="demonstration">With shortcuts</span>
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="Select date and time"
        :shortcuts="shortcuts"
      />
    </div>
    <div class="block">
      <span class="demonstration">With shortcuts</span>
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="Select date and time"
        :shortcuts="shortcuts"
      />
    </div>
  </div>
<br>
  <el-timeline>
    <el-timeline-item
      v-for="problem in pageinfo.list"
      :timestamp="problem.executionTime"
      class="timeline"
    >
      <div @click="enter(problem.problemId)">{{ problem.problemName }}</div>
      {{ problem.difficulty }}
      {{ problem.language?'c':'java' }}
    </el-timeline-item>
  </el-timeline>
  </div>
  <el-button @click="update">查看</el-button>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="pageinfo.total"
      :pager-count="problemInfo.navSize"
      :page-size="problemInfo.pageSize"
      v-model:current-page="currentPage"
      @current-change="search"
    />
</template>

<style lang="scss" scoped>

.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.container {
  margin: 0 auto;
  width: 75%;
  height: 92vh;
}
.tags {
  margin-top: 10px;
}
.choose {
  display: flex;
  height: 5vh;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.submit {
  display: flex;
}
.search {
  display: flex;
  margin-bottom: 10px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: rgb(242, 243, 244);
  height: 4vh;
  .btn {
    &:hover {
      cursor: pointer;
    }
  }
}
input {
  outline: none;
  border: none;
  background-color: rgb(242, 243, 244);
  padding-left: 5px;
  height: 4vh;
  border-radius: 5px;
}

.degree {
  position: relative;
  display: flex;
  margin-left: 30px;
  border-radius: 5px;
  height: 3vh;
  width: 12vh;
  padding: 3px 0;
  background-color: rgb(242, 243, 244);
  &:hover {
    background-color: rgb(247, 247, 247);
  }
  .btn {
    margin-left: 10px;
  }
  .label {
    padding-left: 10px;
  }
}
.text {
  position: absolute;
  top: 100%;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.02),
    0px 6px 12px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
}
.choice {
  display: block;
  width: 15vh;
  padding-top: 10px;
  padding-left: 10px;
  &:hover {
    cursor: pointer;
  }
}
.hide {
  display: none;
}

.random {
  color: greenyellow;
  cursor: pointer;
  margin-left: auto;
  margin-right: 10px;
}
.btn {
  margin-top: 3px;
  margin-right: 3px;
  img {
    height: 18px;
    width: 18px;
  }
}

.questions {
  width: 80%;
}
.title {
  display: flex;
  padding-bottom: 8px;
  height: 3vh;
  border-bottom: 1px solid rgb(240, 240, 240);
}
.status {
  margin-left: 15px;
  width: 10%;
}
.question {
  width: 30%;
  cursor: pointer;
  &:hover {
    color: blue;
  }
}
.answer {
  width: 10%;
  cursor: pointer;
  &:hover {
    color: blue;
  }
}
.assort {
  width: 30%;
}
.difficulty {
  width: 10%;
}
.collected {
  width: 10%;
  img {
    height: 18px;
    width: 18px;
    vertical-align: middle;
    cursor: pointer;
  }
  a {
    padding-left: 2px;
    vertical-align: middle;
  }
}
.content:nth-child(odd) {
  background-color: #fff;
}
.content:nth-child(even) {
  background-color: rgb(247, 247, 247);
}
.content {
  display: flex;
  padding-top: 1vh;
  padding-bottom: 1vh;
  height: 4vh;
}
.everyday {
  display: flex;
  padding-top: 1vh;
  padding-bottom: 1vh;
  height: 4vh;
}
.record {
  width: 15%;
  position: absolute;
  top: 60px;
  right: 150px;
  margin-top: 7px;
  border-radius: 3px;
  // background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.02),
    0px 6px 12px rgba(0, 0, 0, 0.02);
}

.el-progress {
  margin: 10px 10px;
}
.timeline{
  // left: 40%;
  align-items: center;
  justify-content: center;
}
.el-pagination {
  position: absolute;
  right: 30%;
  margin-top: 25px;
}
</style>
