<script lang="ts" setup>
import { ref, watch, Ref } from "vue";
// import useGetProblemList from "../hooks/homeMain/useGetProblemList";
import useGetRecord from "@/hooks/myspace/getRecord";
import {RecordGate} from "@/type/user/index";
import { userStore } from "@/stores/login";

const store = userStore();

let problemInfo: ProblemInfo = {
  pageNum: 1,
  pageSize: 7,
  navSize: 3,
};

let gate: RecordGate = {
  pageNum: 1,
  pageSize: 7,
  navSize: 3,
  userId: store.$state.id,
}

const name = ref<string>("");
const currentPage = ref<number>(1);

const pageinfo = ref({}) as Ref<PageInfo>;

// const { data, fetching, error, query } = useGetProblemList();
const { data, fetching, error, query } = useGetRecord();

query(problemInfo);

async function search() {
  gate.pageNum = currentPage.value;
  query(gate).then(() => {
    pageinfo.value = data.value;
  });
}

async function send() {
  // problemInfo.name = "name";
  // const { data, whenFinish } = useGetProblemList(problemInfo);
  // whenFinish.value.then(() => {
  //   pageinfo.value = data.value;
  // });
}

async function changeEasy() {
  // problemInfo.difficulty = "简单";
  // whenFinish.value.then(() => {
  //   pageinfo.value = data.value;
  // });
}

async function changeMid() {
  // problemInfo.difficulty = "中等";
  // whenFinish.value.then(() => {
  //   pageinfo.value = data.value;
  // });
}

async function changeDifficult() {
  // problemInfo.difficulty = "困难";
  // whenFinish.value.then(() => {
  //   pageinfo.value = data.value;
  // });
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

const isShowd = ref<boolean>(false);
async function displayd() {
  isShowd.value = !isShowd.value;
}


watch(data, () => {
  pageinfo.value = data.value;
});
</script>

<template>
  <div class="container" v-if="judge()">
    <div class="choose">
      <div class="submit">
        <div class="search">
          <input type="text" placeholder="请输入题目名称" v-model="name" />
          <div class="btn" @click="send()">
            <img src="../assets/images/search.png" alt="搜索" />
          </div>
        </div>
        <div class="degree" @click="displayd">
          <div class="label">难度</div>
          <div class="text">
            <a
              :class="isShowd === true ? 'choice' : 'hide'"
              @click="changeEasy()"
              >简单</a
            >
            <a
              :class="isShowd === true ? 'choice' : 'hide'"
              @click="changeMid()"
              >中等</a
            >
            <a
              :class="isShowd === true ? 'choice' : 'hide'"
              @click="changeDifficult()"
              >困难</a
            >
          </div>
          <div class="btn">
            <img src="../assets/images/down.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="questions">
        <div class="content" v-for="problem in pageinfo.list">

          <div class="question">{{ problem.name }}</div>
          <div class="assort">{{ problem.tags }}</div>
          <div class="difficulty">{{ problem.difficulty }}</div>
            取消收藏
          </div>
        </div>
    </div>

    <!-- <div v-for="problem in pageinfo.list">
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{problem.name}}</span>
        <el-button class="button" text>取消收藏</el-button>
      </div>
    </template>
    <span>难度：{{problem.difficulty}}</span><br>
    <span>标签：{{problem.tags}}</span>
  </el-card>
    </div> -->

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


.el-pagination {
  position: absolute;
  right: 30%;
  margin-top: 25px;
}
</style>
