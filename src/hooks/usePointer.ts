import { ref, reactive } from "vue";

const usePointer = (code: string[]) => {
  const isShowPointer = ref(true);
  let pointerInterval = setInterval(() => {
    isShowPointer.value = !isShowPointer.value;
  }, 500);

  const pointerPosition = reactive({
    x: 0,
    y: 0,
  });

  const resetPointer = () => {
    clearInterval(pointerInterval);
    pointerInterval = setInterval(() => {
      isShowPointer.value = !isShowPointer.value;
    }, 500);
    isShowPointer.value = false;
    setTimeout(() => {
      isShowPointer.value = true;
    }, 0);
  };

  const pointerHandler = (index: number, str: string, e: any) => {
    e.stopPropagation();
    const clickX = e.screenX - 32;
    pointerPosition.x = getCharacterIndex(str, clickX);
    pointerPosition.y = index;
    resetPointer();
  };

  const getCharacterIndex = (str: string, clickX: number) => {
    let x = -4;
    for (let i = 0; i < str.length; i++) {
      let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(str[i])) x += 16;
      else x += 8;
      if (clickX < x) return i;
    }
    return str.length;
  };

  const pushPointer = (x: number, y: number) => {
    pointerPosition.y += y;
    if (pointerPosition.y >= code.length) pointerPosition.y = code.length - 1;
    if (pointerPosition.y < 0) pointerPosition.y = 0;
    pointerPosition.x += x;
    if (pointerPosition.x >= code[pointerPosition.y].length)
      pointerPosition.x = code[pointerPosition.y].length - 1;
    if (pointerPosition.x < 0) pointerPosition.x = 0;
    resetPointer();
  };

  return { isShowPointer, pointerHandler, pointerPosition, pushPointer };
};

export default usePointer;
