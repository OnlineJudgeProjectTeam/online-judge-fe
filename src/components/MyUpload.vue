<script lang="ts" setup>
import {SolutionsInfo,Page} from "@/type/selectedSolutions";
import useGetSolutionProblem from "@/hooks/selectedSolutions/useGetSolutionList";
import { Ref, ref, watch } from "vue";
import { userStore } from "@/stores/login";
import { storeToRefs } from "pinia";
const store = userStore();
const { userData } = storeToRefs(store);

let solutionsInfo: SolutionsInfo = {
  pageNum: 1,
  pageSize: 4,
  navSize: 3,
  userId: userData.value?.id,
};

let url1 = "/src/assets/images/star-yellow.png";
let url2 = "/src/assets/images/star.png";

const url = ref<string>();

const page = ref({}) as Ref<Page>;

const { data, fetching, error, query } = useGetSolutionProblem();

query(solutionsInfo);

watch(data, () => {
  page.value = data.value;
});
</script>

<template>
  <div class="container" v-if="!error && !fetching">
    <div class="main">
      <el-card v-for="solution in page.list" >
        <div class="content">
          <div class="top">
            <div class="initiator">
              <el-avatar :src="solution.avatar"/>
              <a>{{ solution.name }}</a>
            </div>
            <div class="problem">
              <a >{{ solution.problemName }}</a>
            </div>
          </div>
          <div class="solution">
            {{ solution.content }}
          </div>
          <div class="bottom">
            <div class="collected">
              <img :src="(url = solution.isLike ? url1 : url2)" alt="">
              <a >{{ solution.likes }}</a>
            </div>
            <div class="time">
              <a >{{ solution.updatedTime }}</a>
            </div>
          </div>
        </div>
      </el-card>
      <el-card>

      </el-card>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  .main{
    margin: 0 auto;
    width: 60%;
    height: 92vh;
    margin-top: 20px;
  }
  .el-card{
    margin: 20px auto;
  }
  .top{
    display: flex;
    position: relative;
  }
  .initiator{
    margin: auto 0;
    a{
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .el-avatar{
    width: 5vh;
    height: 5vh;
    vertical-align: middle;
    cursor: pointer;
  }
  .problem{
    margin: auto 0;
    position: absolute;
    right: 0;
    &:hover{
      cursor: pointer;
      color: blue;
    }
    a{
      vertical-align: middle;
    }
  }
  
  .solution{
    width: 100%;
    height: 19vh;
    margin: 20px 5px;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:6;
    overflow:hidden;
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
  .bottom{
    display: flex;
    position: relative;
  }
  .time{
    position: absolute;
    right: 0;
    a{
      vertical-align: middle;
    }
  }
</style>