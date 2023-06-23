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
    text: '现在',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '一周前',
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
  alert(value1.value)
  if(value1.value){
    problemInfo.startTime=value1.value;
  }
  if(value2.value){
    problemInfo.endTime=value2.value;
  }
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}


const router = useRouter();

async function gotoDetail(id:number) {
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
  <div class="container">     
  <div class="demo-datetime-picker">
    <div class="block">
      <span class="demonstration">起始时间</span>
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="选择日期和时间"
        :shortcuts="shortcuts"
      />
    </div>
    <div class="block">
      <span class="demonstration">结束时间</span>
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="选择日期和时间"
        :shortcuts="shortcuts"
      />
    </div>
  </div>
  <el-button class="select" @click="update">按时间筛选</el-button><br><br>
  <!-- <el-table :data="pageinfo.list" style="width: 100%">
    <el-table-column prop="problemName" label="题目名称" width="180"/>
    <el-table-column prop="difficulty" label="难度" width="60" />
    <el-table-column prop="executionTime" label="提交时间" width="180" />
    <el-table-column prop="setlang(language)" label="Name" width="180" />
    <el-table-column prop="problem.language?'c':'java'" label="Address" />
  </el-table> -->
  <div class="questions">
      <div class="title">
        <div class="question">题目</div>
        <div class="difficulty">难度</div>
        <div class="pass">通过</div>
        <div class="language">语言</div>
        <div class="time">提交时间</div>
      </div>
      <div class="content" v-for="problem in pageinfo.list">
          <div class="question" @click="gotoDetail(problem.problemId)" >{{ problem.problemName }}</div>
          <div class="difficulty" :class="{box1: problem.difficulty === '简单',box2: problem.difficulty === '中等',box3: problem.difficulty === '困难'}">{{ problem.difficulty }}</div>
          <div class="pass">{{ problem.pass?'Y':'N' }}</div>
          <div class="language">{{ problem.language?'C':'Java' }}</div>
          <div class="time">{{ problem.executionTime }}</div>
      </div>
  </div>
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
  
  
</div>
</template>

<style lang="scss" scoped>
.select{
  margin: auto 8cm;
  // position: relative;
  // align-items: center;
  // align-self: center;
}
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
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
  width: 80%;
  // height: 92vh;
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

// .questions {
//   width: 80%;
// }
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
  width: 35%;
  cursor: pointer;
  &:hover {
    color: blue;
  }
}
.pass{
  width:8%;
}
.language{
  width: 12%;
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
.el-pagination {
  position: absolute;
  right: 30%;
  margin-top: 25px;
}
.box1{
  color: rgb(0,175,155);
}
.box2{
  color:rgb(255,184,0);
}
.box3{
  color: rgb(255, 45, 85);
}
</style>
