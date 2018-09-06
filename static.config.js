export default {
  plugins: ['react-static-plugin-emotion'],
  getSiteData: () => ({
    title: 'Christian Jensen'
  }),
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/pages/Home'
    },
    {
      path: '/about',
      component: 'src/pages/About'
    },
    {
      is404: true,
      component: 'src/pages/404'
    }
  ]
}
