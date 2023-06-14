import { RouteRecordRaw } from "vue-router";
import {
  asyncHome,
  asyncLogin,
  asyncRegister,
  asyncVerify,
  asyncDetail,
} from "./component";

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
    path: "/verify",
    name: "verify",
    component: asyncVerify,
  },
  {
    path: "/register",
    name: "register",
    component: asyncRegister,
  },
  {
    path: "/detail",
    name: "detail",
    component: asyncDetail,
  },
];
