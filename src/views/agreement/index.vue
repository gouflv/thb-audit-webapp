<template>
  <div class="page-agreement">
    <app-header title="协议条款确认"></app-header>

    <div class="container">
      <p v-for="i in 20" :key="i">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit,
        ut.
      </p>
    </div>

    <div class="footer">
      <van-button
        type="primary"
        block
        @click="$router.push({ name: 'Signature' })"
        >同意并签章</van-button
      >
    </div>
  </div>
</template>

<style>
.container {
  margin-top: 30px;
  padding-bottom: 150px;
}
</style>
