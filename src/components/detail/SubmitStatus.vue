<script lang="ts" setup>
import useStatusStore from "@/stores/status";
import { Status } from "@/type/detail/index";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const { query } = useRoute();
const store = useStatusStore();
const status = ref<Status>();

watch(store.$state, () => {
  status.value = store.$state;
});

const closeHandler = () => {
  store.$state.isShow = false;
};
</script>

<template>
  <div class="submit-status" v-if="status" v-show="status.isShow">
    <div class="close" @click="closeHandler">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="currentColor"
        class="text-gray-6 dark:text-dark-gray-6 group-hover:text-gray-7 dark:group-hover:text-dark-gray-7 h-4 w-4"
      >
        <path
          fill-rule="evenodd"
          d="M13.414 12L19 17.586A1 1 0 0117.586 19L12 13.414 6.414 19A1 1 0 015 17.586L10.586 12 5 6.414A1 1 0 116.414 5L12 10.586 17.586 5A1 1 0 1119 6.414L13.414 12z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div class="top">
      <div class="language-tag">
        <p>{{ status.language }}</p>
      </div>
      <div class="spacer"></div>
      <div
        class="btn"
        v-if="status.timeCost !== '-1'"
        @click="router.push(`/create-solution?id=${query.problemId}`)"
      >
        <p>写题解</p>
      </div>
    </div>
    <div
      class="msg"
      :class="{ error: status.timeCost === '-1' }"
      v-show="status.timeCost === '-1'"
    >
      <div class="error-msg">报错信息</div>
      <p>{{ status.msg }}</p>
    </div>
    <div class="cost" v-show="status.timeCost !== '-1'">
      <div class="cost-item time">
        <p class="title">时间</p>
        <p class="content">{{ `${status.timeCost} ms` }}</p>
        <div class="spacer"></div>
        <p class="title">击败</p>
        <div class="tag">
          <p>{{ `${Math.floor(status.timeBeat * 100)}` }}</p>
          <p class="small-text">
            {{
              `.${
                (status.timeBeat * 100)?.toFixed(2).toString().split(".")[1]
              }%`
            }}
          </p>
        </div>
      </div>
      <div class="cost-item memory">
        <p class="title">内存</p>
        <p class="content">{{ `${status.memoryCost} ms` }}</p>
        <div class="spacer"></div>
        <p class="title">击败</p>
        <div class="tag">
          <p>{{ `${Math.floor(status.memoryBeat * 100)}` }}</p>
          <p class="small-text">
            {{
              `.${
                (status.memoryBeat * 100)?.toFixed(2).toString().split(".")[1]
              }%`
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="code" v-highlight>
      <pre class="java"><code>{{ status.code }}</code></pre>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.submit-status {
  position: absolute;
  box-sizing: border-box;
  border-radius: 8px;
  width: 44vw;
  height: calc(100vh - 32px);
  margin: 16px;
  padding: 8px 16px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: white;
  z-index: 1000;

  .close {
    position: absolute;
    left: 16px;
    top: 12px;
    height: 24px;
    width: 24px;
    cursor: pointer;
  }

  .top {
    margin-top: 36px;
    padding: 0 12px;
    display: flex;
    align-items: center;

    .language-tag {
      position: relative;
      padding: 0 12px;
      height: 24px;
      width: fit-content;
      font-size: 14px;
      border-radius: 16px;
      color: rgb(0, 122, 255);
      background-color: rgba(66, 153, 225, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .spacer {
      flex: 1;
    }

    .btn {
      padding: 5px 12px;
      border-radius: 10px;
      background-color: rgba(45, 181, 93, 0.7);
      color: white;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: rgba(30, 146, 71, 0.7);
      }
    }
  }

  .msg {
    position: relative;
    margin-top: 24px;
    padding: 16px;
    background-color: #f6f6f6;
    border-radius: 10px;

    .error-msg {
      width: 100%;
      font-size: 14px;
      color: #262626bf;
      padding-bottom: 4px;
      margin-bottom: 12px;
      border-bottom: 1px solid #c4c4c4;
    }

    & > p {
      font-size: 14px;
    }

    &.error {
      color: rgb(239, 71, 67);
    }
  }
  .code {
    position: relative;
    margin-top: 24px;
    padding: 0 4px;
    background-color: #f6f6f6;
    border-radius: 10px;

    & > pre > code {
      background-color: #f6f6f6;
      font-size: 14px;
    }
  }

  .cost {
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;

    .cost-item {
      position: relative;
      margin-top: 24px;
      width: 45%;
      margin-right: 5%;
      display: flex;
      align-items: center;
      justify-content: center;

      .title {
        margin-right: 8px;
        font-size: 12px;
        color: #3c3c4399;
      }

      .content {
        font-size: 16px;
        font-weight: bold;
      }

      .tag {
        height: fit-content;
        padding: 4px 8px;
        width: fit-content;
        font-size: 14px;
        border-radius: 16px;
        color: white;
        background-color: rgb(0 122 255);
        display: flex;
        align-items: baseline;
        justify-content: center;

        .small-text {
          font-size: 12px;
        }
      }

      &.memory > .tag {
        background-color: rgb(175 82 222);
      }
    }
  }
}

.spacer {
  flex: 1;
}
</style>
