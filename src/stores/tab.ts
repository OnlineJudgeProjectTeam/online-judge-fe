import { defineStore } from "pinia";

const useTabStore = defineStore("tab", {
  state: () => {
    return {
      tab: 0,
    };
  },
  actions: {
    setActive(tab: number) {
      this.tab = tab;
    },
  },
});

export default useTabStore;
