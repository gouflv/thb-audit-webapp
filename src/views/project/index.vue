<template>
  <div class="page-project">
    <app-header title="项目信息 "></app-header>

    <div v-if="data" class="container">
      <div class="section">
        <div class="hd">
          <img class="icon" :src="icon1" />
          <span>项目信息</span>
        </div>
        <div class="bd" v-if="data.project">
          <div class="cell">
            <div class="label">项目名称</div>
            <div class="value">
              {{ data.project.name }}
            </div>
          </div>
          <div class="cell">
            <div class="label">立项文件号</div>
            <div class="value">{{ data.project.approval_document_no }}</div>
          </div>
          <div class="cell">
            <div class="label">中标价格（万元）</div>
            <div class="value">{{ data.guarantee_amount }}</div>
          </div>
          <div class="cell">
            <div class="label">保函形式</div>
            <div class="value">{{ data.project.gaurantee_mode }}</div>
          </div>
          <div class="cell">
            <div class="label">担保金额（万元）</div>
            <div class="value">{{ data.guarantee_amount }}</div>
          </div>
          <div class="cell">
            <div class="label">担保期限</div>
            <div class="value">{{ data.guarantee_dealine }}</div>
          </div>
          <div class="cell">
            <div class="label">工期（天）</div>
            <div class="value">{{ data.project.plan_day }}</div>
          </div>
          <div class="cell">
            <div class="label">建设地点</div>
            <div class="value">{{ data.project.address }}</div>
          </div>
        </div>
      </div>

      <div v-for="(person, i) in data.associate_user" :key="i" class="section">
        <div class="hd">
          <img v-if="person.type === '1'" class="icon" :src="icon2" />
          <img v-else class="icon" :src="icon3" />
          <span v-if="person.type === '1'">受益人信息</span>
          <span v-if="person.type === '2'">业主单位</span>
        </div>
        <div class="bd">
          <div class="cell">
            <div class="label">
              <span v-if="person.type === '1'">受益人</span>
              <span v-if="person.type === '2'">业主</span>
              单位名称
            </div>
            <div class="value">{{ person.organization_name }}</div>
          </div>
          <div class="cell">
            <div class="label">社会信用代码</div>
            <div class="value">{{ person.credit_code }}</div>
          </div>
          <div class="cell">
            <div class="label">联系人</div>
            <div class="value">{{ person.contact_name }}</div>
          </div>
          <div class="cell">
            <div class="label">联系电话</div>
            <div class="value">{{ person.contact_phone }}</div>
          </div>
          <div v-if="person.type === '1'" class="cell">
            <div class="label">担保金额（万元）</div>
            <div class="value">{{ "??" }}</div>
          </div>
          <div class="cell">
            <div class="label">招标项目编号</div>
            <div class="value">{{ person.tenderee_project_no }}</div>
          </div>
          <div class="cell">
            <div class="label">联系地址</div>
            <div class="value">{{ person.contact_address }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <van-button type="primary" block @click="onClick">法人验签</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import icon1 from "@/assets/icon_project_1.png";
import icon2 from "@/assets/icon_project_2.png";
import icon3 from "@/assets/icon_project_3.png";
import { useFetch } from "../../use/useFetch";
import { useRoute } from "vue-router";
import { useFaceValidate } from "../../use/useFaceValidate";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const { createAndRedirectToValidate } = useFaceValidate(
      params.id as string
    );

    const { data, fetch } = useFetch({
      url: "h5/validate/detail",
      params: {
        apply_no: params.id,
      },
    });
    fetch();

    async function onClick() {
      createAndRedirectToValidate();
    }

    return {
      data,
      onClick,

      icon1,
      icon2,
      icon3,
    };
  },
});
</script>

<style scoped lang="less" src="./index.less"></style>
