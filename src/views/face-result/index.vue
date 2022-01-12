<template>
  <div v-if="!loading" class="page-face-result">
    <div class="main">
      <img v-if="success" src="../../assets/icon_success.png" alt="" />
      <img v-else src="../../assets/icon_failed.png" alt="" />
      <div class="message">{{ success ? "验证成功" : "验证失败" }}</div>
    </div>

    <div v-if="success" class="actions">
      <van-button
        type="primary"
        @click="
          $router.replace({
            name: 'Agreement',
            params: {
              id: $route.query.apply_no,
            },
          })
        "
        >下一步</van-button
      >
    </div>
    <div v-else class="actions">
      <van-button type="primary" @click="onRedoClick">重新认证</van-button>
      <div class="back" @click="$router.replace({ name: 'Home' })">
        返回列表
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import qs from "qs";
import get from "lodash.get";
import { defaultErrorHandler, POST } from "../../ajax";
import { Toast } from "vant";
import { useFaceValidate } from "../../use/useFaceValidate";
import { useRoute } from "vue-router";

export default {
  setup() {
    const { query } = useRoute();
    const { createAndRedirectToValidate } = useFaceValidate(
      query.apply_no as string
    );

    const response = (() => {
      try {
        return JSON.parse(
          decodeURIComponent(
            get(
              qs.parse(window.location.search, {
                ignoreQueryPrefix: true,
              }),
              "response"
            ) as string
          )
        ) as {
          code: number;
          extInfo: {
            certifyId: string;
          };
        };
      } catch (e) {
        defaultErrorHandler(e);
      }
    })();
    console.log(response);

    const loading = ref(true);
    const success = ref(false);

    async function saveResponse() {
      await POST({
        headers: {
          "content-type": "application/json",
        },
        url: "realpersonauth/updateReturnResult",
        data: {
          CertifyId: response?.extInfo.certifyId,
          return_result: {
            response,
          },
        },
      });
    }

    function onRedoClick() {
      createAndRedirectToValidate();
    }

    onMounted(async () => {
      document.documentElement.classList.add("full-page");

      try {
        Toast.loading({ duration: 0, forbidClick: true });
        await saveResponse();
        success.value = response?.code === 1000;
      } catch (e) {
        defaultErrorHandler(e);
      } finally {
        Toast.clear();
        loading.value = false;
      }
    });
    onUnmounted(() => {
      document.documentElement.classList.remove("full-page");
    });

    return {
      success,
      loading,
      onRedoClick,
    };
  },
};
</script>

<style lang="less">
.page-face-result {
  display: flex;
  flex-direction: column;
  height: 100%;

  .main {
    flex: 1;
    padding-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-bottom: 64px;
      width: 98px;
      height: 98px;
    }
    .message {
      font-size: 40px;
    }
  }

  .actions {
    flex: 0 0 180px;
    margin-bottom: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;

    .van-button {
      width: 320px;
    }

    .back {
      margin-top: 40px;
    }
  }
}
</style>
