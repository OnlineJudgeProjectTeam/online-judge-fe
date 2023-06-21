<script lang="ts" setup>
import { ref, watch, Ref } from "vue";
// import useGetProblemList from "../hooks/homeMain/useGetProblemList";
import useChangeFavorite from "@/hooks/homeMain/useChangeFavorite";
import useGetCollect from "@/hooks/myspace/getcollect";
import { useRouter } from "vue-router";

const router = useRouter();
async function enter(id: number) {
  router.push(`/detail?problemId=${id}`);
}

let problemInfo: ProblemInfo = {
  pageNum: 1,
  pageSize: 5,
  navSize: 3,
};

const currentPage = ref<number>(1);

const pageinfo = ref({}) as Ref<PageInfo>;

// const { data, fetching, error, query } = useGetProblemList();
const { data, fetching, error, query } = useGetCollect();

query(problemInfo);

const changeFavorite = useChangeFavorite();

async function search() {
  problemInfo.pageNum = currentPage.value;
  query(problemInfo).then(() => {
    pageinfo.value = data.value;
  });
}

function judge() {
  if (
    !error.value &&
    !fetching.value 
  ) {
    return true;
  } else {
    return false;
  }
}

async function collect(id: number, problem: ProblemRes) {
  changeFavorite(id).then((res: any) => {
    if (res.data.value === "操作成功") {
      if (problem.isFavorite === 1) {
        problem.isFavorite = 0;
        problem.favorites--;
      } else {
        problem.isFavorite = 1;
        problem.favorites++;
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
    <br>
    <el-timeline>
    <el-timeline-item
      v-for="problem in pageinfo.list"
      class="timeline"
    >
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span @click="enter(problem.id)">{{problem.name}}-{{problem.difficulty}}</span>
        <el-button text @click="collect(problem.id,problem)">{{problem.isFavorite?'恢复':'取消收藏'}}</el-button>
      </div>
    </template>
    <span>{{problem.tags}}</span>
  </el-card>
    </el-timeline-item>
  </el-timeline>

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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card{
  width: 12cm;
}
.card-header{
  height: 0.5cm;
}
.container {
  margin: 0 auto;
  width: 75%;
  // height: 92vh;
}

.el-progress {
  margin: 8px 8px;
}
.el-pagination {
  position: absolute;
  right: 50%;
}
</style>
