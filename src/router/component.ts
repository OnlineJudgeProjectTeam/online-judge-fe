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

export const asyncMySpace = defineAsyncComponent({
  loader: () => import("@pages/MySpace.vue"),
});

export const asyncShowInfo = defineAsyncComponent({
  loader: () => import("@components/ShowInfo.vue"),
});

export const asyncInfoEditor = defineAsyncComponent({
  loader: () => import("@components/InfoEditor.vue"),
});

export const asyncImageUp = defineAsyncComponent({
  loader: () => import("@components/ImageUp.vue"),
});

export const asyncAccountCtrl = defineAsyncComponent({
  loader: () => import("@components/AccountCtrl.vue"),
});

export const asyncMyCollect = defineAsyncComponent({
  loader: () => import("@components/MyCollect.vue"),
});

export const asyncMyHistory = defineAsyncComponent({
  loader: () => import("@components/MyHistory.vue"),
});

export const asyncMyUpload = defineAsyncComponent({
  loader: () => import("@components/MyUpload.vue"),
});