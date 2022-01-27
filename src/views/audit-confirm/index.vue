<template>
  <div class="page-audit-confirm">
    <app-header title="提交验证"></app-header>

    <div class="form">
      <div class="field">
        <img class="icon" src="../../assets/icon_submit_success.png" alt="" />
        法人身份信息核验
      </div>

      <div class="line"></div>

      <div class="field">
        <img class="icon" src="../../assets/icon_submit_success.png" alt="" />
        法人签字信息
      </div>

      <img class="signature" :src="signature" alt="" />
    </div>

    <div class="footer">
      <van-checkbox v-model="checked" class="agreement" icon-size="16px"
        >我已仔细阅览项目信息，并确认对此项目进行申请</van-checkbox
      >

      <van-button type="primary" size="large" block @click="onSubmit"
        >确认提交</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { dataURLtoFile } from "../../utils";
import { defaultErrorHandler, POST } from "../../ajax";
import { Toast } from "vant";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const router = useRouter();

    const signature = ref(localStorage.getItem("signature"));
    const checked = ref(false);

    const onSubmit = async () => {
      try {
        Toast.loading({ duration: 0, forbidClick: true });
        const url = await upload();
        await submit(url);

        setTimeout(() => {
          Toast({
            message: "验证提交成功",
          });
        });

        setTimeout(() => {
          router.push({ name: "Home" });
        }, 2000);
      } catch (e) {
        defaultErrorHandler(e);
      } finally {
        Toast.clear();
      }
    };

    async function upload() {
      if (!signature.value) {
        throw new Error("missing signature");
      }

      const file = dataURLtoFile(
        signature.value,
        `apply_signature_${params.id}.jpg`
      );
      const data = new FormData();
      data.append("file", file, file.name);

      const { url } = await POST({
        headers: { "Content-Type": "multipart/form-data" },
        url: "/thb/upload/upFile",
        data,
      });
      return url;
    }

    async function submit(fileUrl: string) {
      await POST({
        url: "h5/realpersonauth/updateValidate",
        params: {
          apply_no: params.id,
          legal_signature_url: fileUrl,
        },
      });
    }

    onMounted(() => {
      document.documentElement.classList.add("full-page");
    });
    onUnmounted(() => {
      document.documentElement.classList.remove("full-page");
    });

    return {
      signature,
      checked,
      onSubmit,
    };
  },
});
</script>

<style lang="less" src="./index.less"></style>
