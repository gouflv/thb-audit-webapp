import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Button, Icon, NoticeBar } from "vant";

const app = createApp(App);

app.use(router);

[Icon, Button, NoticeBar].forEach((plug) => app.use(plug));

app.mount("#app");
