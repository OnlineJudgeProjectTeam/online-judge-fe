<script lang="ts" setup>
import { onUpdated, ref, watch, computed } from "vue";
import Pointer from "@components/detail/Pointer.vue";
import usePointer from "@/hooks/usePointer";
import downImg from "@/assets/images/down.png";

const props = defineProps<{
  template: string[];
}>();

const code = ref<string[]>(props.template[0].split("\n"));
const codeRef = ref();
const offsetLeft = computed(() => {
  if (!codeRef.value) return;
  return codeRef.value.offsetLeft;
});
const offsetTop = computed(() => {
  if (!codeRef.value) return;
  return codeRef.value.offsetTop;
});

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
  else {
    code.value[pointerPosition.y] += endStr;
    pushPointer(inputText.value.length, 0);
  }
  inputText.value = "";
});

const languageList = ["Java", "C"];
const language = ref(0);
const isShowDrop = ref(false);

const changeLanguage = (index: number) => {
  language.value = index;
};
</script>

<template>
  <div class="code-editor">
    <Pointer
      :pointer-position="pointerPosition"
      :code="code"
      :offsetLeft="offsetLeft"
      :offsetTop="offsetTop"
    ></Pointer>
    <div class="code-top">
      <div class="code-language" @click="isShowDrop = !isShowDrop">
        <p>{{ languageList[language] }}</p>
        <img :src="downImg" />
      </div>
      <div class="code-drop" :class="{ hidden: !isShowDrop }">
        <div
          class="drop-item"
          :class="{ active: language === index }"
          v-for="(item, index) in languageList"
          @click="changeLanguage(index)"
        >
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
    <div class="line-container"></div>
    <div class="code-container" ref="codeRef">
      <div class="code-line" v-for="(item, index) in code">
        <div class="line-number">
          <p>{{ index }}</p>
        </div>
        <div
          class="code"
          v-highlight
          @click="
            pointerHandler(index, code[index], offsetLeft, $event);
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
  box-sizing: border-box;
  border-radius: 8px;
  width: 50vw;
  height: calc(100vh - 32px);
  margin: 16px;
  padding: 8px 16px;
  overflow-y: auto;
  background-color: white;
}

.code-top {
  box-sizing: border-box;
  height: 32px;
  padding: 8px 16px;
  background-color: white;

  .code-language {
    width: fit-content;
    cursor: pointer;
    filter: opacity(50%);
    display: flex;
    align-items: center;

    &:hover {
      filter: opacity(100%);
    }

    & > p {
      font-size: 14px;
    }

    & > img {
      height: 16px;
      width: 16px;
      margin-left: 8px;
    }
  }

  .code-drop {
    position: relative;
    top: 4px;
    left: -24px;
    width: 72px;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000,
      0px 1px 3px #0000000a, 0px 4px 12px #00000014;
    filter: drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px)
      drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px);
    z-index: 100;

    &.hidden {
      display: none;
    }

    .drop-item {
      font-size: 14px;
      padding: 4px 24px 4px 4px;
      font-size: 14px;
      border-radius: 8px;
      color: #e2e8f0;
      cursor: pointer;

      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.05);
      }

      &.active {
        color: black;
      }
    }
  }
}

.line-container {
  position: absolute;
  width: 28px;
}

.code-container {
  position: relative;
  top: 8px;
  margin-left: 32px;

  .line-number {
    position: absolute;
    height: 18.5px;
    left: -30px;
    font-size: 12px;
    color: #237893;
    user-select: none;
    display: flex;
    align-items: center;
  }

  .code {
    min-width: 100px;
    min-height: 18px;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
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
