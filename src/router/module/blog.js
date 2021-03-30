const blogRoutes = [
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: () => import('@/views/blog/Detail.vue'),
  },
  {
    path: '/blog/:id/edit',
    name: 'BlogEdit',
    component: () => import('@/views/blog/Edit.vue'),
  },
];

export default blogRoutes;
