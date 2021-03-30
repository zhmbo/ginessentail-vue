<template>
  <div>
    <b-navbar toggleable="lg"
              type="dark"
              variant="info">
      <b-container>
        <b-navbar-brand @click="$router.push({name: 'Home'})">Jumbo博客网</b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="userInfo"
                      @click="$router.push({name: 'profile'})">{{userInfo.name}}</b-nav-item>
          <div v-if="!userInfo">
            <b-nav-item v-if="$route.name != 'login'"
                        @click="$router.replace({name: 'login'})">登录</b-nav-item>
            <b-nav-item v-if="$route.name == 'login'"
                        @click="$router.replace({name: 'register'})">注册</b-nav-item>
          </div>
        </b-navbar-nav>
        <a-button type="primary"
                  v-if="userInfo&&$route.name != 'BlogEdit'"
                  @click="createBlog"> 新建文章 </a-button>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import blogService from '@/service/blogService';

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),

  data() {
    return {
      blog: {
        category_id: 12,
        title: '文章标题',
        content: '文章内容',
      },
    };
  },

  methods: {
    ...mapActions('userModule', { logout: 'logout' }),
    createBlog() {
      blogService.createBlog(this.blog).then((res) => {
        console.log(res.data.data.post);
        this.$router.push({ name: 'BlogEdit', params: { id: res.data.data.post.id } });
      }).catch((err) => {
        console.log('err:', err.response.data.msg);
      });
    },
  },
};
</script>>
  <style lang="scss" scoped>
</style>
