<template>
  <div class="page-signature">
    <app-header title="法人签名"></app-header>

    <div class="panel">
      <div class="toolbar">
        <div
          ref="colorSelectRef"
          class="color-select"
          :style="{
            background: '#FFDAA2',
          }"
          @click="colorSelectVisible = !colorSelectVisible"
        >
          <div
            class="color-select__popup"
            :class="{
              visible: colorSelectVisible,
            }"
          >
            <div class="inner">
              <div
                class="color-item"
                v-for="c in COLORS"
                :key="c"
                @click.stop="onColorSelect(c)"
              >
                <span
                  :style="{
                    background: c,
                  }"
                ></span>
              </div>
              <div class="tit">颜色</div>
            </div>
          </div>
        </div>
        <div
          class="size-select"
          ref="sizeSelectRef"
          @click="sizeSelectVisible = !sizeSelectVisible"
        >
          <span></span>
          <div
            class="size-select__popup"
            :class="{
              visible: sizeSelectVisible,
            }"
          >
            <div class="inner">
              <div
                class="size-item"
                v-for="s in SIZES"
                :key="s"
                @click.stop="onSizeSelect(s)"
              >
                <span
                  :style="{
                    width: `${s * 2}px`,
                    height: `${s * 2}px`,
                  }"
                ></span>
              </div>
              <div class="tit">粗细</div>
            </div>
          </div>
        </div>
        <img
          class="clear"
          src="../../assets/icon_eye.png"
          @click="signatureRef?.action.clear()"
        />
      </div>

      <div ref="containerRef" class="main">
        <signature
          ref="signatureRef"
          v-if="width"
          :width="width"
          :height="height"
          :line-width="size"
          :stroke-style="color"
        ></signature>
      </div>
    </div>

    <div class="fab">
      <van-button size="small" @click="$router.back()">返回</van-button>
      <van-button class="primary" size="small" @click="onConfirm"
        >确认</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import Signature, {
  SignatureAction,
} from "../../components/signature/index.vue";
import { onClickOutside } from "@vueuse/core";
import { Toast } from "vant";
import router from "../../router";
import { useRouter } from "vue-router";

const COLORS = [
  "#8D3B15",
  "#1232C3",
  "#113160",
  "#EC4928",
  "#B83732",
  "#646464",
  "#1A1A1A",
];
const SIZES = [1, 2, 3, 4, 5, 6, 7];

export default defineComponent({
  components: {
    Signature,
  },
  setup() {
    const router = useRouter();

    const containerRef = ref<HTMLDivElement>();
    const width = ref(0);
    const height = ref(0);

    const signatureRef = ref();

    const color = ref(COLORS[COLORS.length - 1]);

    const colorSelectVisible = ref(false);
    const colorSelectRef = ref();
    onClickOutside(colorSelectRef, (e) => {
      if (colorSelectVisible.value) {
        e.stopPropagation();
        colorSelectVisible.value = false;
      }
    });
    const onColorSelect = (c: string) => {
      colorSelectVisible.value = false;
      color.value = c;
    };

    const size = ref(5);
    const sizeSelectVisible = ref(false);
    const sizeSelectRef = ref();
    onClickOutside(sizeSelectRef, (e) => {
      if (sizeSelectVisible.value) {
        e.stopPropagation();
        sizeSelectVisible.value = false;
      }
    });
    const onSizeSelect = (s: number) => {
      sizeSelectVisible.value = false;
      size.value = s;
    };

    const onConfirm = async () => {
      if (!signatureRef.value) return;

      const actions = signatureRef.value.actions as SignatureAction;

      if (!actions.validate()) {
        Toast("请签名");
        return;
      }

      const file = await actions.save();
      localStorage.setItem("signature", file);

      router.push({ name: "AuditConfirm" });
    };

    onMounted(() => {
      document.documentElement.classList.add("full-page");

      const ct = containerRef.value!;
      const rect = ct.getBoundingClientRect();
      width.value = rect.width;
      height.value = rect.height;
    });

    onUnmounted(() => {
      document.documentElement.classList.remove("full-page");
    });

    return {
      containerRef,
      width,
      height,
      color,
      size,
      signatureRef,
      onConfirm,

      COLORS,
      colorSelectRef,
      colorSelectVisible,
      onColorSelect,

      SIZES,
      sizeSelectRef,
      sizeSelectVisible,
      onSizeSelect,
    };
  },
});
</script>

<style scoped lang="less" src="./index.less"></style>
