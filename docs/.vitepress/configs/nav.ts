import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '前端导航', link: '/nav' },
  {
    text: '前端物语',
    items: [
      {
        text: 'ES6 常用知识点',
        link: '/fe/es6/'
      },
      {
        text: 'JavaScript 设计模式',
        link: '/fe/design-pattern/'
      }
    ],
    activeMatch: '^/fe'
  },
  {
    text: '源码阅读',
    link: '/analysis/vue-2/reactive/reactive-object',
    activeMatch: '^/analysis'
  }
]
