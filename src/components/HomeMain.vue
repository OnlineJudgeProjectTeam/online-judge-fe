<script lang="ts" setup>
import { ref, watch, Ref } from "vue";
import useGetProblemList from "../hooks/homeMain/useGetProblemList";
import useChangeFavorite from "@/hooks/homeMain/useChangeFavorite";
import useGetEverydayProblem from "@/hooks/homeMain/useGetEverydayProblem";
import useGetTotalAcRate from "@/hooks/homeMain/useGetTotalAcRate";
import Tags from "./detail/Tags.vue";

let probleminfo: ProblemInfo = {
  pageNum: 1,
  pageSize: 7,
  navSize: 3,
};

const name = ref<string>("");
const tags = ref<string>("");
const currentPage = ref<number>(1);

const pageinfo = ref({}) as Ref<PageInfo>;

const { data, fetching, error } = useGetProblemList(probleminfo);
const { dataEvery, fetchingEvery, errorEvery } = useGetEverydayProblem();
const { dataAc, fetchingAc, errorAc } = useGetTotalAcRate();
const changeFavorite = useChangeFavorite();

async function search() {
   probleminfo.pageNum = currentPage.value;
  const { data, whenFinish } = useGetProblemList(probleminfo);
  whenFinish.value.then(() => {
    pageinfo.value = data.value;
  })
}

async function send(){
  probleminfo.name = "name";
  const { data, whenFinish } = useGetProblemList(probleminfo);
  whenFinish.value.then(() => {
    pageinfo.value = data.value;
  })
}

async function choose(tag:string,checked:boolean){
  if(checked === false){
    tags.value.replace(tag,"")
    console.log(tags.value)
  }
  tags.value = tags.value + tag;
  probleminfo.tags = tags.value;
  const { data, whenFinish } = useGetProblemList(probleminfo);
  whenFinish.value.then(() => {
    pageinfo.value = data.value;
  })
}

async function changeEasy(){
  probleminfo.difficulty = "简单"
  const { data, whenFinish } = useGetProblemList(probleminfo);
  whenFinish.value.then(() => {
    pageinfo.value = data.value;
  })
}

async function changeMid(){
  probleminfo.difficulty = "中等"
  const { data,whenFinish } = useGetProblemList(probleminfo);
  whenFinish.value.then(() => {
    pageinfo.value = data.value;
  })
}

async function changeDifficult(){
  probleminfo.difficulty = "困难"
  const { data,whenFinish} = useGetProblemList(probleminfo);
  whenFinish.value.then(() => {
    pageinfo.value = data.value;
  })
}


function judge() {
  if (
    !error.value &&
    !fetching.value &&
    !errorEvery.value &&
    !fetchingEvery.value &&
    !errorAc.value &&
    !fetchingAc.value
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

let url1 = "/src/assets/images/star-yellow.png";
let url2 = "/src/assets/images/star.png";

const url = ref<string>();
async function collect(id: number, problem: ProblemRes) {
  changeFavorite(id).then((res: any) => {
    if (res.data.value === "操作成功") {
      if (problem.isFavorite === 1) {
        problem.isFavorite = 0;
        problem.favorites--;
        url.value = url2;
      } else {
        problem.isFavorite = 1;
        problem.favorites++;
        url.value = url1;
      }
    }
  });
}

watch(data, () => {
  pageinfo.value = data.value;
});



</script>

<template>
  <div class="container" v-if="judge()">
    <div class="tags">
      <Tags @choose-tags="choose" />
    </div>
    <div class="choose">
      <div class="submit">
        <div class="search">
          <input type="text" placeholder="请输入题目名称"  v-model="name"/>
          <div class="btn" @click="send()">
            <img src="../assets/images/search.png" alt="搜索" />
          </div>
        </div>
        <div class="degree" @click="displayd" >
          <div class="label">难度</div>
          <div class="text">
            <a :class="isShowd === true ? 'choice' : 'hide'" @click = changeEasy()>简单</a>
            <a :class="isShowd === true ? 'choice' : 'hide'" @click = changeMid()>中等</a>
            <a :class="isShowd === true ? 'choice' : 'hide'" @click = changeDifficult()>困难</a>
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
        <div class="everyday">
          <div class="status">{{ dataEvery.status }}</div>
          <div class="question">{{ dataEvery.name }}</div>
          <div class="answer">{{ dataEvery.solutions }}</div>
          <div class="assort">{{ dataEvery.tags }}</div>
          <div class="difficulty">{{ dataEvery.difficulty }}</div>
          <div class="collected" @click="collect(dataEvery.id, dataEvery)">
            <img :src="(url = dataEvery.isFavorite ? url1 : url2)" alt="" />
            <a>{{ dataEvery.favorites }}</a>
          </div>
        </div>
        <div class="content" v-for="problem in pageinfo.list">
          <div class="status">{{ problem.status }}</div>
          <div class="question">{{ problem.name }}</div>
          <div class="answer">{{ problem.solutions }}</div>
          <div class="assort">{{ problem.tags }}</div>
          <div class="difficulty">{{ problem.difficulty }}</div>
          <div class="collected" @click="collect(problem.id, problem)">
            <img :src="(url = problem.isFavorite ? url1 : url2)" alt="" />
            <a>{{ problem.favorites }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <el-progress :percentage="dataAc.acData[1].acRate" color="rgb(0, 175, 155)" >
        <span>{{ dataAc.acData[1].acRate }}% 简单</span>
      </el-progress>
      <el-progress :percentage="dataAc.acData[2].acRate" color="rgb(255, 184, 0)" >
        <span>{{ dataAc.acData[2].acRate }}% 中等</span>
      </el-progress>
      <el-progress :percentage="dataAc.acData[3].acRate" color="rgb(255, 45, 85)" >
        <span>{{ dataAc.acData[3].acRate }}% 困难</span>
      </el-progress>
      <el-progress type="circle" :percentage="dataAc.acData[0].acRate" width="100" style="margin-left: 45px;">
        <span>总通过率<br/><br/>{{ dataAc.acData[0].acRate }}% </span>
      </el-progress>

      <!-- <div class="description">
        <div class="easy">简单</div>
        <div class="mid">中等</div>
        <div class="difficult">困难</div>
      </div>
      <div class="count">
        <div class="easy">{{ dataAc.acData[1].acNum }}</div>
        <div class="mid">{{ dataAc.acData[2].acNum }}</div>
        <div class="difficult">{{ dataAc.acData[3].acNum }}</div>
      </div>
      <div class="countAll">
        <div class="easy">{{ dataAc.acData[1].submitNum }}</div>
        <div class="mid">{{ dataAc.acData[2].submitNum }}</div>
        <div class="difficult">{{ dataAc.acData[3].submitNum }}</div>
      </div>
      <div class="rate">
        <div class="easy">{{ dataAc.acData[1].acRate }}</div>
        <div class="mid">{{ dataAc.acData[2].acRate }}</div>
        <div class="difficult">{{ dataAc.acData[3].acRate }}</div>
      </div>
      <div class="statistics"></div> -->
    </div>
    <el-pagination
    small
    background
    layout="prev, pager, next"
    :total="pageinfo.total"
    :pager-count= "probleminfo.navSize"
    :page-size= "probleminfo.pageSize"
    v-model:current-page="currentPage"
    @current-change="search"
  />
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 75%;
  height: 92vh;
}
.tags{
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
  .btn{
    &:hover{
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

.el-progress{
  margin: 10px 10px;
}
// .description {
//   display: flex;
//   padding-top: 1vh;
//   padding-bottom: 1vh;
// }
// .countAll {
//   display: flex;
//   padding-bottom: 1vh;
// }
// .count {
//   display: flex;
//   padding-bottom: 1vh;
// }
// .rate {
//   display: flex;
//   padding-bottom: 1vh;
// }
// .easy {
//   width: 30%;
//   padding-left: 10%;
//   color: rgb(0, 175, 155);
// }
// .mid {
//   width: 30%;
//   color: rgb(255, 184, 0);
// }
// .difficult {
//   width: 30%;
//   color: rgb(255, 45, 85);
// }
// .statistics {
//   width: 15vh;
//   height: 15vh;
//   border: 1px solid black;
//   border-radius: 999px;
//   margin: 15px auto;
// }

.el-pagination{
  position: absolute;
  right: 30%;
  margin-top: 25px;
}
</style>
