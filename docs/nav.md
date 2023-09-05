---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import MNavLinks from './nav/components/MNavLinks.vue'

import { NAV_DATA } from './nav/data'
</script>
<style src="./nav/index.scss"></style>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />

::: tip
该导航由 [maomao](https://github.com/maomao1996) 开发，如有引用、借鉴的请保留版权声明：<https://github.com/maomao1996/vitepress-nav-template>
:::
