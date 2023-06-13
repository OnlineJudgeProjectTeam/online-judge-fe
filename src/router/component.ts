import { defineAsyncComponent } from "vue";

export const asyncHome = defineAsyncComponent({
  loader: () => import("@pages/Home.vue"),
});
