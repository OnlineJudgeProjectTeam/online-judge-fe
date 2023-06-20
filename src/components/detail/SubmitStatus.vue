<script lang="ts" setup>
import { Status } from "@/type/detail/index";

defineProps<{
  status: Status;
}>();
</script>

<template>
  <div class="submit-status" v-show="status.isShow">
    <div class="language-tag">
      <p>{{ status.language }}</p>
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
          <p>{{ `${Math.floor(status.timeBeat)}` }}</p>
          <p class="small-text">
            {{ `.${status.timeBeat.toFixed(2).toString().split(".")[1]}%` }}
          </p>
        </div>
      </div>
      <div class="cost-item memory">
        <p class="title">内存</p>
        <p class="content">{{ `${status.memoryCost} ms` }}</p>
        <div class="spacer"></div>
        <p class="title">击败</p>
        <div class="tag">
          <p>{{ `${Math.floor(status.memoryBeat)}` }}</p>
          <p class="small-text">
            {{ `.${status.memoryBeat.toFixed(2).toString().split(".")[1]}%` }}
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

  .language-tag {
    position: relative;
    margin-top: 16px;
    margin-left: 8px;
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
