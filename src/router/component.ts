import { defineAsyncComponent } from "vue";

export const asyncHome = defineAsyncComponent({
  loader: () => import("@pages/Home.vue"),
});

export const asyncLogin = defineAsyncComponent({
  loader: () => import("@pages/login/Login.vue"),
});

export const asyncVerify = defineAsyncComponent({
  loader: () => import("@pages/login/Verify.vue"),
});

export const asyncRegister = defineAsyncComponent({
  loader: () => import("@pages/login/Register.vue"),
});

export const asyncDetail = defineAsyncComponent({
  loader: () => import("@pages/Detail.vue"),
});
