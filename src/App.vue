<template>
  <router-view />
</template>

<style lang="less">
@import "~vant/lib/style/normalize";

body {
  //font-size: 28px;
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
}
</style>
