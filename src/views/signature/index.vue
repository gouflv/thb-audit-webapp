<template>
  <div class="page-signature">
    <div class="toolbar">
      <div @click="signatureRef?.clear()">Clear</div>
    </div>

    <div ref="containerRef" class="main">
      <signature
        ref="signatureRef"
        v-if="width"
        :width="width"
        :height="height"
      ></signature>
    </div>

    <div class="fab">
      <button>返回</button>
      <button class="primary" size="small" @click="onConfirm">确认</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Signature, {
  SignatureAction,
} from "../../components/signature/index.vue";

export default defineComponent({
  components: {
    Signature,
  },
  setup() {
    const containerRef = ref<HTMLDivElement>();
    const width = ref(0);
    const height = ref(0);

    const signatureRef = ref();

    const onConfirm = async () => {
      if (!signatureRef.value) return;

      const actions = signatureRef.value.actions as SignatureAction;

      if (!actions.validate()) {
        alert(11);
        return;
      }

      const file = await actions.save();
      console.log(file);
    };

    onMounted(() => {
      document.documentElement.classList.add("full-page");

      const ct = containerRef.value!;
      const rect = ct.getBoundingClientRect();
      width.value = rect.width;
      height.value = rect.height;
    });

    return {
      containerRef,
      width,
      height,
      signatureRef,
      onConfirm,
    };
  },
});
</script>

<style scoped lang="less" src="./index.less"></style>
