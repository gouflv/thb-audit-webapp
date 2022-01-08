<template>
  <van-nav-bar
    class="header"
    :class="{ 'header--blue': theme === 'blue' }"
    :title="title"
    :left-arrow="showBack"
    @click-left="onClick"
  ></van-nav-bar>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    theme: {
      type: String as PropType<"light" | "blue">,
      default: "blue",
    },
    title: {
      type: String,
      default: "天和保",
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    onBackClick: {
      type: Function,
    },
  },
  setup(props) {
    const router = useRouter();

    const onClick = () => {
      if (typeof props.onBackClick === "function") {
        props.onBackClick();
        return;
      }
      router.back();
    };

    return {
      onClick,
    };
  },
});
</script>

<style lang="less">
.header--blue {
  background-color: #4080ff;

  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__arrow {
    color: #fff;
  }
}
</style>
