<script lang="ts" setup>
import {SolutionsInfo,Page, Solutions} from "@/type/selectedSolutions";
import useGetSolutionProblem from "@/hooks/selectedSolutions/useGetSolutionList";
import { Ref, ref, watch } from "vue";
import usedel from "@/hooks/myspace/delsolution";
import router from "@/router";
import { userStore } from "@/stores/login";
import { storeToRefs } from "pinia";
const store = userStore();
const { userData } = storeToRefs(store)
const del =usedel();
async function ondel(id:number) {
  del(id).then((res: any) => {
    if (!res.error.value) {
      alert('删除成功')
    }
    else{
      alert(res.error.value)
    }
  });
  
}
let solutionsInfo: SolutionsInfo = {
  pageNum: 1,
  pageSize: 3,
  navSize: 5,
  userId: userData.value?.id,
};

const currentPage = ref<number>(1);

let url1 = "/src/assets/images/star-yellow.png";
let url2 = "/src/assets/images/star.png";

const url = ref<string>();

const page = ref({}) as Ref<Page>;

const { data, fetching, error, query } = useGetSolutionProblem();

query(solutionsInfo);

async function search() {
  solutionsInfo.pageNum = currentPage.value;
  query(solutionsInfo).then(() => {
    page.value = data.value;
  });
}

async function check(problemId:number,solutionId:number) {
  router.push(`/detail?problemId=${problemId}&solutionId=${solutionId}`);
}

watch(data, () => {
  page.value = data.value;
});
</script>

<template>
  <div class="container" v-if="!error && !fetching">
    <!-- <div class="header">
    <Header/>
    </div> -->
    <div class="main">
      <el-card v-for="solution in page.list" >
        <div class="content">
          <div class="top">
            <div class="problem" @click="check(solution.problemId!,solution.id!)">
              <a >{{ solution.problemName }}</a>
            </div>
            <div class="initiator">
              <!-- <el-avatar :src="solution.avatar"/> -->
              <!-- <a>{{ solution.name }}</a> -->
            </div>
          </div>
          <div class="solution">
            <textarea name="" id="" rows="10" readonly>{{ solution.content }}</textarea>
          </div>
          <div class="bottom">
            <!-- <div class="collected" @click="Like(solution.id!,solution)"> -->
            <div class="collected">
              <img :src="(url = solution.isLike ? url1 : url2)" alt="">
              <a >{{ solution.likes }}</a>
            </div>
            <div class="del">
              <el-button text @click="ondel(solution.id!)">删除题解</el-button>
            </div>
            <div class="time">
              <a >{{ solution.updatedTime }}</a>
            </div>
          </div>
        </div>
      </el-card>
      <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="page.total"
      :pager-count="solutionsInfo.navSize"
      :page-size="solutionsInfo.pageSize"
      v-model:current-page="currentPage"
      @current-change="search"
    />
    </div>
  </div>

</template>

<style lang="scss" scoped>
  .main{
    margin: 0 auto;
    width: 90%;
    // height: 92vh;
  }
  .el-card{
    margin: 10px auto;
    border-radius: 20px;
    &:hover{
      box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.02),0px 4px 25px rgba(0, 0, 0, 0.04), 0px 4px 25px rgba(0, 0, 0, 0.02),
    0px 4px 25px rgba(0, 0, 0, 0.02);
    transition: all .3s;
    transform: scale(1.02);
    cursor: pointer;
    }
  }
  .initiator{
    margin: auto 0;
    font-size: 14px;
    color: #1A1A1ABF;
    a{
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .el-avatar{
    width: 3vh;
    height: 3vh;
    vertical-align: middle;
    cursor: pointer;
  }
  .problem{
    color: #262626;
    font-size: 18px;
    font-weight: 550;
    margin: auto 0;
    margin-bottom: 10px;
    right: 0;
    &:hover{
      cursor: pointer;
      color: rgb(0,122,255);
    }
    a{
      vertical-align: middle;
    }
  }
  
  .solution{
    width: 100%;
    height: 12vh;
    margin: 20px 5px;
    text-align: center;
  }

  textarea{
    font-size: 15px;
    text-align: initial;
    width: 100%;
    height: 100%;
    overflow: auto;
    word-break: break-all;
    overflow: hidden;
    border: none;
    resize: none;
    outline:none;
  }

  .collected {
    width: 10%;
    color: #262626;
    font-size: 14px;
    font-weight: 500;
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
  .bottom{
    display: flex;
    position: relative;
  }
  .time{
    color: #262626;
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    right: 0;
    a{
      vertical-align: middle;
    }
  }
</style>