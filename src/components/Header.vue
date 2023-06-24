<script lang="ts" setup>
import { userStore } from "@/stores/login";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const store = userStore();
const router = useRouter();
const { userData } = storeToRefs(store);

// const name = ref<string>(userData.value!.name);
// const avatar = ref<string>(userData.value!.avatar!);

// const greet = ref<string>("Hello, " + name.value + "!");

async function main() {
  router.push(`/`);
}

async function display(num: number) {
  if (num === 0) {
    router.push(`/`);
  } else if (num === 1) {
    router.push(`/SelectedSolutions`);
  } else {
    router.push(`/ranking`);
  }
}

async function PersonalCenter() {
  router.push("/infoeditor");
}
</script>

<template>
  <div class="header">
    <div class="logo" @click="main">
      <img src="../assets/images/logo.svg" alt="" />
      <a>OnlineJudge</a>
    </div>
    <div class="choice">
      <div
        class="bank"
        :class="{ show: $route.name === 'home' }"
        @click="display(0)"
      >
        题库
      </div>
      <div
        class="solving"
        :class="{ show: $route.name === 'SelectedSolutions' }"
        @click="display(1)"
      >
        精选题解
      </div>
      <div
        class="rank"
        :class="{ show: $route.name === 'ranking' }"
        @click="display(2)"
      >
        排行榜
      </div>
    </div>
    <div class="user">
      <a>Hello, {{ userData?.name }} !</a>
      <el-avatar
        class="avatar"
        :size="50"
        :src="userData?.avatar"
        @click="PersonalCenter"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  box-shadow: 0 5px 10px -5px rgb(241, 238, 238);
  display: flex;
  background-color: white;
}
.logo {
  margin: auto 0;
  margin-left: 175px;
  width: 15%;
  img {
    width: 5vh;
    height: 5vh;
    vertical-align: middle;
  }
  a {
    padding-left: 10px;
    vertical-align: middle;
  }
  &:hover {
    cursor: pointer;
  }
}
.choice {
  display: flex;
  justify-self: start;
  margin: auto;
  margin-left: 50px;
}
.bank {
  width: 5vh;
  margin-right: 40px;
  text-align: center;
  padding: 18px;
  // box-sizing: border-box;
  &:hover {
    font-weight: 550;
    cursor: pointer;
  }
  &.show {
    border-bottom: 3px solid rgba($color: #000000, $alpha: 0.6);
  }
}
.solving {
  width: 10vh;
  margin-right: 40px;
  text-align: center;
  padding: 18px;
  // box-sizing: border-box;
  &:hover {
    font-weight: 550;
    cursor: pointer;
  }
  &.show {
    border-bottom: 3px solid rgba($color: #000000, $alpha: 0.6);
  }
}
.rank {
  width: 8vh;
  margin-right: 40px;
  text-align: center;
  padding: 18px;
  // box-sizing: border-box;
  &:hover {
    font-weight: 550;
    cursor: pointer;
  }
  &.show {
    border-bottom: 3px solid rgba($color: #000000, $alpha: 0.6);
  }
}
.user {
  margin: auto 0;
  margin-right: 180px;
  a {
    vertical-align: middle;
  }
  .avatar {
    width: 5vh;
    height: 5vh;
    vertical-align: middle;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
