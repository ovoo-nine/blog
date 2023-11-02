---
sidebar: auto
---

# JavaScript 设计模式

## 单例设计模式

::: tip 定义
单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
:::

### 单例设计模式的案例

1. 线程池
2. 全局缓存
3. 浏览器中的 window 对象
4. 网页登录浮窗
5. 等等

### 单例设计模式的实现：面向对象

```js
// 单例设计模式的实现：面向对象
var Singleton = function (name) {
  this.name = name
  this.instance = null
}
Singleton.prototype.getName = function () {
  return this.name
}
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance
}

var instance1 = Singleton.getInstance('why')
var instance2 = Singleton.getInstance('www')
console.log(instance1 === instance2) // 输出true

var obj1 = new Singleton('why')
var obj2 = new Singleton('www')
console.log(obj1.getName()) // 输出why
console.log(obj2.getName()) // 输出www
```

### 单例设计模式的实现：闭包

```js
// 单例设计模式的实现：闭包
var Singleton = function (name) {
  this.name = name
}
Singleton.prototype.getName = function () {
  return this.name
}
Singleton.getInstance = (function () {
  var instance = null
  return function (name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()

var instance1 = Singleton.getInstance('why')
var instance2 = Singleton.getInstance('www')
console.log(instance1 === instance2) // 输出true
```

### 透明的单例设计模式

无论以上面向对象的单例实现还是闭包的单例实现，都通过`Singleton.getInstance`来获取`Singleton`类的唯一对象，这增加了这个类的不透明性，使用者必须知道`Singleton`是一个单例类，然后通过`Singleton.getInstance`方法才能获取单例对象，要解决这一问题，可以使用透明的单例设计模式

```js
// 透明的单例模式
var CreateDiv = (function () {
  var instance = null
  var CreateDiv = function (html) {
    if (instance) {
      return instance
    }
    this.html = html
    this.init()
    instance = this
    return instance
  }
  CreateDiv.prototype.init = function () {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
  }
  return CreateDiv
})()

var instance1 = new CreateDiv('why')
var instance2 = new CreateDiv('www')
console.log(instance1 === instance2) // 输出true
```

### 用代理实现单例模式

虽然上述透明的单例设计模式解决了不用通过`Singleton.getInstance`来获取单例类的唯一对象，但是在透明的单例设计模式中，构造函数`CreateDiv`违反了单一职责，它不仅要负责创建对象，而且还要负责保证单例，假如某一天需求变化了，不再需要创建单例的`div`，则需要改写`CreateDiv`函数，解决这种问题，可以使用代理来实现单例模式

```js
// 用代理实现单例模式
var CreateDiv = function (html) {
  this.html = html
  this.init()
}
CreateDiv.prototype.init = function () {
  var div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}
var ProxyCreateDiv = (function () {
  var instance = null
  return function (html) {
    // 惰性单例
    if (!instance) {
      instance = new CreateDiv(html)
    }
    return instance
  }
})()
var divInstance1 = new ProxyCreateDiv('why')
var divInstance2 = new ProxyCreateDiv('www')
console.log(divInstance1 === divInstance2) // 输出true
```

## 策略模式

::: tip 定义
策略模式：定义一系列算法，把他们一个一个封装起来，并且使他们可以相互替换。
:::

### 策略模式的优点

1. 策略模式利用组合、委托和多态等技术的思想，可以有效的避免多重条件分支语句
2. 策略模式提供了对开放-封闭原则的完美支持，将算法封装在独立的策略类中，使它们易于切换、易于理解、易于扩展。
3. 策略模式中的算法也可以复用在系统的其他地方
4. 策略模式利用组合和委托来让`Context`拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

### 策略模式案例：计算奖金

案例描述：某公司的年终奖是根据员工的工资基数和年底绩效来发放的。例如，绩效为 S 的人年终奖有 4 倍工资，绩效为 A 的人年终奖有 3 倍工资，绩效为 B 的人年终奖有 2 倍工资，财务部要求我们提供一段代码，来方便他们计算员工的年终奖。

#### 计算奖金：最初版本

```js
// 计算奖金：最初版本
var calculateBouns = function (level, salary) {
  if (level == 'S') {
    return salary * 4
  }
  if (level == 'A') {
    return salary * 3
  }
  if (level == 'B') {
    return salary * 2
  }
}
console.log(calculateBouns('S', 4000)) // 输出16000
console.log(calculateBouns('A', 3000)) // 输出9000
console.log(calculateBouns('B', 2000)) // 输出4000
```

#### 计算奖金：面向对象完善版本

```js
// 计算奖金：面向对象完善版本
var PerformanceS = function () {}
PerformanceS.prototype.calculate = function (salary) {
  return salary * 4
}

var PerformanceA = function () {}
PerformanceA.prototype.calculate = function (salary) {
  return salary * 3
}

var PerformanceB = function () {}
PerformanceB.prototype.calculate = function (salary) {
  return salary * 2
}

var Bouns = function () {
  this.salary = null
  this.strategy = null
}
Bouns.prototype.setSalary = function (salary) {
  this.salary = salary
}
Bouns.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}
Bouns.prototype.getBouns = function () {
  return this.strategy.calculate(this.salary)
}
var bouns = new Bouns()
bouns.setSalary(4000)
bouns.setStrategy(new PerformanceS())
console.log(bouns.getBouns()) // 输出16000

bouns.setSalary(3000)
bouns.setStrategy(new PerformanceA())
console.log(bouns.getBouns()) // 输出9000

bouns.setSalary(2000)
bouns.setStrategy(new PerformanceB())
console.log(bouns.getBouns()) // 输出4000
```

#### 计算奖金：JavaScript 的完善版本

```js
// 计算奖金：JavaScript的完善版本
var strategy = {
  S: function (salary) {
    return salary * 4
  },
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  }
}
var calcluateBouns = function (level, salary) {
  return strategy[level](salary)
}
console.log(calcluateBouns('S', 4000)) // 输出16000
console.log(calcluateBouns('A', 3000)) // 输出9000
console.log(calcluateBouns('B', 2000)) // 输出4000
```

### 策略模式案例：表单验证

::: tip 表单标签

1. 用户名(验证是否为空)
2. 密码(验证长度不能小于 6 位)
3. 手机号(验证是否是手机号格式)
   :::

```js
// 策略模式案例：表单验证
var strategies = {
  isEmpty: function (value, errMsg) {
    if (value === '') {
      return errMsg
    }
  },
  minLength: function (value, length, errMsg) {
    if (value.length < length) {
      return errMsg
    }
  },
  isMobile: function (value, errMsg) {
    if (!/^1[34578]\d{9}$/.test(value)) {
      return errMsg
    }
  }
}
var Validator = function () {
  this.cache = []
}
Validator.prototype.add = function (dom, rule, msg) {
  var ary = rule.split(':')
  this.cache.push(function () {
    var strategy = ary.shift()
    ary.unshift(dom.value)
    ary.push(msg)
    return strategies[strategy].apply(dom, ary)
  })
}
Validator.prototype.run = function () {
  for (let index = 0; index < this.cache.length; index++) {
    var msg = this.cache[index]()
    if (msg) {
      return msg
    }
  }
}

var validateFunc = function () {
  var validator = new Validator()
  validator.add(registerForm.username, 'isEmpty', '用户名不能为空')
  validator.add(registerForm.password, 'minLength:6', '密码长度不能小于6位')
  validator.add(registerForm.phone, 'isMobile', '手机号格式不正确')
  var errMsg = validator.run()
  return errMsg
}

var submitBtn = document.getElementById('submitBtn')
var registerForm = document.getElementById('registerForm')
submitBtn.onclick = function () {
  var errMsg = validateFunc()
  if (errMsg) {
    console.log(errMsg)
    return false
  } else {
    console.log('表单验证成功')
  }
}
```

## 代理模式

::: tip 定义
代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。
:::
代理模式的**关键**所在就是：当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象，替身对象作出一些请求后再把请求转接给本体对象

### 简单的代理：小明追女神

::: tip 场景
小明打算向女神表白，又怕直接被拒绝而尴尬，决定找女神的同学帮忙转接鲜花给女神
:::

```js
var Flower = function () {}

var xiaoming = {
  sendFlower: function (target) {
    var flower = new Flower()
    target.receive(flower)
  }
}
var classmate = {
  receive: function (flower) {
    girl.receive(flower)
  }
}
var girl = {
  receive: function (flower) {
    console.log('女神收到了花')
  }
}
xiaoming.sendFlower(classmate) // 输出女神收到了花
```

### 保护代理

::: tip
在代理模式中，替身对象能做到过滤一些对本体不合理的请求时，这种代理就叫保护代理
:::

```js
// 保护代理
function Flower() {}
function Person(name, age, salary) {
  this.age = age
  this.name = name
  this.salary = salary
}
Person.prototype.sendFlower = function (target, person) {
  var flower = new Flower()
  target.receive(flower, person)
}
var person1 = new Person('www', 20, 4000)
var person2 = new Person('AAA', 25, 8000)
var person3 = new Person('BBB', 45, 16000)

var proxyObj = {
  receive: function (flower, person) {
    if (person.age >= 40) {
      console.log(person.name + ',你年龄太大了')
      return false
    }
    if (person.salary < 5000) {
      console.log(person.name + ',你工资太低了')
      return false
    }
    originObj.receive(flower)
    console.log(person.name + ',恭喜你,女神收下了你的花')
  }
}
var originObj = {
  receive: function (flower) {}
}
person1.sendFlower(proxyObj, person1) // 输出www,你工资太低了
person2.sendFlower(proxyObj, person2) // 输出AAA,恭喜你,女神收下了你的花
person3.sendFlower(proxyObj, person3) // 输出BBB,你年龄太大了
```

### 虚拟代理

::: tip
将一些代价昂贵的操作放置在代理对象中，待到机会合适时再进行，这种代理就叫虚拟代理
:::

```js
// 虚拟代理
function Flower() {}
var xiaoming = {
  sendFlower: function (target) {
    target.receiveFlower()
  }
}
var classmate = {
  receiveFlower: function () {
    girl.listenMood(function () {
      var flower = new Flower()
      console.log('同学帮你买了花,并送了出去')
      girl.receiveFlower(flower)
    })
  }
}
var girl = {
  mood: 0,
  receiveFlower: function (flower) {
    console.log('女神收下了你的花')
  },
  listenMood: function (fn) {
    setTimeout(function () {
      fn()
    }, 1500)
  }
}
// 首先输出：同学帮你买了花,并送了出去、
// 最后输出：女神收下了你的花
xiaoming.sendFlower(classmate)
```

### 代理模式实现图片懒加载

**不用代理实现**

```js
// 不用代理实现图片懒加载
var myImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  var img = new Image()
  img.onload = function () {
    imgNode.src = img.src
  }
  return {
    setSrc: function (src) {
      imgNode.src = 'file:///C:/Users/admin/Desktop/mask/img/7.jpg'
      img.src = src
    }
  }
})()
myImage.setSrc('https://img1.sycdn.imooc.com/5c09123400014ba418720632.jpg')
```

**用代理实现图片懒加载**

```js
// 用代理实现图片懒加载
var myImage = (function () {
  var image = document.createElement('img')
  document.body.appendChild(image)
  return {
    setSrc: function (src) {
      image.src = src
    }
  }
})()

var proxyImage = (function () {
  var img = new Image()
  img.onload = function () {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('file:///C:/Users/admin/Desktop/mask/img/7.jpg')
      img.src = src
    }
  }
})()
proxyImage.setSrc('https://img1.sycdn.imooc.com/5c09123400014ba418720632.jpg')
```

### 缓存代理

::: tip
缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一样，则可以直接返回前面存储的运算结果。
:::

```js
// 缓存代理：计算乘积
var mult = function () {
  console.log('开始计算乘积')
  var sum = 1
  for (var i = 0; i < arguments.length; i++) {
    sum = sum * arguments[i]
  }
  return sum
}
var proxyMult = (function () {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (cache.hasOwnProperty(args)) {
      return cache[args]
    }
    return (cache[args] = mult.apply(this, arguments))
  }
})()
console.log(proxyMult(1, 2, 3, 4)) // 输出：开始计算乘积 24
console.log(proxyMult(1, 2, 3, 4)) // 输出24
```

### 举一反三代理工厂

```js
// 代理工厂(累加和乘积)
var mult = function () {
  console.log('开始计算乘积')
  var sum = 1
  for (let index = 0; index < arguments.length; index++) {
    sum = sum * arguments[index]
  }
  return sum
}
var plus = function () {
  console.log('开始计算累加')
  var sum = 0
  for (let index = 0; index < arguments.length; index++) {
    sum = sum + arguments[index]
  }
  return sum
}
var createProxyFactory = function (fn) {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (cache.hasOwnProperty(args)) {
      return cache[args]
    }
    return (cache[args] = fn.apply(this, arguments))
  }
}
var proxyMult = createProxyFactory(mult)
var proxyPlus = createProxyFactory(plus)

console.log(proxyMult(1, 2, 3, 4)) // 输出：开始计算乘积 24
console.log(proxyMult(1, 2, 3, 4)) // 输出： 24
console.log(proxyPlus(3, 4, 5, 6)) // 输出：开始计算累加 18
console.log(proxyPlus(3, 4, 5, 6)) // 输出 18
```

## 迭代器模式

::: tip
迭代器模式是指提供一种顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器分为两种，一种是内部迭代器，另外一种是外部迭代器
:::

### 内部迭代器

::: tip
内部迭代器在调用的时候非常方便，外界不用关心迭代器内部到底是如何实现的，跟迭代器的交互也只有一次初始调用，而这也正好是内部迭代器的缺点。
:::
**Jquery 中的迭代器**

```js
// Jquery中的迭代器
$.each([1, 2, 3], function (index, value) {
  console.log(index)
  console.log(value)
})
```

**实现自己的 each 迭代器**

```js
// 实现自己的each迭代器
var each = function (array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback.call(null, i, array[i])
  }
}
each([1, 2, 3], function (index, value) {
  console.log(index) // 依次输出0 1 2
  console.log(value) // 依次输出1 2 3
})
```

### 外部迭代器

::: tip
外部迭代器必须显示的请求迭代下一个元素
:::

```js
// 自定义外部迭代器实现比较两个数组的值是否完全相等
var Iterator = function (obj) {
  var current = 0
  var next = function () {
    current++
  }
  var isDone = function () {
    return current >= obj.length
  }
  var getCurrentItem = function () {
    return obj[current]
  }
  return {
    next: next,
    isDone: isDone,
    getCurrentItem: getCurrentItem,
    length: obj.length
  }
}
var compare = function (iterator1, iterator2) {
  if (iterator1.length != iterator2.length) {
    console.log('两个数组不相等')
    return false
  }
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() != iterator2.getCurrentItem()) {
      throw new Error('两个数组不相等')
    }
    iterator1.next()
    iterator2.next()
  }
  console.log('两个数组相等')
}
var iterator1 = Iterator([1, 2, 3])
var iterator2 = Iterator([1, 2, 4])
compare(iterator1, iterator2) // 报错，两个数组不相等
```

## 发布-订阅模式

::: tip 定义
发布-订阅模式又叫观察者模式，他定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
:::

**优点**：发布-订阅模式一为时间上的解耦，二为对象之间的解耦。它的应用非常广泛，既可以用在异步编程中，也可以帮助我们完成更加松耦合的代码编写。发布-订阅模式还可以用来帮助实现一些其他的设计模式，例如中介者模式。<br/>
**缺点**：创建订阅者本身要消耗一定的时间和内存，而当你订阅一个消息后，也许此消息最后都没有发生，但订阅者依然存在于内存中，造成了一种浪费。发布-订阅模式虽然弱化了对象之间的联系，但过度使用的话，对象和对象之间的必要联系也将深埋在背后，会导致程序难以追踪维护和理解。

### DOM 事件中的发布-订阅

只要我们曾经在 DOM 节点上绑定了事件函数，那我们就曾经使用过发布-订阅模式。

```js
// DOM事件中的发布-订阅模式
document.body.addEventListener('click', function () {
  console.log(1)
})
document.body.addEventListener('click', function () {
  console.log(2)
})
document.body.addEventListener('click', function () {
  console.log(3)
})
document.body.addEventListener('click', function () {
  console.log(4)
})
document.body.click() // 输出1 2 3 4
```

### 自定义发布-订阅

背景：小明最近看中一套房子，到销售中心才告知已经卖完了，好在销售楼中心准备出后期工程，但不知道什么时候出，只要小明留下自己的联系方式，楼盘开启后销售中心会通知小明相关信息。而对于其他像小明那样的客户，只要同样留下联系方式都可以收到相关信息。

```js
// 自定义发布-订阅事件
var sales = {
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    var type = Array.prototype.shift.call(arguments)
    var fns = this.clientList[type]
    if (!fns || fns.length < 1) {
      return false
    }

    for (let index = 0; index < fns.length; index++) {
      fns[index].apply(this, arguments)
    }
  }
}

// 订阅
sales.listen('88', function (price) {
  console.log('88平米的房子价格是：' + price)
})
sales.listen('100', function (price) {
  console.log('100平米的房子价格是：' + price)
})

// 发布
sales.trigger('88', 200000) // 88平米的房子价格是：200000
sales.trigger('100', 300000) // 100平米的房子价格是：300000
```

### 取消订阅的事件

发布-订阅模式中，既然可以订阅事件，那么一定可以取消订阅，假设小明突然不想买房子了，为避免销售中心发短信打搅自己，他决定取消订阅。

```js
// 取消订阅事件
var sales = {
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    var type = Array.prototype.shift.call(arguments)
    var fns = this.clientList[type]
    if (!fns || fns.length < 1) {
      return false
    }
    for (let index = 0; index < fns.length; index++) {
      fns[index].apply(this, arguments)
    }
  },
  remove: function (type) {
    var fns = this.clientList[type]
    if (!fns || fns.length < 1) {
      return false
    }
    // 全部取消订阅
    fns.length = 0
  }
}

// 订阅
sales.listen('88', function (price) {
  console.log('88平米的房子价格是：' + price)
})
sales.listen('100', function (price) {
  console.log('100平米的房子价格是：' + price)
})

// 取消订阅
sales.remove('88')

// 发布
sales.trigger('88', 200000) // 不输出
sales.trigger('100', 300000) // 100平米的房子价格是：300000
```

### 一个真实的例子：网站登录

背景：一个商场网站，有头部 header，有导航 nav，有购物车 cart，有消息列表 message 等等模块度依赖于登录成功后的用户信息。而用户不知道什么时候会登陆。需要将以上各个模块与登录模块做一个发布-订阅

```js
// 一个真实的发布-订阅例子：网站登录
var login = {
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    var type = Array.prototype.shift.call(arguments)
    var fns = this.clientList[type]
    if (!fns || fns.length < 1) {
      return false
    }
    for (let index = 0; index < fns.length; index++) {
      fns[index].apply(this, arguments)
    }
  }
}

// 头部
var header = (function () {
  login.listen('loginSuccess', function (data) {
    header.setAvatar(data.avatar)
  })
  return {
    setAvatar: function (avatar) {
      console.log('设置header头像：' + avatar)
    }
  }
})()

// 导航
var nav = (function () {
  login.listen('loginSuccess', function (data) {
    nav.setAvatar(data.avatar)
  })
  return {
    setAvatar: function (avatar) {
      console.log('设置nav头像：' + avatar)
    }
  }
})()

// 购物车
var cart = (function () {
  login.listen('loginSuccess', function (data) {
    cart.getOrders(data)
  })
  return {
    getOrders: function (data) {
      console.log('获取' + data.name + '的购物车订单列表')
    }
  }
})()

setTimeout(function () {
  // 依次输出
  // 设置header头像：https://www.baidu.com/1.jpg
  // 设置nav头像：https://www.baidu.com/1.jpg
  // 获取AAA的购物车订单列表
  login.trigger('loginSuccess', { name: 'AAA', avatar: 'https://www.baidu.com/1.jpg' })
}, 1500)
```
