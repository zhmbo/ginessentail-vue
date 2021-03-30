<template>
  <div>
    <h3>您好 <span v-if="userInfo">{{userInfo.name}}</span></h3>
    <a-button type="primary"
              @click="logout"> 退出登录 </a-button>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),

  methods: {
    ...mapActions('userModule', { logout: 'logout' }),
  },
};
</script>
