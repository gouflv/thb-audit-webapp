import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Button,
  Checkbox,
  Field,
  Icon,
  NavBar,
  NoticeBar,
  Tabbar,
  TabbarItem,
  Toast,
} from "vant";
import Header from "./components/header/index.vue";
import AppTabbar from "./components/tabbar/index.vue";

const app = createApp(App);

app.use(router);

[
  Button,
  Checkbox,
  Field,
  Icon,
  NavBar,
  NoticeBar,
  Tabbar,
  TabbarItem,
  Toast,
].forEach((plug) => app.use(plug));

app.component("AppHeader", Header);
app.component("AppTab", AppTabbar);

app.mount("#app");
