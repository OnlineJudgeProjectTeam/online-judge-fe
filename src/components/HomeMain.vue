<script lang="ts" setup>
import { ref, watch, Ref } from "vue";
import useGetProblemList from "../hooks/homeMain/useGetProblemList";
import useChangeFavorite from "@/hooks/homeMain/useChangeFavorite";
import useGetEverydayProblem from "@/hooks/homeMain/useGetEverydayProblem";
import useGetTotalAcRate from "@/hooks/homeMain/useGetTotalAcRate";
import Tags from "./detail/Tags.vue";
import { useRouter } from "vue-router";
import useGetRandomProblem from "@/hooks/homeMain/useGetRandomProblem";

let problemInfo: ProblemInfo = {
  pageNum: 1,
  pageSize: 10,
  navSize: 3,
};

const name = ref<string>("");
const tags = ref<string>("");
const currentPage = ref<number>(1);

const pageinfo = ref({}) as Ref<PageInfo>;
const router = useRouter();

const diff = ref<string>("难度");
let state: string = "";
const state1: string = "/src/assets/images/correct.svg";
const state2: string = "/src/assets/images/wrong.svg";
const state3: string = "/src/assets/images/start.svg";

const { data, fetching, error, query } = useGetProblemList();
const { dataEvery, fetchingEvery, errorEvery, queryEvery } =
  useGetEverydayProblem();
const { dataAc, fetchingAc, errorAc } = useGetTotalAcRate();
const changeFavorite = useChangeFavorite();
const getRandomProblem = useGetRandomProblem();

query(problemInfo);
queryEvery();

async function search() {
  problemInfo.pageNum = currentPage.value;
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

async function send() {
  problemInfo.name = name.value;
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

async function choose(tag: string, checked: boolean) {
  if (checked === false) {
    tags.value = tags.value.replace(tag, "");
  } else {
    tags.value = tags.value + tag;
  }
  problemInfo.tags = tags.value;
  console.log(tags.value);
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

async function changeAll() {
  problemInfo.difficulty = "";
  diff.value = "难度";
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

async function changeEasy() {
  problemInfo.difficulty = "简单";
  diff.value = "简单";
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

async function changeMid() {
  problemInfo.difficulty = "中等";
  diff.value = "中等";
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

async function changeDifficult() {
  problemInfo.difficulty = "困难";
  diff.value = "困难";
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

async function randomDetail() {
  getRandomProblem().then((res: any) => {
    if (!res.error.value) {
      router.push(`/detail?problemId=${res.data.value.id}`);
    }
  });
}

async function gotoDetail(id: number) {
  router.push(`/detail?problemId=${id}`);
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
      queryEvery();
      query(problemInfo).then(() => {
        pageinfo.value = data.value;
      });
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
          <input type="text" placeholder="请输入题目名称" v-model="name" />
          <div class="btn" @click="send()">
            <img src="../assets/images/search.png" alt="搜索" />
          </div>
        </div>
        <div class="degree" @click="displayd">
          <div
            class="label"
            :class="{
              box1: diff === '简单',
              box2: diff === '中等',
              box3: diff === '困难',
            }"
          >
            {{ diff }}
          </div>
          <div class="text">
            <a
              :class="isShowd === true ? 'choice' : 'hide'"
              @click="changeAll()"
              :style="{ color: 'rgb(0, 122, 255)' }"
              >所有难度</a
            >
            <a
              :class="isShowd === true ? 'choice' : 'hide'"
              @click="changeEasy()"
              :style="{ color: 'rgb(0, 175, 155)' }"
              >简单</a
            >
            <a
              :class="isShowd === true ? 'choice' : 'hide'"
              @click="changeMid()"
              :style="{ color: 'rgb(255, 184, 0)' }"
              >中等</a
            >
            <a
              :class="isShowd === true ? 'choice' : 'hide'"
              @click="changeDifficult()"
              :style="{ color: 'rgb(255, 45, 85)' }"
              >困难</a
            >
          </div>
          <div class="btn">
            <img src="../assets/images/down.png" alt="" />
          </div>
        </div>
      </div>

      <div class="random" @click="randomDetail">
        <img src="../assets/images/random.svg" alt="" />
        <a>随机一题</a>
      </div>
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
          <div class="status">
            <img src="../assets/images/every.svg" alt="" />
          </div>
          <div class="question" @click="gotoDetail(dataEvery.id)">
            {{ dataEvery.name }}
          </div>
          <div class="answer">{{ dataEvery.solutions }}</div>
          <div class="assort">{{ dataEvery.tags }}</div>
          <div
            class="difficulty"
            :class="{
              box1: dataEvery.difficulty === '简单',
              box2: dataEvery.difficulty === '中等',
              box3: dataEvery.difficulty === '困难',
            }"
          >
            {{ dataEvery.difficulty }}
          </div>
          <div class="collected" @click="collect(dataEvery.id, dataEvery)">
            <img :src="(url = dataEvery.isFavorite ? url1 : url2)" alt="" />
            <a>{{ dataEvery.favorites }}</a>
          </div>
        </div>
        <div class="content" v-for="problem in pageinfo.list">
          <div class="status">
            <img
              :src="
                (state =
                  problem.status === 2
                    ? state1
                    : problem.status === 1
                    ? state2
                    : state3)
              "
              alt=""
            />
          </div>
          <div class="question" @click="gotoDetail(problem.id)">
            {{ problem.name }}
          </div>
          <div class="answer">{{ problem.solutions }}</div>
          <div class="assort">{{ problem.tags }}</div>
          <div
            class="difficulty"
            :class="{
              box1: problem.difficulty === '简单',
              box2: problem.difficulty === '中等',
              box3: problem.difficulty === '困难',
            }"
          >
            {{ problem.difficulty }}
          </div>
          <div class="collected" @click="collect(problem.id, problem)">
            <img :src="(url = problem.isFavorite ? url1 : url2)" alt="" />
            <a>{{ problem.favorites }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <el-progress
        :percentage="dataAc.acData[1].acRate"
        color="rgb(0, 175, 155)"
      >
        <span>{{ dataAc.acData[1].acRate }}% 简单</span>
      </el-progress>
      <el-progress
        :percentage="dataAc.acData[2].acRate"
        color="rgb(255, 184, 0)"
      >
        <span>{{ dataAc.acData[2].acRate }}% 中等</span>
      </el-progress>
      <el-progress
        :percentage="dataAc.acData[3].acRate"
        color="rgb(255, 45, 85)"
      >
        <span>{{ dataAc.acData[3].acRate }}% 困难</span>
      </el-progress>
      <el-progress
        type="circle"
        :percentage="dataAc.acData[0].acRate"
        width="100"
        style="margin-left: 45px"
      >
        <span>总通过率<br /><br />{{ dataAc.acData[0].acRate }}% </span>
      </el-progress>
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
  &:hover {
    cursor: pointer;
    background-color: rgb(247, 247, 247);
    transition: all 0.3s;
  }
  background-color: rgb(242, 243, 244);
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
  border-radius: 10px;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
  a:nth-child(4) {
    padding-bottom: 5px;
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
  color: rgb(45, 181, 93);
  cursor: pointer;
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
    background-color: rgb(45, 181, 93);
    border-radius: 999px;
    padding: 5px;
    margin-right: 10px;
  }
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
.contents {
  color: rgb(38, 38, 38);
}

.status {
  margin-left: 15px;
  width: 10%;
  img {
    width: 18px;
    height: 18px;
    margin-top: 5px;
  }
}

.question {
  width: 30%;
  cursor: pointer;
  &:hover {
    color: rgb(0, 122, 255);
  }
}
.answer {
  width: 10%;
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
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.02),
    0px 6px 12px rgba(0, 0, 0, 0.02);
}

.el-progress {
  margin: 10px 10px;
}

.el-pagination {
  position: absolute;
  right: 30%;
  margin-top: 20px;
  padding-bottom: 10px;
}

.box1 {
  color: rgb(0, 175, 155);
}
.box2 {
  color: rgb(255, 184, 0);
}
.box3 {
  color: rgb(255, 45, 85);
}
</style>
