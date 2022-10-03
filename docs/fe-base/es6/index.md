# ES6 常用知识

`ECMAScript 6` (简称 `ES6`) 是 `JavaScript` 语言的下一代标准

`ECMAScript` 的提案流程

- `Stage 0 - Strawman`（展示阶段）
- `Stage 1 - Proposal`（征求意见阶段）
- `Stage 2 - Draft`（草案阶段）
- `Stage 3 - Candidate`（候选人阶段）
- `Stage 4 - Finished`（定案阶段）

一个提案只要能进入 `Stage 2` 就差不多会包括在以后的正式标准里面

## let 和 const

`ES6` 新增了 `let` 和 `const` 命令，用来声明变量。用法与 `var` 类似，但是声明的变量仅在块级作用域内生效。

```js
// let const 为块级作用域
{
  let a = 10
  var b = 1
}
a // ReferenceError: a is not defined.
b // 1
```

::: tip let const 和 var 的区别

- `let` `const` 的作用域为块级作用域，而 `var` 的作用域为函数作用域。
- `let` `const` 不存在变量提升，不可以在声明前调用，否则会报错。 `var` 存在变量提升，声明前使用时值为 `undefined` 。
- `let` `const` 不允许重复声明同一个变量，而 `var` 可以。
- `const` 声明的是一个只读的常量，并且声明时必须初始化。
  - `const` 实际上保证的是变量指向的那个内存地址所保存的数据不得改动。
  - 基本类型保证数值不变，复合类型保证指向的地址不变。
- 在全局环境下使用 `var` 定义全局属性会挂载到顶层对象 `window` (浏览器环境)上。

:::

不存在变量提升

```js
// var 的情况
console.log(foo) // 输出 undefined
var foo = 2

// let 的情况
console.log(bar) // 报错 ReferenceError
let bar = 2
```

暂时性死区

```js
var tmp = 123

if (true) {
  tmp = 'abc' // ReferenceError
  let tmp
}
```

块级作用域与函数声明

`ES5` 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。`ES6` 引入了块级作用域，明确允许在块级作用域之中声明函数。`ES6` 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。
