import { defineStore } from "pinia";
import { Status } from "@/type/detail/index";
import { ref } from "vue";

const useStatusStore = defineStore("status", () => {
  const status = ref<Status>();

  return status;
});

export default useStatusStore;
