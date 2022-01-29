<template>
  <div class="page-user">
    <app-header :show-back="false" title="个人中心"></app-header>

    <div class="container">
      <div
        class="card"
        :style="{
          'background-image': `url(${cardBg})`,
        }"
      >
        <img class="thumb" :src="avatar" />
        <div class="content">
          <div class="title">
            <span class="name">{{ name }}</span>
            （{{ phone }}）
            <div class="switch" @click="show = !show">
              <van-icon
                v-if="show"
                class="icon"
                name="eye"
                :size="15"
              ></van-icon>
              <van-icon
                v-else
                class="icon"
                name="closed-eye"
                :size="15"
              ></van-icon>
            </div>
          </div>
          <div class="desc">{{ cname }}</div>
        </div>
      </div>
    </div>

    <div class="float-btn-container">
      <van-button @click="onLogoutClick">退出登录</van-button>
    </div>

    <app-tab></app-tab>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import cardBg from "@/assets/bg_user_card.png";
import avatar from "@/assets/user_default.png";
import { app } from "../../store/app";
import { Dialog } from "vant";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const show = ref(false);

    const name = computed(() => {
      if (show.value) return app.user.enterprise.legal_name;
      return app.user.enterprise.legal_name.replace(/(.).+?(.?)/, "$1*$2");
    });
    const phone = computed(() => {
      if (show.value) return app.user.phone;
      return app.user.phone.replace(/(\d{3})\d+(\d{4})/, "$1****$2");
    });

    const cname = computed(() => app.user.enterprise.name);

    async function onLogoutClick() {
      await Dialog.confirm({ message: "确认退出登录" });
      app.logout();
      router.replace({ name: "Login" });
    }

    return {
      show,
      name,
      phone,
      cname,
      cardBg,
      avatar,
      onLogoutClick,
    };
  },
});
</script>

<style scoped lang="less" src="./index.less" />
