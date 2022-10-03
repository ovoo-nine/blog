import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

import { navbar, sidebar } from './configs'

export default defineUserConfig({
  dest: './dist',
  lang: 'zh-CN',
  title: '小酒物语',
  description: '前端知识笔记记录',
  theme: defaultTheme({
    navbar,
    sidebar,
    repo: 'ovoo-nine/blog',
    lastUpdatedText: '上次更新',
    contributors: false,
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接'
    ],
    backToHome: '返回首页'
  })
})
