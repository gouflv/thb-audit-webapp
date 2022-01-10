<template>
  <div class="page-audit-confirm">
    <app-header title="提交验证"></app-header>

    <div class="form">
      <div class="field">
        <img class="icon" src="../../assets/icon_submit_success.png" alt="" />
        法人身份信息核验
      </div>

      <div class="line"></div>

      <div class="field">
        <img class="icon" src="../../assets/icon_submit_success.png" alt="" />
        法人签字信息
      </div>

      <img class="signature" :src="signature" alt="" />
    </div>

    <div class="footer">
      <van-checkbox v-model="checked" class="agreement" icon-size="16px"
        >我已仔细阅览项目信息，并确认对此项目进行申请</van-checkbox
      >

      <van-button type="primary" size="large" block @click="onSubmit"
        >确认提交</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const signature = ref(localStorage.getItem("signature"));
    const checked = ref(false);

    const onSubmit = () => {
      router.push({ name: "Home" });
    };

    onMounted(() => {
      document.documentElement.classList.add("full-page");
    });
    onUnmounted(() => {
      document.documentElement.classList.remove("full-page");
    });

    return {
      signature,
      checked,
      onSubmit,
    };
  },
});
</script>

<style lang="less" src="./index.less"></style>
