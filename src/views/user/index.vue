<template>
  <div class="page-user">
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
            <span class="name">张*三</span>
            （138****5978）
            <div class="switch" @click="showPhone = !showPhone">
              <van-icon
                v-if="showPhone"
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
          <div class="desc">AA</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import cardBg from "@/assets/bg_user_card.png";
import avatar from "@/assets/user_default.png";

export default defineComponent({
  setup() {
    const showPhone = ref(false);

    return {
      showPhone,
      cardBg,
      avatar,
    };
  },
});
</script>

<style scoped lang="less" src="./index.less" />
