import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Button, Icon, NavBar, NoticeBar, Tabbar, TabbarItem } from "vant";
import Header from "./components/header/index.vue";
import AppTabbar from "./components/tabbar/index.vue";

const app = createApp(App);

app.use(router);

[Icon, Button, NavBar, NoticeBar, Tabbar, TabbarItem].forEach((plug) =>
  app.use(plug)
);

app.component("AppHeader", Header);
app.component("AppTab", AppTabbar);

app.mount("#app");
