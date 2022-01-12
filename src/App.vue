<template>
  <router-view />
</template>

<script lang="ts">
import { app } from "./store/app";

export default {
  setup() {
    return { app };
  },
};
</script>

<style lang="less">
@import "~vant/lib/style/normalize";

body {
  font-size: 28px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    sans-serif;
  line-height: 1.5;
  min-height: 100%;
  height: 100%;
  background: #f7f8fc;
  color: #333;
}

.container {
  padding: 0 32px;
}

html.full-page {
  height: 100%;

  body,
  #app {
    height: 100%;
  }

  body {
    background: #fff;
  }
}

img {
  max-width: 100%;
}

a {
  color: #4080ff;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 24px 32px;
  background: #fff;
  box-shadow: 0px -8px 16px rgba(20, 62, 81, 0.06);
}
</style>
