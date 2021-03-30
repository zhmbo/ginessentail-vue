import request from '@/utils/request';

// 博客列表
const blogs = () => {
  return request.post('posts/page/list', {});
};

// 博客详情
const blogDetail = (blogId) => {
  return request.get(`posts/${blogId}`, {});
};

// 新建博客
const createBlog = (blog) => {
  return request.post('posts', blog);
};

// 修改博客
const updateBlog = (blog) => {
  return request.put(`posts/${blog.id}`, blog);
};

// 删除博客
const deleteBlog = (blogId) => {
  return request.delete(`posts/${blogId}`, {});
};

export default {
  blogs,
  blogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
};
