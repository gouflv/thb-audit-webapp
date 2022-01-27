<template>
  <div class="page-index">
    <app-header :show-back="false" title="保函列表"></app-header>

    <van-notice-bar
      scrollable
      text="如果您微信绑定的手机号并非在平台注册时所留的法人手机"
    />

    <div class="container list">
      <div
        v-for="item in items"
        :key="item.apply_no"
        class="item"
        @click="
          $router.push({ name: 'Project', params: { id: item.apply_no } })
        "
      >
        <div class="bd">
          <span class="tag" :class="{ active: !item.validate }">{{
            item.validate_name
          }}</span>
          <span class="title">{{ item.project.name }}</span>
          <van-icon class="arrow" name="arrow" color="#999"></van-icon>
        </div>
        <div class="ft">{{ dateFormat(item.create_time) }}</div>
      </div>
    </div>
  </div>

  <app-tab></app-tab>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFetch } from "../../use/useFetch";
import { dateFormat } from "../../format";

export default defineComponent({
  setup() {
    const { loading, data, fetch } = useFetch({
      url: "h5/validate/list",
      paginated: true,
    });

    fetch();

    return {
      items: data,
      dateFormat,
    };
  },
});
</script>

<style scoped lang="less" src="./index.less"></style>
