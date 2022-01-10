<template>
  <div class="page-project">
    <app-header title="项目信息 "></app-header>

    <div class="container">
      <div class="section">
        <div class="hd">
          <img class="icon" :src="icon1" />
          <span>项目信息</span>
        </div>
        <div class="bd">
          <div class="cell">
            <div class="label">项目名称</div>
            <div class="value">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatem, mollitia?
            </div>
          </div>
          <div class="cell">
            <div class="label">立项文件号</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">中标价格（万元）</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">保函形式</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">担保金额（万元）</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">担保期限</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">工期（天）</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">建设地点</div>
            <div class="value">项目名称</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="hd">
          <img class="icon" :src="icon2" />
          <span>受益人信息</span>
        </div>
        <div class="bd">
          <div class="cell">
            <div class="label">受益人单位名称</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">社会信用代码</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">联系人</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">联系电话</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">担保金额（万元）</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">招标项目编号</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">联系地址</div>
            <div class="value">项目名称</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="hd">
          <img class="icon" :src="icon2" />
          <span>业主单位</span>
        </div>
        <div class="bd">
          <div class="cell">
            <div class="label">业主单位名称</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">社会信用代码</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">联系人</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">联系电话</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">招标项目编号</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">联系地址</div>
            <div class="value">项目名称</div>
          </div>
          <div class="cell">
            <div class="label">联系地址</div>
            <div class="value">项目名称</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <van-button
        type="primary"
        block
        @click="$router.push({ name: 'FaceResult' })"
        >法人验签</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import icon1 from "@/assets/icon_project_1.png";
import icon2 from "@/assets/icon_project_2.png";
import icon3 from "@/assets/icon_project_3.png";

export default defineComponent({
  setup() {
    return {
      icon1,
      icon2,
      icon3,
    };
  },
});
</script>

<style scoped lang="less" src="./index.less"></style>
