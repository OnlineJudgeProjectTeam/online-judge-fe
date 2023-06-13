import { RouteRecordRaw } from "vue-router";
import { asyncHome } from "./component";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: asyncHome,
  },
];
