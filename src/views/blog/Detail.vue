<template>
  <div>
    <a-button v-if="userInfo.id==blogDetail.user_id"
              type="primary"
              @click="editBlog"> 编辑文章 </a-button>
    <h3>{{this.blogDetail.title}}</h3>

    <mavon-editor class="md"
                  :value="this.blogDetail.content"
                  :subfield="prop.subfield"
                  :defaultOpen="prop.defaultOpen"
                  :toolbarsFlag="prop.toolbarsFlag"
                  :editable="prop.editable"
                  :scrollStyle="prop.scrollStyle"></mavon-editor>
  </div>
</template>
<script>

import blogService from '@/service/blogService';
import { mapState } from 'vuex';

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
    prop() {
      const data = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true,
      };
      return data;
    },
  }),
  data() {
    return {
      blogDetail: {},
    };
  },
  methods: {
    editBlog() {
      this.$router.push({ name: 'BlogEdit', params: { id: this.blogDetail.id } });
    },
  },
  mounted() {
    blogService.blogDetail(this.$route.params.id).then((res) => {
      console.log(res.data.data.post);
      this.blogDetail = res.data.data.post;
    }).catch((err) => {
      console.log('err:', err.response.data.msg);
    });
  },
};
</script>>

<style lang="scss" scoped>
</style>
