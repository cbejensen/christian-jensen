import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default {
  siteRoot: 'https://christianjensen.netlify.com',
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/pages/Home'
    },
    {
      is404: true,
      component: 'src/pages/Home'
    }
  ],
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: ({ Html, Head, Body, children, renderMeta }) => (
    <Html>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c73d15" />
        <meta name="msapplication-TileColor" content="#c73d15" />
        <meta name="theme-color" content="#c73d15" />
        {renderMeta.styleTags}
      </Head>
      <Body>{children}</Body>
    </Html>
  )
}
