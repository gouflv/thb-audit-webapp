<template>
  <van-tabbar class="app-tabbar" route>
    <van-tabbar-item replace :to="{ name: 'Home' }">
      保函列表
      <template #icon="{ active }">
        <img v-if="active" src="@/assets/icon_tabbar_index_active.png" alt="" />
        <img v-else src="@/assets/icon_tabbar_index.png" alt="" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace :to="{ name: 'User' }">
      个人中心
      <template #icon="{ active }">
        <img v-if="active" src="@/assets/icon_tabbar_user_active.png" alt="" />
        <img v-else src="@/assets/icon_tabbar_user.png" alt="" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less">
.app-tabbar {
  .van-tabbar-item {
    color: #333;

    &__icon {
      img {
        width: 48px;
        height: 48px;
      }
    }
    &--active {
      color: #333;
    }
  }
}
</style>
