<template>
  <div class="page-index">
    <app-header :show-back="false" title="保函列表"></app-header>

    <van-notice-bar
      scrollable
      text="如果您微信绑定的手机号并非在平台注册时所留的法人手机"
    />

    <div class="container list">
      <div class="item" @click="$router.push({ name: 'Project' })">
        <div class="bd">
          <span class="tag">未验证</span>
          <span class="title"
            >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laudantium, sit!</span
          >
          <van-icon class="arrow" name="arrow" color="#999"></van-icon>
        </div>
        <div class="ft">2020</div>
      </div>
      <div class="item">
        <div class="bd">
          <span class="tag active">未验证</span>
          <span class="title">Lorem ipsum dolor sit amet consectetur.</span>
          <van-icon class="arrow" name="arrow" color="#999"></van-icon>
        </div>
        <div class="ft">2020</div>
      </div>
    </div>
  </div>

  <app-tab></app-tab>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped lang="less" src="./index.less"></style>
