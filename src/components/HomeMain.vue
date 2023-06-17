<script lang="ts" setup>
import { ref } from "vue";
import useGetProblemList from "../hooks/homeMain/useGetProblemList";
let probleminfo : ProblemInfo = {
  pageNum: 1,
  pageSize: 1,
  navSize: 2,
};

const {data,fetching,error} = useGetProblemList(probleminfo);

let pageinfo:PageInfo = data.value;

const isShowc = ref<boolean>(false);
async function displayc() {
  isShowc.value = !isShowc.value;
}
const isShowd = ref<boolean>(false);
async function displayd() {
  isShowd.value = !isShowd.value;
}

const url = ref<string>();
const isCollected = ref<boolean>();
async function collect() {
  isCollected.value = !isCollected.value;
  if (isCollected.value === true) {
    url.value = "/src/assets/images/star-yellow.png";
  } else {
    url.value = "/src/assets/images/star.png";
  }
}


</script>

<template>
  <div class="container" v-if="!error && !fetching">
    <div class="choose">
      <div class="submit">
        <div class="search">
          <input type="text" placeholder="请输入题目名称" />
          <div class="btn">
            <img src="../assets/images/search.png" alt="搜索" />
          </div>
        </div>
        <div class="classify" @click="displayc">
          <div class="label">分类</div>
          <div class="text">
            <a :class="isShowc === true ? 'choice' : 'hide'">123</a>
            <a :class="isShowc === true ? 'choice' : 'hide'">234</a>
            <a :class="isShowc === true ? 'choice' : 'hide'">345</a>
          </div>
          <div class="btn">
            <img src="../assets/images/down.png" alt="" />
          </div>
        </div>
        <div class="degree" @click="displayd">
          <div class="label">难度</div>
          <div class="text">
            <a :class="isShowd === true ? 'choice' : 'hide'">1</a>
            <a :class="isShowd === true ? 'choice' : 'hide'">2</a>
            <a :class="isShowd === true ? 'choice' : 'hide'">3</a>
          </div>
          <div class="btn">
            <img src="../assets/images/down.png" alt="" />
          </div>
        </div>
      </div>
      <div class="random">随机一题</div>
    </div>
    <div class="questions">
      <div class="title">
        <div class="status">状态</div>
        <div class="question">题目</div>
        <div class="answer">题解</div>
        <div class="assort">分类</div>
        <div class="difficulty">难度</div>
        <div class="collected">收藏</div>
      </div>
      <div class="contents">
        <div class="content" v-for="problem in pageinfo.list">
          <div class="status">{{ problem.status }}</div>
          <div class="question">{{ problem.name }}</div>
          <div class="answer">{{ problem.solutions }}</div>
          <div class="assort">{{ problem.tags }}</div>
          <div class="difficulty">{{ problem.difficulty }}</div>
          <div class="collected" @click="collect">
            <img :src="url" alt="" />
            <a>{{ problem.favorite }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="description">
        <div class="easy">简单</div>
        <div class="mid">中等</div>
        <div class="difficult">困难</div>
      </div>
      <div class="countAll">
        <div class="easy">111</div>
        <div class="mid">2</div>
        <div class="difficult">3</div>
      </div>
      <div class="count">
        <div class="easy">111</div>
        <div class="mid">2</div>
        <div class="difficult">3</div>
      </div>
      <div class="rate">
        <div class="easy">1</div>
        <div class="mid">2</div>
        <div class="difficult">3</div>
      </div>
      <div class="statistics"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 75%;
  height: 92vh;
}
.choose {
  display: flex;
  height: 5vh;
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
}
input {
  outline: none;
  border: none;
  background-color: rgb(242, 243, 244);
  padding-left: 5px;
  height: 4vh;
  border-radius: 5px;
}

.classify {
  position: relative;
  display: flex;
  margin-left: 60px;
  margin-right: 30px;
  border-radius: 5px;
  width: 12vh;
  height: 3vh;
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
.record {
  width: 13%;
  position: fixed;
  top: 110px;
  right: 180px;
  margin-top: 7px;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.02),
    0px 6px 12px rgba(0, 0, 0, 0.02);
}
.description {
  display: flex;
  padding-top: 1vh;
  padding-bottom: 1vh;
}
.countAll {
  display: flex;
  padding-bottom: 1vh;
}
.count {
  display: flex;
  padding-bottom: 1vh;
}
.rate {
  display: flex;
  padding-bottom: 1vh;
}
.easy {
  width: 30%;
  padding-left: 10%;
  color: rgb(0, 175, 155);
}
.mid {
  width: 30%;
  color: rgb(255, 184, 0);
}
.difficult {
  width: 30%;
  color: rgb(255, 45, 85);
}
.statistics {
  width: 15vh;
  height: 15vh;
  border: 1px solid black;
  border-radius: 999px;
  margin: 15px auto;
}
</style>
