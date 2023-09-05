import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '前端导航', link: '/nav' },
  {
    text: '前端物语',
    link: '/fe/es6/',
    activeMatch: '^/fe'
  }
]
