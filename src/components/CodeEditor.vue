<script lang="ts" setup>
import { ref } from "vue";

const code = ref<string[]>(["const a = 1"]);
</script>

<template>
  <div class="code-editor">
    <div class="line-container"></div>
    <div class="code-container">
      <div class="code-line" v-for="(item, index) in code">
        <div class="line-number">
          {{ index }}
        </div>
        <div class="code" v-highlight>
          <pre><code>{{ item }}</code></pre>
        </div>
      </div>
    </div>
    <div class="editor-container">
      <textarea class="editor"></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-container {
  position: absolute;
  width: 28px;
  min-height: 100vh;
  left: 0;
  border-right: 1px solid rgba($color: #000000, $alpha: 0.5);
  background-color: #e3e3e3;
}

.code-container {
  position: relative;
  margin-left: 29px;

  .line-number {
    position: absolute;
    left: -16px;
  }

  .code {
    & > pre > code {
      padding: 0;
    }
  }
}

.editor-container {
  position: relative;
  width: 3px;
  height: 0px;
  overflow: hidden;

  .editor {
    outline: none;
  }
}
</style>
