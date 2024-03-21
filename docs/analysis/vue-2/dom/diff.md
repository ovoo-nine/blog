# Diff 算法

1. 同层比较，首先是判断节点是否是相同节点,通过节点类型和 key 值比较，相同则进行更新，不同直接删除替换
2. 如果都是文本节点，直接替换文本。新旧分别为元素节点和文本节点，则执行对应的删除和更新操作，如果都是元素节点，且都有 children 时，开始比较 children
3. 使用双端 diff 更新 children
   1. 两端相同则直接更新
   2. 旧开始 等于 新结束，则移动旧的开始节点到旧的结束节点
   3. 就结束等于新开始，则移动旧的结束到开始节点
   4. 都不相等，则从旧的节点中找到新开始的节点，有则更新和移动，无则创建新的 vnode,进行插入
   5. 遍历完成后，如果新节点还没遍历完，则将剩余节点添加到 DOM 中
   6. 如果旧节点还未遍完，则删除相关旧的节点

## 总结

1. 同层比较，同类型比较
2. 找出移动的节点