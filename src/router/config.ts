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
    path:"/SelectedSolutions",
    name:"SelectedSolutions",
    component: asyncSelectedSolutions,
  },
  {
    path: '/myspace',
    name: 'myspace',
    component: asyncMySpace,
    children:[
      {
        path: '/showinfo',
        name: 'showinfo',
        component: asyncShowInfo,
      },
      {
        path: '/infoeditor',
        name: 'infoeditor',
        component: asyncInfoEditor,
      },
      {
        path: '/accountctrl',
        name: 'accountctrl',
        component: asyncAccountCtrl,
      },
      {
        path: '/mycollect',
        name: 'mycollect',
        component: asyncMyCollect,
      },
      {
        path: '/myhistory',
        name: 'myhistory',
        component: asyncMyHistory,
      },
      {
        path: '/myupload',
        name: 'myupload',
        component: asyncMyUpload
      },
    ],
  }
];
