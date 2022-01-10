<template>
  <canvas
    ref="canvasRef"
    @touchstart="startEventHandler"
    @touchmove="moveEventHandler"
    @touchend="endEventHandler"
    @touchcancel="leaveEventHandler"
    :width="width"
    :height="height"
  />

  <canvas
    ref="canvasShadowRef"
    :width="height"
    :height="width"
    :style="{
      position: 'fixed',
      left: '-9999px',
      // transform: 'scale(0.5)',
      // 'transform-origin': 'left top',
    }"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

type FileType = "png" | "jpg";

export interface SignatureAction {
  validate: () => boolean;
  save: (type?: FileType) => Promise<string>;
  clear: () => void;
}

export default defineComponent({
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    lineWidth: {
      type: Number,
      default: 2,
    },
    strokeStyle: {
      type: String,
      default: "#000",
    },
  },

  setup(props) {
    const canvasRef = ref<HTMLCanvasElement>();
    const canvasRect = ref<DOMRect>();
    const context = ref<CanvasRenderingContext2D>();

    const canvasShadowRef = ref<HTMLCanvasElement>();

    const isTipDraw = ref(true);
    const hasDraw = ref(false);

    const init = async () => {
      const canvas = canvasRef.value!;
      canvas.width = props.width;
      canvas.height = props.height;
      canvasRect.value = canvas.getBoundingClientRect();

      const ctx = (context.value = canvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D);

      clear();
      drawTip();

      // ctx.fillRect(0, 250, 100, 200);
    };

    const startEventHandler = (event: TouchEvent) => {
      event.preventDefault();

      if (isTipDraw.value) {
        isTipDraw.value = false;
        clear();
      }

      const ctx = context.value!;
      ctx.lineWidth = props.lineWidth;
      ctx.strokeStyle = props.strokeStyle;
      ctx.beginPath();
    };

    const moveEventHandler = (event: TouchEvent) => {
      event.preventDefault();

      hasDraw.value = true;

      const po = event.changedTouches[0];
      const ctx = context.value!;
      ctx.lineTo(
        po.clientX - canvasRect.value!.left,
        po.clientY - canvasRect.value!.top
      );
      ctx.stroke();
    };

    const endEventHandler = (event: TouchEvent) => {
      event.preventDefault();
    };

    const leaveEventHandler = (event: TouchEvent) => {
      event.preventDefault();
    };

    const drawTip = () => {
      const { width, height } = props;

      isTipDraw.value = true;

      const ctx = context.value!;

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate((90 * Math.PI) / 180);

      ctx.font = "36px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ccc";
      ctx.fillText("签字板", 0, 28);

      ctx.restore();
    };

    const clear = () => {
      const ctx = context.value!;

      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, props.width, props.height);
      ctx.restore();

      ctx.closePath();

      hasDraw.value = false;
    };

    const drawRotatedImage = async (type: FileType) => {
      const { width: height, height: width } = props;

      const canvas = canvasShadowRef.value!;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d")!;

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate((-90 * Math.PI) / 180);
      ctx.drawImage(canvasRef.value!, -props.width / 2, -props.height / 2);

      ctx.restore();

      return canvas;
    };

    const save = async (type: FileType = "jpg") => {
      const rotatedCanvas = await drawRotatedImage(type);
      return rotatedCanvas.toDataURL(
        type === "png" ? "image/png" : "image/jpeg",
        0.6
      );
    };

    onMounted(() => {
      init();
    });

    return {
      canvasRef,
      canvasShadowRef,
      startEventHandler,
      moveEventHandler,
      endEventHandler,
      leaveEventHandler,
      actions: {
        validate: () => hasDraw.value,
        save,
        clear,
      } as SignatureAction,
    };
  },
});
</script>
