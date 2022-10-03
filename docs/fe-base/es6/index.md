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

## 解构赋值

`ES6` 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring），解构赋值允许指定默认值，默认值生效的条件为严格等于 `undefined`。

### 数组的解构赋值

```js
// ES5
let a = 1
let b = 2

// ES6
let [a, b, c, d = '3'] = [1, 2]
c // undefined 未匹配或解构失败则默认为 undefined
d // 3, 默认值
```

只要某种数据结构具有 `Iterator` 接口，都可以采用数组形式的解构赋值。

```js
// 例如 Set
let [x, y, z] = new Set(['a', 'b', 'c'])
x // "a"
```

### 对象的解构赋值

对象的解构与数组有一个重要的不同，数组的元素是按次序排列的，变量的取值由它的位置决定；而对象没有次序，变量必须与属性同名才能取到正确的值。

```js
let { foo, bar = '5', mao, cat } = { foo: 'foo', mao: 'maomao' }
foo // foo
bar // 5 ,默认值
cat // undefined ,未匹配

// 如果变量名和属性名不一致的写法
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // "aaa"
```

如果将一个已经声明的变量用于解构赋值，需要将整个解构赋值语句，放在一个圆括号里面。

```js
// 错误写法
let x
{x} = {x:3}
// SyntaxError: syntax error

// 正确写法
let x
({x} = {x:3})
// 避免 JS 引擎将大括号识别为代码块
```

### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello'
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
let { length: len } = 'hello'
len // 5
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
let { toString: s } = 123
s === Number.prototype.toString // true

let { toString: s } = true
s === Boolean.prototype.toString // true
```

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 `undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值，都会报错。

### 函数参数的解构赋值

函数的参数也可以使用解构赋值，并且可以使用默认值。

```js
function move({ x = 0, y = 0 } = {}) {
  return [x, y]
}

move({ x: 3, y: 8 }) // [3, 8]
move({ x: 3 }) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]
```

### 解构赋值的用途

1.交换变量的值

```js
let x = 1
let y = 2

;[x, y] = [y, x]
```

2.从函数返回多个值

```js
// 返回一个数组

function example() {
  return [1, 2, 3]
}
let [a, b, c] = example()

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  }
}
let { foo, bar } = example()
```

3.函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

4.函数参数的默认值

```js
jQuery.ajax = function (
  url,
  {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true
    // ... more config
  } = {}
) {
  // ... do stuff
}
```

5.输入模块的指定方法

```js
const { SourceMapConsumer, SourceNode } = require('source-map')
```
