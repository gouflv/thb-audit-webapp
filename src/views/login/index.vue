<template>
  <div class="page-login">
    <app-header theme="light" :show-back="false"></app-header>

    <div class="logo">
      <img src="../../assets/logo.png" alt="" />
    </div>

    <form @submit.prevent="onSubmit">
      <template v-if="formType === 1">
        <div class="field">
          <van-field
            v-model="form.username"
            placeholder="请输入账号"
          ></van-field>
        </div>

        <div class="field">
          <van-field
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
            :right-icon="showPassword ? 'eye' : 'closed-eye'"
            @click-right-icon="showPassword = !showPassword"
          ></van-field>
        </div>
      </template>

      <template v-if="formType === 2">
        <div class="field">
          <van-field
            v-model="form.phone"
            placeholder="请输入手机号"
          ></van-field>
        </div>

        <div class="field">
          <van-field v-model="form.code" placeholder="请输入验证码">
            <template #button>
              <span class="code-btn" @click="onSendCodeClick">
                {{ isCountDownActive ? `${countDown}s` : "获取验证码" }}
              </span>
            </template>
          </van-field>
        </div>
      </template>

      <div class="switch">
        <span @click="formType = formType === 1 ? 2 : 1">{{
          formType === 1 ? "验证吗登录" : "密码登录"
        }}</span>
      </div>

      <van-checkbox class="law" icon-size="14px" v-model="form.agreement">
        我已阅读并同意天和保 <a>《隐私政策》</a> <a>《个人信息保护协议》</a>
      </van-checkbox>

      <van-button type="primary" block size="large" native-type="submit"
        >登录</van-button
      >
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref } from "vue";
import { useIntervalFn } from "@vueuse/core";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { defaultErrorHandler, POST, setToken } from "../../ajax";
import pick from "lodash.pick";
import { isDev } from "../../utils";
import { app } from "../../store/app";

export default defineComponent({
  setup() {
    const router = useRouter();

    const form = reactive({
      username: isDev ? "18950491796" : "",
      password: isDev ? "18950491796" : "",
      phone: "",
      code: "",
      agreement: isDev ? true : false,
    });

    const formType = ref<1 | 2>(1);
    const showPassword = ref(false);

    const countDown = ref(60);
    const {
      pause: pauseCountDown,
      resume: resumeCountDown,
      isActive: isCountDownActive,
    } = useIntervalFn(
      () => {
        countDown.value -= 1;
        if (!countDown.value) {
          pauseCountDown();
          countDown.value = 60;
        }
      },
      1000,
      { immediate: false }
    );
    const startCountDown = () => {
      if (isCountDownActive.value) return;
      resumeCountDown();
    };

    const onSendCodeClick = () => {
      startCountDown();
    };

    const onSubmit = async () => {
      if (!validate()) return;

      Toast.loading({ duration: 0, forbidClick: true });

      try {
        const user = await POST({
          url: "h5/login/index",
          params: {
            login_type: formType.value,
            ...(formType.value === 1
              ? pick(form, ["username", "password"])
              : pick(form, ["phone", "code"])),
          },
        });

        const { token } = user;
        setToken(token);
        app.setUser(user);

        router.replace({ name: "Home" });
      } catch (e) {
        defaultErrorHandler(e);
      } finally {
        Toast.clear();
      }
    };

    const validate = () => {
      if (formType.value === 1) {
        if (!form.username) {
          Toast("请输入账号");
          return false;
        }
        if (!form.password) {
          Toast("请输入密码");
          return false;
        }
      }
      if (formType.value === 2) {
        if (!form.password) {
          Toast("请输入手机号");
          return false;
        }

        if (!form.code) {
          Toast("请输入验证码");
          return false;
        }
      }

      if (!form.agreement) {
        Toast("请同意用户协议");
      }

      return true;
    };

    document.documentElement.classList.add("full-page");
    onUnmounted(() => document.documentElement.classList.remove("full-page"));

    return {
      formType,
      form,
      showPassword,
      countDown,
      isCountDownActive,
      onSendCodeClick,
      onSubmit,
    };
  },
});
</script>

<style lang="less" src="./index.less"></style>
