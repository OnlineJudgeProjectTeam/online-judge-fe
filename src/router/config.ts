import { RouteRecordRaw } from "vue-router";
import { asyncHome, asyncLogin } from "./component";

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
];
