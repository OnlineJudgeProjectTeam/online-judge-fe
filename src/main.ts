import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { createPinia } from "pinia";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
  .directive("highlight", function (el) {
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach((block: any) => {
      hljs.highlightBlock(block);
    });
  })
  .use(router)
  .use(ElementPlus)
  .use(createPinia())
  .mount("#app");
