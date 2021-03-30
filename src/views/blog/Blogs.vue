<template>
  <div>
    <a-list item-layout="vertical"
            size="large"
            :data-source="listData">
      <a-list-item slot="renderItem"
                   slot-scope="item">
        <img v-if="item.img"
             slot="extra"
             width="150"
             alt="logo"
             :src="item.img"
             @click="$router.push({name: 'BlogDetail', params:{id: item.id}})" />
        <a-list-item-meta>
          <a slot="title"
             @click="$router.push({name: 'BlogDetail', params:{id: item.id}})">{{ item.title }}</a>
          <!-- <a-avatar slot="avatar"
                    :src="avatar" /> -->
        </a-list-item-meta>
        <a-list-item>
          <p>{{ToText(item.content)}}</p>
        </a-list-item>

      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import blogService from '@/service/blogService';

import markdownHelper from '@/helper/markdown';

const marked = require('marked');

export default {
  data() {
    return {
      listData: [],
      blog: {},
    };
  },
  methods: {
    blogs() {
      blogService.blogs().then((res) => {
        console.log(res.data.data.posts);
        const blogs = [];

        res.data.data.posts.forEach((item) => {
          this.blog = item;
          // 获取md中所有图片节点
          const obj = markdownHelper.getAllImg(item.content);
          if (obj.uniqueSrcList.length !== 0) {
            // 添加img进blog字典
            // eslint-disable-next-line prefer-destructuring
            this.blog.img = obj.uniqueSrcList[0];
          }
          blogs.push(item);
        });
        this.listData = blogs;
      }).catch((err) => {
        console.log('err:', err);
      });
    },
    ToText(md) {
      // md -> html
      const input = marked(md);
      // html -> 纯文本
      return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ')
        .replace(/>/g, ' ');
    },
  },
  mounted() {
    this.blogs();
  },
};
</script>
<style lang="scss" scoped>
</style>
