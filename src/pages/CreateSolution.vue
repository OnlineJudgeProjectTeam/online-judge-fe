<script lang="ts" setup>
import Header from "@/components/Header.vue";
import Dropdown from "@/components/detail/Dropdown.vue";
import Md from "@/components/detail/Md.vue";
import useCreateSolution from "@/hooks/solution/useCreateSolution";
import { useRoute } from "vue-router";
import { ref } from "vue";

const languageList = ["Java", "C"];

const content = ref("");
const language = ref(0);

const { query } = useRoute();
const createSolution = useCreateSolution(query.id);

const createHandler = () => {
  createSolution(content.value, language.value);
};

const setLanguage = (index: number) => {
  language.value = index;
};
</script>

<template>
  <div class="create-solution">
    <Header></Header>

    <div class="container">
      <div class="top">
        <div class="drop">
          <Dropdown :list="languageList" @callback="setLanguage"></Dropdown>
        </div>
        <div class="spacer"></div>
        <div class="btn" @click="createHandler">
          <p>发布题解</p>
        </div>
      </div>
      <div class="main">
        <div class="input">
          <textarea v-model="content"></textarea>
        </div>
        <div class="preview">
          <Md :content="content"></Md>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-solution {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f3f3f3;

  .top {
    padding: 8px 16px;
    margin-top: 12px;
    border-bottom: 1px solid #dddddd;
    background-color: white;
    display: flex;
    align-items: center;

    .spacer {
      flex: 1;
    }

    .drop {
      width: 20vw;
    }

    .btn {
      padding: 6px 16px;
      border-radius: 10px;
      background-color: rgba(45, 181, 93, 0.7);
      color: white;
      cursor: pointer;

      &:hover {
        background-color: rgba(30, 146, 71, 0.7);
      }
    }
  }

  .container {
    margin: 0 10vw;
    background-color: white;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000,
      0px 1px 3px #0000000a, 0px 4px 12px #00000014;
    filter: drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px)
      drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px);

    .main {
      display: flex;

      .input {
        box-sizing: border-box;
        padding: 16px;
        width: 40vw;
        height: 80vh;
        border-right: 1px solid #dddddd;
        overflow-y: auto;

        & > textarea {
          font-size: 16px;
          height: 98%;
          width: 100%;
          border: none;
          outline: none;
          resize: none;
        }
      }

      .preview {
        box-sizing: border-box;
        padding: 16px;
        width: 40vw;
        height: 80vh;
        border-right: 1px solid #f1f1f1;
        word-wrap: break-word;
        overflow-y: auto;
      }
    }
  }
}
</style>
