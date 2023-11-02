import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'ES6 常用知识点',
      link: '/fe/es6/'
    },
    {
      text: 'JavaScript 设计模式',
      link: '/fe/design-pattern/'
    }
  ],
  '/analysis/': [
    {
      text: 'Vue 2 源码阅读',
      items: [
        {
          text: '响应式原理',
          items: [
            {
              text: '响应式对象',
              link: '/analysis/vue-2/reactive/reactive-object'
            },
            {
              text: '依赖收集',
              link: '/analysis/vue-2/reactive/getters'
            },
            {
              text: '派发更新',
              link: '/analysis/vue-2/reactive/setters'
            },
            {
              text: 'Props',
              link: '/analysis/vue-2/reactive/props'
            },
            {
              text: 'nexttick',
              link: '/analysis/vue-2/reactive/nexttick'
            }
          ]
        },
        {
          text: '虚拟 DOM 和 VNode',
          items: [
            {
              text: '虚拟 DOM',
              link: '/analysis/vue-2/dom/'
            },
            {
              text: 'VNode',
              link: '/analysis/vue-2/dom/vnode'
            },
            {
              text: 'Diff 算法',
              link: '/analysis/vue-2/dom/diff'
            }
          ]
        },

        {
          text: '组件化',
          items: [
            {
              text: '生命周期',
              link: '/analysis/vue-2/components/lifecycle'
            },
            {
              text: '组件注册',
              link: '/analysis/vue-2/components/register'
            }
          ]
        },
        {
          text: '扩展',
          items: [
            {
              text: 'keep-alive',
              link: '/analysis/vue-2/extend/keep-alive'
            }
          ]
        }
      ]
    }
  ]
}
