<script lang="ts" setup>
import { onUpdated, ref, watch } from "vue";
import Pointer from "@components/detail/Pointer.vue";
import usePointer from "@/hooks/usePointer";

const code = ref<string[]>([
  "const a = 1  //测试，",
  "const a = 2",
  "for(let i = 1; i <= n; i++)",
]);

const { pointerHandler, pointerPosition, pushPointer } = usePointer(code.value);

const input = ref();
const inputText = ref();
const isInputFocus = ref(false);

onUpdated(() => {
  input.value.focus();
});

const inputHandler = () => {
  console.log(1);
  input.value.focus();
  isInputFocus.value = true;
  console.log(isInputFocus.value);
};

const backSpaceHandler = () => {
  if (pointerPosition.x === 0) {
    if (pointerPosition.y === 0) return;
    let l = code.value[pointerPosition.y - 1].length;
    code.value[pointerPosition.y - 1] =
      code.value[pointerPosition.y - 1] + code.value[pointerPosition.y];
    code.value.splice(pointerPosition.y, 1);
    pushPointer(l, -1);
  } else {
    code.value[pointerPosition.y] =
      code.value[pointerPosition.y].substring(0, pointerPosition.x - 1) +
      code.value[pointerPosition.y].substring(pointerPosition.x);
    pushPointer(-1, 0);
  }
};

const enterHandler = (strArr: string[], endStr: string) => {
  let a = strArr;
  a.splice(0, 1);
  let l = a[a.length - 1].length;
  a[a.length - 1] += endStr;
  code.value.splice(pointerPosition.y + 1, 0, ...a);
  console.log(code.value);
  pushPointer(l - pointerPosition.x, a.length);
};

const upHandler = () => {
  pushPointer(0, -1);
};

const downHandler = () => {
  pushPointer(0, 1);
};

const leftHandler = () => {
  pushPointer(-1, 0);
};

const rightHandler = () => {
  pushPointer(1, 0);
};

watch(inputText, () => {
  if (!inputText.value) return;
  console.log(inputText.value);
  const strArr = inputText.value.split("\n");
  const endStr = code.value[pointerPosition.y].slice(pointerPosition.x);
  code.value[pointerPosition.y] =
    code.value[pointerPosition.y].slice(0, pointerPosition.x) + strArr[0];
  console.log(strArr);
  if (strArr.length > 1) enterHandler(strArr, endStr);
  else pushPointer(inputText.value.length, 0);
  inputText.value = "";
});
</script>

<template>
  <div class="code-editor">
    <Pointer :pointer-position="pointerPosition" :code="code"></Pointer>
    <div class="line-container"></div>
    <div class="code-container">
      <div class="code-line" v-for="(item, index) in code">
        <div class="line-number">
          {{ index }}
        </div>
        <div
          class="code"
          v-highlight
          @click="
            pointerHandler(index, code[index], $event);
            inputHandler();
          "
        >
          <pre class="javascript"><code>{{ item }}</code></pre>
        </div>
      </div>
    </div>
    <div class="editor-container">
      <textarea
        v-model="inputText"
        ref="input"
        class="editor"
        @keyup.delete="backSpaceHandler"
        @keyup.up="upHandler"
        @keyup.down="downHandler"
        @keyup.left="leftHandler"
        @keyup.right="rightHandler"
      ></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-editor {
  width: 50vw;
}

.line-container {
  position: absolute;
  width: 28px;
  min-height: 100vh;
  border-right: 1px solid rgba($color: #000000, $alpha: 0.3);
  background-color: #e3e3e3;
}

.code-container {
  position: relative;
  min-height: 100vh;
  margin-left: 32px;

  .line-number {
    position: absolute;
    left: -16px;
    font-size: 14px;
  }

  .code {
    min-width: 100px;
    min-height: 18px;
    cursor: text;
    & > pre > code {
      outline: none;
      font-size: 16px;
      padding: 0;
    }
  }
}

.editor-container {
  position: fixed;
  top: 16px;
  left: 32px;
  width: 3px;
  height: 0px;
  overflow: hidden;

  .editor {
    height: 16px;
    width: 1000px;
    outline: none;
  }
}
</style>
