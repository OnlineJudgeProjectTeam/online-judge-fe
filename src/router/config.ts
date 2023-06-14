import { RouteRecordRaw } from "vue-router";
import { asyncDetail, asyncHome, asyncLogin } from "./component";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: asyncHome,
  },
  {
    path: "/login",
    name: "login",
    component: asyncLogin,
  },
  {
    path: "/detail",
    name: "detail",
    component: asyncDetail,
  },
];
