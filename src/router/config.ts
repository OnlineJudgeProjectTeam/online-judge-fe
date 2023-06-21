import { RouteRecordRaw } from "vue-router";
import {
  asyncHome,
  asyncLogin,
  asyncRegister,
  asyncVerify,
  asyncDetail,
  asyncSelectedSolutions,
  asyncShowInfo,
  asyncInfoEditor,
  asyncAccountCtrl,
  asyncMySpace,
  asyncMyCollect,
  asyncMyHistory,
  asyncMyUpload,
<<<<<<< HEAD
  asyncRanking,
=======
  asyncSolution,
  asyncCreateSolution,
>>>>>>> 014fa4df4d117cd4d988ec28ca54d3fc84d0a116
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
  {
    path: "/SelectedSolutions",
    name: "SelectedSolutions",
    component: asyncSelectedSolutions,
  },
  {
<<<<<<< HEAD
    path:"/ranking",
    name:"ranking",
    component: asyncRanking,
  },
  {
    path: '/myspace',
    name: 'myspace',
=======
    path: "/solution",
    name: "solution",
    component: asyncSolution,
  },
  {
    path: "/create-solution",
    name: "createSolution",
    component: asyncCreateSolution,
  },
  {
    path: "/myspace",
    name: "myspace",
>>>>>>> 014fa4df4d117cd4d988ec28ca54d3fc84d0a116
    component: asyncMySpace,
    children: [
      {
        path: "/showinfo",
        name: "showinfo",
        component: asyncShowInfo,
      },
      {
        path: "/infoeditor",
        name: "infoeditor",
        component: asyncInfoEditor,
      },
      {
        path: "/accountctrl",
        name: "accountctrl",
        component: asyncAccountCtrl,
      },
      {
        path: "/imageup",
        name: "imageup",
        component: asyncImageUp,
      },
      {
        path: "/mycollect",
        name: "mycollect",
        component: asyncMyCollect,
      },
      {
        path: "/myhistory",
        name: "myhistory",
        component: asyncMyHistory,
      },
      {
        path: "/myupload",
        name: "myupload",
        component: asyncMyUpload,
      },
    ],
  },
];
