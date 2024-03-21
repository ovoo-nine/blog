---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 小酒物语
  text: ovoo nine 的成长之路
  tagline: 各种前端知识笔记记录
  image:
    src: /logo.png
    alt: 小酒物语
  actions:
    - text: 前端物语
      link: /fe/es6/
    - text: 前端导航
      link: /nav
      theme: alt
features:
  - icon: 📖
    title: 前端物语
    details: 整理前端常用知识点<small>（面试八股文）</small><br />如有异议按你的理解为主，不接受反驳
    link: /fe/es6/
    linkText: 前端常用知识
  - icon: 📘
    title: 源码阅读
    details: 了解各种库的实现原理<br />学习其中的小技巧和冷知识
    link: /analysis/vue-2/reactive/reactive-object
    linkText: 源码阅读
  - icon: 💯
    title: 吾志所向，一往无前。
    details: '<small class="bottom-small">一个想躺平的小开发</small>'
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .image-src {
  border-radius: 50%;
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
