<template>
  <div class="login">
    <b-row class="mt-5">
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
      <b-card title="WanYuSDK">
    <b-form>
      <b-form-group>
        <b-button @click="login" variant="outline-primary" block>登录</b-button>
      </b-form-group>

      <b-form-group>
        <b-button @click="register" variant="outline-primary" block>注册</b-button>
      </b-form-group>

      <b-form-group>
        <b-button @click="pay" variant="outline-primary" block>支付</b-button>
      </b-form-group>

      <b-form-group>
        <b-button @click="commitRoleInfo" variant="outline-primary" block>上报角色信息</b-button>
      </b-form-group>
    </b-form>
  </b-card>
  </b-col>
  </b-row>
  </div>
</template>>
<script>

export default {
  mounted() {
    window.login = this.login;
  },
  methods: {
    login() {
      console.log('login');
      window.webkit.messageHandlers.login.postMessage(null);
    },
    register() {
      console.log('register');
    },
    pay() {
      console.log('pay');
    },
    commitRoleInfo() {
      console.log('commitRoleInfo');
    },
  },
};
</script>>
<style lang="scss" scoped>

</style>
