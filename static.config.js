export default {
  siteRoot: 'https://christian-jensen.netlify.com',
  plugins: ['react-static-plugin-styled-components'],
  getSiteData: () => ({
    title: 'Christian Jensen'
  }),
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/pages/Home'
    },
    {
      is404: true,
      component: 'src/pages/Home'
    }
  ]
}
