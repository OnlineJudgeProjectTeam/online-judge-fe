import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import hljs from "highlight.js";
import "highlight.js/styles/github.css";

hljs.configure({
  ignoreUnescapedHTML: true,
});

createApp(App)
  .directive("highlight", function (el) {
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach((block: any) => {
      hljs.highlightBlock(block);
    });
  })
  .use(router)
  .mount("#app");
