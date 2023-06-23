<script lang="ts" setup>
import Header from "@/components/Header.vue";
import { SolutionsInfo, Page, Solutions } from "@/type/selectedSolutions";
import useGetSolutionProblem from "@/hooks/selectedSolutions/useGetSolutionList";
import { Ref, ref, watch } from "vue";
import usePutLike from "@/hooks/selectedSolutions/usePutLike";
import router from "@/router";

let solutionsInfo: SolutionsInfo = {
  pageNum: 1,
  pageSize: 10,
  navSize: 1,
};

let url1 = "/src/assets/images/star-yellow.png";
let url2 = "/src/assets/images/star.png";

const url = ref<string>();

const page = ref({}) as Ref<Page>;

const { data, fetching, error, query } = useGetSolutionProblem();

const putLike = usePutLike();

query(solutionsInfo);

async function Like(id: number, solution: Solutions) {
  putLike(id).then((res: any) => {
    if (res.data.value === "成功") {
      if (solution.isLike === true) {
        solution.isLike = false;
        solution.likes!--;
        url.value = url2;
      } else {
        solution.isLike = true;
        solution.likes!++;
        url.value = url1;
      }
      query(solutionsInfo).then(() => {
        page.value = data.value;
      });
    }
  });
}
async function check(solutionId: number) {
  router.push(`/solution?id=${solutionId}`);
}

watch(data, () => {
  page.value = data.value;
});
</script>

<template>
  <div class="container" v-if="!error && !fetching">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <el-card v-for="solution in page.list">
        <div class="content">
          <div class="top">
            <div class="problem" @click="check(solution.id!)">
              <a>{{ solution.problemName }}</a>
            </div>
            <div class="initiator">
              <el-avatar :src="solution.avatar" />
              <a>{{ solution.name }}</a>
            </div>
          </div>
          <div class="solution">
            <textarea name="" id="" rows="10" readonly>{{
              solution.content
            }}</textarea>
          </div>
          <div class="bottom">
            <div class="collected" @click="Like(solution.id!, solution)">
              <img :src="(url = solution.isLike ? url1 : url2)" alt="" />
              <a>{{ solution.likes }}</a>
            </div>
            <div class="time">
              <a>{{ solution.updatedTime }}</a>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  width: 60%;
  height: 92vh;
  margin-top: 20px;
}
.el-card {
  margin: 20px auto;
  border-radius: 20px;
  &:hover {
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.02),
      0px 4px 25px rgba(0, 0, 0, 0.04), 0px 4px 25px rgba(0, 0, 0, 0.02),
      0px 4px 25px rgba(0, 0, 0, 0.02);
    transition: all 0.3s;
    transform: scale(1.02);
    cursor: pointer;
  }
}
.initiator {
  margin: auto 0;
  font-size: 14px;
  color: #1a1a1abf;
  a {
    vertical-align: middle;
    margin-left: 10px;
  }
}
.el-avatar {
  width: 3vh;
  height: 3vh;
  vertical-align: middle;
  cursor: pointer;
}
.problem {
  color: #262626;
  font-size: 18px;
  font-weight: 550;
  margin: auto 0;
  margin-bottom: 10px;
  right: 0;
  &:hover {
    cursor: pointer;
    color: rgb(0, 122, 255);
  }
  a {
    vertical-align: middle;
  }
}

.solution {
  width: 100%;
  height: 18.5vh;
  margin: 20px 5px;
  text-align: center;
}

textarea {
  font-size: 15px;
  text-align: initial;
  width: 100%;
  height: 100%;
  overflow: auto;
  word-break: break-all;
  overflow: hidden;
  border: none;
  resize: none;
  outline: none;
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
.bottom {
  display: flex;
  position: relative;
}
.time {
  color: #262626;
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  right: 0;
  a {
    vertical-align: middle;
  }
}
</style>
