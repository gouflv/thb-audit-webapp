<template>
  <div class="page-face-result">
    <div class="main">
      <img v-if="success" src="../../assets/icon_success.png" alt="" />
      <img v-else src="../../assets/icon_failed.png" alt="" />
      <div class="message">{{ success ? "验证成功" : "验证失败" }}</div>
    </div>

    <div v-if="success" class="actions">
      <van-button type="primary" @click="$router.replace({ name: 'Signature' })"
        >下一步</van-button
      >
    </div>
    <div v-else class="actions">
      <van-button type="primary">重新认证</van-button>
      <div class="back" @click="$router.replace({ name: 'Home' })">
        返回列表
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

export default {
  setup() {
    const success = ref(true);

    onMounted(() => {
      document.documentElement.classList.add("full-page");
    });
    onUnmounted(() => {
      document.documentElement.classList.remove("full-page");
    });

    return {
      success,
    };
  },
};
</script>

<style lang="less">
.page-face-result {
  display: flex;
  flex-direction: column;
  height: 100%;

  .main {
    flex: 1;
    padding-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-bottom: 64px;
      width: 98px;
      height: 98px;
    }
    .message {
      font-size: 40px;
    }
  }

  .actions {
    flex: 0 0 180px;
    margin-bottom: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;

    .van-button {
      width: 320px;
    }

    .back {
      margin-top: 40px;
    }
  }
}
</style>
