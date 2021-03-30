<template>
  <div>
    <a-input v-model="blogDetail.title" />
    <mavon-editor class="me-markdown"
                  v-model="blogDetail.content"
                  :ishljs="true"
                  ref=md
                  :toolbars="toolbars"
                  @imgAdd="$imgAdd"
                  @imgDel="$imgDel"
                  @save="save"
                  @change="update" />
    <a-button type="primary"
              @click="updateBlog"> 保存文章 </a-button>
  </div>
</template>
<script>

import blogService from '@/service/blogService';

export default {

  data() {
    return {
      blogDetail: {},
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
      },
    };
  },

  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData();
      formdata.append('image', $file);
      this.img_file[pos] = $file;
      this.$http({
        url: '/api/edit/uploadimg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, res.data.url);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    updateBlog() {
      blogService.updateBlog(this.blogDetail).then((res) => {
        console.log(res.data.data.post);
        this.blogDetail = res.data.data.post;
      }).catch((err) => {
        console.log('err:', err.response.data.msg);
      });
    },
    update(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      console.log(`markdown内容: ${markdown}`);
      console.log(`html内容:${html}`);
    },
    save(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      console.log(`markdown内容:${markdown}`);
      console.log(`html内容:${html}`);
      // console.log(`图片：${markdown.replace(\!\[.*\]\(.+\))}`)
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
</script>

<style lang="scss" scoped>
.me-markdown {
  z-index: 6 !important;
  width: 100%;
  height: 100%;
  min-height: 700px;
  max-height: 700px;
}

.v-note-wrapper.fullscreen {
  top: 60px !important;
}
</style>
